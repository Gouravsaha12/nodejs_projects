const { Transform, pipeline } = require('stream');
const fs = require("fs/promises")

class Encrypt extends Transform {
    _transform(chunk, encoding, callback){
        for(let i=0; i<chunk.length; ++i){
            if(chunk[i] != 255) {chunk[i] = chunk[i] + 1}
        }
        this.push(chunk);
        callback();
    }
}

( async () => {
    const readFileHandle = await fs.open("read.txt", "r");
    const writeFileHandle = await fs.open("write.txt", "w")

    const readStream = readFileHandle.createReadStream();
    const writeStream = writeFileHandle.createWriteStream();

    const encrypt = new Encrypt;

    pipeline(
        readStream,
        encrypt,
        writeStream,
        (err) => {
            if(err){
                console.log("Error Occured!!");
            }
        }
    )

})();