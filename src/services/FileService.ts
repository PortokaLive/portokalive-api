import fs from "fs";
import handlebars from "handlebars";

export const readHTMLFile = (path: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
      if (err) {
        reject(err);
      } else {
        resolve(html);
      }
    });
  });
};

export const fillTemplate = (html: string, replacements: any) => {
  return handlebars.compile(html)(replacements);
};
