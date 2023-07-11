const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const executeCpp = async (filepath,input) => {
  const jobId = path.basename(filepath).split(".")[0];

  return new Promise((resolve, reject) => {

    const child = exec(

      // `cd ${filepath}\\.. && g++ ${jobId}.cpp -o abc.exe && abc.exe`,
      `cd ${filepath}\\.. && g++ ${jobId}.cpp -o abc.exe && (echo ${input}) | abc.exe`,
      // `cd codes && g++ ${jobId}.cpp && (echo ${input}) | abc.exe`,
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