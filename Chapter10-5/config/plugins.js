const path = require("path");
exports.console = {
  // 如果根路径plugins目录有对应的插件名，则不需要配置path或package
  path: path.join(__dirname, "./plugins/log"), // 插件绝对路径
  package: "console", // 插件包名，如果package与path同时存在，则package优先级更高
  env: ["main"], 
  enable: true, // 是否启动插件
  include: ["winA"], // 插件使用范围，如果为空，则所有渲染进程安装
  params: { level: 0 }, // 传入插件参数
};
