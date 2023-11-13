import * as fs from 'fs';
import { join } from 'path';

import { Injectable } from '@nestjs/common';

import { BizException } from '@/common/exceptions/biz.exception';

import { ConfigType, ISettingSchema } from 'shared';
import { ErrorCodeEnum } from 'shared/dist/error-code';

const DEFAULT_CONFIG = {
  mode: 'nginx',
  title: 'ChatGPT Admin Web',
  port: {
    frontend: 3000,
    backend: 3001,
  },
  jwt: {
    algorithm: 'HS256',
  },
};

const CONFIG_SCHEMA: ISettingSchema[] = [
  {
    key: 'mode',
    type: 'select',
    label: '运行模式',
    selectOptions: ['nginx', 'docker', 'debug'],
  },
  {
    key: 'title',
    type: 'input',
    label: '网站标题',
  },
  {
    key: 'port',
    label: '端口',
    items: [
      {
        key: 'frontend',
        type: 'input',
        label: '前端端口',
      },
      {
        key: 'backend',
        type: 'input',
        label: '后端端口',
      },
    ],
  },
];

@Injectable()
export class ConfigService {
  private config: ConfigType;
  private readonly defaultConfig = DEFAULT_CONFIG;
  private readonly configFilePath = join(__dirname, '../../../config.json');

  constructor() {
    this.loadConfig();
  }

  private loadConfig(): void {
    this.config = fs.existsSync(this.configFilePath)
      ? JSON.parse(fs.readFileSync(this.configFilePath, 'utf8'))
      : this.defaultConfig;
  }

  getInstallConfigItem() {
    if (fs.existsSync(this.configFilePath)) {
      throw new BizException(ErrorCodeEnum.ConfigExists);
    }
    return [];
  }

  get<K extends keyof ConfigType>(key: K): ConfigType[K] {
    return this.config[key];
  }

  getAll() {
    return this.config;
  }

  updateConfig(updateConfig: Partial<ConfigType>) {
    const newConfig = { ...this.config, ...updateConfig };
    const jsonData = JSON.stringify(newConfig, null, 2);
    fs.writeFileSync(this.configFilePath, jsonData, 'utf8');
    this.loadConfig();
  }
}
