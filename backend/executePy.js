const { exec } = require("child_process");
const path = require("path");

const executePy = (filepath,input) => {
  // console.log("hello");
  const jobId = path.basename(filepath);
  // console.log(filepath);
  
  return new Promise((resolve, reject) => {
    exec(
      // `py ${filepath} -o abc.exe && abc.exe`,
      `cd ${filepath}\\.. && (echo ${input}) | python ${jobId}`,
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
  executePy,
};