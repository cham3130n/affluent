import { EnvVars, IConfig } from "./types";

require('dotenv').config({ path: '../.env' });

export default class Config implements IConfig {
  constructor(private overrideEnv: EnvVars = {}) {}

  get(name: string): string | undefined {
    return this.overrideEnv?.[name] || process.env[name];
  }
}