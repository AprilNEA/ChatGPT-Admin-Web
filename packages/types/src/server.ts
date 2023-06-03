export enum serverStatus {
  success,

  failed,
  authFailed,

  tooFast,

  invalidCode,
  wrongPassword,

  notExist,
  alreadyExisted,

  contentBlock,

  unknownError,
}
