---
title: "Running Automatic1111 in AWS"
summary: "A full guide to running your own stable diffusion server on an EC2 instance in AWS"
desc: "A full guide to running your own stable diffusion server on an EC2 instance in AWS"
updated: 2024-01-07
img: './mtn-clouds.jpg'
tags: [ai, cloud]
order: 3
---

## Create VM Instance

This guide assumes you already have an AWS account setup.

1. In the AWS console, Go to Compute -> **EC2** 
2. Click **Launch an Instance**
3. Choose **Ubuntu** as the Operating System
4. Select a GPU instance type. I recommend **g5.xlarge**, because it's very fast, but you can choose **g4dn.xlarge** for a cheaper option.
5. Select your **Key pair** for SSH login. If you don't have one yet, you should create one with the default settings, and download the private key to a secure location on your computer.
6. Create a security group, or select an existing one. If you are creating a new one, you can simply check all 3 options (allow SSH, allow HTTPS, and allow HTTP). If you are selecting an existing policy, make sure port **7860** is exposed.
7. Set your storage to at least **50 GB** of **gp3** storage (I recommend making it 100 GB to allow space to install more models and extensions).
8. Click **Launch Instance**

## Connect to your instance

When your instance is started, click **Connect**. You can use either **EC2 Instance Connect** or **SSH client** to connect to your instance.

If you use **EC2 Instance Connect**, you will launch a command prompt right in the browser. This is the easiest way.

If you use **SSH client**, you can follow the provided directions, using the Key Pair private key you downloaded earlier.

## Setup your instance

Using the command line, we need to install GPU drivers and python libraries before we can run Automatic1111. It is recommended to run all these commands from your home directory.

**Install GPU Driver**
```
wget https://raw.githubusercontent.com/GoogleCloudPlatform/compute-gpu-installation/main/linux/install_gpu_driver.py

sudo python3 install_gpu_driver.py
```

**Install Cuda (Nvidia GPU Software)**
```
wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/cuda-keyring_1.0-1_all.deb

sudo dpkg -i cuda-keyring_1.0-1_all.deb

sudo apt-get update

sudo apt-get -y install cuda
```

Install python libraries:

```
sudo apt-get update

sudo apt -y install python3-venv python3-pip

sudo apt-get install -y python3-opencv

sudo apt install --no-install-recommends -y google-perftools
```

Download the Automatic1111 repo:
```
git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git
```

## Running Automatic1111
```
stable-diffusion-webui/webui.sh --listen --xformers --api --enable-insecure-extension-access --skip-torch-cuda-test
```

It will take a few minutes to start the first time.

To get to the Automatic1111 app, you will need to find the **Public IPv4 Address** of the server. You will find this on the EC2 instance summary page.

Go to your browser, and enter your IP Address with the 7860 port: `http://YOUR_IP:7860` and you should see the Automatic1111 UI!

## Automatic Startup

If you want to Automatic1111 to startup automatically when your server starts, you can add it to your cron file:

```
sudo apt-get install nano cron

crontab -e
```

Add the following to the end of the file that opens in nano:

```
@reboot ~/stable-diffusion-webui/webui.sh --listen --xformers --api --enable-insecure-extension-access --skip-torch-cuda-test
```

Save the file, and now Automatic1111 should start automatically the next time you start your instance.

## Starting and Stopping the VM

You can start and stop your instance via the **instance summary** or **instance list** pages. When your server is stopped, you only pay for the persistent hard drive, while the actual VM  incurs costs only when it is running. So don't forget to stop your instance when you are finished using it.

## Spot Provisioning

Spot provisioning is an option that gives you cheaper pricing on instances. But you can only run a spot server when AWS has enough resources available, and it gives AWS the right to shut down your server if they need resources for something else. 

> Spot provisioning in Google Cloud worked great for me during off-peak hours, but I didn't have as good of an experience with AWS. So in AWS I tend to run normal provisioning.

Here are some tips to avoid getting shutdown when running spot provisioning:

**Run your server during non-business hours**. For example, if you create your instance in your region, run your server at night or on weekends.

**Create instances in multiple regions.** Create another instance in a region on the other side of the globe. That way you can run that instance during the day (when it is night in your server's region). Note that the requests will take longer in a distant region.

## The Automatic1111 API

If you want to build your own UI, or run bulk generating of images, the API is very helpful. Because we added the `--api` parameter when we started Automatic1111, the api will be enabled.

You can access the API at: `HOST:7860/sdapi/v1/txt2img`
