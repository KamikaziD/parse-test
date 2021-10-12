import express from 'express';
import Parse from "parse/node";

//ROUTES
import users from "./routes/users";
import user from "./routes/user";
import addUser from "./routes/addUser";

//CONFIG
import { config } from "./constants/config";

const app = express();

app.use(express.json());
app.use("/api/user/users", users);
app.use("/api/user/user", user);
app.use("/api/user/new", addUser);


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