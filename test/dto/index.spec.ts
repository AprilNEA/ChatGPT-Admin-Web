import { describe, expect, test } from 'vitest';

import { AuthDTO, ConfigSchema } from 'shared';

describe('[DTO] Auth', () => {
  test('normal email is safe for identity', () => {
    expect(AuthDTO.identitySchema.safeParse('example@gmail.com')).toBeSafe();
  });
  test('string is not safe for identity', () => {
    expect(AuthDTO.identitySchema.safeParse('example.com')).not.toBeSafe();
  });
  test('chinese phone is safe for identity', () => {
    expect(AuthDTO.identitySchema.safeParse('13800138000')).toBeSafe();
  });
  test('too short is safe for password', () => {
    expect(AuthDTO.passwordSchema.safeParse('123456')).not.toBeSafe();
  });
  test('6-digit is safe for validate code', () => {
    expect(AuthDTO.codeSchema.safeParse('123456')).toBeSafe();
  });
});

const DEFAULT_CONFIG = {
  mode: 'nginx',
  title: 'ChatGPT Admin Web',
  frontend: {
    port: '3000',
    url: 'https://localhost:3000',
  },
  backend: {
    port: '3001',
    url: 'http://localhost:3001',
  },
  postgres: {
    url: 'postgres://postgres:t@localhost:5433/postgres',
  },
  redis: {
    url: 'redis://localhost:6379/0',
    enable: false,
  },
  jwt: {
    algorithm: 'HS256',
    secret: 'ffffff',
  },
};

describe('Config', () => {
  test('default schema is safe', () => {
    expect(ConfigSchema.safeParse(DEFAULT_CONFIG)).toBeSafe();
  });
  test('string/number port is safe', () => {
    expect(
      ConfigSchema.safeParse({
        ...DEFAULT_CONFIG,
        frontend: {
          ...DEFAULT_CONFIG.frontend,
          port: '3000',
        },
        backend: {
          ...DEFAULT_CONFIG.backend,
          port: 3001,
        },
      }),
    ).toBeSafe();
  });
  test('compatible with older port representations', () => {
    expect(
      ConfigSchema.safeParse({
        ...DEFAULT_CONFIG,
        frontend: undefined,
        backend: undefined,
        port: {
          frontend: '3000',
          backend: 3001,
        },
      }),
    ).toBeSafe();
  });
});
