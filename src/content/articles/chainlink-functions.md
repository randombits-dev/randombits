---
title: "Chainlink Functions Guide"
summary: "A guide to calling Chainlink Functions and authenticating to a private API with secrets"
desc: "A guide to calling Chainlink Functions and authenticating to a private API with secrets"
updated: 2023-12-14
tags: ["web3"]
---

## Overview

Chainlink Functions are a way to call serverless functions from your smart contract. This allows you to do things like compute a value off-chain and return it to your smart contract. Because the chainlink function cannot import any external dependencies, most of the functions will call an external API to perform the operation.

If you need to authenticate with the API, you will need to use secrets. This guide will cover hosting secrets in **Github Gists**, which is the easiest way.

## Full Contract Example

The official chainlink documentation shows creating a generic contract that can call any function. But in the real world, you will most likely make a request to a specific function in your contract and trigger additional logic when the request finishes.

Here is a full example of a contract that will call a function and then do something with the result:

```solidity
pragma solidity 0.8.19;

import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/libraries/FunctionsRequest.sol";

contract MyContract is FunctionsClient {
  using FunctionsRequest for FunctionsRequest.Request;
  
  string constant _requestToExecute = "const user = args[0];const result = await Functions.makeHttpRequest({url: 'https://example.com/api/' + user,method: 'GET',headers: {'X-Api-Key': secrets.MY_API_KEY}});return Functions.encodeUint256(result.error ? 0 : 1);";

  struct RequestInfo {
    address user;
  }
  mapping(bytes32 => RequestInfo) private _requestInfo;
  
  uint64 private subId = 0;
  bytes32 private donId = 0x0;
  bytes private secrets;

  constructor(address _router, uint64 _subId, bytes32 _donId, bytes memory _secrets) FunctionsClient(_router) {
    subId = _subId;
    donId = _donId;
    secrets = _secrets;
  }
  
  function doSomething() public {
    FunctionsRequest.Request memory req;
    req.initializeRequestForInlineJavaScript(_requestToExecute);
    req.addSecretsReference(secrets);

    string[] memory args = new string[](1);
    args[0] = Strings.toString(user);
    req.setArgs(args);
    bytes32 requestId = _sendRequest(req.encodeCBOR(), subId, uint32(300000), donId);
    _requestInfo[requestId] = RequestInfo(tokenId, op, limit);
  }

  function fulfillRequest(
    bytes32 requestId,
    bytes memory response,
    bytes memory error
  ) internal override {
    bool success;
    (success) = abi.decode(response, (bool));
    RequestInfo memory info = _requestInfo[requestId];
    if (success) {
      // do something
    }
  }
}
```

## Contract Code Broken Down

### Chainlink Functions Client

Implementing the `FunctionsClient` interface is required to work with Chainlink Functions.

Using the `FunctionsRequest` library is optional, but it makes it easier to create the request.

```solidity
pragma solidity 0.8.19;

import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/libraries/FunctionsRequest.sol";

contract MyContract is FunctionsClient {
  using FunctionsRequest for FunctionsRequest.Request;
}
```

### The function code

You will likely want to declare a static function in the contract, instead of passing it into the contract during a method call. Passing it into the contract opens up exploitation, since users would be able to pass in their own malicious function:

```solidity
string constant _requestToExecute = "const user = args[0];const result = await Functions.makeHttpRequest({url: 'https://example.com/api/' + user,method: 'GET',headers: {'X-Api-Key': secrets.MY_API_KEY}});return Functions.encodeUint256(result.error ? 0 : 1);";
```

Here is the function in a more readable format:

```javascript
const user = args[0];
const result = await Functions.makeHttpRequest({
  url: 'https://example.com/api/' + user,
  method: 'GET',
  headers: {'X-Api-Key': secrets.MY_API_KEY}
});
return Functions.encodeUint256(result.error ? 0 : 1);
```
The function will extract the arguments, make the request with the API key provided via secrets, and then it will return 1 (true) for success or 0 (false) if there was an error.

If you want to return more than 1 value, you can use the `Buffer.concat` function to combine multiple values into a single buffer:

