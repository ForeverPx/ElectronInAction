module.exports = {
  /**
   * @ctx [object] 框架上下文对象{ config, ipc, store, windowCenter, plugins }
   * @params [object] 配置参数
   */
  install(ctx, params = {}) {
    return {
      log(text) {
        switch(params.level){
          case 0:
            console.log('INFO:',text);
            break;
          case 1:
            console.log('ERROR:',text);
            break;
          default:
            console.log('INFO:',text);
        }
      },
    };
  },
};
