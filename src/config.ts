import fs from "fs";
import os from "os";
import path from "path";

export type Config = {
    dbUrl:string;
    currentUserName:string|null;
}

export function setUser(userName:string): void {
    const cfg:Config = readConfig();
    cfg.currentUserName = userName
    writeConfig(cfg);
}

export function readConfig():Config {

    const data = fs.readFileSync(getConfigFilePath(), 'utf8');
    const rawConfig = JSON.parse(data);

    return validateConfig(rawConfig);
}

function getConfigFilePath(): string {
    return path.join(os.homedir(), '.gatorconfig.json');
}
function writeConfig(cfg: Config): void {
    const jsonData = JSON.stringify({
        db_url: cfg.dbUrl,
        current_user_name: cfg.currentUserName
    });

    fs.writeFileSync(getConfigFilePath(), jsonData);
}

function validateConfig(rawConfig: any): Config {
    if (!(typeof rawConfig === "object") || rawConfig === null || !(typeof rawConfig["db_url"] === "string")){
        throw new Error("invalid config")
    }
    return {
        dbUrl:rawConfig["db_url"],
        currentUserName:rawConfig["current_user_name"] ?? null,
    }
};