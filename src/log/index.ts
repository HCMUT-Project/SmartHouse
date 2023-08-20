export class Logger {
  static info(logText: string) {
    if (__DEV__) {
      console.log(`info:::::${logText}`);
    }
  }
  static warn(logText: string) {
    if (__DEV__) {
      console.warn(`warn:::::${logText}`);
    }
  }
  static debug(logText: string) {
    if (__DEV__) {
      console.debug(`debug:::::${logText}`);
    }
  }
  static error(logText: string) {
    if (__DEV__) {
      console.error(`error:::::${logText}`);
    }
  }
}
