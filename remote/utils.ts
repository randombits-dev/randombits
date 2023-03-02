import fs from "fs-extra";

export const readFilesInDir = (baseDir: string) => {
    const fileList: string[] = [];

    function getPages(dir: string) {
        const entries = fs.readdirSync(dir, {withFileTypes: true});
        entries.forEach(entry => {
            const item = `${dir}/${entry.name}`;
            if (entry.isDirectory()) {
                getPages(item);
            } else {
                fileList.push(item);
            }
        });
    }

    getPages(baseDir);
    return fileList;
}