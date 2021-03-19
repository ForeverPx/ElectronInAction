import fs from 'fs';

/**
 * @description 读取 文件 内容
 */
export function readFile(filePath: string) {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.log('读取文件失败', error);
    return false;
  }
}

/**
 * @description 文件是否可读
 * @param filePath 项目路径
 */
export function canReadFile(filePath: string) {
  return new Promise((resolve, reject) => {
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
}

/**
 * @description 判断 文件是否存在
 * @param {string} projectPath 项目地址
 */
export async function hasFile(projectPath: string) {
  try {
    return await canReadFile(projectPath);
  } catch (err) {
    return false;
  }
}
