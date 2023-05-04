export const loadRemote = async (url: string) => {
    try {
        const result = await fetch(url + '/remote.html');
        const text = await result.text();
        return text.replaceAll(/src="(?!http)/g, `src="${url}/`);

    } catch (e) {
        return '<div>Not found</div>';
    }
};