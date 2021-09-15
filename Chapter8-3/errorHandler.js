const logger = require('./log');

let isInited = false;
let defaultOptions = {
  isAutoLogFile: true
};

function initHandler(newOptions, errorCallback) {
  defaultOptions = {
    ...defaultOptions,
    ...newOptions
  };
  console.log('isInited',isInited);
  if (!isInited) {
    isInited = true;
    if (process.type === "renderer") {
      window.addEventListener("error", (event) => {
        event.preventDefault();
        const errorMsg = event.error || event;
        defaultOptions.isAutoLogFile && logger.error(errorMsg);
        errorCallback && errorCallback("Unhandled Error", errorMsg);
      });
      window.addEventListener("unhandledrejection", (event) => {
        event.preventDefault();
        const errorMsg = event.reason;
        defaultOptions.isAutoLogFile && logger.error(errorMsg);
        errorCallback && errorCallback("Unhandled Promise Rejection", errorMsg);
      });
    } else {
      process.on("uncaughtException", (error) => {
        defaultOptions.isAutoLogFile && logger.error(error);
        errorCallback && errorCallback("Unhandled Error", error);
      });

      process.on("unhandledRejection", (error) => {
        defaultOptions.isAutoLogFile && logger.error(error);
        errorCallback && errorCallback("Unhandled Promise Rejection", error);
      });
    }
  }
}

module.exports = initHandler;
