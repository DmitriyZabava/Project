const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");
const createError = require("http-errors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const path = require("path");


const errorMiddleware = require("./middleware/error.middleware");
const initDatabase = require("./startUp/initDatabase");
const routes = require("./routes");

const app = express();
const PORT = config.get("PORT") ?? 5000;


app.use(cors(config.get("corsOptions")));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(fileUpload({}));
app.use(express.static(path.resolve(__dirname, "static")));

app.use("/api/v1", routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});
app.use(errorMiddleware);
if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(__dirname, "static")));
    const indexPath = path.join(__dirname, "static", "index.html");
    app.get("*", (req, res) => {
        res.sendFile(indexPath);
    });
} else {
    console.log(( "Development" ));
}

async function start() {
    try {
        mongoose.connection.once("open", () => {
            initDatabase();
        });
        await mongoose.connect(config.get("mongoUri"));
        app.listen(PORT, () => console.log(`Server start on Port ${PORT}...`));
    } catch(error) {
        process.exit(1);
    }
}


start();
