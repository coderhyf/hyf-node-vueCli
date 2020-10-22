const program = require ('commander');
const {createProjectAction} = require ('./actions')
const createCommands = () => {
  program
      .command ('create <project> [others...]')
      // clone a repository into a folder 克隆到一个文件夹
      .description ('clone a repository into a folder')
      .action (createProjectAction);
}
module.exports = createCommands;