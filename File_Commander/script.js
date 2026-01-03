const { readFile, open, watch, unlink, rename } = require("fs/promises");

(async () => {
    const commandFileHandler = await open("./command.txt");

    const createFile = async (path) => {
        try{
            existingFile = await open(path, "r")
            console.log("File already exists")
            existingFile.close()
        } catch (e) {
            const newFileHandle = await open(path,"w")
            console.log("File successfully created");
            newFileHandle.close()
        }
    }

    const deleteFile = async (path) => {
        try{
            await unlink(path);
            console.log("File deleted successfully");
        } catch (e) {
            console.log("Error deleting file: ", e);
        }
    }

    const renameFile = async (oldPath, newPath) => {
        try{
            await rename(oldPath, newPath);
            console.log("File renamed successfully");
        } catch (e) {
            console.log("Error renaming file: ", e);
        }
    }

    const addToFile = async (path, content) => {
        try{
            const fileHandle = await open(path, "a");
            await fileHandle.write(content);
            console.log("Content added to file successfully");
            fileHandle.close();
        } catch (e) {
            console.log("Error adding content to file: ", e);
        }
    }

    commandFileHandler.on("change", async ()=>{
        const content = await readFile("command.txt", "utf-8");
        // console.log(content);

        const CREATE_FILE = "create a file"
        const DELETE_FILE = "delete file"
        const RENAME_FILE = "rename file"
        const ADD = "add to file"

        if(content.includes(CREATE_FILE)){
            const filePath = content.substring(CREATE_FILE.length + 1);
            createFile(filePath);
        }

        if(content.includes(DELETE_FILE)){
            const filePath = content.substring(DELETE_FILE.length + 1);
            deleteFile(filePath);
        }

        if(content.includes(RENAME_FILE)){
            const _idx = content.indexOf(" to ")
            const oldfilePath = content.substring(RENAME_FILE.length + 1, _idx);
            const newfilePath = content.substring(_idx + 4);
            renameFile(oldfilePath, newfilePath);
        }

        if(content.includes(ADD)){
            const _idx = content.indexOf(" this: ")
            const filePath = content.substring(ADD + 1, _idx);
            const stuff = content.substring(_idx + 7);

            addToFile(filePath, stuff);
        }
    })

    const watcher = watch("./command.txt");
    for await (const event of watcher) {
        if(event.eventType === "change"){
            // console.log(event); 
            commandFileHandler.emit("change");
        }
    }
    
})();