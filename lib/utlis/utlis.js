const ejs = require ('ejs');
const fs = require ('fs');
const path = require ('path');
// 模版
const compile = (templateName, data) => {
  const templatePosition = `../templates/${templateName}`;
  const templatePath = path.resolve (__dirname, templatePosition);
  return new Promise ((resolve, reject) => {
    ejs.renderFile (templatePath, {data}, {}, (err, result) => {
      if (err) {
        reject (err);
        return;
      }
      resolve (result);
    });
  })
}
// 递归创建文件夹
const createDirSync = (pathName) => {
  if (fs.existsSync(pathName)) {
    return true;
  } else {
    if (createDirSync(path.dirname(pathName))) {
      fs.mkdirSync(pathName);
      return true;
    }
  }
}

const writeToFile = (path, content) => {
  // 判断path是否存在, 如果不存在, 创建对应的文件夹
  return fs.promises.writeFile(path, content);
}
module.exports = {
  compile,
  writeToFile,
  createDirSync
};