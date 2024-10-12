console.log("Merhaba, Node.js konsol uygulaması!");
const readline = require('readline');
const fs = require("fs");
const path = require("path");


try {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    fs.readFile(path.join(__dirname, "config.json"), "utf-8", (err, data) => {
        data = JSON.parse(data);
        if (err) {
            console.log(`${path.join(__dirname, "config.json")} read file : `, err);
            return false;
        }

        if (data.user_document_path === "" || data.user_document_path === " ") {

        } else {

        }

        require("./controllers");
    });

    rl.question('Adınız nedir? ', (answer) => {
        console.log(`Merhaba, ${answer}!`);
        rl.close();
    });



} catch (error) {
    console.error("Api | app.js", error);
}