import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import * as appRoot from 'app-root-path';

const YAML_CONFIG_FILENAME = `${appRoot}/config/config-${process.env.stage}.yaml`;

export default () => {
  return yaml.load(readFileSync(YAML_CONFIG_FILENAME, 'utf8')) as RootConfig;
};

export abstract class AppConfig {}

export interface RootConfig {
  appConfig: AppConfig;
}
