---
title: "Signing an Android apk with the command line"
desc: "A quick guide to signing an apk release with the command line"
updated: 2024-01-15
tags: ["android"]
---

## Generating a keystore

To sign your apk, you will need to create a `keystore` file. You can do this with the `keytool` command. 

```bash
keytool -genkey -v -keystore YOUR_KEYSTORE_PATH -alias YOUR_KEY_ALIAS -keyalg RSA -keysize 2048 -validity 10000
```

Make sure to replace `YOUR_KEY_ALIAS` with a name for your key, and `YOUR_KEYSTORE_PATH` with the filename you want to use. The file extension can be anything. The keytool will ask you for a password. Everything else it asks for (like name and organization) can be left blank.

## Signing your app

Sign your app with the following command:

```bash
apksigner sign --ks-key-alias YOUR_KEY_ALIAS --ks YOUR_KEYSTORE_PATH app-release.apk
```

Make sure to replace `YOUR_KEY_ALIAS` and `YOUR_KEYSTORE_PATH` with the values you used above. By default, the apk is overwritten with the signed version. If you want to keep the unsigned version, you can add the `--out` flag to specify a different filename.

> If `apksigner.bat` cannot be found on your path, you can locate it in your Android SDK install location at `build-tools/VERSION/apksigner`.

## Verifying the signature

You can verify the signature with the following command:

```bash
apksigner verify --verbose app-release.apk
```
