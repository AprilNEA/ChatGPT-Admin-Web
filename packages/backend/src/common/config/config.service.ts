import * as fs from 'fs';
import { join } from 'path';

import { Injectable } from '@nestjs/common';

import { ConfigType, ISettingSchema } from 'shared';

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
        type: 'input' as any,
        label: '前端端口',
      },
      {
        key: 'backend',
        type: 'input' as any,
        label: '后端端口',
      },
    ],
  },
  {
    key: 'jwt',
    label: 'JWT',
    items: [
      {
        key: 'algorithm',
        type: 'select' as any,
        label: '算法',
        selectOptions: ['HS256', 'RS256'],
      },
      {
        key: 'secret',
        type: 'input' as any,
        label: '密钥',
      },
    ],
  },
  {
    key: 'email',
    label: '邮箱',
    items: [
      {
        key: 'use',
        type: 'select' as any,
        label: '启用',
        selectOptions: ['disable', 'resend'],
      },
    ],
  },
];

@Injectable()
export class ConfigService {
  private config: ConfigType;
  private readonly configFilePath = join(__dirname, '../../../config.json');

  constructor() {
    this.loadConfig();
  }

  private loadConfig(): void {
    if (fs.existsSync(this.configFilePath)) {
      this.config = JSON.parse(fs.readFileSync(this.configFilePath, 'utf8'));
    } else {
      console.error('配置文件缺失。\nConfiguration file is missing.');
    }
  }

  /* 获取配置文件结构 */
  getConfigSchema() {
    return CONFIG_SCHEMA;
  }

  get<K extends keyof ConfigType>(key: K): ConfigType[K] {
    return this.config[key];
  }

  getAll() {
    return this.config;
  }

  /* 更新配置文件 */
  updateConfig(updateConfig: Partial<ConfigType>) {
    const newConfig = { ...this.config, ...updateConfig };
    const jsonData = JSON.stringify(newConfig, null, 2);
    fs.writeFileSync(this.configFilePath, jsonData, 'utf8');
    this.loadConfig();
  }

  checkEmailEnable() {
    return (
      this.get('email') &&
      this.get('email').use &&
      this.get('email').use !== 'disable'
    );
  }

  checkSMSEnable() {
    return (
      this.get('sms') &&
      this.get('sms').use &&
      this.get('sms').use !== 'disable'
    );
  }

  checkNotifierEnable(all = false) {
    return all
      ? this.checkEmailEnable() && this.checkSMSEnable()
      : this.checkEmailEnable() || this.checkSMSEnable();
  }
}
