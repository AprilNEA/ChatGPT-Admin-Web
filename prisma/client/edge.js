
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
} = require('./runtime/edge')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.3.1
 * Query Engine version: 61e140623197a131c2a6189271ffee05a7aa9a59
 */
Prisma.prismaVersion = {
  client: "5.3.1",
  engine: "61e140623197a131c2a6189271ffee05a7aa9a59"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  role: 'role',
  name: 'name',
  email: 'email',
  phone: 'phone',
  password: 'password',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  isBlocked: 'isBlocked'
};

exports.Prisma.OAuthScalarFieldEnum = {
  id: 'id',
  provider: 'provider',
  providerId: 'providerId',
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
  expiredAt: 'expiredAt',
  data: 'data',
  userId: 'userId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ModelScalarFieldEnum = {
  id: 'id',
  name: 'name',
  price: 'price'
};

exports.Prisma.ProductScalarFieldEnum = {
  id: 'id',
  name: 'name',
  features: 'features',
  isHidden: 'isHidden',
  price: 'price',
  stock: 'stock',
  duration: 'duration',
  categoryId: 'categoryId'
};

exports.Prisma.ModelInProductScalarFieldEnum = {
  times: 'times',
  duration: 'duration',
  modelId: 'modelId',
  productId: 'productId'
};

exports.Prisma.CategoryScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.OrderScalarFieldEnum = {
  id: 'id',
  type: 'type',
  status: 'status',
  count: 'count',
  amount: 'amount',
  startAt: 'startAt',
  endAt: 'endAt',
  isCurrent: 'isCurrent',
  userId: 'userId',
  productId: 'productId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  rawData: 'rawData'
};

