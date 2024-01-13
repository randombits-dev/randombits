---
title: "Installing Plugins"
desc: "One of the best parts of Standard Notes is the ability to use plugins (also called extensions). This guide covers how to install plugins."
img: ./installing-extensions.png
tags: [ 'standard-notes' ]
order: 1
---

## Plugin Introduction

> Plugins are also called extensions. I will use the term plugin in this guide.

There are a few different types of Standard Notes plugins:

**Editor**. Loads a 3rd party application in the *edit* area.

**Theme**. Loads a 3rd party stylesheet to change the *theme* of the entire application.

**Bottom Toolbar**. Loads a 3rd party plugin in the *toolbar* area underneath the editor. This type of plugin is not very common. It is also referred to as a stack plugin.

## Installing plugins

> These instructions have been updated on November 2023 - if you're using an older version of the app, see [Old Instructions](#old-instructions).

Plugins are listed under **Account Settings** (or Preferences) -> **Plugins**

<img src="/images/sn/pref2.png"/>

You can choose to install any of the plugins listed under **Browse Plugins**. These are plugins that have been reviewed by the Standard Notes team for security and quality. 

You can also install custom plugins by entering the URL for the **descriptor file** (usually named `ext.json`), and clicking install. 

<img src="/images/sn/install2.png"/>

After clicking install, the plugin will be listed under **Manage Plugins**, where you can rename or uninstall the plugin.

## Using your plugin

### Editor plugin

If you installed an editor plugin, you will see the plugin show up at the bottom of the **Change Note Type** menu:

<img src="/images/sn/choose-editor.webp"/>

The first time you choose this plugin for the note type, you will see a confirmation dialog to give the plugin permission to access your notes:

<img src="/images/sn/interact.webp"/>

You will need to click **Continue** to use the plugin. See more details about security risks below.

### Theme plugin

If you installed a theme plugin, you can select the theme in the quick settings menu:

<img src="/images/sn/appearance.webp"/>

### Bottom Toolbar plugin

If you installed a bottom toolbar plugin, you need to enable the plugin in the tools section of the quick settings menu.

<img src="/images/sn/tools.webp"/>

Then you will see the new toolbar below every note:

<img src="/images/sn/toolbar.webp"/>

## Plugin Descriptor

The plugin descriptor is a JSON file that is used to install a plugin. It tells Standard Notes the name of the plugin, what type of plugin it is, the current version, and where the plugin can be downloaded from. See more details about the plugin descriptor below.

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

## Plugin Security Risks

### What does a plugin have access to?

If the editor plugin is chosen as the note type, it will be able to view the contents of the note, and the metadata of the note (date modified, etc).

It will NOT have access to any other notes, files, or other data.

### What are the risks of using a plugin?

If you use a plugin that is listed under "Browser Plugins", then it has been reviewed by the Standard Notes team, and is safe to use.

If you install a custom plugin using a URL, then a malicious plugin can read your note and send the contents to a 3rd party. This is why you should trust the plugin before using it for any sensitive data.

## Old Instructions

> These instructions are for older versions of Standard Notes, before Nov 2023

plugins are listed under **Account Settings** (or Preferences) -> **General** -> **Advanced Options**

<img src="/images/sn/pref.webp"/>

At the bottom of this list is where you can install new plugins:

<img src="/images/sn/install.webp"/>

Paste the url for the **descriptor file** (usually named `ext.json`), and click **Install**.

You will get a warning like:

<img src="/images/sn/warning1.webp"/>

This is letting you know that a plugins could be malicious. See more about security risks below.

Next Standard Notes will read the metadata from the descriptor file, and show it to you, to make sure you are installing the plugin you intend to:

<img src="/images/sn/confirm-install.webp"/>

Make sure you click **Install** again. It's easy to miss this step and think the plugin is already installed.

Now you should see the new plugin in the list:

<img src="/images/sn/install-entry.webp"/>
