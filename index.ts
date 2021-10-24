import express from "express";
import Parse from "parse/node";
const morgan = require('morgan');

//ROUTES
import users from "./routes/users";
import productCatagories from "./routes/productCatagory";
import suppliers from "./routes/suppiers";
import receiveStock from "./routes/receiveStock";

//CONFIG
import { config } from "./constants/config";

const app = express();
app.use(morgan('dev'));

app.use(express.json());
app.use("/api/users", users);
app.use("/api/productcatagories", productCatagories);
app.use("/api/suppliers", suppliers);
app.use("/api/receivestock", receiveStock);

const server = app.listen(config.SERVER_PORT, () => {
    Parse.initialize(config.APP_ID, config.JAVASCRIPT_KEY, config.MASTER_KEY);
    Parse.serverURL = config.SERVER_URL;
    console.log(`App running on port ${config.SERVER_PORT}...`);
});

server.on("SIGINT", () => {
    server.close(() => {
        process.exit();
    });
});