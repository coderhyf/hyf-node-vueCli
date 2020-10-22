const program = require ('commander');
const helpOptions = () => {
// 增加可选参数(指令), a hyf cli说明
  program.option ('-h --hyf', 'a hyf cli');
  program.option ('-f --framework <framework>', 'your framework');
  program.option ('-d --dest <dest>', 'a destination folder, 例如： -d /src/components');
// 监听变化
  program.on ('--help', function () {
    console.log ('');
    console.log ('Other:');
    console.log (' other options')
  })
};
module.exports = helpOptions;