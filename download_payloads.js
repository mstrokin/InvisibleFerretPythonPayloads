const fs = require("fs");

const safeCode = (code) => {
  return code
    .replace(/exec/, "!!!>_<NotSafeExec>_<!!!")
    .replace(/eval/, "!!!>_<NotSafeEval>_<!!!");
};
const downloadPayloads = async () => {
  for (let i = 99; i <= 999; i++) {
    for (let j = 0; j <= 999; j++) {
      process.stdout.write(".");
      const url = `http://45.128.52.14:1224/payload/${String(i).padStart(
        2,
        "0"
      )}/${String(j).padStart(2, "0")}/`;
      const file = await fetch(url);
      const fileText = safeCode(await file.text());
      if (fileText.indexOf("no such file") === -1) {
        process.stdout.write("!");
        fs.writeFileSync(`payloads/pay${i}_${j}_py`, fileText);
      }
    }
  }
};

const main = async () => {
  console.log(await downloadPayloads());
};

main();
