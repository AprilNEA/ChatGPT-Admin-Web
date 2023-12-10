import { describe, expect, test } from 'vitest';

import { AuthDTO } from 'shared';

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