```javascript
return Buffer.concat([Functions.encodeUint256(res.answer), Functions.encodeString(res.reason)]);
````

### Storing Request Info

Depending on your use case, you may want to store information about the request. Since the request is asynchronous, this allows you to store context information, for when you are executing logic after the response is received. In this example, we are storing the user address that made the request:

```solidity
struct RequestInfo {
    address user;
  }
mapping(bytes32 => RequestInfo) private _requestInfo;
```

### Constructor

The `FunctionsClient` interface requires the router address.

Then when making a request, you will need to pass in the subscription ID, the don ID, and secrets. Since these values are static and will not change, it makes sense to pass them in during the constructor:

```solidity
  uint64 private subId = 0;
  bytes32 private donId = 0x0;
  bytes private secrets;

  constructor(address _router, uint64 _subId, bytes32 _donId, bytes memory _secrets) FunctionsClient(_router) {
    subId = _subId;
    donId = _donId;
    secrets = _secrets;
  }
```

### The request

This is where the actual request is made. Here we are passing in the function code (_requestToExecute), the secrets, and the arguments. The arguments are passed in as an array of strings. In this example, we are only passing in one argument, but you can pass in as many as you want.

```solidity
  function doSomething() public {
    FunctionsRequest.Request memory req;
    req.initializeRequestForInlineJavaScript(_requestToExecute);
    req.addSecretsReference(secrets);

    string[] memory args = new string[](1);
    args[0] = Strings.toString(user);
    req.setArgs(args);
    bytes32 requestId = _sendRequest(req.encodeCBOR(), subId, uint32(300000), donId);
    _requestInfo[requestId] = RequestInfo(tokenId, op, limit);
  }
```

### The response

The response is handled in the `fulfillRequest` function. In this example, our function is simply returning a success boolean, but it can return any number of values. It then looks up the request info that was saved.

```solidity
  function fulfillRequest(
    bytes32 requestId,
    bytes memory response,
    bytes memory error
  ) internal override {
    bool success;
    (success) = abi.decode(response, (bool));
    RequestInfo memory info = _requestInfo[requestId];
    if (success) {
      // do something
    }
  }
```

## Storing secrets in Github Gists

The easiest way to store secrets is in Github Gists. This allows you to store your secrets in a private gist and then encrypt the gist url with the Chainlink Secrets Manager. This will allow you to use the encrypted url in your contract and the Chainlink node will be able to decrypt it and use it to authenticate with the API.

You will need to install the following package:

```
npm install @chainlink/functions-toolkit
```

Run the following nodejs script:

```javascript
  const {SecretsManager} = require("@chainlink/functions-toolkit");
  const ethers = require("ethers");

  const secrets = {'MY_API_KEY': 'someKey'}; // replace with your secrets
  const routerAddress = "0xA9d587a00A31A52Ed70D6026794a8FC5E2F5dCb0"; //replace with the router for your network
  const donId = "fun-avalanche-fuji-1"; // replace with the donId for your network
  const rpcUrl = 'https://api.avax-test.network/ext/bc/C/rpc'; // replace with the rpcUrl for your network

  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const wallet = ethers.Wallet.createRandom();
  const signer = wallet.connect(provider);

  const secretsManager = new SecretsManager({
    signer: signer,
    functionsRouterAddress: routerAddress,
    donId: donId,
  });
  await secretsManager.initialize();

  const encryptedSecretsObj = await secretsManager.encryptSecrets(secrets);
  console.log(encryptedSecretsObj);
```
This will output a JSON object containing your secrets. It will look similar to the following:

```json
{"encryptedSecrets":"0x7b225444............"}

```

Now create a secret gist in github with the JSON that was output from the script. The title and filename of the gist does not matter.

After you save, copy the url of your gist and add `/raw` to the end to get your final url. Now run the following script to encrypt the URL:

```javascript
// initialize secrets manager like last script

const encryptedSecretsUrls = await secretsManager.encryptSecretsUrls([
  "https://gist.github.com/username/gist_id/raw",
]);
console.log(encryptedSecretsUrls);
```

The output of this function is your secret bytes that you will use in your contract. It will simply be a bunch of hex bytes that look like this:

```
0xaf472b...................................
```
