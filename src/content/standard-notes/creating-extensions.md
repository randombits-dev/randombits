---
title: "Creating Standard Notes Extensions"
desc: "A guide for creating your own Standard Notes editor extensions."
img: './creating-extensions.jpg'
---

If you don't like reading, and want to jump straight into coding, you can checkout my [Starter Template Repo](/standard-notes/template).

## Overview

This guide will go over the following:
1. The structure of a note
2. The API for communicating back and forth with Standard Notes
3. API Implementation Example
4. Styling your extension with the chosen theme
5. JSON descriptor file

## Technology

Because editor extensions load in an iframe inside Standard Notes, you are free to choose any javascript framework / technology to write an extension.

## The structure of a note

A note contains the following structure:

```json
{
    "uuid": "ec677a63-5fae-440e-84cd-a62ae7c7d894",
    "content_type": "Note",
    "created_at": "2023-03-26T02:01:59.462Z",
    "updated_at": "2023-03-27T00:18:36.199Z",
    "isMetadataUpdate": false,
    "content": {
      "text": "This is the text content",
      "title": "My Note Title",
      "editorIdentifier": "org.standardnotes.bold-editor",
      "references": [],
      "appData": {
        "org.standardnotes.sn": {
          "locked": false
        },
        "dev.randombits.my-editor": {
          "key": "value"
        }
      },
      "spellcheck": false,
      "preview_plain": "Hello World",
      "preview_html": "<div></div>"
    }
}
```

But there are really only 3 important properties that we care about:
1. **text** - The content of the note. It is always stored as a string, but we can stringify it if we need to store more complex JSON data.
2. **preview_plain** or **preview_html** - The preview text that is shown in the note list
3. **appData** - This is where metadata about the note is stored. Standard Notes stores things like whether the note is locked for editing. And we can store our own metadata under our own key, in JSON format.

The remaining properties are either edited outside of our editor (like the title), or generated by standard notes.

## Standard Notes API

An extension communicates back and forth with Standard Notes to load and save the note.
There are two choices for what to use as your API to communicate with standard notes:

