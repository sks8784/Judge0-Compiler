const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log(__dirname);
// const outputPath = path.join(__dirname, "outputs");

// if (!fs.existsSync(outputPath)) {
//   fs.mkdirSync(outputPath, { recursive: true });
// }

const executeCpp = async (filepath,input) => {
  const jobId = path.basename(filepath).split(".")[0];

  return new Promise((resolve, reject) => {

    const child = exec(

      // `cd ${filepath}\\.. && g++ ${jobId}.cpp -o abc.exe && abc.exe`,
      // `cd ${filepath}\\.. && g++ ${jobId}.cpp -o abc.exe && (echo ${input}) | abc.exe`,
      `cd ${__dirname}\\codes && g++ ${jobId}.cpp -o abc.exe && (echo ${input}) | abc.exe`,
      (error, stdout, stderr,stdin) => {
        error && reject({ error, stderr });
        stderr && reject(stderr);
        stdin && reject(stdin);
        resolve(stdout);

      }
    );
  });
  
};

module.exports = {
  executeCpp,
};