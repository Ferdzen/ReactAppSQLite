import * as SQLite from "expo-sqlite"

import Tenis from "../entities/tenis";

const config = {
    database: "mydatabase",
    drive: SQLite,
    entities: [Tenis],
    synchronize: true,
    type: "expo"
};


export default config;