export enum serverStatus {
  success,

  failed,
  unknownError,

  /* Authentication */
  authFailed,
  invalidCode,
  wrongPassword,
  invalidToken,

  /* Rate Limit*/
  tooFast,
  tooMany,
  notEnoughChances,

  /* Content Safe */
  contentBlock,
  contentNotSafe,

  /* General */
  notExist,
  userNotExist,

  alreadyExisted,
  userAlreadyExisted,
}
