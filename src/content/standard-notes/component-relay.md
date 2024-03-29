---
title: "ComponentRelay API"
desc: "The old guide for creating your own Standard Notes editor extensions, using the ComponentRelay API"
order: 10
hide: true
---

> Note: I highly recommend following the [new guide](/standard-notes/creating-extensions) for the best experience creating extensions, which uses the API I created. But if you want to use one of the official APIs, read on.

## Official APIs

An extension communicates back and forth with Standard Notes to load and save the note.
There are two choices for official APIs that Standard Notes has available:

1. The **ComponentRelay** API (https://github.com/standardnotes/component-relay)
2. The **EditorKit** API (https://github.com/standardnotes/editor-kit), which wraps the ComponentRelay API and provides some helper logic

If you are going to use one of the official APIs, I personally recommend just using the **ComponentRelay** API, because it gives you more flexibility and the EditorKit does not provide that much extra.

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

Standard Notes will call our function we pass to **streamContextItem
** and give us the selected note. We grab the following from the note:

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
   There is many other metadata values you can get with the `getItemAppDataValue` method, like *pinned* and
   *archived*, but I don't foresee any extension needing those values.

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

This will include all the default CSS theme variables. Here is a condensed list of the variables you might use:

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

When you are styling your editor, you will want to use the theme variables for anything involving color and font-size.
