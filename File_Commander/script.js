const fs = require("fs");

(async () => {
    const watcher = fs.promises.watch("./text.txt");

    for await (const event of watcher) {
        if(event.eventType === "change"){
            console.log(event);
        }
    }
})();