exports.Prisma.OpenAIKeyScalarFieldEnum = {
  key: 'key',
  weight: 'weight',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RateLimitScalarFieldEnum = {
  key: 'key',
  value: 'value'
};

exports.Prisma.ChatSessionScalarFieldEnum = {
  id: 'id',
  topic: 'topic',
  lastSummarizeIndex: 'lastSummarizeIndex',
  memoryPrompt: 'memoryPrompt',
  userId: 'userId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ChatMessageScalarFieldEnum = {
  id: 'id',
  role: 'role',
  content: 'content',
  deleted: 'deleted',
  chatSessionId: 'chatSessionId',
  modelId: 'modelId',
  userId: 'userId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ChatSettingScalarFieldEnum = {
  userId: 'userId',
  historyMessageCount: 'historyMessageCount',
  submitKey: 'submitKey',
  tightBorder: 'tightBorder',
  defalutModelId: 'defalutModelId',
  temperature: 'temperature',
  maxTokens: 'maxTokens',
  presencePenalty: 'presencePenalty'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.Role = exports.$Enums.Role = {
  Admin: 'Admin',
  User: 'User'
};

exports.OAuthProvider = exports.$Enums.OAuthProvider = {
  Github: 'Github',
  Wechat: 'Wechat'
};

exports.OrderType = exports.$Enums.OrderType = {
  Subscription: 'Subscription',
  OneTime: 'OneTime'
};

exports.OrderStatus = exports.$Enums.OrderStatus = {
  Pending: 'Pending',
  Paid: 'Paid',
  Failed: 'Failed',
  Refunded: 'Refunded'
};

exports.ChatMessageRole = exports.$Enums.ChatMessageRole = {
  System: 'System',
  User: 'User',
  Assistant: 'Assistant'
};

exports.Prisma.ModelName = {
  User: 'User',
  OAuth: 'OAuth',
  Model: 'Model',
  Product: 'Product',
  ModelInProduct: 'ModelInProduct',
  Category: 'Category',
  Order: 'Order',
  OpenAIKey: 'OpenAIKey',
  RateLimit: 'RateLimit',
  ChatSession: 'ChatSession',
  ChatMessage: 'ChatMessage',
  ChatSetting: 'ChatSetting'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "D:\\Workspace\\ChatGPT-Admin-Web\\prisma\\client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "windows",
        "native": true
      }
    ],
    "previewFeatures": [],
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null
  },
  "relativePath": "..",
  "clientVersion": "5.3.1",
  "engineVersion": "61e140623197a131c2a6189271ffee05a7aa9a59",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": true,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "Z2VuZXJhdG9yIGNsaWVudCB7DQogIHByb3ZpZGVyID0gInByaXNtYS1jbGllbnQtanMiDQogIG91dHB1dCAgID0gIi4vY2xpZW50Ig0KfQ0KDQpkYXRhc291cmNlIGRiIHsNCiAgcHJvdmlkZXIgPSAicG9zdGdyZXNxbCINCiAgdXJsICAgICAgPSBlbnYoIkRBVEFCQVNFX1VSTCIpDQp9DQoNCi8vID09PT09PT0NCi8vIO+9nFVzZXLvvZwNCi8vID09PT09PT0NCg0KZW51bSBSb2xlIHsNCiAgQWRtaW4NCiAgVXNlcg0KfQ0KDQptb2RlbCBVc2VyIHsNCiAgaWQgICAgICAgSW50ICAgICBAaWQgQGRlZmF1bHQoYXV0b2luY3JlbWVudCgpKQ0KICByb2xlICAgICBSb2xlICAgIEBkZWZhdWx0KFVzZXIpDQogIG5hbWUgICAgIFN0cmluZz8gQHVuaXF1ZSAvLyDnlKjmiLflkI0NCiAgZW1haWwgICAgU3RyaW5nPyBAdW5pcXVlIC8vIOmCrueusQ0KICBwaG9uZSAgICBTdHJpbmc/IEB1bmlxdWUgLy8g5omL5py6ICs4Ng0KICBwYXNzd29yZCBTdHJpbmc/IEBkYi5UZXh0IC8vIOWvhueggQ0KDQogIC8vIHJlbGF0aW9uDQogIG9hdXRocyAgICAgICBPQXV0aFtdDQogIG9yZGVycyAgICAgICBPcmRlcltdDQogIGNoYXRTZXNzaW9ucyBDaGF0U2Vzc2lvbltdDQogIGNoYXRNZXNzYWdlcyBDaGF0TWVzc2FnZVtdDQoNCiAgY3JlYXRlZEF0IERhdGVUaW1lIEBkZWZhdWx0KG5vdygpKSBAZGIuVGltZXN0YW1wKDYpIC8vIOazqOWGjOaXtumXtA0KICB1cGRhdGVkQXQgRGF0ZVRpbWUgQGRlZmF1bHQobm93KCkpIEB1cGRhdGVkQXQNCiAgaXNCbG9ja2VkIEJvb2xlYW4gIEBkZWZhdWx0KGZhbHNlKSAvLyDmmK/lkKbooqvlsIHnpoENCn0NCg0KZW51bSBPQXV0aFByb3ZpZGVyIHsNCiAgR2l0aHViDQogIFdlY2hhdA0KfQ0KDQptb2RlbCBPQXV0aCB7DQogIGlkICAgICAgICAgICBJbnQgICAgICAgICAgIEBpZCBAZGVmYXVsdChhdXRvaW5jcmVtZW50KCkpDQogIHByb3ZpZGVyICAgICBPQXV0aFByb3ZpZGVyDQogIHByb3ZpZGVySWQgICBTdHJpbmcNCiAgYWNjZXNzVG9rZW4gIFN0cmluZw0KICByZWZyZXNoVG9rZW4gU3RyaW5nDQogIGV4cGlyZWRBdCAgICBEYXRlVGltZQ0KDQogIGRhdGEgSnNvbj8gLy8g6Ieq5a6a5LmJ5pWw5o2uDQoNCiAgLy8gcmVsYXRpb24NCiAgdXNlciAgIFVzZXIgQHJlbGF0aW9uKGZpZWxkczogW3VzZXJJZF0sIHJlZmVyZW5jZXM6IFtpZF0pDQogIHVzZXJJZCBJbnQNCg0KICAvLyBtZXRhZGF0YQ0KICBjcmVhdGVkQXQgRGF0ZVRpbWUgQGRlZmF1bHQobm93KCkpIEBkYi5UaW1lc3RhbXAoNikgLy8g5rOo5YaM5pe26Ze0DQogIHVwZGF0ZWRBdCBEYXRlVGltZSBAZGVmYXVsdChub3coKSkgQHVwZGF0ZWRBdA0KDQogIEBAdW5pcXVlKFtwcm92aWRlciwgcHJvdmlkZXJJZF0pDQp9DQoNCi8vID09PT09PT09PT0NCi8vIO+9nFByb2R1Y3TvvZwNCi8vID09PT09PT09PT0NCm1vZGVsIE1vZGVsIHsNCiAgaWQgICBJbnQgICAgQGlkIEBkZWZhdWx0KGF1dG9pbmNyZW1lbnQoKSkNCiAgbmFtZSBTdHJpbmcgQHVuaXF1ZQ0KDQogIHByaWNlIEludCAvLyDljZXkvY3kuLrliIYNCg0KICAvLyByZWxhdGlvbg0KICBwcm9kdWN0cyBNb2RlbEluUHJvZHVjdFtdDQogIG1lc3NhZ2VzIENoYXRNZXNzYWdlW10NCg0KICBAQHVuaXF1ZShbaWQsIG5hbWVdKQ0KfQ0KDQptb2RlbCBQcm9kdWN0IHsNCiAgaWQgICAgICAgSW50ICAgICAgQGlkIEBkZWZhdWx0KGF1dG9pbmNyZW1lbnQoKSkNCiAgbmFtZSAgICAgU3RyaW5nICAgQHVuaXF1ZQ0KICBmZWF0dXJlcyBTdHJpbmdbXQ0KDQogIGlzSGlkZGVuIEJvb2xlYW4gQGRlZmF1bHQoZmFsc2UpIC8vIOaYr+WQpumakOiXjw0KDQogIHByaWNlICAgIEludCAvLyDljZXkvY3kuLrliIYNCiAgc3RvY2sgICAgSW50IEBkZWZhdWx0KC0xKSAvLyDlupPlrZgNCiAgZHVyYXRpb24gSW50IC8vIOS6p+WTgeeahOaMgee7reaXtumXtA0KDQogIG1vZGVscyBNb2RlbEluUHJvZHVjdFtdDQoNCiAgLy8gcmVsYXRpb24NCiAgb3JkZXIgICAgICBPcmRlcltdDQogIGNhdGVnb3J5ICAgQ2F0ZWdvcnk/IEByZWxhdGlvbihmaWVsZHM6IFtjYXRlZ29yeUlkXSwgcmVmZXJlbmNlczogW2lkXSkNCiAgY2F0ZWdvcnlJZCBJbnQ/DQp9DQoNCm1vZGVsIE1vZGVsSW5Qcm9kdWN0IHsNCiAgLy8g5ZyoZHVyYXRpb27ml7bpl7TlhoXpmZDliLbkvb/nlKh0aW1lc+asoQ0KICB0aW1lcyAgICBJbnQgLy8g6ZmQ5Yi25qyh5pWwDQogIGR1cmF0aW9uIEludCAvLyDljZXkvY3kuLrnp5LvvIzpmZDliLbmjIHnu63ml7bpl7Qg6Iul5Li6IDAg5YiZ5LiN6ZmQ5Yi2IOWmguavj+S4ieWwj+aXtuWwj+aXtg0KDQogIC8vIOWvueW6lOeahCBNb2RlbA0KICBtb2RlbCAgIE1vZGVsIEByZWxhdGlvbihmaWVsZHM6IFttb2RlbElkXSwgcmVmZXJlbmNlczogW2lkXSkNCiAgbW9kZWxJZCBJbnQNCg0KICAvLyDlr7nlupTnmoQgUHJvZHVjdA0KICBwcm9kdWN0ICAgUHJvZHVjdCBAcmVsYXRpb24oZmllbGRzOiBbcHJvZHVjdElkXSwgcmVmZXJlbmNlczogW2lkXSkNCiAgcHJvZHVjdElkIEludA0KDQogIEBAaWQoW21vZGVsSWQsIHByb2R1Y3RJZF0pDQp9DQoNCi8vIOS6p+WTgeWIhuexuw0KbW9kZWwgQ2F0ZWdvcnkgew0KICBpZCAgIEludCAgICBAaWQgQGRlZmF1bHQoYXV0b2luY3JlbWVudCgpKQ0KICBuYW1lIFN0cmluZyBAdW5pcXVlDQoNCiAgcHJvZHVjdHMgUHJvZHVjdFtdDQp9DQoNCmVudW0gT3JkZXJTdGF0dXMgew0KICBQZW5kaW5nIC8vIOW+heaUr+S7mA0KICBQYWlkIC8vIOW3suaUr+S7mA0KICBGYWlsZWQgLy8g5pSv5LuY5aSx6LSlDQogIFJlZnVuZGVkIC8vIOW3sumAgOasvg0KfQ0KDQplbnVtIE9yZGVyVHlwZSB7DQogIFN1YnNjcmlwdGlvbiAvLyDorqLpmIUNCiAgT25lVGltZSAvLyDkuIDmrKHmgKcNCn0NCg0KLy8g6K6i5Y2VDQptb2RlbCBPcmRlciB7DQogIGlkICAgICBTdHJpbmcgICAgICBAaWQgQHVuaXF1ZQ0KICB0eXBlICAgT3JkZXJUeXBlDQogIHN0YXR1cyBPcmRlclN0YXR1cyBAZGVmYXVsdChQZW5kaW5nKQ0KDQogIGNvdW50ICBJbnQgQGRlZmF1bHQoMSkgLy8g5pWw6YePDQogIGFtb3VudCBJbnQgLy8g6K6i5Y2V6YeR6aKd77yM5Y2V5L2N5Li65YiGDQoNCiAgc3RhcnRBdCBEYXRlVGltZT8NCiAgZW5kQXQgICBEYXRlVGltZT8NCg0KICBpc0N1cnJlbnQgQm9vbGVhbiBAZGVmYXVsdChmYWxzZSkgLy8g5piv5ZCm5Li65b2T5YmN6K6i5Y2VDQoNCiAgLy8gcmVsYXRpb24NCg0KICB1c2VyICAgVXNlciBAcmVsYXRpb24oZmllbGRzOiBbdXNlcklkXSwgcmVmZXJlbmNlczogW2lkXSkNCiAgdXNlcklkIEludA0KDQogIHByb2R1Y3QgICBQcm9kdWN0IEByZWxhdGlvbihmaWVsZHM6IFtwcm9kdWN0SWRdLCByZWZlcmVuY2VzOiBbaWRdKQ0KICBwcm9kdWN0SWQgSW50DQoNCiAgLy8gbWV0YWRhdGENCiAgY3JlYXRlZEF0IERhdGVUaW1lIEBkZWZhdWx0KG5vdygpKQ0KICB1cGRhdGVkQXQgRGF0ZVRpbWUgQGRlZmF1bHQobm93KCkpIEB1cGRhdGVkQXQNCg0KICByYXdEYXRhIEpzb24/IC8vIOaUr+S7mOeahOWOn+Wni+aVsOaNrg0KfQ0KDQovLyA9PT09PT09PT09PT09DQovLyDvvZxPcGVuQUkgQVBJ772cDQovLyA9PT09PT09PT09PT09DQptb2RlbCBPcGVuQUlLZXkgew0KICBrZXkgICAgU3RyaW5nIEBpZA0KICB3ZWlnaHQgSW50ICAgIEBkZWZhdWx0KDEpDQoNCiAgLy8gbWV0YWRhdGENCiAgY3JlYXRlZEF0IERhdGVUaW1lIEBkZWZhdWx0KG5vdygpKQ0KICB1cGRhdGVkQXQgRGF0ZVRpbWUgQGRlZmF1bHQobm93KCkpIEB1cGRhdGVkQXQNCn0NCg0KbW9kZWwgUmF0ZUxpbWl0IHsNCiAga2V5ICAgU3RyaW5nIEBpZA0KICB2YWx1ZSBJbnRbXQ0KfQ0KDQovLyA9PT09PT09PT09PT09PT0NCi8vIO+9nENoYXQgTWVzc2FnZe+9nA0KLy8gPT09PT09PT09PT09PT09DQoNCm1vZGVsIENoYXRTZXNzaW9uIHsNCiAgaWQgU3RyaW5nIEBpZCBAZGVmYXVsdCh1dWlkKCkpDQoNCiAgdG9waWMgICAgICAgICAgICAgIFN0cmluZz8NCiAgbGFzdFN1bW1hcml6ZUluZGV4IEludD8NCg0KICBtZW1vcnlQcm9tcHQgU3RyaW5nPw0KICBtZXNzYWdlcyAgICAgQ2hhdE1lc3NhZ2VbXQ0KDQogIC8vIHJlbGF0aW9uDQogIHVzZXIgICBVc2VyIEByZWxhdGlvbihmaWVsZHM6IFt1c2VySWRdLCByZWZlcmVuY2VzOiBbaWRdKQ0KICB1c2VySWQgSW50DQoNCiAgLy8gbWV0YWRhdGENCiAgY3JlYXRlZEF0IERhdGVUaW1lIEBkZWZhdWx0KG5vdygpKQ0KICB1cGRhdGVkQXQgRGF0ZVRpbWUgQGRlZmF1bHQobm93KCkpIEB1cGRhdGVkQXQNCn0NCg0KZW51bSBDaGF0TWVzc2FnZVJvbGUgew0KICBTeXN0ZW0NCiAgVXNlcg0KICBBc3Npc3RhbnQNCn0NCg0KbW9kZWwgQ2hhdE1lc3NhZ2Ugew0KICBpZCBTdHJpbmcgQGlkIEBkZWZhdWx0KHV1aWQoKSkNCg0KICByb2xlICAgIENoYXRNZXNzYWdlUm9sZQ0KICBjb250ZW50IFN0cmluZw0KDQogIGRlbGV0ZWQgQm9vbGVhbiBAZGVmYXVsdChmYWxzZSkNCg0KICAvLyByZWxhdGlvbg0KICBjaGF0U2Vzc2lvbiAgIENoYXRTZXNzaW9uPyBAcmVsYXRpb24oZmllbGRzOiBbY2hhdFNlc3Npb25JZF0sIHJlZmVyZW5jZXM6IFtpZF0pDQogIGNoYXRTZXNzaW9uSWQgU3RyaW5nPw0KDQogIG1vZGVsICAgTW9kZWw/IEByZWxhdGlvbihmaWVsZHM6IFttb2RlbElkXSwgcmVmZXJlbmNlczogW2lkXSkNCiAgbW9kZWxJZCBJbnQ/DQoNCiAgdXNlciAgIFVzZXIgQHJlbGF0aW9uKGZpZWxkczogW3VzZXJJZF0sIHJlZmVyZW5jZXM6IFtpZF0pDQogIHVzZXJJZCBJbnQNCg0KICAvLyBtZXRhZGF0YQ0KICBjcmVhdGVkQXQgRGF0ZVRpbWUgQGRlZmF1bHQobm93KCkpDQogIHVwZGF0ZWRBdCBEYXRlVGltZSBAZGVmYXVsdChub3coKSkgQHVwZGF0ZWRBdA0KfQ0KDQovLyDnlKjmiLforr7nva4NCm1vZGVsIENoYXRTZXR0aW5nIHsNCiAgdXNlcklkICAgICAgICAgICAgICBJbnQgIEBpZA0KICBoaXN0b3J5TWVzc2FnZUNvdW50IEludD8NCg0KICBzdWJtaXRLZXkgICBTdHJpbmc/IC8vIOaPkOS6pOmUrg0KICB0aWdodEJvcmRlciBCb29sZWFuIEBkZWZhdWx0KGZhbHNlKSAvLyDntKflh5HmqKHlvI8NCg0KICBkZWZhbHV0TW9kZWxJZCAgSW50Pw0KICB0ZW1wZXJhdHVyZSAgICAgRmxvYXQ/DQogIG1heFRva2VucyAgICAgICBJbnQ/DQogIHByZXNlbmNlUGVuYWx0eSBGbG9hdD8NCn0NCg==",
  "inlineSchemaHash": "983f44d557f140081037234c4b37088810415863f27ebf9d5e3e8ff96ac957a4",
  "noEngine": false
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"role\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Role\",\"default\":\"User\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"phone\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"password\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"oauths\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"OAuth\",\"relationName\":\"OAuthToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"orders\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Order\",\"relationName\":\"OrderToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"chatSessions\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ChatSession\",\"relationName\":\"ChatSessionToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"chatMessages\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ChatMessage\",\"relationName\":\"ChatMessageToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"isBlocked\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"OAuth\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"provider\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"OAuthProvider\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"providerId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"accessToken\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"refreshToken\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"expiredAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"data\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"OAuthToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[[\"provider\",\"providerId\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"provider\",\"providerId\"]}],\"isGenerated\":false},\"Model\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"price\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"products\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ModelInProduct\",\"relationName\":\"ModelToModelInProduct\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"messages\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ChatMessage\",\"relationName\":\"ChatMessageToModel\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"id\",\"name\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"id\",\"name\"]}],\"isGenerated\":false},\"Product\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"features\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isHidden\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"price\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"stock\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":-1,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"duration\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"models\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ModelInProduct\",\"relationName\":\"ModelInProductToProduct\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"order\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Order\",\"relationName\":\"OrderToProduct\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"category\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Category\",\"relationName\":\"CategoryToProduct\",\"relationFromFields\":[\"categoryId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"categoryId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ModelInProduct\":{\"dbName\":null,\"fields\":[{\"name\":\"times\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"duration\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"model\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Model\",\"relationName\":\"ModelToModelInProduct\",\"relationFromFields\":[\"modelId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"modelId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"product\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Product\",\"relationName\":\"ModelInProductToProduct\",\"relationFromFields\":[\"productId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"productId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"modelId\",\"productId\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Category\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"products\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Product\",\"relationName\":\"CategoryToProduct\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Order\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"OrderType\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"OrderStatus\",\"default\":\"Pending\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"count\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":1,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"amount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"startAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"endAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isCurrent\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"OrderToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"product\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Product\",\"relationName\":\"OrderToProduct\",\"relationFromFields\":[\"productId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"productId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"rawData\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"OpenAIKey\":{\"dbName\":null,\"fields\":[{\"name\":\"key\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"weight\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":1,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"RateLimit\":{\"dbName\":null,\"fields\":[{\"name\":\"key\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"value\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ChatSession\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"topic\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastSummarizeIndex\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"memoryPrompt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"messages\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ChatMessage\",\"relationName\":\"ChatMessageToChatSession\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"ChatSessionToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ChatMessage\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"role\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ChatMessageRole\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"deleted\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"chatSession\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ChatSession\",\"relationName\":\"ChatMessageToChatSession\",\"relationFromFields\":[\"chatSessionId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"chatSessionId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"model\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Model\",\"relationName\":\"ChatMessageToModel\",\"relationFromFields\":[\"modelId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"modelId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"ChatMessageToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ChatSetting\":{\"dbName\":null,\"fields\":[{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"historyMessageCount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"submitKey\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tightBorder\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"defalutModelId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"temperature\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"maxTokens\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"presencePenalty\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{\"Role\":{\"values\":[{\"name\":\"Admin\",\"dbName\":null},{\"name\":\"User\",\"dbName\":null}],\"dbName\":null},\"OAuthProvider\":{\"values\":[{\"name\":\"Github\",\"dbName\":null},{\"name\":\"Wechat\",\"dbName\":null}],\"dbName\":null},\"OrderStatus\":{\"values\":[{\"name\":\"Pending\",\"dbName\":null},{\"name\":\"Paid\",\"dbName\":null},{\"name\":\"Failed\",\"dbName\":null},{\"name\":\"Refunded\",\"dbName\":null}],\"dbName\":null},\"OrderType\":{\"values\":[{\"name\":\"Subscription\",\"dbName\":null},{\"name\":\"OneTime\",\"dbName\":null}],\"dbName\":null},\"ChatMessageRole\":{\"values\":[{\"name\":\"System\",\"dbName\":null},{\"name\":\"User\",\"dbName\":null},{\"name\":\"Assistant\",\"dbName\":null}],\"dbName\":null}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)


config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

