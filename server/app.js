const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cors =require("cors")

const initDatabase = require("./startUp/initDatabase");
const routes = require("./routes");
const app = express();
const PORT = config.get("PORT") ?? 5000;

app.use(cors(config.get("corsOptions")))

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/api", routes);

async function start() {
    try {
        mongoose.connection.once("open", () => {
            initDatabase();
        });
        await mongoose.connect(config.get("mongoUri"));
        app.listen(PORT, () =>
            console.log(`Server start on Port ${PORT}...`));
    } catch(error) {
        console.log(error.message);
        process.exit(1);
    }
}


start();
