/**
 * 执行终端命令相关的代码
 */
const { spawn } = require('child_process');
// 执行子进程
const commandSpawn = (...args) => {
  // 进程中会有很多执行命令的打印信息，类似于用脚手架创建项目，下面显示的信息
  return new Promise((resolve, reject) => {
    const childProcess = spawn(...args);
    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);
    childProcess.on("close", () => {
      resolve();
    })
  })
}
module.exports = {
  commandSpawn
}