export interface SidebarItem {
  text: string;
  link: string;
  children: SidebarItem[];
}

/**
 * @description: 根据文件目录导出sidebar
 * @param {*}
 * @return {*}
 */
const fs = require("fs");
const { resolve } = require("path");

export function getSidebar(dirPath?: string): SidebarItem[] {
  let path = resolve(__dirname, dirPath ? dirPath : "../../article");

  let res = fs.readdirSync(path);

  if (res) {
    let arr: SidebarItem[] = res.map((item) => {
      if (String(item).endsWith(".md")) {
        return {
          text: item.split(".")[0],
          link: resolve(path, item),
        };
      } else {
        return {
          text: item.split(".")[0],
          children: getSidebar(resolve(path, item)),
        };
      }
    });
    arr.forEach((item: SidebarItem) => {
      if (item.link) {
        item.link = translateDir(item.link);
      }
    });
    return arr;
  }
}

/**
 * @description: 转换文件路径 为相对路径
 * @param {string} path
 * @return {*}
 */
function translateDir(path: string) {
  return path.replace(/\\/g, "/").split("docs")[1].split(".")[0] + ".html";
}
