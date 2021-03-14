import { readFile } from './index';
import fs from 'fs';

/**
 * @description 读取 json格式的文件 内容
 * @param filePath
 */
export function readData(filePath: string) {
  try {
    let fileContent = readFile(filePath);
    if (typeof fileContent === 'string') {
      return JSON.parse(fileContent as string)
    } else {
      return fileContent;
    }
  } catch (error) {
    console.log('解析json文件失败', error);
  }
}

/**
 * @description 更新 json 文件内容
 * @param filePath
 * @param updateContent
 */
export function updateData(filePath: string, updateContent: any) {
  try{
    fs.writeFileSync(filePath, JSON.stringify(updateContent));
  }catch(error){
    console.log('写入json文件失败', error)
  }
}