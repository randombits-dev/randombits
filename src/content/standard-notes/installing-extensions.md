---
title: "Installing Extensions"
desc: "One of the best parts of Standard Notes is the ability to write extensions. The guide covers how to install extensions."
img: ./installing-extensions.png
tags: [ 'standard-notes' ]
order: 1
---

## Extension Introduction

There are a few different types of Standard Notes extensions:

**Editor**. Loads a 3rd party application in the *edit* area.

**Theme**. Loads a 3rd party stylesheet to change the *theme* of the entire application.

**Bottom Toolbar**. Loads a 3rd party extension in the
*toolbar* area underneath the editor. This type of extension is not very common. It is also referred to as a stack extension.

## Installing extensions

Extensions are listed under **Account Settings** (or Preferences) -> **General** -> **Advanced Options**:

<img src="/images/sn/pref.png"/>

At the bottom of this list is where you can install new extensions:

<img src="/images/sn/install.png"/>

Paste the url for the **descriptor file** (usually named `ext.json`), and click **Install**.

You will get a warning like:

<img src="/images/sn/warning1.png"/>

This is letting you know that an extension could be malicious. See more about security risks below.

Next Standard Notes will read the metadata from the descriptor file, and show it to you, to make sure you are installing the extension you intend to:

<img src="/images/sn/confirm-install.png"/>

Make sure you click **Install** again. It's easy to miss this step and think the extension is already installed.

Now you should see the new extension in the list:

<img src="/images/sn/install-entry.png"/>

## Using your extension

### Editor Extension

If you installed an editor extension, you will see the extension show up at the bottom of the **Change Note Type** menu:

<img src="/images/sn/choose-editor.png"/>

The first time you choose this extension for the note type, you will see a confirmation dialog to give the extension permission to access your notes:

<img src="/images/sn/interact.png"/>

You will need to click **Continue** to use the extension. See more details about security risks below.

### Theme Extension

If you installed a theme extension, you can select the theme in the quick settings menu:

<img src="/images/sn/appearance.png"/>

### Bottom Toolbar Extension

If you installed a button toolbar extension, you need to enable the extension in the tools section of the quick settings menu.

<img src="/images/sn/tools.png"/>

Then you will see the new toolbar below every note:

<img src="/images/sn/toolbar.png"/>

## Extension Descriptor

The extension descriptor is the file you use to install an extension. It tells Standard Notes the name of the extension, what type of extension it is, the current version, and where to download the extension from. Here is what it looks like:

```
{
  "identifier": "dev.randombits.template",
  "name": "Extension Template",
  "content_type": "SN|Component",
  "area": "editor-editor",
  "version": "1.0.0",
  "description": "A custom editor",
  "url": "https://nienow.github.io/sn-extension-template/",
  "download_url": "https://nienow.github.io/sn-extension-template/latest.zip",
  "latest_url": "https://nienow.github.io/sn-extension-template/ext.json"
}
```

## Extension Security Risks

### What does an extension have access to?

If the editor extension is chosen as the note type, it will be able to view the contents of the note, and the metadata of the note (date modified, etc).

It will NOT have access to any other notes, files, or other data.

### What are the risks of using an extension?

A malicious extension can read your note and send the contents to a 3rd party. This is why you should trust the extension before using it for any sensitive data.

### How do I know which extensions to trust?

Extensions are generally open source, so reviewing the source code is the best approach.

You could also watch the network traffic (in the browser developer tools) to make sure no data is being sent over the internet. The only POST requests you should see are the ones to the Standard Notes API, which saves your note using encrypted data.

## Other FAQs

### What does the "Use hosted when local is unavailable" setting mean?

This setting is for the desktop app only, and will force Standard Notes to use the local version of the extension, instead of downloading the extension over the internet.