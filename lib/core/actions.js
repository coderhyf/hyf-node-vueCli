const { promisify } = require('util');
const path = require('path');

const download = promisify(require('download-git-repo'));
const open = require('open');

const { vueRepo } = require('../config/repo-config');
const { commandSpawn } = require('../utlis/terminal');
const { compile, writeToFile, createDirSync } = require('../utlis/utlis');
// callback -> promisify(函数) -> Promise -> async await
const createProjectAction = async (project) => {
  console.log("hyf helps you create your project~")
  // 1.clone项目
  await download(vueRepo, project, { clone: true });
  // 2.执行npm install
  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  await commandSpawn(command, ['install'], { cwd: `./${project}` })
  // 3.运行npm run serve
  commandSpawn(command, ['run', 'serve'], { cwd: `./${project}` });
  // 4.打开浏览器
  open("http://localhost:8080/");
}

// 添加组件的action
const addComponentAction = async (name, dest) => {
  // 1.编译ejs模板 result
  const result = await compile("vue-component.ejs", {name, lowerName: name.toLowerCase()});
  // 2.写入文件的操作
  const targetPath = path.resolve(dest, `${name}.vue`);
  console.log(targetPath);
  writeToFile(targetPath, result);
}
// 添加组件和路由
const addPageAndRouteAction = async (name, dest) => {
  // 1.编译ejs模板
  const data = {name, lowerName: name.toLowerCase()};
  const pageResult = await compile('vue-component.ejs', data);
  const routeResult = await compile('vue-router.ejs', data);
  // 3.写入文件
  const targetDest = path.resolve(dest, name.toLowerCase());
  if (createDirSync(targetDest)) {
    const targetPagePath = path.resolve(targetDest, `${name}.vue`);
    const targetRoutePath = path.resolve(targetDest, 'router.js')
    writeToFile(targetPagePath, pageResult);
    writeToFile(targetRoutePath, routeResult);
  }
}

const addStoreAction = async (name, dest) => {
  // 1.遍历的过程
  const storeResult = await compile('vue-store.ejs', {});
  const typesResult = await compile('vue-types.ejs', {});

  // 2.创建文件
  const targetDest = path.resolve(dest, name.toLowerCase());
  if (createDirSync(targetDest)) {
    const targetStorePath = path.resolve(targetDest, `${name}.js`);
    const targetTypesPath = path.resolve(targetDest, 'types.js')
    writeToFile(targetStorePath, storeResult);
    writeToFile(targetTypesPath, typesResult);
  }
}

module.exports = {
  createProjectAction,
  addComponentAction,
  addPageAndRouteAction,
  addStoreAction
}