1. The **ComponentRelay** API (https://github.com/standardnotes/component-relay)
2. The **EditorKit** API (https://github.com/standardnotes/editor-kit), which wraps the ComponentRelay API and provides some helper logic

I personally recommend just using the **ComponentRelay** API, because it gives you more flexibility and the EditorKit does not provide that much extra.

## Component Relay Example

Install the ComponentRelay library:

```
npm install @standardnotes/component-relay
```

Here is an example of how to use the ComponentRelay library:

```typescript
import ComponentRelay from "@standardnotes/component-relay";

let currentNote;

const componentRelay = new ComponentRelay({
  targetWindow: window,
  options: {
    coallesedSaving: true, // saving uses a debounce value
    coallesedSavingDelay: 400 // 400 ms
  }
});

componentRelay.streamContextItem((note) => {
  currentNote = note;
  if (note.isMetadataUpdate) {
    return; // don't care about metadata updates
  }
  const text = note.content.text || '';
  const isLocked = componentRelay.getItemAppDataValue(note, 'locked');
  const metadata = note.content.appData['dev.randombits.my-editor'];

  /* RENDER EDITOR HERE */
});

const saveNote = (newText: string, newMeta: any) => {
  componentRelay.saveItemWithPresave(currentNote, () => {
    currentNote.content.text = newText;
    currentNote.content.preview_plain = newText.substring(0, 20);
    currentNote.content.appData['dev.randombits.my-editor'] = newMeta;
  });
};
```

### coallesedSaving

When setting up the ComponentRelay, I'm specifying the **coallesedSaving** option, which is more commonly known as **debounce**. This option is optional but I highly recommend using it, or implementing your own debounce.
Without it, standard notes has to encrypt and save the note on every edit (every keystroke). I found that 250ms to 400ms is a good delay. Any higher and the user may have time to leave the note before its saved.

```typescript
options: {
    coallesedSaving: true,
    coallesedSavingDelay: 400
}
```

### streamContextItem

Standard Notes will call our function we pass to **streamContextItem** and give us the selected note. We grab the following from the note:

1. The **text**.

```javascript
const text = note.content.text || '';
```

If your editor uses **JSON** data instead of text, you can parse the text to JSON.
But you should make sure the text is in JSON format, and it matches your expected structure.
If it doesn't pass either of these tests, then the user likely just switched to your editor and the note has existing content.
Depending on your editor, you might try to incorporate the existing note content into your new editor, or you could just start with new data and essentially erase the user's note (don't worry, they can always restore the content from history).
Example of logic for parsing JSON:

```javascript
let data;
try {
    data = JSON.parse(note.content.text);
    if (!data.myExpectedProperty) { // check for a known property
        data = createInitialData(); // generate your JSON for a new note
    }
} catch {
    // data was not in JSON format
    data = createInitialData(); // generate your JSON for a new note
}
```

2. The **locked** metadata property, which is tied to the **Prevent Editing** control. For the best experience, we probably want to disable our editor when the note is locked.
However, it's not strictly required, because if the user tries to change the note while its locked, Standard Notes will prevent the save and warn the user.
There is many other metadata values you can get with the `getItemAppDataValue` method, like *pinned* and *archived*, but I don't foresee any extension needing those values.

```javascript
const isLocked = componentRelay.getItemAppDataValue(note, 'locked');
```

3. Our own **metadata** we might be storing. This is optional if there is no metadata you need to store.

```javascript
const metadata = note.content.appData['dev.randombits.my-editor'];
```

You will notice we are immediately returning out of the function if `isMetadataUpdate` is true.
When this flag is true, there is only an update to metadata (e.g. the updated_at timestamp), and normally we will not care about these types of updates.

### saveItemWithPresave

When the user makes a change in your editor, you need to pass the new data to Standard Notes.
The best way to do this is with the `saveItemWithPresave` call.
You pass in the note that you received in the `streamContextItem` callback.
Then in a callback you can set the new text data, preview, and metadata.

The **preview** content is completely optional, and only makes sense when there is simple text data.

The **metadata** is also optional and will only occur if you have something you want to store that is separate from the text.
For example, you might store which line the user was last editing so you can restore the editor in the same position.
The metadata data should be stored under a key that is the same as the identifier you specify in the ext.json file.

```javascript
componentRelay.saveItemWithPresave(currentNote, () => {
    currentNote.content.text = newText;
    currentNote.content.preview_plain = newText.substring(0, 20);
    currentNote.content.appData['dev.randombits.my-editor'] = newMeta;
});
```

Note that instead you could set the text and preview directly on the note, and then call the `saveItem` method,
but the benefit of the presave callback is that you are only running this logic when a save will actually be made (because of the debounce, you may call saveItems many times before it actually ends up saving).

## Styling using Themes

Since Standard Notes has several different built-in themes, and the option to install custom themes,
we need our custom editor to use these themes. We simply need to install the `stylekit` library:

```
npm install @standardnotes/stylekit
```
And then import into our main CSS file:
```css
@import '@standardnotes/stylekit/dist/stylekit.css';
```

This will include all of the default CSS theme variables. Here is a condensed list of the variables you might use:

```
--sn-stylekit-editor-font-family
--sn-stylekit-font-size-editor
--sn-stylekit-border-color
--sn-stylekit-background-color
--sn-stylekit-contrast-background-color
--sn-stylekit-foreground-color
--sn-stylekit-contrast-foreground-color
--sn-stylekit-neutral-color
--sn-stylekit-neutral-contrast-color
```

You can check out the [full list of variables](https://github.com/standardnotes/StyleKit/blob/main/src/css/main.scss).

When you are styling your editor, you will want to use the theme variables for anything involving color and font-size:

```css
body {
    background-color: var(--sn-stylekit-background-color);
    color: var(--sn-stylekit-foreground-color);
    font-family: var(--sn-stylekit-editor-font-family);
    font-size: var(--sn-stylekit-font-size-editor);
}

button {
    background-color: var(--sn-stylekit-contrast-background-color);
}

textarea {
    border: 1px solid var(--sn-stylekit-border-color);
}
```

When you use these variables, and the user switches themes, your editor will automatically change too!

## JSON Descriptor File

You will need to create a descriptor file, which is how people will install your extension.

The file is normally hosted at the same url of your application at `/ext.json`, but it doesn't have to be.
Here is an example file:

```json
{
  "identifier": "dev.randombits.my-editor",
  "name": "My Editor",
  "description": "My cool editor",
  "content_type": "SN|Component",
  "area": "editor-editor",
  "version": "1.0.0",
  "url": "https://nienow.github.io/sn-extension-template/",
  "download_url": "https://nienow.github.io/sn-extension-template/latest.zip",
  "latest_url": "https://nienow.github.io/sn-extension-template/package.json"
}
```

**identifier** - A unique identifier, usually in reverse domain format

**name** - The name that shows up under the editor picker

**description** - This shows up under the list of installed extensions

**content_type** - "SN|Component" for everything but a theme

**area** - "editor-editor" is the main editor area

**version** - The version of your extension.

**url** - The url of your extension HTML page

**download_url** (optional) - The url for Standard Notes to download the full extension distribution (HTML page, scripts, stylesheets, etc).
Only the desktop version of the app uses this. It downloads the whole distribution so that you can use the app offline.
However, this value is optional, because the desktop version will simply fallback to the using the regular "url" value if it is not specified.

**latest_url** (optional) - The url for the desktop app to check whether it needs to download a new version of the extension.
It is only required if "download_url" is specified. The file it points at should be a json file containing a "version" property.
The package.json or the ext.json file could be used for this, since they both contain the version.

## Deploy / Hosting

The most common way to host an extension is through **Github Pages**. Not only is it the easiest way, but also users will trust your extension if it is hosted next to your source code.

## Starter Template Repo

You can use the official starter template: https://github.com/standardnotes/editor-template-cra-typescript

But I've created a more complete starter template, which includes a demo/testing environment. See my [Starter Template Documentation](/standard-notes/template) or go directly to the github repo: https://github.com/nienow/sn-extension-template