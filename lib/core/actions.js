const {promisify} = require ('util')
const download = promisify (require ('download-git-repo'));
const {vueRepo} = require ('../config/repo-config')
// 创建整个项目模版
const createProjectAction = async project => {
  // clone 克隆项目,download直接下载项目，使用 `async await` 讲同步变成异步
  await download (vueRepo);
  // 执行 npm install
  // 运行 npm run serve
  // 自动打开浏览器
}
module.exports = createProjectAction;