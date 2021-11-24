import { ILogger } from "./types";

export default class Logger implements ILogger {
  log(...message: Array<any>): void {
    // eslint-disable-next-line no-console
    console.log(...message);
  }
}