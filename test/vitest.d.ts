interface CustomMatchers<R = unknown> {
  toBeFoo(): R;
}

declare module 'vitest' {
  interface Assertion<T = any> extends CustomMatchers<T> {}

  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
