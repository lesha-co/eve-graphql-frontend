import yaml from "js-yaml";
import fs from "fs";
import path from "path";

export const SDELoad = (sdePath: string) => {
  try {
    const p = path.join("../sde", sdePath);
    const file = fs.readFileSync(p, "utf8");
    return yaml.safeLoad(file);
  } catch (e) {
    console.log(e);
  }
};

// Get document, or throw exception on error
