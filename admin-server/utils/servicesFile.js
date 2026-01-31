import fs from "fs";
import path from "path";

const filePath = path.resolve("../client/src/data/services.json");

export const readServices = () => {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

export const writeServices = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};
