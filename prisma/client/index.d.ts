
/**
 * Client
**/

import * as runtime from './runtime/library';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model OAuth
 * 
 */
export type OAuth = $Result.DefaultSelection<Prisma.$OAuthPayload>
/**
 * Model Model
 * 
 */
export type Model = $Result.DefaultSelection<Prisma.$ModelPayload>
/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model ModelInProduct
 * 
 */
export type ModelInProduct = $Result.DefaultSelection<Prisma.$ModelInProductPayload>
/**
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model Order
 * 
 */
export type Order = $Result.DefaultSelection<Prisma.$OrderPayload>
/**
 * Model OpenAIKey
 * 
 */
export type OpenAIKey = $Result.DefaultSelection<Prisma.$OpenAIKeyPayload>
/**
 * Model RateLimit
 * 
 */
export type RateLimit = $Result.DefaultSelection<Prisma.$RateLimitPayload>
/**
 * Model ChatSession
 * 
 */
export type ChatSession = $Result.DefaultSelection<Prisma.$ChatSessionPayload>
/**
 * Model ChatMessage
 * 
 */
export type ChatMessage = $Result.DefaultSelection<Prisma.$ChatMessagePayload>
/**
 * Model ChatSetting
 * 
 */
export type ChatSetting = $Result.DefaultSelection<Prisma.$ChatSettingPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  Admin: 'Admin',
  Mod: 'Mod',
  Sell: 'Sell',
  User: 'User'
};

export type Role = (typeof Role)[keyof typeof Role]


export const OAuthProvider: {
  Google: 'Google',
  Github: 'Github',
  Wechat: 'Wechat'
};

export type OAuthProvider = (typeof OAuthProvider)[keyof typeof OAuthProvider]


export const OrderType: {
  Subscription: 'Subscription',
  OneTime: 'OneTime'
};

export type OrderType = (typeof OrderType)[keyof typeof OrderType]


export const OrderStatus: {
  Pending: 'Pending',
  Paid: 'Paid',
  Failed: 'Failed',
  Refunded: 'Refunded'
};

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus]


export const ChatMessageRole: {
  System: 'System',
  User: 'User',
  Assistant: 'Assistant'
};

export type ChatMessageRole = (typeof ChatMessageRole)[keyof typeof ChatMessageRole]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type OAuthProvider = $Enums.OAuthProvider

export const OAuthProvider: typeof $Enums.OAuthProvider

export type OrderType = $Enums.OrderType

export const OrderType: typeof $Enums.OrderType

export type OrderStatus = $Enums.OrderStatus

export const OrderStatus: typeof $Enums.OrderStatus

export type ChatMessageRole = $Enums.ChatMessageRole

export const ChatMessageRole: typeof $Enums.ChatMessageRole

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.oAuth`: Exposes CRUD operations for the **OAuth** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OAuths
    * const oAuths = await prisma.oAuth.findMany()
    * ```
    */
  get oAuth(): Prisma.OAuthDelegate<ExtArgs>;

  /**
   * `prisma.model`: Exposes CRUD operations for the **Model** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Models
    * const models = await prisma.model.findMany()
    * ```
    */
  get model(): Prisma.ModelDelegate<ExtArgs>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs>;

  /**
   * `prisma.modelInProduct`: Exposes CRUD operations for the **ModelInProduct** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ModelInProducts
    * const modelInProducts = await prisma.modelInProduct.findMany()
    * ```
    */
  get modelInProduct(): Prisma.ModelInProductDelegate<ExtArgs>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs>;

  /**
   * `prisma.order`: Exposes CRUD operations for the **Order** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Orders
    * const orders = await prisma.order.findMany()
    * ```
    */
  get order(): Prisma.OrderDelegate<ExtArgs>;

  /**
   * `prisma.openAIKey`: Exposes CRUD operations for the **OpenAIKey** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OpenAIKeys
    * const openAIKeys = await prisma.openAIKey.findMany()
    * ```
    */
  get openAIKey(): Prisma.OpenAIKeyDelegate<ExtArgs>;

  /**
   * `prisma.rateLimit`: Exposes CRUD operations for the **RateLimit** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RateLimits
    * const rateLimits = await prisma.rateLimit.findMany()
    * ```
    */
  get rateLimit(): Prisma.RateLimitDelegate<ExtArgs>;

  /**
   * `prisma.chatSession`: Exposes CRUD operations for the **ChatSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ChatSessions
    * const chatSessions = await prisma.chatSession.findMany()
    * ```
    */
  get chatSession(): Prisma.ChatSessionDelegate<ExtArgs>;

  /**
   * `prisma.chatMessage`: Exposes CRUD operations for the **ChatMessage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ChatMessages
    * const chatMessages = await prisma.chatMessage.findMany()
    * ```
    */
  get chatMessage(): Prisma.ChatMessageDelegate<ExtArgs>;

  /**
   * `prisma.chatSetting`: Exposes CRUD operations for the **ChatSetting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ChatSettings
    * const chatSettings = await prisma.chatSetting.findMany()
    * ```
    */
  get chatSetting(): Prisma.ChatSettingDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.3.1
   * Query Engine version: 61e140623197a131c2a6189271ffee05a7aa9a59
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray | { toJSON(): unknown }

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
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

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }


  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.Args}, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs']>
  }

  export type TypeMap<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    meta: {
      modelProps: 'user' | 'oAuth' | 'model' | 'product' | 'modelInProduct' | 'category' | 'order' | 'openAIKey' | 'rateLimit' | 'chatSession' | 'chatMessage' | 'chatSetting'
      txIsolationLevel: Prisma.TransactionIsolationLevel
    },
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>,
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>,
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      OAuth: {
        payload: Prisma.$OAuthPayload<ExtArgs>
        fields: Prisma.OAuthFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OAuthFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OAuthPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OAuthFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OAuthPayload>
          }
          findFirst: {
            args: Prisma.OAuthFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OAuthPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OAuthFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OAuthPayload>
          }
          findMany: {
            args: Prisma.OAuthFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OAuthPayload>[]
          }
          create: {
            args: Prisma.OAuthCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OAuthPayload>
          }
          createMany: {
            args: Prisma.OAuthCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.OAuthDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OAuthPayload>
          }
          update: {
            args: Prisma.OAuthUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OAuthPayload>
          }
          deleteMany: {
            args: Prisma.OAuthDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.OAuthUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.OAuthUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OAuthPayload>
          }
          aggregate: {
            args: Prisma.OAuthAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateOAuth>
          }
          groupBy: {
            args: Prisma.OAuthGroupByArgs<ExtArgs>,
            result: $Utils.Optional<OAuthGroupByOutputType>[]
          }
          count: {
            args: Prisma.OAuthCountArgs<ExtArgs>,
            result: $Utils.Optional<OAuthCountAggregateOutputType> | number
          }
        }
      }
      Model: {
        payload: Prisma.$ModelPayload<ExtArgs>
        fields: Prisma.ModelFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ModelFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ModelPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ModelFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ModelPayload>
          }
          findFirst: {
            args: Prisma.ModelFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ModelPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ModelFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ModelPayload>
          }
          findMany: {
            args: Prisma.ModelFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ModelPayload>[]
          }
          create: {
            args: Prisma.ModelCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ModelPayload>
          }
          createMany: {
            args: Prisma.ModelCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.ModelDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ModelPayload>
          }
          update: {
            args: Prisma.ModelUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ModelPayload>
          }
          deleteMany: {
            args: Prisma.ModelDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ModelUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ModelUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ModelPayload>
          }
          aggregate: {
            args: Prisma.ModelAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateModel>
          }
          groupBy: {
            args: Prisma.ModelGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ModelGroupByOutputType>[]
          }
          count: {
            args: Prisma.ModelCountArgs<ExtArgs>,
            result: $Utils.Optional<ModelCountAggregateOutputType> | number
          }
        }
      }
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>,
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      ModelInProduct: {
        payload: Prisma.$ModelInProductPayload<ExtArgs>
        fields: Prisma.ModelInProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ModelInProductFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ModelInProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ModelInProductFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ModelInProductPayload>
          }
          findFirst: {
            args: Prisma.ModelInProductFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ModelInProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ModelInProductFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ModelInProductPayload>
          }
          findMany: {
            args: Prisma.ModelInProductFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ModelInProductPayload>[]
          }
          create: {
            args: Prisma.ModelInProductCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ModelInProductPayload>
          }
          createMany: {
            args: Prisma.ModelInProductCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.ModelInProductDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ModelInProductPayload>
          }
          update: {
            args: Prisma.ModelInProductUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ModelInProductPayload>
          }
          deleteMany: {
            args: Prisma.ModelInProductDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ModelInProductUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ModelInProductUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ModelInProductPayload>
          }
          aggregate: {
            args: Prisma.ModelInProductAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateModelInProduct>
          }
          groupBy: {
            args: Prisma.ModelInProductGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ModelInProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ModelInProductCountArgs<ExtArgs>,
            result: $Utils.Optional<ModelInProductCountAggregateOutputType> | number
          }
        }
      }
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>,
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>,
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      Order: {
        payload: Prisma.$OrderPayload<ExtArgs>
        fields: Prisma.OrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findFirst: {
            args: Prisma.OrderFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findMany: {
            args: Prisma.OrderFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          create: {
            args: Prisma.OrderCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          createMany: {
            args: Prisma.OrderCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.OrderDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          update: {
            args: Prisma.OrderUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          deleteMany: {
            args: Prisma.OrderDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.OrderUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.OrderUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          aggregate: {
            args: Prisma.OrderAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateOrder>
          }
          groupBy: {
            args: Prisma.OrderGroupByArgs<ExtArgs>,
            result: $Utils.Optional<OrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderCountArgs<ExtArgs>,
            result: $Utils.Optional<OrderCountAggregateOutputType> | number
          }
        }
      }
      OpenAIKey: {
        payload: Prisma.$OpenAIKeyPayload<ExtArgs>
        fields: Prisma.OpenAIKeyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OpenAIKeyFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OpenAIKeyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OpenAIKeyFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OpenAIKeyPayload>
          }
          findFirst: {
            args: Prisma.OpenAIKeyFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OpenAIKeyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OpenAIKeyFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OpenAIKeyPayload>
          }
          findMany: {
            args: Prisma.OpenAIKeyFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OpenAIKeyPayload>[]
          }
          create: {
            args: Prisma.OpenAIKeyCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OpenAIKeyPayload>
          }
          createMany: {
            args: Prisma.OpenAIKeyCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.OpenAIKeyDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OpenAIKeyPayload>
          }
          update: {
            args: Prisma.OpenAIKeyUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OpenAIKeyPayload>
          }
          deleteMany: {
            args: Prisma.OpenAIKeyDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.OpenAIKeyUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.OpenAIKeyUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OpenAIKeyPayload>
          }
          aggregate: {
            args: Prisma.OpenAIKeyAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateOpenAIKey>
          }
          groupBy: {
            args: Prisma.OpenAIKeyGroupByArgs<ExtArgs>,
            result: $Utils.Optional<OpenAIKeyGroupByOutputType>[]
          }
          count: {
            args: Prisma.OpenAIKeyCountArgs<ExtArgs>,
            result: $Utils.Optional<OpenAIKeyCountAggregateOutputType> | number
          }
        }
      }
      RateLimit: {
        payload: Prisma.$RateLimitPayload<ExtArgs>
        fields: Prisma.RateLimitFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RateLimitFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RateLimitPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RateLimitFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RateLimitPayload>
          }
          findFirst: {
            args: Prisma.RateLimitFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RateLimitPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RateLimitFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RateLimitPayload>
          }
          findMany: {
            args: Prisma.RateLimitFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RateLimitPayload>[]
          }
          create: {
            args: Prisma.RateLimitCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RateLimitPayload>
          }
          createMany: {
            args: Prisma.RateLimitCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.RateLimitDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RateLimitPayload>
          }
          update: {
            args: Prisma.RateLimitUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RateLimitPayload>
          }
          deleteMany: {
            args: Prisma.RateLimitDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.RateLimitUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.RateLimitUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RateLimitPayload>
          }
          aggregate: {
            args: Prisma.RateLimitAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateRateLimit>
          }
          groupBy: {
            args: Prisma.RateLimitGroupByArgs<ExtArgs>,
            result: $Utils.Optional<RateLimitGroupByOutputType>[]
          }
          count: {
            args: Prisma.RateLimitCountArgs<ExtArgs>,
            result: $Utils.Optional<RateLimitCountAggregateOutputType> | number
          }
        }
      }
      ChatSession: {
        payload: Prisma.$ChatSessionPayload<ExtArgs>
        fields: Prisma.ChatSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChatSessionFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChatSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChatSessionFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChatSessionPayload>
          }
          findFirst: {
            args: Prisma.ChatSessionFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChatSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChatSessionFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChatSessionPayload>
          }
          findMany: {
            args: Prisma.ChatSessionFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChatSessionPayload>[]
          }
          create: {
            args: Prisma.ChatSessionCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChatSessionPayload>
          }
          createMany: {
            args: Prisma.ChatSessionCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.ChatSessionDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChatSessionPayload>
          }
          update: {
            args: Prisma.ChatSessionUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChatSessionPayload>
          }
          deleteMany: {
            args: Prisma.ChatSessionDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ChatSessionUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ChatSessionUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChatSessionPayload>
          }
          aggregate: {
            args: Prisma.ChatSessionAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateChatSession>
          }
          groupBy: {
            args: Prisma.ChatSessionGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ChatSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChatSessionCountArgs<ExtArgs>,
            result: $Utils.Optional<ChatSessionCountAggregateOutputType> | number
          }
        }
      }
      ChatMessage: {
        payload: Prisma.$ChatMessagePayload<ExtArgs>
        fields: Prisma.ChatMessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChatMessageFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChatMessageFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>
          }
          findFirst: {
            args: Prisma.ChatMessageFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChatMessageFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>
          }
          findMany: {
            args: Prisma.ChatMessageFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>[]
          }
          create: {
            args: Prisma.ChatMessageCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>
          }
          createMany: {
            args: Prisma.ChatMessageCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.ChatMessageDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>
          }
          update: {
            args: Prisma.ChatMessageUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>
          }
          deleteMany: {
            args: Prisma.ChatMessageDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ChatMessageUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ChatMessageUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>
          }
          aggregate: {
            args: Prisma.ChatMessageAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateChatMessage>
          }
          groupBy: {
            args: Prisma.ChatMessageGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ChatMessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChatMessageCountArgs<ExtArgs>,
            result: $Utils.Optional<ChatMessageCountAggregateOutputType> | number
          }
        }
      }
      ChatSetting: {
        payload: Prisma.$ChatSettingPayload<ExtArgs>
        fields: Prisma.ChatSettingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChatSettingFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChatSettingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChatSettingFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChatSettingPayload>
          }
          findFirst: {
            args: Prisma.ChatSettingFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChatSettingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChatSettingFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChatSettingPayload>
          }
          findMany: {
            args: Prisma.ChatSettingFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChatSettingPayload>[]
          }
          create: {
            args: Prisma.ChatSettingCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChatSettingPayload>
          }
          createMany: {
            args: Prisma.ChatSettingCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.ChatSettingDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChatSettingPayload>
          }
          update: {
            args: Prisma.ChatSettingUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChatSettingPayload>
          }
          deleteMany: {
            args: Prisma.ChatSettingDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ChatSettingUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ChatSettingUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChatSettingPayload>
          }
          aggregate: {
            args: Prisma.ChatSettingAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateChatSetting>
          }
          groupBy: {
            args: Prisma.ChatSettingGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ChatSettingGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChatSettingCountArgs<ExtArgs>,
            result: $Utils.Optional<ChatSettingCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<'define', Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    oauths: number
    orders: number
    chatSessions: number
    chatMessages: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    oauths?: boolean | UserCountOutputTypeCountOauthsArgs
    orders?: boolean | UserCountOutputTypeCountOrdersArgs
    chatSessions?: boolean | UserCountOutputTypeCountChatSessionsArgs
    chatMessages?: boolean | UserCountOutputTypeCountChatMessagesArgs
  }

  // Custom InputTypes

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOauthsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: OAuthWhereInput
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountChatSessionsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: ChatSessionWhereInput
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountChatMessagesArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: ChatMessageWhereInput
  }



  /**
   * Count Type ModelCountOutputType
   */

  export type ModelCountOutputType = {
    products: number
    messages: number
  }

  export type ModelCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    products?: boolean | ModelCountOutputTypeCountProductsArgs
    messages?: boolean | ModelCountOutputTypeCountMessagesArgs
  }

  // Custom InputTypes

  /**
   * ModelCountOutputType without action
   */
  export type ModelCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModelCountOutputType
     */
    select?: ModelCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * ModelCountOutputType without action
   */
  export type ModelCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: ModelInProductWhereInput
  }


  /**
   * ModelCountOutputType without action
   */
  export type ModelCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: ChatMessageWhereInput
  }



  /**
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    models: number
    order: number
  }

  export type ProductCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    models?: boolean | ProductCountOutputTypeCountModelsArgs
    order?: boolean | ProductCountOutputTypeCountOrderArgs
  }

  // Custom InputTypes

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountModelsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: ModelInProductWhereInput
  }


  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountOrderArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }



  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    products: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    products?: boolean | CategoryCountOutputTypeCountProductsArgs
  }

  // Custom InputTypes

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
  }



  /**
   * Count Type ChatSessionCountOutputType
   */

  export type ChatSessionCountOutputType = {
    messages: number
  }

  export type ChatSessionCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    messages?: boolean | ChatSessionCountOutputTypeCountMessagesArgs
  }

  // Custom InputTypes

  /**
   * ChatSessionCountOutputType without action
   */
  export type ChatSessionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSessionCountOutputType
     */
    select?: ChatSessionCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * ChatSessionCountOutputType without action
   */
  export type ChatSessionCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: ChatMessageWhereInput
  }



  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    role: $Enums.Role | null
    name: string | null
    email: string | null
    phone: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isBlocked: boolean | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    role: $Enums.Role | null
    name: string | null
    email: string | null
    phone: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isBlocked: boolean | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    role: number
    name: number
    email: number
    phone: number
    password: number
    createdAt: number
    updatedAt: number
    isBlocked: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    role?: true
    name?: true
    email?: true
    phone?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    isBlocked?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    role?: true
    name?: true
    email?: true
    phone?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    isBlocked?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    role?: true
    name?: true
    email?: true
    phone?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    isBlocked?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    role: $Enums.Role
    name: string
    email: string | null
    phone: string | null
    password: string | null
    createdAt: Date
    updatedAt: Date
    isBlocked: boolean
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isBlocked?: boolean
    oauths?: boolean | User$oauthsArgs<ExtArgs>
    orders?: boolean | User$ordersArgs<ExtArgs>
    chatSessions?: boolean | User$chatSessionsArgs<ExtArgs>
    chatMessages?: boolean | User$chatMessagesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    role?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isBlocked?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    oauths?: boolean | User$oauthsArgs<ExtArgs>
    orders?: boolean | User$ordersArgs<ExtArgs>
    chatSessions?: boolean | User$chatSessionsArgs<ExtArgs>
    chatMessages?: boolean | User$chatMessagesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $UserPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      oauths: Prisma.$OAuthPayload<ExtArgs>[]
      orders: Prisma.$OrderPayload<ExtArgs>[]
      chatSessions: Prisma.$ChatSessionPayload<ExtArgs>[]
      chatMessages: Prisma.$ChatMessagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetResult<{
      id: number
      role: $Enums.Role
      name: string
      email: string | null
      phone: string | null
      password: string | null
      createdAt: Date
      updatedAt: Date
      isBlocked: boolean
    }, ExtArgs["result"]["user"]>
    composites: {}
  }


  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends UserCreateArgs<ExtArgs>>(
      args: SelectSubset<T, UserCreateArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Users.
     *     @param {UserCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends UserDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, UserDeleteArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpdateArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends UserUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpsertArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    oauths<T extends User$oauthsArgs<ExtArgs> = {}>(args?: Subset<T, User$oauthsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthPayload<ExtArgs>, T, 'findMany'> | Null>;

    orders<T extends User$ordersArgs<ExtArgs> = {}>(args?: Subset<T, User$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, 'findMany'> | Null>;

    chatSessions<T extends User$chatSessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$chatSessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatSessionPayload<ExtArgs>, T, 'findMany'> | Null>;

    chatMessages<T extends User$chatMessagesArgs<ExtArgs> = {}>(args?: Subset<T, User$chatMessagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly role: FieldRef<"User", 'Role'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly isBlocked: FieldRef<"User", 'Boolean'>
  }
    

  // Custom InputTypes

  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }


  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }


  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }


  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }


  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }


  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }


  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }


  /**
   * User.oauths
   */
  export type User$oauthsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuth
     */
    select?: OAuthSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OAuthInclude<ExtArgs> | null
    where?: OAuthWhereInput
    orderBy?: OAuthOrderByWithRelationInput | OAuthOrderByWithRelationInput[]
    cursor?: OAuthWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OAuthScalarFieldEnum | OAuthScalarFieldEnum[]
  }


  /**
   * User.orders
   */
  export type User$ordersArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }


  /**
   * User.chatSessions
   */
  export type User$chatSessionsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSession
     */
    select?: ChatSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChatSessionInclude<ExtArgs> | null
    where?: ChatSessionWhereInput
    orderBy?: ChatSessionOrderByWithRelationInput | ChatSessionOrderByWithRelationInput[]
    cursor?: ChatSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChatSessionScalarFieldEnum | ChatSessionScalarFieldEnum[]
  }


  /**
   * User.chatMessages
   */
  export type User$chatMessagesArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChatMessageInclude<ExtArgs> | null
    where?: ChatMessageWhereInput
    orderBy?: ChatMessageOrderByWithRelationInput | ChatMessageOrderByWithRelationInput[]
    cursor?: ChatMessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChatMessageScalarFieldEnum | ChatMessageScalarFieldEnum[]
  }


  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
  }



  /**
   * Model OAuth
   */

  export type AggregateOAuth = {
    _count: OAuthCountAggregateOutputType | null
    _avg: OAuthAvgAggregateOutputType | null
    _sum: OAuthSumAggregateOutputType | null
    _min: OAuthMinAggregateOutputType | null
    _max: OAuthMaxAggregateOutputType | null
  }

  export type OAuthAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type OAuthSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type OAuthMinAggregateOutputType = {
    id: number | null
    provider: $Enums.OAuthProvider | null
    providerId: string | null
    accessToken: string | null
    refreshToken: string | null
    expiredAt: Date | null
    userId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OAuthMaxAggregateOutputType = {
    id: number | null
    provider: $Enums.OAuthProvider | null
    providerId: string | null
    accessToken: string | null
    refreshToken: string | null
    expiredAt: Date | null
    userId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OAuthCountAggregateOutputType = {
    id: number
    provider: number
    providerId: number
    accessToken: number
    refreshToken: number
    expiredAt: number
    data: number
    userId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OAuthAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type OAuthSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type OAuthMinAggregateInputType = {
    id?: true
    provider?: true
    providerId?: true
    accessToken?: true
    refreshToken?: true
    expiredAt?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OAuthMaxAggregateInputType = {
    id?: true
    provider?: true
    providerId?: true
    accessToken?: true
    refreshToken?: true
    expiredAt?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OAuthCountAggregateInputType = {
    id?: true
    provider?: true
    providerId?: true
    accessToken?: true
    refreshToken?: true
    expiredAt?: true
    data?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OAuthAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which OAuth to aggregate.
     */
    where?: OAuthWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuths to fetch.
     */
    orderBy?: OAuthOrderByWithRelationInput | OAuthOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OAuthWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuths from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuths.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OAuths
    **/
    _count?: true | OAuthCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OAuthAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OAuthSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OAuthMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OAuthMaxAggregateInputType
  }

  export type GetOAuthAggregateType<T extends OAuthAggregateArgs> = {
        [P in keyof T & keyof AggregateOAuth]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOAuth[P]>
      : GetScalarType<T[P], AggregateOAuth[P]>
  }




  export type OAuthGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: OAuthWhereInput
    orderBy?: OAuthOrderByWithAggregationInput | OAuthOrderByWithAggregationInput[]
    by: OAuthScalarFieldEnum[] | OAuthScalarFieldEnum
    having?: OAuthScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OAuthCountAggregateInputType | true
    _avg?: OAuthAvgAggregateInputType
    _sum?: OAuthSumAggregateInputType
    _min?: OAuthMinAggregateInputType
    _max?: OAuthMaxAggregateInputType
  }

  export type OAuthGroupByOutputType = {
    id: number
    provider: $Enums.OAuthProvider
    providerId: string
    accessToken: string
    refreshToken: string
    expiredAt: Date
    data: JsonValue | null
    userId: number
    createdAt: Date
    updatedAt: Date
    _count: OAuthCountAggregateOutputType | null
    _avg: OAuthAvgAggregateOutputType | null
    _sum: OAuthSumAggregateOutputType | null
    _min: OAuthMinAggregateOutputType | null
    _max: OAuthMaxAggregateOutputType | null
  }

  type GetOAuthGroupByPayload<T extends OAuthGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OAuthGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OAuthGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OAuthGroupByOutputType[P]>
            : GetScalarType<T[P], OAuthGroupByOutputType[P]>
        }
      >
    >


  export type OAuthSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    providerId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    expiredAt?: boolean
    data?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["oAuth"]>

  export type OAuthSelectScalar = {
    id?: boolean
    provider?: boolean
    providerId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    expiredAt?: boolean
    data?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OAuthInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }


  export type $OAuthPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    name: "OAuth"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetResult<{
      id: number
      provider: $Enums.OAuthProvider
      providerId: string
      accessToken: string
      refreshToken: string
      expiredAt: Date
      data: Prisma.JsonValue | null
      userId: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["oAuth"]>
    composites: {}
  }


  type OAuthGetPayload<S extends boolean | null | undefined | OAuthDefaultArgs> = $Result.GetResult<Prisma.$OAuthPayload, S>

  type OAuthCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<OAuthFindManyArgs, 'select' | 'include'> & {
      select?: OAuthCountAggregateInputType | true
    }

  export interface OAuthDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OAuth'], meta: { name: 'OAuth' } }
    /**
     * Find zero or one OAuth that matches the filter.
     * @param {OAuthFindUniqueArgs} args - Arguments to find a OAuth
     * @example
     * // Get one OAuth
     * const oAuth = await prisma.oAuth.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends OAuthFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, OAuthFindUniqueArgs<ExtArgs>>
    ): Prisma__OAuthClient<$Result.GetResult<Prisma.$OAuthPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one OAuth that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {OAuthFindUniqueOrThrowArgs} args - Arguments to find a OAuth
     * @example
     * // Get one OAuth
     * const oAuth = await prisma.oAuth.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends OAuthFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, OAuthFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__OAuthClient<$Result.GetResult<Prisma.$OAuthPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first OAuth that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthFindFirstArgs} args - Arguments to find a OAuth
     * @example
     * // Get one OAuth
     * const oAuth = await prisma.oAuth.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends OAuthFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, OAuthFindFirstArgs<ExtArgs>>
    ): Prisma__OAuthClient<$Result.GetResult<Prisma.$OAuthPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first OAuth that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthFindFirstOrThrowArgs} args - Arguments to find a OAuth
     * @example
     * // Get one OAuth
     * const oAuth = await prisma.oAuth.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends OAuthFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, OAuthFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__OAuthClient<$Result.GetResult<Prisma.$OAuthPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more OAuths that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OAuths
     * const oAuths = await prisma.oAuth.findMany()
     * 
     * // Get first 10 OAuths
     * const oAuths = await prisma.oAuth.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const oAuthWithIdOnly = await prisma.oAuth.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends OAuthFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, OAuthFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a OAuth.
     * @param {OAuthCreateArgs} args - Arguments to create a OAuth.
     * @example
     * // Create one OAuth
     * const OAuth = await prisma.oAuth.create({
     *   data: {
     *     // ... data to create a OAuth
     *   }
     * })
     * 
    **/
    create<T extends OAuthCreateArgs<ExtArgs>>(
      args: SelectSubset<T, OAuthCreateArgs<ExtArgs>>
    ): Prisma__OAuthClient<$Result.GetResult<Prisma.$OAuthPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many OAuths.
     *     @param {OAuthCreateManyArgs} args - Arguments to create many OAuths.
     *     @example
     *     // Create many OAuths
     *     const oAuth = await prisma.oAuth.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends OAuthCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, OAuthCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a OAuth.
     * @param {OAuthDeleteArgs} args - Arguments to delete one OAuth.
     * @example
     * // Delete one OAuth
     * const OAuth = await prisma.oAuth.delete({
     *   where: {
     *     // ... filter to delete one OAuth
     *   }
     * })
     * 
    **/
    delete<T extends OAuthDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, OAuthDeleteArgs<ExtArgs>>
    ): Prisma__OAuthClient<$Result.GetResult<Prisma.$OAuthPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one OAuth.
     * @param {OAuthUpdateArgs} args - Arguments to update one OAuth.
     * @example
     * // Update one OAuth
     * const oAuth = await prisma.oAuth.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends OAuthUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, OAuthUpdateArgs<ExtArgs>>
    ): Prisma__OAuthClient<$Result.GetResult<Prisma.$OAuthPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more OAuths.
     * @param {OAuthDeleteManyArgs} args - Arguments to filter OAuths to delete.
     * @example
     * // Delete a few OAuths
     * const { count } = await prisma.oAuth.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends OAuthDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, OAuthDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OAuths.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OAuths
     * const oAuth = await prisma.oAuth.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends OAuthUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, OAuthUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one OAuth.
     * @param {OAuthUpsertArgs} args - Arguments to update or create a OAuth.
     * @example
     * // Update or create a OAuth
     * const oAuth = await prisma.oAuth.upsert({
     *   create: {
     *     // ... data to create a OAuth
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OAuth we want to update
     *   }
     * })
    **/
    upsert<T extends OAuthUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, OAuthUpsertArgs<ExtArgs>>
    ): Prisma__OAuthClient<$Result.GetResult<Prisma.$OAuthPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of OAuths.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthCountArgs} args - Arguments to filter OAuths to count.
     * @example
     * // Count the number of OAuths
     * const count = await prisma.oAuth.count({
     *   where: {
     *     // ... the filter for the OAuths we want to count
     *   }
     * })
    **/
    count<T extends OAuthCountArgs>(
      args?: Subset<T, OAuthCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OAuthCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OAuth.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OAuthAggregateArgs>(args: Subset<T, OAuthAggregateArgs>): Prisma.PrismaPromise<GetOAuthAggregateType<T>>

    /**
     * Group by OAuth.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OAuthGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OAuthGroupByArgs['orderBy'] }
        : { orderBy?: OAuthGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OAuthGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOAuthGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OAuth model
   */
  readonly fields: OAuthFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OAuth.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OAuthClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the OAuth model
   */ 
  interface OAuthFieldRefs {
    readonly id: FieldRef<"OAuth", 'Int'>
    readonly provider: FieldRef<"OAuth", 'OAuthProvider'>
    readonly providerId: FieldRef<"OAuth", 'String'>
    readonly accessToken: FieldRef<"OAuth", 'String'>
    readonly refreshToken: FieldRef<"OAuth", 'String'>
    readonly expiredAt: FieldRef<"OAuth", 'DateTime'>
    readonly data: FieldRef<"OAuth", 'Json'>
    readonly userId: FieldRef<"OAuth", 'Int'>
    readonly createdAt: FieldRef<"OAuth", 'DateTime'>
    readonly updatedAt: FieldRef<"OAuth", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * OAuth findUnique
   */
  export type OAuthFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuth
     */
    select?: OAuthSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OAuthInclude<ExtArgs> | null
    /**
     * Filter, which OAuth to fetch.
     */
    where: OAuthWhereUniqueInput
  }


  /**
   * OAuth findUniqueOrThrow
   */
  export type OAuthFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuth
     */
    select?: OAuthSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OAuthInclude<ExtArgs> | null
    /**
     * Filter, which OAuth to fetch.
     */
    where: OAuthWhereUniqueInput
  }


  /**
   * OAuth findFirst
   */
  export type OAuthFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuth
     */
    select?: OAuthSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OAuthInclude<ExtArgs> | null
    /**
     * Filter, which OAuth to fetch.
     */
    where?: OAuthWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuths to fetch.
     */
    orderBy?: OAuthOrderByWithRelationInput | OAuthOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OAuths.
     */
    cursor?: OAuthWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuths from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuths.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OAuths.
     */
    distinct?: OAuthScalarFieldEnum | OAuthScalarFieldEnum[]
  }


  /**
   * OAuth findFirstOrThrow
   */
  export type OAuthFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuth
     */
    select?: OAuthSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OAuthInclude<ExtArgs> | null
    /**
     * Filter, which OAuth to fetch.
     */
    where?: OAuthWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuths to fetch.
     */
    orderBy?: OAuthOrderByWithRelationInput | OAuthOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OAuths.
     */
    cursor?: OAuthWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuths from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuths.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OAuths.
     */
    distinct?: OAuthScalarFieldEnum | OAuthScalarFieldEnum[]
  }


  /**
   * OAuth findMany
   */
  export type OAuthFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuth
     */
    select?: OAuthSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OAuthInclude<ExtArgs> | null
    /**
     * Filter, which OAuths to fetch.
     */
    where?: OAuthWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuths to fetch.
     */
    orderBy?: OAuthOrderByWithRelationInput | OAuthOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OAuths.
     */
    cursor?: OAuthWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuths from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuths.
     */
    skip?: number
    distinct?: OAuthScalarFieldEnum | OAuthScalarFieldEnum[]
  }


  /**
   * OAuth create
   */
  export type OAuthCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuth
     */
    select?: OAuthSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OAuthInclude<ExtArgs> | null
    /**
     * The data needed to create a OAuth.
     */
    data: XOR<OAuthCreateInput, OAuthUncheckedCreateInput>
  }


  /**
   * OAuth createMany
   */
  export type OAuthCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OAuths.
     */
    data: OAuthCreateManyInput | OAuthCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * OAuth update
   */
  export type OAuthUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuth
     */
    select?: OAuthSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OAuthInclude<ExtArgs> | null
    /**
     * The data needed to update a OAuth.
     */
    data: XOR<OAuthUpdateInput, OAuthUncheckedUpdateInput>
    /**
     * Choose, which OAuth to update.
     */
    where: OAuthWhereUniqueInput
  }


  /**
   * OAuth updateMany
   */
  export type OAuthUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OAuths.
     */
    data: XOR<OAuthUpdateManyMutationInput, OAuthUncheckedUpdateManyInput>
    /**
     * Filter which OAuths to update
     */
    where?: OAuthWhereInput
  }


  /**
   * OAuth upsert
   */
  export type OAuthUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuth
     */
    select?: OAuthSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OAuthInclude<ExtArgs> | null
    /**
     * The filter to search for the OAuth to update in case it exists.
     */
    where: OAuthWhereUniqueInput
    /**
     * In case the OAuth found by the `where` argument doesn't exist, create a new OAuth with this data.
     */
    create: XOR<OAuthCreateInput, OAuthUncheckedCreateInput>
    /**
     * In case the OAuth was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OAuthUpdateInput, OAuthUncheckedUpdateInput>
  }


  /**
   * OAuth delete
   */
  export type OAuthDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuth
     */
    select?: OAuthSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OAuthInclude<ExtArgs> | null
    /**
     * Filter which OAuth to delete.
     */
    where: OAuthWhereUniqueInput
  }


  /**
   * OAuth deleteMany
   */
  export type OAuthDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which OAuths to delete
     */
    where?: OAuthWhereInput
  }


  /**
   * OAuth without action
   */
  export type OAuthDefaultArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuth
     */
    select?: OAuthSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OAuthInclude<ExtArgs> | null
  }



  /**
   * Model Model
   */

  export type AggregateModel = {
    _count: ModelCountAggregateOutputType | null
    _avg: ModelAvgAggregateOutputType | null
    _sum: ModelSumAggregateOutputType | null
    _min: ModelMinAggregateOutputType | null
    _max: ModelMaxAggregateOutputType | null
  }

  export type ModelAvgAggregateOutputType = {
    id: number | null
    price: number | null
  }

  export type ModelSumAggregateOutputType = {
    id: number | null
    price: number | null
  }

  export type ModelMinAggregateOutputType = {
    id: number | null
    name: string | null
    price: number | null
  }

  export type ModelMaxAggregateOutputType = {
    id: number | null
    name: string | null
    price: number | null
  }

  export type ModelCountAggregateOutputType = {
    id: number
    name: number
    price: number
    _all: number
  }


  export type ModelAvgAggregateInputType = {
    id?: true
    price?: true
  }

  export type ModelSumAggregateInputType = {
    id?: true
    price?: true
  }

  export type ModelMinAggregateInputType = {
    id?: true
    name?: true
    price?: true
  }

  export type ModelMaxAggregateInputType = {
    id?: true
    name?: true
    price?: true
  }

  export type ModelCountAggregateInputType = {
    id?: true
    name?: true
    price?: true
    _all?: true
  }

  export type ModelAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Model to aggregate.
     */
    where?: ModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Models to fetch.
     */
    orderBy?: ModelOrderByWithRelationInput | ModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Models from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Models.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Models
    **/
    _count?: true | ModelCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ModelAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ModelSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ModelMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ModelMaxAggregateInputType
  }

  export type GetModelAggregateType<T extends ModelAggregateArgs> = {
        [P in keyof T & keyof AggregateModel]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateModel[P]>
      : GetScalarType<T[P], AggregateModel[P]>
  }




  export type ModelGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: ModelWhereInput
    orderBy?: ModelOrderByWithAggregationInput | ModelOrderByWithAggregationInput[]
    by: ModelScalarFieldEnum[] | ModelScalarFieldEnum
    having?: ModelScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ModelCountAggregateInputType | true
    _avg?: ModelAvgAggregateInputType
    _sum?: ModelSumAggregateInputType
    _min?: ModelMinAggregateInputType
    _max?: ModelMaxAggregateInputType
  }

  export type ModelGroupByOutputType = {
    id: number
    name: string
    price: number
    _count: ModelCountAggregateOutputType | null
    _avg: ModelAvgAggregateOutputType | null
    _sum: ModelSumAggregateOutputType | null
    _min: ModelMinAggregateOutputType | null
    _max: ModelMaxAggregateOutputType | null
  }

  type GetModelGroupByPayload<T extends ModelGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ModelGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ModelGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ModelGroupByOutputType[P]>
            : GetScalarType<T[P], ModelGroupByOutputType[P]>
        }
      >
    >


  export type ModelSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    price?: boolean
    products?: boolean | Model$productsArgs<ExtArgs>
    messages?: boolean | Model$messagesArgs<ExtArgs>
    _count?: boolean | ModelCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["model"]>

  export type ModelSelectScalar = {
    id?: boolean
    name?: boolean
    price?: boolean
  }

  export type ModelInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    products?: boolean | Model$productsArgs<ExtArgs>
    messages?: boolean | Model$messagesArgs<ExtArgs>
    _count?: boolean | ModelCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $ModelPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    name: "Model"
    objects: {
      products: Prisma.$ModelInProductPayload<ExtArgs>[]
      messages: Prisma.$ChatMessagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetResult<{
      id: number
      name: string
      price: number
    }, ExtArgs["result"]["model"]>
    composites: {}
  }


  type ModelGetPayload<S extends boolean | null | undefined | ModelDefaultArgs> = $Result.GetResult<Prisma.$ModelPayload, S>

  type ModelCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<ModelFindManyArgs, 'select' | 'include'> & {
      select?: ModelCountAggregateInputType | true
    }

  export interface ModelDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Model'], meta: { name: 'Model' } }
    /**
     * Find zero or one Model that matches the filter.
     * @param {ModelFindUniqueArgs} args - Arguments to find a Model
     * @example
     * // Get one Model
     * const model = await prisma.model.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ModelFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ModelFindUniqueArgs<ExtArgs>>
    ): Prisma__ModelClient<$Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Model that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ModelFindUniqueOrThrowArgs} args - Arguments to find a Model
     * @example
     * // Get one Model
     * const model = await prisma.model.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ModelFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ModelFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ModelClient<$Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Model that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModelFindFirstArgs} args - Arguments to find a Model
     * @example
     * // Get one Model
     * const model = await prisma.model.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ModelFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ModelFindFirstArgs<ExtArgs>>
    ): Prisma__ModelClient<$Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Model that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModelFindFirstOrThrowArgs} args - Arguments to find a Model
     * @example
     * // Get one Model
     * const model = await prisma.model.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ModelFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ModelFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ModelClient<$Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Models that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModelFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Models
     * const models = await prisma.model.findMany()
     * 
     * // Get first 10 Models
     * const models = await prisma.model.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const modelWithIdOnly = await prisma.model.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ModelFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ModelFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Model.
     * @param {ModelCreateArgs} args - Arguments to create a Model.
     * @example
     * // Create one Model
     * const Model = await prisma.model.create({
     *   data: {
     *     // ... data to create a Model
     *   }
     * })
     * 
    **/
    create<T extends ModelCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ModelCreateArgs<ExtArgs>>
    ): Prisma__ModelClient<$Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Models.
     *     @param {ModelCreateManyArgs} args - Arguments to create many Models.
     *     @example
     *     // Create many Models
     *     const model = await prisma.model.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ModelCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ModelCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Model.
     * @param {ModelDeleteArgs} args - Arguments to delete one Model.
     * @example
     * // Delete one Model
     * const Model = await prisma.model.delete({
     *   where: {
     *     // ... filter to delete one Model
     *   }
     * })
     * 
    **/
    delete<T extends ModelDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ModelDeleteArgs<ExtArgs>>
    ): Prisma__ModelClient<$Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Model.
     * @param {ModelUpdateArgs} args - Arguments to update one Model.
     * @example
     * // Update one Model
     * const model = await prisma.model.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ModelUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ModelUpdateArgs<ExtArgs>>
    ): Prisma__ModelClient<$Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Models.
     * @param {ModelDeleteManyArgs} args - Arguments to filter Models to delete.
     * @example
     * // Delete a few Models
     * const { count } = await prisma.model.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ModelDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ModelDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Models.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModelUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Models
     * const model = await prisma.model.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ModelUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ModelUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Model.
     * @param {ModelUpsertArgs} args - Arguments to update or create a Model.
     * @example
     * // Update or create a Model
     * const model = await prisma.model.upsert({
     *   create: {
     *     // ... data to create a Model
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Model we want to update
     *   }
     * })
    **/
    upsert<T extends ModelUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ModelUpsertArgs<ExtArgs>>
    ): Prisma__ModelClient<$Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Models.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModelCountArgs} args - Arguments to filter Models to count.
     * @example
     * // Count the number of Models
     * const count = await prisma.model.count({
     *   where: {
     *     // ... the filter for the Models we want to count
     *   }
     * })
    **/
    count<T extends ModelCountArgs>(
      args?: Subset<T, ModelCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ModelCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Model.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModelAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ModelAggregateArgs>(args: Subset<T, ModelAggregateArgs>): Prisma.PrismaPromise<GetModelAggregateType<T>>

    /**
     * Group by Model.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModelGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ModelGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ModelGroupByArgs['orderBy'] }
        : { orderBy?: ModelGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ModelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetModelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Model model
   */
  readonly fields: ModelFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Model.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ModelClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    products<T extends Model$productsArgs<ExtArgs> = {}>(args?: Subset<T, Model$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModelInProductPayload<ExtArgs>, T, 'findMany'> | Null>;

    messages<T extends Model$messagesArgs<ExtArgs> = {}>(args?: Subset<T, Model$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Model model
   */ 
  interface ModelFieldRefs {
    readonly id: FieldRef<"Model", 'Int'>
    readonly name: FieldRef<"Model", 'String'>
    readonly price: FieldRef<"Model", 'Int'>
  }
    

  // Custom InputTypes

  /**
   * Model findUnique
   */
  export type ModelFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Model
     */
    select?: ModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModelInclude<ExtArgs> | null
    /**
     * Filter, which Model to fetch.
     */
    where: ModelWhereUniqueInput
  }


  /**
   * Model findUniqueOrThrow
   */
  export type ModelFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Model
     */
    select?: ModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModelInclude<ExtArgs> | null
    /**
     * Filter, which Model to fetch.
     */
    where: ModelWhereUniqueInput
  }


  /**
   * Model findFirst
   */
  export type ModelFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Model
     */
    select?: ModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModelInclude<ExtArgs> | null
    /**
     * Filter, which Model to fetch.
     */
    where?: ModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Models to fetch.
     */
    orderBy?: ModelOrderByWithRelationInput | ModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Models.
     */
    cursor?: ModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Models from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Models.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Models.
     */
    distinct?: ModelScalarFieldEnum | ModelScalarFieldEnum[]
  }


  /**
   * Model findFirstOrThrow
   */
  export type ModelFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Model
     */
    select?: ModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModelInclude<ExtArgs> | null
    /**
     * Filter, which Model to fetch.
     */
    where?: ModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Models to fetch.
     */
    orderBy?: ModelOrderByWithRelationInput | ModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Models.
     */
    cursor?: ModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Models from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Models.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Models.
     */
    distinct?: ModelScalarFieldEnum | ModelScalarFieldEnum[]
  }


  /**
   * Model findMany
   */
  export type ModelFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Model
     */
    select?: ModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModelInclude<ExtArgs> | null
    /**
     * Filter, which Models to fetch.
     */
    where?: ModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Models to fetch.
     */
    orderBy?: ModelOrderByWithRelationInput | ModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Models.
     */
    cursor?: ModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Models from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Models.
     */
    skip?: number
    distinct?: ModelScalarFieldEnum | ModelScalarFieldEnum[]
  }


  /**
   * Model create
   */
  export type ModelCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Model
     */
    select?: ModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModelInclude<ExtArgs> | null
    /**
     * The data needed to create a Model.
     */
    data: XOR<ModelCreateInput, ModelUncheckedCreateInput>
  }


  /**
   * Model createMany
   */
  export type ModelCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Models.
     */
    data: ModelCreateManyInput | ModelCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Model update
   */
  export type ModelUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Model
     */
    select?: ModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModelInclude<ExtArgs> | null
    /**
     * The data needed to update a Model.
     */
    data: XOR<ModelUpdateInput, ModelUncheckedUpdateInput>
    /**
     * Choose, which Model to update.
     */
    where: ModelWhereUniqueInput
  }


  /**
   * Model updateMany
   */
  export type ModelUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Models.
     */
    data: XOR<ModelUpdateManyMutationInput, ModelUncheckedUpdateManyInput>
    /**
     * Filter which Models to update
     */
    where?: ModelWhereInput
  }


  /**
   * Model upsert
   */
  export type ModelUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Model
     */
    select?: ModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModelInclude<ExtArgs> | null
    /**
     * The filter to search for the Model to update in case it exists.
     */
    where: ModelWhereUniqueInput
    /**
     * In case the Model found by the `where` argument doesn't exist, create a new Model with this data.
     */
    create: XOR<ModelCreateInput, ModelUncheckedCreateInput>
    /**
     * In case the Model was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ModelUpdateInput, ModelUncheckedUpdateInput>
  }


  /**
   * Model delete
   */
  export type ModelDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Model
     */
    select?: ModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModelInclude<ExtArgs> | null
    /**
     * Filter which Model to delete.
     */
    where: ModelWhereUniqueInput
  }


  /**
   * Model deleteMany
   */
  export type ModelDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Models to delete
     */
    where?: ModelWhereInput
  }


  /**
   * Model.products
   */
  export type Model$productsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModelInProduct
     */
    select?: ModelInProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModelInProductInclude<ExtArgs> | null
    where?: ModelInProductWhereInput
    orderBy?: ModelInProductOrderByWithRelationInput | ModelInProductOrderByWithRelationInput[]
    cursor?: ModelInProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ModelInProductScalarFieldEnum | ModelInProductScalarFieldEnum[]
  }


  /**
   * Model.messages
   */
  export type Model$messagesArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChatMessageInclude<ExtArgs> | null
    where?: ChatMessageWhereInput
    orderBy?: ChatMessageOrderByWithRelationInput | ChatMessageOrderByWithRelationInput[]
    cursor?: ChatMessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChatMessageScalarFieldEnum | ChatMessageScalarFieldEnum[]
  }


  /**
   * Model without action
   */
  export type ModelDefaultArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Model
     */
    select?: ModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModelInclude<ExtArgs> | null
  }



  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    id: number | null
    price: number | null
    stock: number | null
    duration: number | null
    categoryId: number | null
  }

  export type ProductSumAggregateOutputType = {
    id: number | null
    price: number | null
    stock: number | null
    duration: number | null
    categoryId: number | null
  }

  export type ProductMinAggregateOutputType = {
    id: number | null
    name: string | null
    isHidden: boolean | null
    price: number | null
    stock: number | null
    duration: number | null
    categoryId: number | null
  }

  export type ProductMaxAggregateOutputType = {
    id: number | null
    name: string | null
    isHidden: boolean | null
    price: number | null
    stock: number | null
    duration: number | null
    categoryId: number | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    name: number
    features: number
    isHidden: number
    price: number
    stock: number
    duration: number
    categoryId: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    id?: true
    price?: true
    stock?: true
    duration?: true
    categoryId?: true
  }

  export type ProductSumAggregateInputType = {
    id?: true
    price?: true
    stock?: true
    duration?: true
    categoryId?: true
  }

  export type ProductMinAggregateInputType = {
    id?: true
    name?: true
    isHidden?: true
    price?: true
    stock?: true
    duration?: true
    categoryId?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    name?: true
    isHidden?: true
    price?: true
    stock?: true
    duration?: true
    categoryId?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    name?: true
    features?: true
    isHidden?: true
    price?: true
    stock?: true
    duration?: true
    categoryId?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: number
    name: string
    features: string[]
    isHidden: boolean
    price: number
    stock: number
    duration: number
    categoryId: number | null
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    features?: boolean
    isHidden?: boolean
    price?: boolean
    stock?: boolean
    duration?: boolean
    categoryId?: boolean
    models?: boolean | Product$modelsArgs<ExtArgs>
    order?: boolean | Product$orderArgs<ExtArgs>
    category?: boolean | Product$categoryArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectScalar = {
    id?: boolean
    name?: boolean
    features?: boolean
    isHidden?: boolean
    price?: boolean
    stock?: boolean
    duration?: boolean
    categoryId?: boolean
  }

  export type ProductInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    models?: boolean | Product$modelsArgs<ExtArgs>
    order?: boolean | Product$orderArgs<ExtArgs>
    category?: boolean | Product$categoryArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $ProductPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      models: Prisma.$ModelInProductPayload<ExtArgs>[]
      order: Prisma.$OrderPayload<ExtArgs>[]
      category: Prisma.$CategoryPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetResult<{
      id: number
      name: string
      features: string[]
      isHidden: boolean
      price: number
      stock: number
      duration: number
      categoryId: number | null
    }, ExtArgs["result"]["product"]>
    composites: {}
  }


  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<ProductFindManyArgs, 'select' | 'include'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ProductFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>
    ): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Product that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ProductFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>
    ): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ProductFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
    **/
    create<T extends ProductCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ProductCreateArgs<ExtArgs>>
    ): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Products.
     *     @param {ProductCreateManyArgs} args - Arguments to create many Products.
     *     @example
     *     // Create many Products
     *     const product = await prisma.product.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ProductCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
    **/
    delete<T extends ProductDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>
    ): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ProductUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>
    ): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ProductDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ProductUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
    **/
    upsert<T extends ProductUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>
    ): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    models<T extends Product$modelsArgs<ExtArgs> = {}>(args?: Subset<T, Product$modelsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModelInProductPayload<ExtArgs>, T, 'findMany'> | Null>;

    order<T extends Product$orderArgs<ExtArgs> = {}>(args?: Subset<T, Product$orderArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, 'findMany'> | Null>;

    category<T extends Product$categoryArgs<ExtArgs> = {}>(args?: Subset<T, Product$categoryArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Product model
   */ 
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'Int'>
    readonly name: FieldRef<"Product", 'String'>
    readonly features: FieldRef<"Product", 'String[]'>
    readonly isHidden: FieldRef<"Product", 'Boolean'>
    readonly price: FieldRef<"Product", 'Int'>
    readonly stock: FieldRef<"Product", 'Int'>
    readonly duration: FieldRef<"Product", 'Int'>
    readonly categoryId: FieldRef<"Product", 'Int'>
  }
    

  // Custom InputTypes

  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }


  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }


  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }


  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }


  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }


  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }


  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }


  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
  }


  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }


  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }


  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
  }


  /**
   * Product.models
   */
  export type Product$modelsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModelInProduct
     */
    select?: ModelInProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModelInProductInclude<ExtArgs> | null
    where?: ModelInProductWhereInput
    orderBy?: ModelInProductOrderByWithRelationInput | ModelInProductOrderByWithRelationInput[]
    cursor?: ModelInProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ModelInProductScalarFieldEnum | ModelInProductScalarFieldEnum[]
  }


  /**
   * Product.order
   */
  export type Product$orderArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }


  /**
   * Product.category
   */
  export type Product$categoryArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CategoryInclude<ExtArgs> | null
    where?: CategoryWhereInput
  }


  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProductInclude<ExtArgs> | null
  }



  /**
   * Model ModelInProduct
   */

  export type AggregateModelInProduct = {
    _count: ModelInProductCountAggregateOutputType | null
    _avg: ModelInProductAvgAggregateOutputType | null
    _sum: ModelInProductSumAggregateOutputType | null
    _min: ModelInProductMinAggregateOutputType | null
    _max: ModelInProductMaxAggregateOutputType | null
  }

  export type ModelInProductAvgAggregateOutputType = {
    times: number | null
    duration: number | null
    modelId: number | null
    productId: number | null
  }

  export type ModelInProductSumAggregateOutputType = {
    times: number | null
    duration: number | null
    modelId: number | null
    productId: number | null
  }

  export type ModelInProductMinAggregateOutputType = {
    times: number | null
    duration: number | null
    modelId: number | null
    productId: number | null
  }

  export type ModelInProductMaxAggregateOutputType = {
    times: number | null
    duration: number | null
    modelId: number | null
    productId: number | null
  }

  export type ModelInProductCountAggregateOutputType = {
    times: number
    duration: number
    modelId: number
    productId: number
    _all: number
  }


  export type ModelInProductAvgAggregateInputType = {
    times?: true
    duration?: true
    modelId?: true
    productId?: true
  }

  export type ModelInProductSumAggregateInputType = {
    times?: true
    duration?: true
    modelId?: true
    productId?: true
  }

  export type ModelInProductMinAggregateInputType = {
    times?: true
    duration?: true
    modelId?: true
    productId?: true
  }

  export type ModelInProductMaxAggregateInputType = {
    times?: true
    duration?: true
    modelId?: true
    productId?: true
  }

  export type ModelInProductCountAggregateInputType = {
    times?: true
    duration?: true
    modelId?: true
    productId?: true
    _all?: true
  }

  export type ModelInProductAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which ModelInProduct to aggregate.
     */
    where?: ModelInProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModelInProducts to fetch.
     */
    orderBy?: ModelInProductOrderByWithRelationInput | ModelInProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ModelInProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModelInProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModelInProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ModelInProducts
    **/
    _count?: true | ModelInProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ModelInProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ModelInProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ModelInProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ModelInProductMaxAggregateInputType
  }

  export type GetModelInProductAggregateType<T extends ModelInProductAggregateArgs> = {
        [P in keyof T & keyof AggregateModelInProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateModelInProduct[P]>
      : GetScalarType<T[P], AggregateModelInProduct[P]>
  }




  export type ModelInProductGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: ModelInProductWhereInput
    orderBy?: ModelInProductOrderByWithAggregationInput | ModelInProductOrderByWithAggregationInput[]
    by: ModelInProductScalarFieldEnum[] | ModelInProductScalarFieldEnum
    having?: ModelInProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ModelInProductCountAggregateInputType | true
    _avg?: ModelInProductAvgAggregateInputType
    _sum?: ModelInProductSumAggregateInputType
    _min?: ModelInProductMinAggregateInputType
    _max?: ModelInProductMaxAggregateInputType
  }

  export type ModelInProductGroupByOutputType = {
    times: number
    duration: number
    modelId: number
    productId: number
    _count: ModelInProductCountAggregateOutputType | null
    _avg: ModelInProductAvgAggregateOutputType | null
    _sum: ModelInProductSumAggregateOutputType | null
    _min: ModelInProductMinAggregateOutputType | null
    _max: ModelInProductMaxAggregateOutputType | null
  }

  type GetModelInProductGroupByPayload<T extends ModelInProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ModelInProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ModelInProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ModelInProductGroupByOutputType[P]>
            : GetScalarType<T[P], ModelInProductGroupByOutputType[P]>
        }
      >
    >


  export type ModelInProductSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    times?: boolean
    duration?: boolean
    modelId?: boolean
    productId?: boolean
    model?: boolean | ModelDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["modelInProduct"]>

  export type ModelInProductSelectScalar = {
    times?: boolean
    duration?: boolean
    modelId?: boolean
    productId?: boolean
  }

  export type ModelInProductInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    model?: boolean | ModelDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }


  export type $ModelInProductPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    name: "ModelInProduct"
    objects: {
      model: Prisma.$ModelPayload<ExtArgs>
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetResult<{
      times: number
      duration: number
      modelId: number
      productId: number
    }, ExtArgs["result"]["modelInProduct"]>
    composites: {}
  }


  type ModelInProductGetPayload<S extends boolean | null | undefined | ModelInProductDefaultArgs> = $Result.GetResult<Prisma.$ModelInProductPayload, S>

  type ModelInProductCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<ModelInProductFindManyArgs, 'select' | 'include'> & {
      select?: ModelInProductCountAggregateInputType | true
    }

  export interface ModelInProductDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ModelInProduct'], meta: { name: 'ModelInProduct' } }
    /**
     * Find zero or one ModelInProduct that matches the filter.
     * @param {ModelInProductFindUniqueArgs} args - Arguments to find a ModelInProduct
     * @example
     * // Get one ModelInProduct
     * const modelInProduct = await prisma.modelInProduct.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ModelInProductFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ModelInProductFindUniqueArgs<ExtArgs>>
    ): Prisma__ModelInProductClient<$Result.GetResult<Prisma.$ModelInProductPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one ModelInProduct that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ModelInProductFindUniqueOrThrowArgs} args - Arguments to find a ModelInProduct
     * @example
     * // Get one ModelInProduct
     * const modelInProduct = await prisma.modelInProduct.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ModelInProductFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ModelInProductFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ModelInProductClient<$Result.GetResult<Prisma.$ModelInProductPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first ModelInProduct that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModelInProductFindFirstArgs} args - Arguments to find a ModelInProduct
     * @example
     * // Get one ModelInProduct
     * const modelInProduct = await prisma.modelInProduct.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ModelInProductFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ModelInProductFindFirstArgs<ExtArgs>>
    ): Prisma__ModelInProductClient<$Result.GetResult<Prisma.$ModelInProductPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first ModelInProduct that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModelInProductFindFirstOrThrowArgs} args - Arguments to find a ModelInProduct
     * @example
     * // Get one ModelInProduct
     * const modelInProduct = await prisma.modelInProduct.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ModelInProductFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ModelInProductFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ModelInProductClient<$Result.GetResult<Prisma.$ModelInProductPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more ModelInProducts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModelInProductFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ModelInProducts
     * const modelInProducts = await prisma.modelInProduct.findMany()
     * 
     * // Get first 10 ModelInProducts
     * const modelInProducts = await prisma.modelInProduct.findMany({ take: 10 })
     * 
     * // Only select the `times`
     * const modelInProductWithTimesOnly = await prisma.modelInProduct.findMany({ select: { times: true } })
     * 
    **/
    findMany<T extends ModelInProductFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ModelInProductFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModelInProductPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a ModelInProduct.
     * @param {ModelInProductCreateArgs} args - Arguments to create a ModelInProduct.
     * @example
     * // Create one ModelInProduct
     * const ModelInProduct = await prisma.modelInProduct.create({
     *   data: {
     *     // ... data to create a ModelInProduct
     *   }
     * })
     * 
    **/
    create<T extends ModelInProductCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ModelInProductCreateArgs<ExtArgs>>
    ): Prisma__ModelInProductClient<$Result.GetResult<Prisma.$ModelInProductPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many ModelInProducts.
     *     @param {ModelInProductCreateManyArgs} args - Arguments to create many ModelInProducts.
     *     @example
     *     // Create many ModelInProducts
     *     const modelInProduct = await prisma.modelInProduct.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ModelInProductCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ModelInProductCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ModelInProduct.
     * @param {ModelInProductDeleteArgs} args - Arguments to delete one ModelInProduct.
     * @example
     * // Delete one ModelInProduct
     * const ModelInProduct = await prisma.modelInProduct.delete({
     *   where: {
     *     // ... filter to delete one ModelInProduct
     *   }
     * })
     * 
    **/
    delete<T extends ModelInProductDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ModelInProductDeleteArgs<ExtArgs>>
    ): Prisma__ModelInProductClient<$Result.GetResult<Prisma.$ModelInProductPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one ModelInProduct.
     * @param {ModelInProductUpdateArgs} args - Arguments to update one ModelInProduct.
     * @example
     * // Update one ModelInProduct
     * const modelInProduct = await prisma.modelInProduct.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ModelInProductUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ModelInProductUpdateArgs<ExtArgs>>
    ): Prisma__ModelInProductClient<$Result.GetResult<Prisma.$ModelInProductPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more ModelInProducts.
     * @param {ModelInProductDeleteManyArgs} args - Arguments to filter ModelInProducts to delete.
     * @example
     * // Delete a few ModelInProducts
     * const { count } = await prisma.modelInProduct.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ModelInProductDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ModelInProductDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ModelInProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModelInProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ModelInProducts
     * const modelInProduct = await prisma.modelInProduct.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ModelInProductUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ModelInProductUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ModelInProduct.
     * @param {ModelInProductUpsertArgs} args - Arguments to update or create a ModelInProduct.
     * @example
     * // Update or create a ModelInProduct
     * const modelInProduct = await prisma.modelInProduct.upsert({
     *   create: {
     *     // ... data to create a ModelInProduct
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ModelInProduct we want to update
     *   }
     * })
    **/
    upsert<T extends ModelInProductUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ModelInProductUpsertArgs<ExtArgs>>
    ): Prisma__ModelInProductClient<$Result.GetResult<Prisma.$ModelInProductPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of ModelInProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModelInProductCountArgs} args - Arguments to filter ModelInProducts to count.
     * @example
     * // Count the number of ModelInProducts
     * const count = await prisma.modelInProduct.count({
     *   where: {
     *     // ... the filter for the ModelInProducts we want to count
     *   }
     * })
    **/
    count<T extends ModelInProductCountArgs>(
      args?: Subset<T, ModelInProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ModelInProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ModelInProduct.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModelInProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ModelInProductAggregateArgs>(args: Subset<T, ModelInProductAggregateArgs>): Prisma.PrismaPromise<GetModelInProductAggregateType<T>>

    /**
     * Group by ModelInProduct.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModelInProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ModelInProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ModelInProductGroupByArgs['orderBy'] }
        : { orderBy?: ModelInProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ModelInProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetModelInProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ModelInProduct model
   */
  readonly fields: ModelInProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ModelInProduct.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ModelInProductClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    model<T extends ModelDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ModelDefaultArgs<ExtArgs>>): Prisma__ModelClient<$Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the ModelInProduct model
   */ 
  interface ModelInProductFieldRefs {
    readonly times: FieldRef<"ModelInProduct", 'Int'>
    readonly duration: FieldRef<"ModelInProduct", 'Int'>
    readonly modelId: FieldRef<"ModelInProduct", 'Int'>
    readonly productId: FieldRef<"ModelInProduct", 'Int'>
  }
    

  // Custom InputTypes

  /**
   * ModelInProduct findUnique
   */
  export type ModelInProductFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModelInProduct
     */
    select?: ModelInProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModelInProductInclude<ExtArgs> | null
    /**
     * Filter, which ModelInProduct to fetch.
     */
    where: ModelInProductWhereUniqueInput
  }


  /**
   * ModelInProduct findUniqueOrThrow
   */
  export type ModelInProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModelInProduct
     */
    select?: ModelInProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModelInProductInclude<ExtArgs> | null
    /**
     * Filter, which ModelInProduct to fetch.
     */
    where: ModelInProductWhereUniqueInput
  }


  /**
   * ModelInProduct findFirst
   */
  export type ModelInProductFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModelInProduct
     */
    select?: ModelInProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModelInProductInclude<ExtArgs> | null
    /**
     * Filter, which ModelInProduct to fetch.
     */
    where?: ModelInProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModelInProducts to fetch.
     */
    orderBy?: ModelInProductOrderByWithRelationInput | ModelInProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ModelInProducts.
     */
    cursor?: ModelInProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModelInProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModelInProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ModelInProducts.
     */
    distinct?: ModelInProductScalarFieldEnum | ModelInProductScalarFieldEnum[]
  }


  /**
   * ModelInProduct findFirstOrThrow
   */
  export type ModelInProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModelInProduct
     */
    select?: ModelInProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModelInProductInclude<ExtArgs> | null
    /**
     * Filter, which ModelInProduct to fetch.
     */
    where?: ModelInProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModelInProducts to fetch.
     */
    orderBy?: ModelInProductOrderByWithRelationInput | ModelInProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ModelInProducts.
     */
    cursor?: ModelInProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModelInProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModelInProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ModelInProducts.
     */
    distinct?: ModelInProductScalarFieldEnum | ModelInProductScalarFieldEnum[]
  }


  /**
   * ModelInProduct findMany
   */
  export type ModelInProductFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModelInProduct
     */
    select?: ModelInProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModelInProductInclude<ExtArgs> | null
    /**
     * Filter, which ModelInProducts to fetch.
     */
    where?: ModelInProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModelInProducts to fetch.
     */
    orderBy?: ModelInProductOrderByWithRelationInput | ModelInProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ModelInProducts.
     */
    cursor?: ModelInProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModelInProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModelInProducts.
     */
    skip?: number
    distinct?: ModelInProductScalarFieldEnum | ModelInProductScalarFieldEnum[]
  }


  /**
   * ModelInProduct create
   */
  export type ModelInProductCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModelInProduct
     */
    select?: ModelInProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModelInProductInclude<ExtArgs> | null
    /**
     * The data needed to create a ModelInProduct.
     */
    data: XOR<ModelInProductCreateInput, ModelInProductUncheckedCreateInput>
  }


  /**
   * ModelInProduct createMany
   */
  export type ModelInProductCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ModelInProducts.
     */
    data: ModelInProductCreateManyInput | ModelInProductCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * ModelInProduct update
   */
  export type ModelInProductUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModelInProduct
     */
    select?: ModelInProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModelInProductInclude<ExtArgs> | null
    /**
     * The data needed to update a ModelInProduct.
     */
    data: XOR<ModelInProductUpdateInput, ModelInProductUncheckedUpdateInput>
    /**
     * Choose, which ModelInProduct to update.
     */
    where: ModelInProductWhereUniqueInput
  }


  /**
   * ModelInProduct updateMany
   */
  export type ModelInProductUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ModelInProducts.
     */
    data: XOR<ModelInProductUpdateManyMutationInput, ModelInProductUncheckedUpdateManyInput>
    /**
     * Filter which ModelInProducts to update
     */
    where?: ModelInProductWhereInput
  }


  /**
   * ModelInProduct upsert
   */
  export type ModelInProductUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModelInProduct
     */
    select?: ModelInProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModelInProductInclude<ExtArgs> | null
    /**
     * The filter to search for the ModelInProduct to update in case it exists.
     */
    where: ModelInProductWhereUniqueInput
    /**
     * In case the ModelInProduct found by the `where` argument doesn't exist, create a new ModelInProduct with this data.
     */
    create: XOR<ModelInProductCreateInput, ModelInProductUncheckedCreateInput>
    /**
     * In case the ModelInProduct was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ModelInProductUpdateInput, ModelInProductUncheckedUpdateInput>
  }


  /**
   * ModelInProduct delete
   */
  export type ModelInProductDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModelInProduct
     */
    select?: ModelInProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModelInProductInclude<ExtArgs> | null
    /**
     * Filter which ModelInProduct to delete.
     */
    where: ModelInProductWhereUniqueInput
  }


  /**
   * ModelInProduct deleteMany
   */
  export type ModelInProductDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which ModelInProducts to delete
     */
    where?: ModelInProductWhereInput
  }


  /**
   * ModelInProduct without action
   */
  export type ModelInProductDefaultArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModelInProduct
     */
    select?: ModelInProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModelInProductInclude<ExtArgs> | null
  }



  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryAvgAggregateOutputType = {
    id: number | null
  }

  export type CategorySumAggregateOutputType = {
    id: number | null
  }

  export type CategoryMinAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type CategoryAvgAggregateInputType = {
    id?: true
  }

  export type CategorySumAggregateInputType = {
    id?: true
  }

  export type CategoryMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _avg?: CategoryAvgAggregateInputType
    _sum?: CategorySumAggregateInputType
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: number
    name: string
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    products?: boolean | Category$productsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type CategoryInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    products?: boolean | Category$productsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $CategoryPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      products: Prisma.$ProductPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetResult<{
      id: number
      name: string
    }, ExtArgs["result"]["category"]>
    composites: {}
  }


  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<CategoryFindManyArgs, 'select' | 'include'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends CategoryFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>
    ): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Category that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends CategoryFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>
    ): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends CategoryFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
    **/
    create<T extends CategoryCreateArgs<ExtArgs>>(
      args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>
    ): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Categories.
     *     @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     *     @example
     *     // Create many Categories
     *     const category = await prisma.category.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends CategoryCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
    **/
    delete<T extends CategoryDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>
    ): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends CategoryUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>
    ): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends CategoryDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends CategoryUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
    **/
    upsert<T extends CategoryUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>
    ): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    products<T extends Category$productsArgs<ExtArgs> = {}>(args?: Subset<T, Category$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Category model
   */ 
  interface CategoryFieldRefs {
    readonly id: FieldRef<"Category", 'Int'>
    readonly name: FieldRef<"Category", 'String'>
  }
    

  // Custom InputTypes

  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }


  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }


  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }


  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }


  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }


  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }


  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }


  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
  }


  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }


  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }


  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
  }


  /**
   * Category.products
   */
  export type Category$productsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    cursor?: ProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }


  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CategoryInclude<ExtArgs> | null
  }



  /**
   * Model Order
   */

  export type AggregateOrder = {
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  export type OrderAvgAggregateOutputType = {
    count: number | null
    amount: number | null
    userId: number | null
    productId: number | null
  }

  export type OrderSumAggregateOutputType = {
    count: number | null
    amount: number | null
    userId: number | null
    productId: number | null
  }

  export type OrderMinAggregateOutputType = {
    id: string | null
    type: $Enums.OrderType | null
    status: $Enums.OrderStatus | null
    count: number | null
    amount: number | null
    startAt: Date | null
    endAt: Date | null
    isCurrent: boolean | null
    userId: number | null
    productId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderMaxAggregateOutputType = {
    id: string | null
    type: $Enums.OrderType | null
    status: $Enums.OrderStatus | null
    count: number | null
    amount: number | null
    startAt: Date | null
    endAt: Date | null
    isCurrent: boolean | null
    userId: number | null
    productId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderCountAggregateOutputType = {
    id: number
    type: number
    status: number
    count: number
    amount: number
    startAt: number
    endAt: number
    isCurrent: number
    userId: number
    productId: number
    createdAt: number
    updatedAt: number
    rawData: number
    _all: number
  }


  export type OrderAvgAggregateInputType = {
    count?: true
    amount?: true
    userId?: true
    productId?: true
  }

  export type OrderSumAggregateInputType = {
    count?: true
    amount?: true
    userId?: true
    productId?: true
  }

  export type OrderMinAggregateInputType = {
    id?: true
    type?: true
    status?: true
    count?: true
    amount?: true
    startAt?: true
    endAt?: true
    isCurrent?: true
    userId?: true
    productId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderMaxAggregateInputType = {
    id?: true
    type?: true
    status?: true
    count?: true
    amount?: true
    startAt?: true
    endAt?: true
    isCurrent?: true
    userId?: true
    productId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderCountAggregateInputType = {
    id?: true
    type?: true
    status?: true
    count?: true
    amount?: true
    startAt?: true
    endAt?: true
    isCurrent?: true
    userId?: true
    productId?: true
    createdAt?: true
    updatedAt?: true
    rawData?: true
    _all?: true
  }

  export type OrderAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Order to aggregate.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Orders
    **/
    _count?: true | OrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderMaxAggregateInputType
  }

  export type GetOrderAggregateType<T extends OrderAggregateArgs> = {
        [P in keyof T & keyof AggregateOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrder[P]>
      : GetScalarType<T[P], AggregateOrder[P]>
  }




  export type OrderGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithAggregationInput | OrderOrderByWithAggregationInput[]
    by: OrderScalarFieldEnum[] | OrderScalarFieldEnum
    having?: OrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderCountAggregateInputType | true
    _avg?: OrderAvgAggregateInputType
    _sum?: OrderSumAggregateInputType
    _min?: OrderMinAggregateInputType
    _max?: OrderMaxAggregateInputType
  }

  export type OrderGroupByOutputType = {
    id: string
    type: $Enums.OrderType
    status: $Enums.OrderStatus
    count: number
    amount: number
    startAt: Date | null
    endAt: Date | null
    isCurrent: boolean
    userId: number
    productId: number
    createdAt: Date
    updatedAt: Date
    rawData: JsonValue | null
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  type GetOrderGroupByPayload<T extends OrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderGroupByOutputType[P]>
            : GetScalarType<T[P], OrderGroupByOutputType[P]>
        }
      >
    >


  export type OrderSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    status?: boolean
    count?: boolean
    amount?: boolean
    startAt?: boolean
    endAt?: boolean
    isCurrent?: boolean
    userId?: boolean
    productId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    rawData?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectScalar = {
    id?: boolean
    type?: boolean
    status?: boolean
    count?: boolean
    amount?: boolean
    startAt?: boolean
    endAt?: boolean
    isCurrent?: boolean
    userId?: boolean
    productId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    rawData?: boolean
  }

  export type OrderInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }


  export type $OrderPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    name: "Order"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetResult<{
      id: string
      type: $Enums.OrderType
      status: $Enums.OrderStatus
      count: number
      amount: number
      startAt: Date | null
      endAt: Date | null
      isCurrent: boolean
      userId: number
      productId: number
      createdAt: Date
      updatedAt: Date
      rawData: Prisma.JsonValue | null
    }, ExtArgs["result"]["order"]>
    composites: {}
  }


  type OrderGetPayload<S extends boolean | null | undefined | OrderDefaultArgs> = $Result.GetResult<Prisma.$OrderPayload, S>

  type OrderCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<OrderFindManyArgs, 'select' | 'include'> & {
      select?: OrderCountAggregateInputType | true
    }

  export interface OrderDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Order'], meta: { name: 'Order' } }
    /**
     * Find zero or one Order that matches the filter.
     * @param {OrderFindUniqueArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends OrderFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, OrderFindUniqueArgs<ExtArgs>>
    ): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Order that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {OrderFindUniqueOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends OrderFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, OrderFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Order that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends OrderFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, OrderFindFirstArgs<ExtArgs>>
    ): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Order that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends OrderFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, OrderFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Orders
     * const orders = await prisma.order.findMany()
     * 
     * // Get first 10 Orders
     * const orders = await prisma.order.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderWithIdOnly = await prisma.order.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends OrderFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, OrderFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Order.
     * @param {OrderCreateArgs} args - Arguments to create a Order.
     * @example
     * // Create one Order
     * const Order = await prisma.order.create({
     *   data: {
     *     // ... data to create a Order
     *   }
     * })
     * 
    **/
    create<T extends OrderCreateArgs<ExtArgs>>(
      args: SelectSubset<T, OrderCreateArgs<ExtArgs>>
    ): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Orders.
     *     @param {OrderCreateManyArgs} args - Arguments to create many Orders.
     *     @example
     *     // Create many Orders
     *     const order = await prisma.order.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends OrderCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, OrderCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Order.
     * @param {OrderDeleteArgs} args - Arguments to delete one Order.
     * @example
     * // Delete one Order
     * const Order = await prisma.order.delete({
     *   where: {
     *     // ... filter to delete one Order
     *   }
     * })
     * 
    **/
    delete<T extends OrderDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, OrderDeleteArgs<ExtArgs>>
    ): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Order.
     * @param {OrderUpdateArgs} args - Arguments to update one Order.
     * @example
     * // Update one Order
     * const order = await prisma.order.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends OrderUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, OrderUpdateArgs<ExtArgs>>
    ): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Orders.
     * @param {OrderDeleteManyArgs} args - Arguments to filter Orders to delete.
     * @example
     * // Delete a few Orders
     * const { count } = await prisma.order.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends OrderDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, OrderDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends OrderUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, OrderUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Order.
     * @param {OrderUpsertArgs} args - Arguments to update or create a Order.
     * @example
     * // Update or create a Order
     * const order = await prisma.order.upsert({
     *   create: {
     *     // ... data to create a Order
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Order we want to update
     *   }
     * })
    **/
    upsert<T extends OrderUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, OrderUpsertArgs<ExtArgs>>
    ): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderCountArgs} args - Arguments to filter Orders to count.
     * @example
     * // Count the number of Orders
     * const count = await prisma.order.count({
     *   where: {
     *     // ... the filter for the Orders we want to count
     *   }
     * })
    **/
    count<T extends OrderCountArgs>(
      args?: Subset<T, OrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderAggregateArgs>(args: Subset<T, OrderAggregateArgs>): Prisma.PrismaPromise<GetOrderAggregateType<T>>

    /**
     * Group by Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderGroupByArgs['orderBy'] }
        : { orderBy?: OrderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Order model
   */
  readonly fields: OrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Order.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Order model
   */ 
  interface OrderFieldRefs {
    readonly id: FieldRef<"Order", 'String'>
    readonly type: FieldRef<"Order", 'OrderType'>
    readonly status: FieldRef<"Order", 'OrderStatus'>
    readonly count: FieldRef<"Order", 'Int'>
    readonly amount: FieldRef<"Order", 'Int'>
    readonly startAt: FieldRef<"Order", 'DateTime'>
    readonly endAt: FieldRef<"Order", 'DateTime'>
    readonly isCurrent: FieldRef<"Order", 'Boolean'>
    readonly userId: FieldRef<"Order", 'Int'>
    readonly productId: FieldRef<"Order", 'Int'>
    readonly createdAt: FieldRef<"Order", 'DateTime'>
    readonly updatedAt: FieldRef<"Order", 'DateTime'>
    readonly rawData: FieldRef<"Order", 'Json'>
  }
    

  // Custom InputTypes

  /**
   * Order findUnique
   */
  export type OrderFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }


  /**
   * Order findUniqueOrThrow
   */
  export type OrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }


  /**
   * Order findFirst
   */
  export type OrderFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }


  /**
   * Order findFirstOrThrow
   */
  export type OrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }


  /**
   * Order findMany
   */
  export type OrderFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Orders to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }


  /**
   * Order create
   */
  export type OrderCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to create a Order.
     */
    data: XOR<OrderCreateInput, OrderUncheckedCreateInput>
  }


  /**
   * Order createMany
   */
  export type OrderCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Order update
   */
  export type OrderUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to update a Order.
     */
    data: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
    /**
     * Choose, which Order to update.
     */
    where: OrderWhereUniqueInput
  }


  /**
   * Order updateMany
   */
  export type OrderUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
  }


  /**
   * Order upsert
   */
  export type OrderUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The filter to search for the Order to update in case it exists.
     */
    where: OrderWhereUniqueInput
    /**
     * In case the Order found by the `where` argument doesn't exist, create a new Order with this data.
     */
    create: XOR<OrderCreateInput, OrderUncheckedCreateInput>
    /**
     * In case the Order was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
  }


  /**
   * Order delete
   */
  export type OrderDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter which Order to delete.
     */
    where: OrderWhereUniqueInput
  }


  /**
   * Order deleteMany
   */
  export type OrderDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Orders to delete
     */
    where?: OrderWhereInput
  }


  /**
   * Order without action
   */
  export type OrderDefaultArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrderInclude<ExtArgs> | null
  }



  /**
   * Model OpenAIKey
   */

  export type AggregateOpenAIKey = {
    _count: OpenAIKeyCountAggregateOutputType | null
    _avg: OpenAIKeyAvgAggregateOutputType | null
    _sum: OpenAIKeySumAggregateOutputType | null
    _min: OpenAIKeyMinAggregateOutputType | null
    _max: OpenAIKeyMaxAggregateOutputType | null
  }

  export type OpenAIKeyAvgAggregateOutputType = {
    weight: number | null
  }

  export type OpenAIKeySumAggregateOutputType = {
    weight: number | null
  }

  export type OpenAIKeyMinAggregateOutputType = {
    key: string | null
    weight: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OpenAIKeyMaxAggregateOutputType = {
    key: string | null
    weight: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OpenAIKeyCountAggregateOutputType = {
    key: number
    weight: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OpenAIKeyAvgAggregateInputType = {
    weight?: true
  }

  export type OpenAIKeySumAggregateInputType = {
    weight?: true
  }

  export type OpenAIKeyMinAggregateInputType = {
    key?: true
    weight?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OpenAIKeyMaxAggregateInputType = {
    key?: true
    weight?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OpenAIKeyCountAggregateInputType = {
    key?: true
    weight?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OpenAIKeyAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which OpenAIKey to aggregate.
     */
    where?: OpenAIKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OpenAIKeys to fetch.
     */
    orderBy?: OpenAIKeyOrderByWithRelationInput | OpenAIKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OpenAIKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OpenAIKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OpenAIKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OpenAIKeys
    **/
    _count?: true | OpenAIKeyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OpenAIKeyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OpenAIKeySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OpenAIKeyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OpenAIKeyMaxAggregateInputType
  }

  export type GetOpenAIKeyAggregateType<T extends OpenAIKeyAggregateArgs> = {
        [P in keyof T & keyof AggregateOpenAIKey]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOpenAIKey[P]>
      : GetScalarType<T[P], AggregateOpenAIKey[P]>
  }




  export type OpenAIKeyGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: OpenAIKeyWhereInput
    orderBy?: OpenAIKeyOrderByWithAggregationInput | OpenAIKeyOrderByWithAggregationInput[]
    by: OpenAIKeyScalarFieldEnum[] | OpenAIKeyScalarFieldEnum
    having?: OpenAIKeyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OpenAIKeyCountAggregateInputType | true
    _avg?: OpenAIKeyAvgAggregateInputType
    _sum?: OpenAIKeySumAggregateInputType
    _min?: OpenAIKeyMinAggregateInputType
    _max?: OpenAIKeyMaxAggregateInputType
  }

  export type OpenAIKeyGroupByOutputType = {
    key: string
    weight: number
    createdAt: Date
    updatedAt: Date
    _count: OpenAIKeyCountAggregateOutputType | null
    _avg: OpenAIKeyAvgAggregateOutputType | null
    _sum: OpenAIKeySumAggregateOutputType | null
    _min: OpenAIKeyMinAggregateOutputType | null
    _max: OpenAIKeyMaxAggregateOutputType | null
  }

  type GetOpenAIKeyGroupByPayload<T extends OpenAIKeyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OpenAIKeyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OpenAIKeyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OpenAIKeyGroupByOutputType[P]>
            : GetScalarType<T[P], OpenAIKeyGroupByOutputType[P]>
        }
      >
    >


  export type OpenAIKeySelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    weight?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["openAIKey"]>

  export type OpenAIKeySelectScalar = {
    key?: boolean
    weight?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $OpenAIKeyPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    name: "OpenAIKey"
    objects: {}
    scalars: $Extensions.GetResult<{
      key: string
      weight: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["openAIKey"]>
    composites: {}
  }


  type OpenAIKeyGetPayload<S extends boolean | null | undefined | OpenAIKeyDefaultArgs> = $Result.GetResult<Prisma.$OpenAIKeyPayload, S>

  type OpenAIKeyCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<OpenAIKeyFindManyArgs, 'select' | 'include'> & {
      select?: OpenAIKeyCountAggregateInputType | true
    }

  export interface OpenAIKeyDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OpenAIKey'], meta: { name: 'OpenAIKey' } }
    /**
     * Find zero or one OpenAIKey that matches the filter.
     * @param {OpenAIKeyFindUniqueArgs} args - Arguments to find a OpenAIKey
     * @example
     * // Get one OpenAIKey
     * const openAIKey = await prisma.openAIKey.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends OpenAIKeyFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, OpenAIKeyFindUniqueArgs<ExtArgs>>
    ): Prisma__OpenAIKeyClient<$Result.GetResult<Prisma.$OpenAIKeyPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one OpenAIKey that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {OpenAIKeyFindUniqueOrThrowArgs} args - Arguments to find a OpenAIKey
     * @example
     * // Get one OpenAIKey
     * const openAIKey = await prisma.openAIKey.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends OpenAIKeyFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, OpenAIKeyFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__OpenAIKeyClient<$Result.GetResult<Prisma.$OpenAIKeyPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first OpenAIKey that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OpenAIKeyFindFirstArgs} args - Arguments to find a OpenAIKey
     * @example
     * // Get one OpenAIKey
     * const openAIKey = await prisma.openAIKey.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends OpenAIKeyFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, OpenAIKeyFindFirstArgs<ExtArgs>>
    ): Prisma__OpenAIKeyClient<$Result.GetResult<Prisma.$OpenAIKeyPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first OpenAIKey that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OpenAIKeyFindFirstOrThrowArgs} args - Arguments to find a OpenAIKey
     * @example
     * // Get one OpenAIKey
     * const openAIKey = await prisma.openAIKey.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends OpenAIKeyFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, OpenAIKeyFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__OpenAIKeyClient<$Result.GetResult<Prisma.$OpenAIKeyPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more OpenAIKeys that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OpenAIKeyFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OpenAIKeys
     * const openAIKeys = await prisma.openAIKey.findMany()
     * 
     * // Get first 10 OpenAIKeys
     * const openAIKeys = await prisma.openAIKey.findMany({ take: 10 })
     * 
     * // Only select the `key`
     * const openAIKeyWithKeyOnly = await prisma.openAIKey.findMany({ select: { key: true } })
     * 
    **/
    findMany<T extends OpenAIKeyFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, OpenAIKeyFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OpenAIKeyPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a OpenAIKey.
     * @param {OpenAIKeyCreateArgs} args - Arguments to create a OpenAIKey.
     * @example
     * // Create one OpenAIKey
     * const OpenAIKey = await prisma.openAIKey.create({
     *   data: {
     *     // ... data to create a OpenAIKey
     *   }
     * })
     * 
    **/
    create<T extends OpenAIKeyCreateArgs<ExtArgs>>(
      args: SelectSubset<T, OpenAIKeyCreateArgs<ExtArgs>>
    ): Prisma__OpenAIKeyClient<$Result.GetResult<Prisma.$OpenAIKeyPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many OpenAIKeys.
     *     @param {OpenAIKeyCreateManyArgs} args - Arguments to create many OpenAIKeys.
     *     @example
     *     // Create many OpenAIKeys
     *     const openAIKey = await prisma.openAIKey.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends OpenAIKeyCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, OpenAIKeyCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a OpenAIKey.
     * @param {OpenAIKeyDeleteArgs} args - Arguments to delete one OpenAIKey.
     * @example
     * // Delete one OpenAIKey
     * const OpenAIKey = await prisma.openAIKey.delete({
     *   where: {
     *     // ... filter to delete one OpenAIKey
     *   }
     * })
     * 
    **/
    delete<T extends OpenAIKeyDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, OpenAIKeyDeleteArgs<ExtArgs>>
    ): Prisma__OpenAIKeyClient<$Result.GetResult<Prisma.$OpenAIKeyPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one OpenAIKey.
     * @param {OpenAIKeyUpdateArgs} args - Arguments to update one OpenAIKey.
     * @example
     * // Update one OpenAIKey
     * const openAIKey = await prisma.openAIKey.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends OpenAIKeyUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, OpenAIKeyUpdateArgs<ExtArgs>>
    ): Prisma__OpenAIKeyClient<$Result.GetResult<Prisma.$OpenAIKeyPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more OpenAIKeys.
     * @param {OpenAIKeyDeleteManyArgs} args - Arguments to filter OpenAIKeys to delete.
     * @example
     * // Delete a few OpenAIKeys
     * const { count } = await prisma.openAIKey.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends OpenAIKeyDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, OpenAIKeyDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OpenAIKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OpenAIKeyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OpenAIKeys
     * const openAIKey = await prisma.openAIKey.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends OpenAIKeyUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, OpenAIKeyUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one OpenAIKey.
     * @param {OpenAIKeyUpsertArgs} args - Arguments to update or create a OpenAIKey.
     * @example
     * // Update or create a OpenAIKey
     * const openAIKey = await prisma.openAIKey.upsert({
     *   create: {
     *     // ... data to create a OpenAIKey
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OpenAIKey we want to update
     *   }
     * })
    **/
    upsert<T extends OpenAIKeyUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, OpenAIKeyUpsertArgs<ExtArgs>>
    ): Prisma__OpenAIKeyClient<$Result.GetResult<Prisma.$OpenAIKeyPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of OpenAIKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OpenAIKeyCountArgs} args - Arguments to filter OpenAIKeys to count.
     * @example
     * // Count the number of OpenAIKeys
     * const count = await prisma.openAIKey.count({
     *   where: {
     *     // ... the filter for the OpenAIKeys we want to count
     *   }
     * })
    **/
    count<T extends OpenAIKeyCountArgs>(
      args?: Subset<T, OpenAIKeyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OpenAIKeyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OpenAIKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OpenAIKeyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OpenAIKeyAggregateArgs>(args: Subset<T, OpenAIKeyAggregateArgs>): Prisma.PrismaPromise<GetOpenAIKeyAggregateType<T>>

    /**
     * Group by OpenAIKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OpenAIKeyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OpenAIKeyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OpenAIKeyGroupByArgs['orderBy'] }
        : { orderBy?: OpenAIKeyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OpenAIKeyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOpenAIKeyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OpenAIKey model
   */
  readonly fields: OpenAIKeyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OpenAIKey.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OpenAIKeyClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';


    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the OpenAIKey model
   */ 
  interface OpenAIKeyFieldRefs {
    readonly key: FieldRef<"OpenAIKey", 'String'>
    readonly weight: FieldRef<"OpenAIKey", 'Int'>
    readonly createdAt: FieldRef<"OpenAIKey", 'DateTime'>
    readonly updatedAt: FieldRef<"OpenAIKey", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * OpenAIKey findUnique
   */
  export type OpenAIKeyFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpenAIKey
     */
    select?: OpenAIKeySelect<ExtArgs> | null
    /**
     * Filter, which OpenAIKey to fetch.
     */
    where: OpenAIKeyWhereUniqueInput
  }


  /**
   * OpenAIKey findUniqueOrThrow
   */
  export type OpenAIKeyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpenAIKey
     */
    select?: OpenAIKeySelect<ExtArgs> | null
    /**
     * Filter, which OpenAIKey to fetch.
     */
    where: OpenAIKeyWhereUniqueInput
  }


  /**
   * OpenAIKey findFirst
   */
  export type OpenAIKeyFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpenAIKey
     */
    select?: OpenAIKeySelect<ExtArgs> | null
    /**
     * Filter, which OpenAIKey to fetch.
     */
    where?: OpenAIKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OpenAIKeys to fetch.
     */
    orderBy?: OpenAIKeyOrderByWithRelationInput | OpenAIKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OpenAIKeys.
     */
    cursor?: OpenAIKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OpenAIKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OpenAIKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OpenAIKeys.
     */
    distinct?: OpenAIKeyScalarFieldEnum | OpenAIKeyScalarFieldEnum[]
  }


  /**
   * OpenAIKey findFirstOrThrow
   */
  export type OpenAIKeyFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpenAIKey
     */
    select?: OpenAIKeySelect<ExtArgs> | null
    /**
     * Filter, which OpenAIKey to fetch.
     */
    where?: OpenAIKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OpenAIKeys to fetch.
     */
    orderBy?: OpenAIKeyOrderByWithRelationInput | OpenAIKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OpenAIKeys.
     */
    cursor?: OpenAIKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OpenAIKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OpenAIKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OpenAIKeys.
     */
    distinct?: OpenAIKeyScalarFieldEnum | OpenAIKeyScalarFieldEnum[]
  }


  /**
   * OpenAIKey findMany
   */
  export type OpenAIKeyFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpenAIKey
     */
    select?: OpenAIKeySelect<ExtArgs> | null
    /**
     * Filter, which OpenAIKeys to fetch.
     */
    where?: OpenAIKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OpenAIKeys to fetch.
     */
    orderBy?: OpenAIKeyOrderByWithRelationInput | OpenAIKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OpenAIKeys.
     */
    cursor?: OpenAIKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OpenAIKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OpenAIKeys.
     */
    skip?: number
    distinct?: OpenAIKeyScalarFieldEnum | OpenAIKeyScalarFieldEnum[]
  }


  /**
   * OpenAIKey create
   */
  export type OpenAIKeyCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpenAIKey
     */
    select?: OpenAIKeySelect<ExtArgs> | null
    /**
     * The data needed to create a OpenAIKey.
     */
    data: XOR<OpenAIKeyCreateInput, OpenAIKeyUncheckedCreateInput>
  }


  /**
   * OpenAIKey createMany
   */
  export type OpenAIKeyCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OpenAIKeys.
     */
    data: OpenAIKeyCreateManyInput | OpenAIKeyCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * OpenAIKey update
   */
  export type OpenAIKeyUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpenAIKey
     */
    select?: OpenAIKeySelect<ExtArgs> | null
    /**
     * The data needed to update a OpenAIKey.
     */
    data: XOR<OpenAIKeyUpdateInput, OpenAIKeyUncheckedUpdateInput>
    /**
     * Choose, which OpenAIKey to update.
     */
    where: OpenAIKeyWhereUniqueInput
  }


  /**
   * OpenAIKey updateMany
   */
  export type OpenAIKeyUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OpenAIKeys.
     */
    data: XOR<OpenAIKeyUpdateManyMutationInput, OpenAIKeyUncheckedUpdateManyInput>
    /**
     * Filter which OpenAIKeys to update
     */
    where?: OpenAIKeyWhereInput
  }


  /**
   * OpenAIKey upsert
   */
  export type OpenAIKeyUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpenAIKey
     */
    select?: OpenAIKeySelect<ExtArgs> | null
    /**
     * The filter to search for the OpenAIKey to update in case it exists.
     */
    where: OpenAIKeyWhereUniqueInput
    /**
     * In case the OpenAIKey found by the `where` argument doesn't exist, create a new OpenAIKey with this data.
     */
    create: XOR<OpenAIKeyCreateInput, OpenAIKeyUncheckedCreateInput>
    /**
     * In case the OpenAIKey was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OpenAIKeyUpdateInput, OpenAIKeyUncheckedUpdateInput>
  }


  /**
   * OpenAIKey delete
   */
  export type OpenAIKeyDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpenAIKey
     */
    select?: OpenAIKeySelect<ExtArgs> | null
    /**
     * Filter which OpenAIKey to delete.
     */
    where: OpenAIKeyWhereUniqueInput
  }


  /**
   * OpenAIKey deleteMany
   */
  export type OpenAIKeyDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which OpenAIKeys to delete
     */
    where?: OpenAIKeyWhereInput
  }


  /**
   * OpenAIKey without action
   */
  export type OpenAIKeyDefaultArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OpenAIKey
     */
    select?: OpenAIKeySelect<ExtArgs> | null
  }



  /**
   * Model RateLimit
   */

  export type AggregateRateLimit = {
    _count: RateLimitCountAggregateOutputType | null
    _avg: RateLimitAvgAggregateOutputType | null
    _sum: RateLimitSumAggregateOutputType | null
    _min: RateLimitMinAggregateOutputType | null
    _max: RateLimitMaxAggregateOutputType | null
  }

  export type RateLimitAvgAggregateOutputType = {
    value: number | null
  }

  export type RateLimitSumAggregateOutputType = {
    value: number[]
  }

  export type RateLimitMinAggregateOutputType = {
    key: string | null
  }

  export type RateLimitMaxAggregateOutputType = {
    key: string | null
  }

  export type RateLimitCountAggregateOutputType = {
    key: number
    value: number
    _all: number
  }


  export type RateLimitAvgAggregateInputType = {
    value?: true
  }

  export type RateLimitSumAggregateInputType = {
    value?: true
  }

  export type RateLimitMinAggregateInputType = {
    key?: true
  }

  export type RateLimitMaxAggregateInputType = {
    key?: true
  }

  export type RateLimitCountAggregateInputType = {
    key?: true
    value?: true
    _all?: true
  }

  export type RateLimitAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which RateLimit to aggregate.
     */
    where?: RateLimitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RateLimits to fetch.
     */
    orderBy?: RateLimitOrderByWithRelationInput | RateLimitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RateLimitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RateLimits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RateLimits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RateLimits
    **/
    _count?: true | RateLimitCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RateLimitAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RateLimitSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RateLimitMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RateLimitMaxAggregateInputType
  }

  export type GetRateLimitAggregateType<T extends RateLimitAggregateArgs> = {
        [P in keyof T & keyof AggregateRateLimit]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRateLimit[P]>
      : GetScalarType<T[P], AggregateRateLimit[P]>
  }




  export type RateLimitGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: RateLimitWhereInput
    orderBy?: RateLimitOrderByWithAggregationInput | RateLimitOrderByWithAggregationInput[]
    by: RateLimitScalarFieldEnum[] | RateLimitScalarFieldEnum
    having?: RateLimitScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RateLimitCountAggregateInputType | true
    _avg?: RateLimitAvgAggregateInputType
    _sum?: RateLimitSumAggregateInputType
    _min?: RateLimitMinAggregateInputType
    _max?: RateLimitMaxAggregateInputType
  }

  export type RateLimitGroupByOutputType = {
    key: string
    value: number[]
    _count: RateLimitCountAggregateOutputType | null
    _avg: RateLimitAvgAggregateOutputType | null
    _sum: RateLimitSumAggregateOutputType | null
    _min: RateLimitMinAggregateOutputType | null
    _max: RateLimitMaxAggregateOutputType | null
  }

  type GetRateLimitGroupByPayload<T extends RateLimitGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RateLimitGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RateLimitGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RateLimitGroupByOutputType[P]>
            : GetScalarType<T[P], RateLimitGroupByOutputType[P]>
        }
      >
    >


  export type RateLimitSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    value?: boolean
  }, ExtArgs["result"]["rateLimit"]>

  export type RateLimitSelectScalar = {
    key?: boolean
    value?: boolean
  }


  export type $RateLimitPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    name: "RateLimit"
    objects: {}
    scalars: $Extensions.GetResult<{
      key: string
      value: number[]
    }, ExtArgs["result"]["rateLimit"]>
    composites: {}
  }


  type RateLimitGetPayload<S extends boolean | null | undefined | RateLimitDefaultArgs> = $Result.GetResult<Prisma.$RateLimitPayload, S>

  type RateLimitCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<RateLimitFindManyArgs, 'select' | 'include'> & {
      select?: RateLimitCountAggregateInputType | true
    }

  export interface RateLimitDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RateLimit'], meta: { name: 'RateLimit' } }
    /**
     * Find zero or one RateLimit that matches the filter.
     * @param {RateLimitFindUniqueArgs} args - Arguments to find a RateLimit
     * @example
     * // Get one RateLimit
     * const rateLimit = await prisma.rateLimit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends RateLimitFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, RateLimitFindUniqueArgs<ExtArgs>>
    ): Prisma__RateLimitClient<$Result.GetResult<Prisma.$RateLimitPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one RateLimit that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {RateLimitFindUniqueOrThrowArgs} args - Arguments to find a RateLimit
     * @example
     * // Get one RateLimit
     * const rateLimit = await prisma.rateLimit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends RateLimitFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, RateLimitFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__RateLimitClient<$Result.GetResult<Prisma.$RateLimitPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first RateLimit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RateLimitFindFirstArgs} args - Arguments to find a RateLimit
     * @example
     * // Get one RateLimit
     * const rateLimit = await prisma.rateLimit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends RateLimitFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, RateLimitFindFirstArgs<ExtArgs>>
    ): Prisma__RateLimitClient<$Result.GetResult<Prisma.$RateLimitPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first RateLimit that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RateLimitFindFirstOrThrowArgs} args - Arguments to find a RateLimit
     * @example
     * // Get one RateLimit
     * const rateLimit = await prisma.rateLimit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends RateLimitFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, RateLimitFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__RateLimitClient<$Result.GetResult<Prisma.$RateLimitPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more RateLimits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RateLimitFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RateLimits
     * const rateLimits = await prisma.rateLimit.findMany()
     * 
     * // Get first 10 RateLimits
     * const rateLimits = await prisma.rateLimit.findMany({ take: 10 })
     * 
     * // Only select the `key`
     * const rateLimitWithKeyOnly = await prisma.rateLimit.findMany({ select: { key: true } })
     * 
    **/
    findMany<T extends RateLimitFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, RateLimitFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RateLimitPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a RateLimit.
     * @param {RateLimitCreateArgs} args - Arguments to create a RateLimit.
     * @example
     * // Create one RateLimit
     * const RateLimit = await prisma.rateLimit.create({
     *   data: {
     *     // ... data to create a RateLimit
     *   }
     * })
     * 
    **/
    create<T extends RateLimitCreateArgs<ExtArgs>>(
      args: SelectSubset<T, RateLimitCreateArgs<ExtArgs>>
    ): Prisma__RateLimitClient<$Result.GetResult<Prisma.$RateLimitPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many RateLimits.
     *     @param {RateLimitCreateManyArgs} args - Arguments to create many RateLimits.
     *     @example
     *     // Create many RateLimits
     *     const rateLimit = await prisma.rateLimit.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends RateLimitCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, RateLimitCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a RateLimit.
     * @param {RateLimitDeleteArgs} args - Arguments to delete one RateLimit.
     * @example
     * // Delete one RateLimit
     * const RateLimit = await prisma.rateLimit.delete({
     *   where: {
     *     // ... filter to delete one RateLimit
     *   }
     * })
     * 
    **/
    delete<T extends RateLimitDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, RateLimitDeleteArgs<ExtArgs>>
    ): Prisma__RateLimitClient<$Result.GetResult<Prisma.$RateLimitPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one RateLimit.
     * @param {RateLimitUpdateArgs} args - Arguments to update one RateLimit.
     * @example
     * // Update one RateLimit
     * const rateLimit = await prisma.rateLimit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends RateLimitUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, RateLimitUpdateArgs<ExtArgs>>
    ): Prisma__RateLimitClient<$Result.GetResult<Prisma.$RateLimitPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more RateLimits.
     * @param {RateLimitDeleteManyArgs} args - Arguments to filter RateLimits to delete.
     * @example
     * // Delete a few RateLimits
     * const { count } = await prisma.rateLimit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends RateLimitDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, RateLimitDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RateLimits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RateLimitUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RateLimits
     * const rateLimit = await prisma.rateLimit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends RateLimitUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, RateLimitUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RateLimit.
     * @param {RateLimitUpsertArgs} args - Arguments to update or create a RateLimit.
     * @example
     * // Update or create a RateLimit
     * const rateLimit = await prisma.rateLimit.upsert({
     *   create: {
     *     // ... data to create a RateLimit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RateLimit we want to update
     *   }
     * })
    **/
    upsert<T extends RateLimitUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, RateLimitUpsertArgs<ExtArgs>>
    ): Prisma__RateLimitClient<$Result.GetResult<Prisma.$RateLimitPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of RateLimits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RateLimitCountArgs} args - Arguments to filter RateLimits to count.
     * @example
     * // Count the number of RateLimits
     * const count = await prisma.rateLimit.count({
     *   where: {
     *     // ... the filter for the RateLimits we want to count
     *   }
     * })
    **/
    count<T extends RateLimitCountArgs>(
      args?: Subset<T, RateLimitCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RateLimitCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RateLimit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RateLimitAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RateLimitAggregateArgs>(args: Subset<T, RateLimitAggregateArgs>): Prisma.PrismaPromise<GetRateLimitAggregateType<T>>

    /**
     * Group by RateLimit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RateLimitGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RateLimitGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RateLimitGroupByArgs['orderBy'] }
        : { orderBy?: RateLimitGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RateLimitGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRateLimitGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RateLimit model
   */
  readonly fields: RateLimitFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RateLimit.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RateLimitClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';


    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the RateLimit model
   */ 
  interface RateLimitFieldRefs {
    readonly key: FieldRef<"RateLimit", 'String'>
    readonly value: FieldRef<"RateLimit", 'Int[]'>
  }
    

  // Custom InputTypes

  /**
   * RateLimit findUnique
   */
  export type RateLimitFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimit
     */
    select?: RateLimitSelect<ExtArgs> | null
    /**
     * Filter, which RateLimit to fetch.
     */
    where: RateLimitWhereUniqueInput
  }


  /**
   * RateLimit findUniqueOrThrow
   */
  export type RateLimitFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimit
     */
    select?: RateLimitSelect<ExtArgs> | null
    /**
     * Filter, which RateLimit to fetch.
     */
    where: RateLimitWhereUniqueInput
  }


  /**
   * RateLimit findFirst
   */
  export type RateLimitFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimit
     */
    select?: RateLimitSelect<ExtArgs> | null
    /**
     * Filter, which RateLimit to fetch.
     */
    where?: RateLimitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RateLimits to fetch.
     */
    orderBy?: RateLimitOrderByWithRelationInput | RateLimitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RateLimits.
     */
    cursor?: RateLimitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RateLimits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RateLimits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RateLimits.
     */
    distinct?: RateLimitScalarFieldEnum | RateLimitScalarFieldEnum[]
  }


  /**
   * RateLimit findFirstOrThrow
   */
  export type RateLimitFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimit
     */
    select?: RateLimitSelect<ExtArgs> | null
    /**
     * Filter, which RateLimit to fetch.
     */
    where?: RateLimitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RateLimits to fetch.
     */
    orderBy?: RateLimitOrderByWithRelationInput | RateLimitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RateLimits.
     */
    cursor?: RateLimitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RateLimits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RateLimits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RateLimits.
     */
    distinct?: RateLimitScalarFieldEnum | RateLimitScalarFieldEnum[]
  }


  /**
   * RateLimit findMany
   */
  export type RateLimitFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimit
     */
    select?: RateLimitSelect<ExtArgs> | null
    /**
     * Filter, which RateLimits to fetch.
     */
    where?: RateLimitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RateLimits to fetch.
     */
    orderBy?: RateLimitOrderByWithRelationInput | RateLimitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RateLimits.
     */
    cursor?: RateLimitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RateLimits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RateLimits.
     */
    skip?: number
    distinct?: RateLimitScalarFieldEnum | RateLimitScalarFieldEnum[]
  }


  /**
   * RateLimit create
   */
  export type RateLimitCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimit
     */
    select?: RateLimitSelect<ExtArgs> | null
    /**
     * The data needed to create a RateLimit.
     */
    data: XOR<RateLimitCreateInput, RateLimitUncheckedCreateInput>
  }


  /**
   * RateLimit createMany
   */
  export type RateLimitCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RateLimits.
     */
    data: RateLimitCreateManyInput | RateLimitCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * RateLimit update
   */
  export type RateLimitUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimit
     */
    select?: RateLimitSelect<ExtArgs> | null
    /**
     * The data needed to update a RateLimit.
     */
    data: XOR<RateLimitUpdateInput, RateLimitUncheckedUpdateInput>
    /**
     * Choose, which RateLimit to update.
     */
    where: RateLimitWhereUniqueInput
  }


  /**
   * RateLimit updateMany
   */
  export type RateLimitUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RateLimits.
     */
    data: XOR<RateLimitUpdateManyMutationInput, RateLimitUncheckedUpdateManyInput>
    /**
     * Filter which RateLimits to update
     */
    where?: RateLimitWhereInput
  }


  /**
   * RateLimit upsert
   */
  export type RateLimitUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimit
     */
    select?: RateLimitSelect<ExtArgs> | null
    /**
     * The filter to search for the RateLimit to update in case it exists.
     */
    where: RateLimitWhereUniqueInput
    /**
     * In case the RateLimit found by the `where` argument doesn't exist, create a new RateLimit with this data.
     */
    create: XOR<RateLimitCreateInput, RateLimitUncheckedCreateInput>
    /**
     * In case the RateLimit was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RateLimitUpdateInput, RateLimitUncheckedUpdateInput>
  }


  /**
   * RateLimit delete
   */
  export type RateLimitDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimit
     */
    select?: RateLimitSelect<ExtArgs> | null
    /**
     * Filter which RateLimit to delete.
     */
    where: RateLimitWhereUniqueInput
  }


  /**
   * RateLimit deleteMany
   */
  export type RateLimitDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which RateLimits to delete
     */
    where?: RateLimitWhereInput
  }


  /**
   * RateLimit without action
   */
  export type RateLimitDefaultArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimit
     */
    select?: RateLimitSelect<ExtArgs> | null
  }



  /**
   * Model ChatSession
   */

  export type AggregateChatSession = {
    _count: ChatSessionCountAggregateOutputType | null
    _avg: ChatSessionAvgAggregateOutputType | null
    _sum: ChatSessionSumAggregateOutputType | null
    _min: ChatSessionMinAggregateOutputType | null
    _max: ChatSessionMaxAggregateOutputType | null
  }

  export type ChatSessionAvgAggregateOutputType = {
    lastSummarizeIndex: number | null
    userId: number | null
  }

  export type ChatSessionSumAggregateOutputType = {
    lastSummarizeIndex: number | null
    userId: number | null
  }

  export type ChatSessionMinAggregateOutputType = {
    id: string | null
    topic: string | null
    lastSummarizeIndex: number | null
    memoryPrompt: string | null
    userId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ChatSessionMaxAggregateOutputType = {
    id: string | null
    topic: string | null
    lastSummarizeIndex: number | null
    memoryPrompt: string | null
    userId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ChatSessionCountAggregateOutputType = {
    id: number
    topic: number
    lastSummarizeIndex: number
    memoryPrompt: number
    userId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ChatSessionAvgAggregateInputType = {
    lastSummarizeIndex?: true
    userId?: true
  }

  export type ChatSessionSumAggregateInputType = {
    lastSummarizeIndex?: true
    userId?: true
  }

  export type ChatSessionMinAggregateInputType = {
    id?: true
    topic?: true
    lastSummarizeIndex?: true
    memoryPrompt?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ChatSessionMaxAggregateInputType = {
    id?: true
    topic?: true
    lastSummarizeIndex?: true
    memoryPrompt?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ChatSessionCountAggregateInputType = {
    id?: true
    topic?: true
    lastSummarizeIndex?: true
    memoryPrompt?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ChatSessionAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatSession to aggregate.
     */
    where?: ChatSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatSessions to fetch.
     */
    orderBy?: ChatSessionOrderByWithRelationInput | ChatSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChatSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ChatSessions
    **/
    _count?: true | ChatSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ChatSessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ChatSessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChatSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChatSessionMaxAggregateInputType
  }

  export type GetChatSessionAggregateType<T extends ChatSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateChatSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChatSession[P]>
      : GetScalarType<T[P], AggregateChatSession[P]>
  }




  export type ChatSessionGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: ChatSessionWhereInput
    orderBy?: ChatSessionOrderByWithAggregationInput | ChatSessionOrderByWithAggregationInput[]
    by: ChatSessionScalarFieldEnum[] | ChatSessionScalarFieldEnum
    having?: ChatSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChatSessionCountAggregateInputType | true
    _avg?: ChatSessionAvgAggregateInputType
    _sum?: ChatSessionSumAggregateInputType
    _min?: ChatSessionMinAggregateInputType
    _max?: ChatSessionMaxAggregateInputType
  }

  export type ChatSessionGroupByOutputType = {
    id: string
    topic: string | null
    lastSummarizeIndex: number | null
    memoryPrompt: string | null
    userId: number
    createdAt: Date
    updatedAt: Date
    _count: ChatSessionCountAggregateOutputType | null
    _avg: ChatSessionAvgAggregateOutputType | null
    _sum: ChatSessionSumAggregateOutputType | null
    _min: ChatSessionMinAggregateOutputType | null
    _max: ChatSessionMaxAggregateOutputType | null
  }

  type GetChatSessionGroupByPayload<T extends ChatSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChatSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChatSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChatSessionGroupByOutputType[P]>
            : GetScalarType<T[P], ChatSessionGroupByOutputType[P]>
        }
      >
    >


  export type ChatSessionSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    topic?: boolean
    lastSummarizeIndex?: boolean
    memoryPrompt?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    messages?: boolean | ChatSession$messagesArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | ChatSessionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chatSession"]>

  export type ChatSessionSelectScalar = {
    id?: boolean
    topic?: boolean
    lastSummarizeIndex?: boolean
    memoryPrompt?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ChatSessionInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    messages?: boolean | ChatSession$messagesArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | ChatSessionCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $ChatSessionPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    name: "ChatSession"
    objects: {
      messages: Prisma.$ChatMessagePayload<ExtArgs>[]
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetResult<{
      id: string
      topic: string | null
      lastSummarizeIndex: number | null
      memoryPrompt: string | null
      userId: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["chatSession"]>
    composites: {}
  }


  type ChatSessionGetPayload<S extends boolean | null | undefined | ChatSessionDefaultArgs> = $Result.GetResult<Prisma.$ChatSessionPayload, S>

  type ChatSessionCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<ChatSessionFindManyArgs, 'select' | 'include'> & {
      select?: ChatSessionCountAggregateInputType | true
    }

  export interface ChatSessionDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ChatSession'], meta: { name: 'ChatSession' } }
    /**
     * Find zero or one ChatSession that matches the filter.
     * @param {ChatSessionFindUniqueArgs} args - Arguments to find a ChatSession
     * @example
     * // Get one ChatSession
     * const chatSession = await prisma.chatSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ChatSessionFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ChatSessionFindUniqueArgs<ExtArgs>>
    ): Prisma__ChatSessionClient<$Result.GetResult<Prisma.$ChatSessionPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one ChatSession that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ChatSessionFindUniqueOrThrowArgs} args - Arguments to find a ChatSession
     * @example
     * // Get one ChatSession
     * const chatSession = await prisma.chatSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ChatSessionFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ChatSessionFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ChatSessionClient<$Result.GetResult<Prisma.$ChatSessionPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first ChatSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatSessionFindFirstArgs} args - Arguments to find a ChatSession
     * @example
     * // Get one ChatSession
     * const chatSession = await prisma.chatSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ChatSessionFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ChatSessionFindFirstArgs<ExtArgs>>
    ): Prisma__ChatSessionClient<$Result.GetResult<Prisma.$ChatSessionPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first ChatSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatSessionFindFirstOrThrowArgs} args - Arguments to find a ChatSession
     * @example
     * // Get one ChatSession
     * const chatSession = await prisma.chatSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ChatSessionFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ChatSessionFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ChatSessionClient<$Result.GetResult<Prisma.$ChatSessionPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more ChatSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatSessionFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChatSessions
     * const chatSessions = await prisma.chatSession.findMany()
     * 
     * // Get first 10 ChatSessions
     * const chatSessions = await prisma.chatSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const chatSessionWithIdOnly = await prisma.chatSession.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ChatSessionFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ChatSessionFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatSessionPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a ChatSession.
     * @param {ChatSessionCreateArgs} args - Arguments to create a ChatSession.
     * @example
     * // Create one ChatSession
     * const ChatSession = await prisma.chatSession.create({
     *   data: {
     *     // ... data to create a ChatSession
     *   }
     * })
     * 
    **/
    create<T extends ChatSessionCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ChatSessionCreateArgs<ExtArgs>>
    ): Prisma__ChatSessionClient<$Result.GetResult<Prisma.$ChatSessionPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many ChatSessions.
     *     @param {ChatSessionCreateManyArgs} args - Arguments to create many ChatSessions.
     *     @example
     *     // Create many ChatSessions
     *     const chatSession = await prisma.chatSession.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ChatSessionCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ChatSessionCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ChatSession.
     * @param {ChatSessionDeleteArgs} args - Arguments to delete one ChatSession.
     * @example
     * // Delete one ChatSession
     * const ChatSession = await prisma.chatSession.delete({
     *   where: {
     *     // ... filter to delete one ChatSession
     *   }
     * })
     * 
    **/
    delete<T extends ChatSessionDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ChatSessionDeleteArgs<ExtArgs>>
    ): Prisma__ChatSessionClient<$Result.GetResult<Prisma.$ChatSessionPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one ChatSession.
     * @param {ChatSessionUpdateArgs} args - Arguments to update one ChatSession.
     * @example
     * // Update one ChatSession
     * const chatSession = await prisma.chatSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ChatSessionUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ChatSessionUpdateArgs<ExtArgs>>
    ): Prisma__ChatSessionClient<$Result.GetResult<Prisma.$ChatSessionPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more ChatSessions.
     * @param {ChatSessionDeleteManyArgs} args - Arguments to filter ChatSessions to delete.
     * @example
     * // Delete a few ChatSessions
     * const { count } = await prisma.chatSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ChatSessionDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ChatSessionDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChatSessions
     * const chatSession = await prisma.chatSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ChatSessionUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ChatSessionUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ChatSession.
     * @param {ChatSessionUpsertArgs} args - Arguments to update or create a ChatSession.
     * @example
     * // Update or create a ChatSession
     * const chatSession = await prisma.chatSession.upsert({
     *   create: {
     *     // ... data to create a ChatSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChatSession we want to update
     *   }
     * })
    **/
    upsert<T extends ChatSessionUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ChatSessionUpsertArgs<ExtArgs>>
    ): Prisma__ChatSessionClient<$Result.GetResult<Prisma.$ChatSessionPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of ChatSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatSessionCountArgs} args - Arguments to filter ChatSessions to count.
     * @example
     * // Count the number of ChatSessions
     * const count = await prisma.chatSession.count({
     *   where: {
     *     // ... the filter for the ChatSessions we want to count
     *   }
     * })
    **/
    count<T extends ChatSessionCountArgs>(
      args?: Subset<T, ChatSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChatSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ChatSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChatSessionAggregateArgs>(args: Subset<T, ChatSessionAggregateArgs>): Prisma.PrismaPromise<GetChatSessionAggregateType<T>>

    /**
     * Group by ChatSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChatSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChatSessionGroupByArgs['orderBy'] }
        : { orderBy?: ChatSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChatSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChatSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ChatSession model
   */
  readonly fields: ChatSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChatSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChatSessionClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    messages<T extends ChatSession$messagesArgs<ExtArgs> = {}>(args?: Subset<T, ChatSession$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, 'findMany'> | Null>;

    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the ChatSession model
   */ 
  interface ChatSessionFieldRefs {
    readonly id: FieldRef<"ChatSession", 'String'>
    readonly topic: FieldRef<"ChatSession", 'String'>
    readonly lastSummarizeIndex: FieldRef<"ChatSession", 'Int'>
    readonly memoryPrompt: FieldRef<"ChatSession", 'String'>
    readonly userId: FieldRef<"ChatSession", 'Int'>
    readonly createdAt: FieldRef<"ChatSession", 'DateTime'>
    readonly updatedAt: FieldRef<"ChatSession", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * ChatSession findUnique
   */
  export type ChatSessionFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSession
     */
    select?: ChatSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChatSessionInclude<ExtArgs> | null
    /**
     * Filter, which ChatSession to fetch.
     */
    where: ChatSessionWhereUniqueInput
  }


  /**
   * ChatSession findUniqueOrThrow
   */
  export type ChatSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSession
     */
    select?: ChatSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChatSessionInclude<ExtArgs> | null
    /**
     * Filter, which ChatSession to fetch.
     */
    where: ChatSessionWhereUniqueInput
  }


  /**
   * ChatSession findFirst
   */
  export type ChatSessionFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSession
     */
    select?: ChatSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChatSessionInclude<ExtArgs> | null
    /**
     * Filter, which ChatSession to fetch.
     */
    where?: ChatSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatSessions to fetch.
     */
    orderBy?: ChatSessionOrderByWithRelationInput | ChatSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatSessions.
     */
    cursor?: ChatSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatSessions.
     */
    distinct?: ChatSessionScalarFieldEnum | ChatSessionScalarFieldEnum[]
  }


  /**
   * ChatSession findFirstOrThrow
   */
  export type ChatSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSession
     */
    select?: ChatSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChatSessionInclude<ExtArgs> | null
    /**
     * Filter, which ChatSession to fetch.
     */
    where?: ChatSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatSessions to fetch.
     */
    orderBy?: ChatSessionOrderByWithRelationInput | ChatSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatSessions.
     */
    cursor?: ChatSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatSessions.
     */
    distinct?: ChatSessionScalarFieldEnum | ChatSessionScalarFieldEnum[]
  }


  /**
   * ChatSession findMany
   */
  export type ChatSessionFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSession
     */
    select?: ChatSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChatSessionInclude<ExtArgs> | null
    /**
     * Filter, which ChatSessions to fetch.
     */
    where?: ChatSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatSessions to fetch.
     */
    orderBy?: ChatSessionOrderByWithRelationInput | ChatSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ChatSessions.
     */
    cursor?: ChatSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatSessions.
     */
    skip?: number
    distinct?: ChatSessionScalarFieldEnum | ChatSessionScalarFieldEnum[]
  }


  /**
   * ChatSession create
   */
  export type ChatSessionCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSession
     */
    select?: ChatSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChatSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a ChatSession.
     */
    data: XOR<ChatSessionCreateInput, ChatSessionUncheckedCreateInput>
  }


  /**
   * ChatSession createMany
   */
  export type ChatSessionCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ChatSessions.
     */
    data: ChatSessionCreateManyInput | ChatSessionCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * ChatSession update
   */
  export type ChatSessionUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSession
     */
    select?: ChatSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChatSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a ChatSession.
     */
    data: XOR<ChatSessionUpdateInput, ChatSessionUncheckedUpdateInput>
    /**
     * Choose, which ChatSession to update.
     */
    where: ChatSessionWhereUniqueInput
  }


  /**
   * ChatSession updateMany
   */
  export type ChatSessionUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ChatSessions.
     */
    data: XOR<ChatSessionUpdateManyMutationInput, ChatSessionUncheckedUpdateManyInput>
    /**
     * Filter which ChatSessions to update
     */
    where?: ChatSessionWhereInput
  }


  /**
   * ChatSession upsert
   */
  export type ChatSessionUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSession
     */
    select?: ChatSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChatSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the ChatSession to update in case it exists.
     */
    where: ChatSessionWhereUniqueInput
    /**
     * In case the ChatSession found by the `where` argument doesn't exist, create a new ChatSession with this data.
     */
    create: XOR<ChatSessionCreateInput, ChatSessionUncheckedCreateInput>
    /**
     * In case the ChatSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChatSessionUpdateInput, ChatSessionUncheckedUpdateInput>
  }


  /**
   * ChatSession delete
   */
  export type ChatSessionDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSession
     */
    select?: ChatSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChatSessionInclude<ExtArgs> | null
    /**
     * Filter which ChatSession to delete.
     */
    where: ChatSessionWhereUniqueInput
  }


  /**
   * ChatSession deleteMany
   */
  export type ChatSessionDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatSessions to delete
     */
    where?: ChatSessionWhereInput
  }


  /**
   * ChatSession.messages
   */
  export type ChatSession$messagesArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChatMessageInclude<ExtArgs> | null
    where?: ChatMessageWhereInput
    orderBy?: ChatMessageOrderByWithRelationInput | ChatMessageOrderByWithRelationInput[]
    cursor?: ChatMessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChatMessageScalarFieldEnum | ChatMessageScalarFieldEnum[]
  }


  /**
   * ChatSession without action
   */
  export type ChatSessionDefaultArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSession
     */
    select?: ChatSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChatSessionInclude<ExtArgs> | null
  }



  /**
   * Model ChatMessage
   */

  export type AggregateChatMessage = {
    _count: ChatMessageCountAggregateOutputType | null
    _avg: ChatMessageAvgAggregateOutputType | null
    _sum: ChatMessageSumAggregateOutputType | null
    _min: ChatMessageMinAggregateOutputType | null
    _max: ChatMessageMaxAggregateOutputType | null
  }

  export type ChatMessageAvgAggregateOutputType = {
    modelId: number | null
    userId: number | null
  }

  export type ChatMessageSumAggregateOutputType = {
    modelId: number | null
    userId: number | null
  }

  export type ChatMessageMinAggregateOutputType = {
    id: string | null
    role: $Enums.ChatMessageRole | null
    content: string | null
    deleted: boolean | null
    chatSessionId: string | null
    modelId: number | null
    userId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ChatMessageMaxAggregateOutputType = {
    id: string | null
    role: $Enums.ChatMessageRole | null
    content: string | null
    deleted: boolean | null
    chatSessionId: string | null
    modelId: number | null
    userId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ChatMessageCountAggregateOutputType = {
    id: number
    role: number
    content: number
    deleted: number
    chatSessionId: number
    modelId: number
    userId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ChatMessageAvgAggregateInputType = {
    modelId?: true
    userId?: true
  }

  export type ChatMessageSumAggregateInputType = {
    modelId?: true
    userId?: true
  }

  export type ChatMessageMinAggregateInputType = {
    id?: true
    role?: true
    content?: true
    deleted?: true
    chatSessionId?: true
    modelId?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ChatMessageMaxAggregateInputType = {
    id?: true
    role?: true
    content?: true
    deleted?: true
    chatSessionId?: true
    modelId?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ChatMessageCountAggregateInputType = {
    id?: true
    role?: true
    content?: true
    deleted?: true
    chatSessionId?: true
    modelId?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ChatMessageAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatMessage to aggregate.
     */
    where?: ChatMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMessages to fetch.
     */
    orderBy?: ChatMessageOrderByWithRelationInput | ChatMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChatMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ChatMessages
    **/
    _count?: true | ChatMessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ChatMessageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ChatMessageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChatMessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChatMessageMaxAggregateInputType
  }

  export type GetChatMessageAggregateType<T extends ChatMessageAggregateArgs> = {
        [P in keyof T & keyof AggregateChatMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChatMessage[P]>
      : GetScalarType<T[P], AggregateChatMessage[P]>
  }




  export type ChatMessageGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: ChatMessageWhereInput
    orderBy?: ChatMessageOrderByWithAggregationInput | ChatMessageOrderByWithAggregationInput[]
    by: ChatMessageScalarFieldEnum[] | ChatMessageScalarFieldEnum
    having?: ChatMessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChatMessageCountAggregateInputType | true
    _avg?: ChatMessageAvgAggregateInputType
    _sum?: ChatMessageSumAggregateInputType
    _min?: ChatMessageMinAggregateInputType
    _max?: ChatMessageMaxAggregateInputType
  }

  export type ChatMessageGroupByOutputType = {
    id: string
    role: $Enums.ChatMessageRole
    content: string
    deleted: boolean
    chatSessionId: string | null
    modelId: number | null
    userId: number
    createdAt: Date
    updatedAt: Date
    _count: ChatMessageCountAggregateOutputType | null
    _avg: ChatMessageAvgAggregateOutputType | null
    _sum: ChatMessageSumAggregateOutputType | null
    _min: ChatMessageMinAggregateOutputType | null
    _max: ChatMessageMaxAggregateOutputType | null
  }

  type GetChatMessageGroupByPayload<T extends ChatMessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChatMessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChatMessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChatMessageGroupByOutputType[P]>
            : GetScalarType<T[P], ChatMessageGroupByOutputType[P]>
        }
      >
    >


  export type ChatMessageSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    content?: boolean
    deleted?: boolean
    chatSessionId?: boolean
    modelId?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    chatSession?: boolean | ChatMessage$chatSessionArgs<ExtArgs>
    model?: boolean | ChatMessage$modelArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chatMessage"]>

  export type ChatMessageSelectScalar = {
    id?: boolean
    role?: boolean
    content?: boolean
    deleted?: boolean
    chatSessionId?: boolean
    modelId?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ChatMessageInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    chatSession?: boolean | ChatMessage$chatSessionArgs<ExtArgs>
    model?: boolean | ChatMessage$modelArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }


  export type $ChatMessagePayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    name: "ChatMessage"
    objects: {
      chatSession: Prisma.$ChatSessionPayload<ExtArgs> | null
      model: Prisma.$ModelPayload<ExtArgs> | null
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetResult<{
      id: string
      role: $Enums.ChatMessageRole
      content: string
      deleted: boolean
      chatSessionId: string | null
      modelId: number | null
      userId: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["chatMessage"]>
    composites: {}
  }


  type ChatMessageGetPayload<S extends boolean | null | undefined | ChatMessageDefaultArgs> = $Result.GetResult<Prisma.$ChatMessagePayload, S>

  type ChatMessageCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<ChatMessageFindManyArgs, 'select' | 'include'> & {
      select?: ChatMessageCountAggregateInputType | true
    }

  export interface ChatMessageDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ChatMessage'], meta: { name: 'ChatMessage' } }
    /**
     * Find zero or one ChatMessage that matches the filter.
     * @param {ChatMessageFindUniqueArgs} args - Arguments to find a ChatMessage
     * @example
     * // Get one ChatMessage
     * const chatMessage = await prisma.chatMessage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ChatMessageFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ChatMessageFindUniqueArgs<ExtArgs>>
    ): Prisma__ChatMessageClient<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one ChatMessage that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ChatMessageFindUniqueOrThrowArgs} args - Arguments to find a ChatMessage
     * @example
     * // Get one ChatMessage
     * const chatMessage = await prisma.chatMessage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ChatMessageFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ChatMessageFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ChatMessageClient<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first ChatMessage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageFindFirstArgs} args - Arguments to find a ChatMessage
     * @example
     * // Get one ChatMessage
     * const chatMessage = await prisma.chatMessage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ChatMessageFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ChatMessageFindFirstArgs<ExtArgs>>
    ): Prisma__ChatMessageClient<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first ChatMessage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageFindFirstOrThrowArgs} args - Arguments to find a ChatMessage
     * @example
     * // Get one ChatMessage
     * const chatMessage = await prisma.chatMessage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ChatMessageFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ChatMessageFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ChatMessageClient<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more ChatMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChatMessages
     * const chatMessages = await prisma.chatMessage.findMany()
     * 
     * // Get first 10 ChatMessages
     * const chatMessages = await prisma.chatMessage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const chatMessageWithIdOnly = await prisma.chatMessage.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ChatMessageFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ChatMessageFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a ChatMessage.
     * @param {ChatMessageCreateArgs} args - Arguments to create a ChatMessage.
     * @example
     * // Create one ChatMessage
     * const ChatMessage = await prisma.chatMessage.create({
     *   data: {
     *     // ... data to create a ChatMessage
     *   }
     * })
     * 
    **/
    create<T extends ChatMessageCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ChatMessageCreateArgs<ExtArgs>>
    ): Prisma__ChatMessageClient<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many ChatMessages.
     *     @param {ChatMessageCreateManyArgs} args - Arguments to create many ChatMessages.
     *     @example
     *     // Create many ChatMessages
     *     const chatMessage = await prisma.chatMessage.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ChatMessageCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ChatMessageCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ChatMessage.
     * @param {ChatMessageDeleteArgs} args - Arguments to delete one ChatMessage.
     * @example
     * // Delete one ChatMessage
     * const ChatMessage = await prisma.chatMessage.delete({
     *   where: {
     *     // ... filter to delete one ChatMessage
     *   }
     * })
     * 
    **/
    delete<T extends ChatMessageDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ChatMessageDeleteArgs<ExtArgs>>
    ): Prisma__ChatMessageClient<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one ChatMessage.
     * @param {ChatMessageUpdateArgs} args - Arguments to update one ChatMessage.
     * @example
     * // Update one ChatMessage
     * const chatMessage = await prisma.chatMessage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ChatMessageUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ChatMessageUpdateArgs<ExtArgs>>
    ): Prisma__ChatMessageClient<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more ChatMessages.
     * @param {ChatMessageDeleteManyArgs} args - Arguments to filter ChatMessages to delete.
     * @example
     * // Delete a few ChatMessages
     * const { count } = await prisma.chatMessage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ChatMessageDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ChatMessageDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChatMessages
     * const chatMessage = await prisma.chatMessage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ChatMessageUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ChatMessageUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ChatMessage.
     * @param {ChatMessageUpsertArgs} args - Arguments to update or create a ChatMessage.
     * @example
     * // Update or create a ChatMessage
     * const chatMessage = await prisma.chatMessage.upsert({
     *   create: {
     *     // ... data to create a ChatMessage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChatMessage we want to update
     *   }
     * })
    **/
    upsert<T extends ChatMessageUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ChatMessageUpsertArgs<ExtArgs>>
    ): Prisma__ChatMessageClient<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of ChatMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageCountArgs} args - Arguments to filter ChatMessages to count.
     * @example
     * // Count the number of ChatMessages
     * const count = await prisma.chatMessage.count({
     *   where: {
     *     // ... the filter for the ChatMessages we want to count
     *   }
     * })
    **/
    count<T extends ChatMessageCountArgs>(
      args?: Subset<T, ChatMessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChatMessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ChatMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChatMessageAggregateArgs>(args: Subset<T, ChatMessageAggregateArgs>): Prisma.PrismaPromise<GetChatMessageAggregateType<T>>

    /**
     * Group by ChatMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChatMessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChatMessageGroupByArgs['orderBy'] }
        : { orderBy?: ChatMessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChatMessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChatMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ChatMessage model
   */
  readonly fields: ChatMessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChatMessage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChatMessageClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    chatSession<T extends ChatMessage$chatSessionArgs<ExtArgs> = {}>(args?: Subset<T, ChatMessage$chatSessionArgs<ExtArgs>>): Prisma__ChatSessionClient<$Result.GetResult<Prisma.$ChatSessionPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    model<T extends ChatMessage$modelArgs<ExtArgs> = {}>(args?: Subset<T, ChatMessage$modelArgs<ExtArgs>>): Prisma__ModelClient<$Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the ChatMessage model
   */ 
  interface ChatMessageFieldRefs {
    readonly id: FieldRef<"ChatMessage", 'String'>
    readonly role: FieldRef<"ChatMessage", 'ChatMessageRole'>
    readonly content: FieldRef<"ChatMessage", 'String'>
    readonly deleted: FieldRef<"ChatMessage", 'Boolean'>
    readonly chatSessionId: FieldRef<"ChatMessage", 'String'>
    readonly modelId: FieldRef<"ChatMessage", 'Int'>
    readonly userId: FieldRef<"ChatMessage", 'Int'>
    readonly createdAt: FieldRef<"ChatMessage", 'DateTime'>
    readonly updatedAt: FieldRef<"ChatMessage", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * ChatMessage findUnique
   */
  export type ChatMessageFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChatMessageInclude<ExtArgs> | null
    /**
     * Filter, which ChatMessage to fetch.
     */
    where: ChatMessageWhereUniqueInput
  }


  /**
   * ChatMessage findUniqueOrThrow
   */
  export type ChatMessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChatMessageInclude<ExtArgs> | null
    /**
     * Filter, which ChatMessage to fetch.
     */
    where: ChatMessageWhereUniqueInput
  }


  /**
   * ChatMessage findFirst
   */
  export type ChatMessageFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChatMessageInclude<ExtArgs> | null
    /**
     * Filter, which ChatMessage to fetch.
     */
    where?: ChatMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMessages to fetch.
     */
    orderBy?: ChatMessageOrderByWithRelationInput | ChatMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatMessages.
     */
    cursor?: ChatMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatMessages.
     */
    distinct?: ChatMessageScalarFieldEnum | ChatMessageScalarFieldEnum[]
  }


  /**
   * ChatMessage findFirstOrThrow
   */
  export type ChatMessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChatMessageInclude<ExtArgs> | null
    /**
     * Filter, which ChatMessage to fetch.
     */
    where?: ChatMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMessages to fetch.
     */
    orderBy?: ChatMessageOrderByWithRelationInput | ChatMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatMessages.
     */
    cursor?: ChatMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatMessages.
     */
    distinct?: ChatMessageScalarFieldEnum | ChatMessageScalarFieldEnum[]
  }


  /**
   * ChatMessage findMany
   */
  export type ChatMessageFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChatMessageInclude<ExtArgs> | null
    /**
     * Filter, which ChatMessages to fetch.
     */
    where?: ChatMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMessages to fetch.
     */
    orderBy?: ChatMessageOrderByWithRelationInput | ChatMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ChatMessages.
     */
    cursor?: ChatMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMessages.
     */
    skip?: number
    distinct?: ChatMessageScalarFieldEnum | ChatMessageScalarFieldEnum[]
  }


  /**
   * ChatMessage create
   */
  export type ChatMessageCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChatMessageInclude<ExtArgs> | null
    /**
     * The data needed to create a ChatMessage.
     */
    data: XOR<ChatMessageCreateInput, ChatMessageUncheckedCreateInput>
  }


  /**
   * ChatMessage createMany
   */
  export type ChatMessageCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ChatMessages.
     */
    data: ChatMessageCreateManyInput | ChatMessageCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * ChatMessage update
   */
  export type ChatMessageUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChatMessageInclude<ExtArgs> | null
    /**
     * The data needed to update a ChatMessage.
     */
    data: XOR<ChatMessageUpdateInput, ChatMessageUncheckedUpdateInput>
    /**
     * Choose, which ChatMessage to update.
     */
    where: ChatMessageWhereUniqueInput
  }


  /**
   * ChatMessage updateMany
   */
  export type ChatMessageUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ChatMessages.
     */
    data: XOR<ChatMessageUpdateManyMutationInput, ChatMessageUncheckedUpdateManyInput>
    /**
     * Filter which ChatMessages to update
     */
    where?: ChatMessageWhereInput
  }


  /**
   * ChatMessage upsert
   */
  export type ChatMessageUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChatMessageInclude<ExtArgs> | null
    /**
     * The filter to search for the ChatMessage to update in case it exists.
     */
    where: ChatMessageWhereUniqueInput
    /**
     * In case the ChatMessage found by the `where` argument doesn't exist, create a new ChatMessage with this data.
     */
    create: XOR<ChatMessageCreateInput, ChatMessageUncheckedCreateInput>
    /**
     * In case the ChatMessage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChatMessageUpdateInput, ChatMessageUncheckedUpdateInput>
  }


  /**
   * ChatMessage delete
   */
  export type ChatMessageDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChatMessageInclude<ExtArgs> | null
    /**
     * Filter which ChatMessage to delete.
     */
    where: ChatMessageWhereUniqueInput
  }


  /**
   * ChatMessage deleteMany
   */
  export type ChatMessageDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatMessages to delete
     */
    where?: ChatMessageWhereInput
  }


  /**
   * ChatMessage.chatSession
   */
  export type ChatMessage$chatSessionArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSession
     */
    select?: ChatSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChatSessionInclude<ExtArgs> | null
    where?: ChatSessionWhereInput
  }


  /**
   * ChatMessage.model
   */
  export type ChatMessage$modelArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Model
     */
    select?: ModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModelInclude<ExtArgs> | null
    where?: ModelWhereInput
  }


  /**
   * ChatMessage without action
   */
  export type ChatMessageDefaultArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChatMessageInclude<ExtArgs> | null
  }



  /**
   * Model ChatSetting
   */

  export type AggregateChatSetting = {
    _count: ChatSettingCountAggregateOutputType | null
    _avg: ChatSettingAvgAggregateOutputType | null
    _sum: ChatSettingSumAggregateOutputType | null
    _min: ChatSettingMinAggregateOutputType | null
    _max: ChatSettingMaxAggregateOutputType | null
  }

  export type ChatSettingAvgAggregateOutputType = {
    userId: number | null
    historyMessageCount: number | null
    defalutModelId: number | null
    temperature: number | null
    maxTokens: number | null
    presencePenalty: number | null
  }

  export type ChatSettingSumAggregateOutputType = {
    userId: number | null
    historyMessageCount: number | null
    defalutModelId: number | null
    temperature: number | null
    maxTokens: number | null
    presencePenalty: number | null
  }

  export type ChatSettingMinAggregateOutputType = {
    userId: number | null
    historyMessageCount: number | null
    submitKey: string | null
    tightBorder: boolean | null
    defalutModelId: number | null
    temperature: number | null
    maxTokens: number | null
    presencePenalty: number | null
  }

  export type ChatSettingMaxAggregateOutputType = {
    userId: number | null
    historyMessageCount: number | null
    submitKey: string | null
    tightBorder: boolean | null
    defalutModelId: number | null
    temperature: number | null
    maxTokens: number | null
    presencePenalty: number | null
  }

  export type ChatSettingCountAggregateOutputType = {
    userId: number
    historyMessageCount: number
    submitKey: number
    tightBorder: number
    defalutModelId: number
    temperature: number
    maxTokens: number
    presencePenalty: number
    _all: number
  }


  export type ChatSettingAvgAggregateInputType = {
    userId?: true
    historyMessageCount?: true
    defalutModelId?: true
    temperature?: true
    maxTokens?: true
    presencePenalty?: true
  }

  export type ChatSettingSumAggregateInputType = {
    userId?: true
    historyMessageCount?: true
    defalutModelId?: true
    temperature?: true
    maxTokens?: true
    presencePenalty?: true
  }

  export type ChatSettingMinAggregateInputType = {
    userId?: true
    historyMessageCount?: true
    submitKey?: true
    tightBorder?: true
    defalutModelId?: true
    temperature?: true
    maxTokens?: true
    presencePenalty?: true
  }

  export type ChatSettingMaxAggregateInputType = {
    userId?: true
    historyMessageCount?: true
    submitKey?: true
    tightBorder?: true
    defalutModelId?: true
    temperature?: true
    maxTokens?: true
    presencePenalty?: true
  }

  export type ChatSettingCountAggregateInputType = {
    userId?: true
    historyMessageCount?: true
    submitKey?: true
    tightBorder?: true
    defalutModelId?: true
    temperature?: true
    maxTokens?: true
    presencePenalty?: true
    _all?: true
  }

  export type ChatSettingAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatSetting to aggregate.
     */
    where?: ChatSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatSettings to fetch.
     */
    orderBy?: ChatSettingOrderByWithRelationInput | ChatSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChatSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ChatSettings
    **/
    _count?: true | ChatSettingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ChatSettingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ChatSettingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChatSettingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChatSettingMaxAggregateInputType
  }

  export type GetChatSettingAggregateType<T extends ChatSettingAggregateArgs> = {
        [P in keyof T & keyof AggregateChatSetting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChatSetting[P]>
      : GetScalarType<T[P], AggregateChatSetting[P]>
  }




  export type ChatSettingGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: ChatSettingWhereInput
    orderBy?: ChatSettingOrderByWithAggregationInput | ChatSettingOrderByWithAggregationInput[]
    by: ChatSettingScalarFieldEnum[] | ChatSettingScalarFieldEnum
    having?: ChatSettingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChatSettingCountAggregateInputType | true
    _avg?: ChatSettingAvgAggregateInputType
    _sum?: ChatSettingSumAggregateInputType
    _min?: ChatSettingMinAggregateInputType
    _max?: ChatSettingMaxAggregateInputType
  }

  export type ChatSettingGroupByOutputType = {
    userId: number
    historyMessageCount: number | null
    submitKey: string | null
    tightBorder: boolean
    defalutModelId: number | null
    temperature: number | null
    maxTokens: number | null
    presencePenalty: number | null
    _count: ChatSettingCountAggregateOutputType | null
    _avg: ChatSettingAvgAggregateOutputType | null
    _sum: ChatSettingSumAggregateOutputType | null
    _min: ChatSettingMinAggregateOutputType | null
    _max: ChatSettingMaxAggregateOutputType | null
  }

  type GetChatSettingGroupByPayload<T extends ChatSettingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChatSettingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChatSettingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChatSettingGroupByOutputType[P]>
            : GetScalarType<T[P], ChatSettingGroupByOutputType[P]>
        }
      >
    >


  export type ChatSettingSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    historyMessageCount?: boolean
    submitKey?: boolean
    tightBorder?: boolean
    defalutModelId?: boolean
    temperature?: boolean
    maxTokens?: boolean
    presencePenalty?: boolean
  }, ExtArgs["result"]["chatSetting"]>

  export type ChatSettingSelectScalar = {
    userId?: boolean
    historyMessageCount?: boolean
    submitKey?: boolean
    tightBorder?: boolean
    defalutModelId?: boolean
    temperature?: boolean
    maxTokens?: boolean
    presencePenalty?: boolean
  }


  export type $ChatSettingPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    name: "ChatSetting"
    objects: {}
    scalars: $Extensions.GetResult<{
      userId: number
      historyMessageCount: number | null
      submitKey: string | null
      tightBorder: boolean
      defalutModelId: number | null
      temperature: number | null
      maxTokens: number | null
      presencePenalty: number | null
    }, ExtArgs["result"]["chatSetting"]>
    composites: {}
  }


  type ChatSettingGetPayload<S extends boolean | null | undefined | ChatSettingDefaultArgs> = $Result.GetResult<Prisma.$ChatSettingPayload, S>

  type ChatSettingCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<ChatSettingFindManyArgs, 'select' | 'include'> & {
      select?: ChatSettingCountAggregateInputType | true
    }

  export interface ChatSettingDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ChatSetting'], meta: { name: 'ChatSetting' } }
    /**
     * Find zero or one ChatSetting that matches the filter.
     * @param {ChatSettingFindUniqueArgs} args - Arguments to find a ChatSetting
     * @example
     * // Get one ChatSetting
     * const chatSetting = await prisma.chatSetting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ChatSettingFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ChatSettingFindUniqueArgs<ExtArgs>>
    ): Prisma__ChatSettingClient<$Result.GetResult<Prisma.$ChatSettingPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one ChatSetting that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ChatSettingFindUniqueOrThrowArgs} args - Arguments to find a ChatSetting
     * @example
     * // Get one ChatSetting
     * const chatSetting = await prisma.chatSetting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ChatSettingFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ChatSettingFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ChatSettingClient<$Result.GetResult<Prisma.$ChatSettingPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first ChatSetting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatSettingFindFirstArgs} args - Arguments to find a ChatSetting
     * @example
     * // Get one ChatSetting
     * const chatSetting = await prisma.chatSetting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ChatSettingFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ChatSettingFindFirstArgs<ExtArgs>>
    ): Prisma__ChatSettingClient<$Result.GetResult<Prisma.$ChatSettingPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first ChatSetting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatSettingFindFirstOrThrowArgs} args - Arguments to find a ChatSetting
     * @example
     * // Get one ChatSetting
     * const chatSetting = await prisma.chatSetting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ChatSettingFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ChatSettingFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ChatSettingClient<$Result.GetResult<Prisma.$ChatSettingPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more ChatSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatSettingFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChatSettings
     * const chatSettings = await prisma.chatSetting.findMany()
     * 
     * // Get first 10 ChatSettings
     * const chatSettings = await prisma.chatSetting.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const chatSettingWithUserIdOnly = await prisma.chatSetting.findMany({ select: { userId: true } })
     * 
    **/
    findMany<T extends ChatSettingFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ChatSettingFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatSettingPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a ChatSetting.
     * @param {ChatSettingCreateArgs} args - Arguments to create a ChatSetting.
     * @example
     * // Create one ChatSetting
     * const ChatSetting = await prisma.chatSetting.create({
     *   data: {
     *     // ... data to create a ChatSetting
     *   }
     * })
     * 
    **/
    create<T extends ChatSettingCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ChatSettingCreateArgs<ExtArgs>>
    ): Prisma__ChatSettingClient<$Result.GetResult<Prisma.$ChatSettingPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many ChatSettings.
     *     @param {ChatSettingCreateManyArgs} args - Arguments to create many ChatSettings.
     *     @example
     *     // Create many ChatSettings
     *     const chatSetting = await prisma.chatSetting.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ChatSettingCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ChatSettingCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ChatSetting.
     * @param {ChatSettingDeleteArgs} args - Arguments to delete one ChatSetting.
     * @example
     * // Delete one ChatSetting
     * const ChatSetting = await prisma.chatSetting.delete({
     *   where: {
     *     // ... filter to delete one ChatSetting
     *   }
     * })
     * 
    **/
    delete<T extends ChatSettingDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ChatSettingDeleteArgs<ExtArgs>>
    ): Prisma__ChatSettingClient<$Result.GetResult<Prisma.$ChatSettingPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one ChatSetting.
     * @param {ChatSettingUpdateArgs} args - Arguments to update one ChatSetting.
     * @example
     * // Update one ChatSetting
     * const chatSetting = await prisma.chatSetting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ChatSettingUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ChatSettingUpdateArgs<ExtArgs>>
    ): Prisma__ChatSettingClient<$Result.GetResult<Prisma.$ChatSettingPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more ChatSettings.
     * @param {ChatSettingDeleteManyArgs} args - Arguments to filter ChatSettings to delete.
     * @example
     * // Delete a few ChatSettings
     * const { count } = await prisma.chatSetting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ChatSettingDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ChatSettingDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatSettingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChatSettings
     * const chatSetting = await prisma.chatSetting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ChatSettingUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ChatSettingUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ChatSetting.
     * @param {ChatSettingUpsertArgs} args - Arguments to update or create a ChatSetting.
     * @example
     * // Update or create a ChatSetting
     * const chatSetting = await prisma.chatSetting.upsert({
     *   create: {
     *     // ... data to create a ChatSetting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChatSetting we want to update
     *   }
     * })
    **/
    upsert<T extends ChatSettingUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ChatSettingUpsertArgs<ExtArgs>>
    ): Prisma__ChatSettingClient<$Result.GetResult<Prisma.$ChatSettingPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of ChatSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatSettingCountArgs} args - Arguments to filter ChatSettings to count.
     * @example
     * // Count the number of ChatSettings
     * const count = await prisma.chatSetting.count({
     *   where: {
     *     // ... the filter for the ChatSettings we want to count
     *   }
     * })
    **/
    count<T extends ChatSettingCountArgs>(
      args?: Subset<T, ChatSettingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChatSettingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ChatSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatSettingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChatSettingAggregateArgs>(args: Subset<T, ChatSettingAggregateArgs>): Prisma.PrismaPromise<GetChatSettingAggregateType<T>>

    /**
     * Group by ChatSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatSettingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChatSettingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChatSettingGroupByArgs['orderBy'] }
        : { orderBy?: ChatSettingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChatSettingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChatSettingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ChatSetting model
   */
  readonly fields: ChatSettingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChatSetting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChatSettingClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';


    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the ChatSetting model
   */ 
  interface ChatSettingFieldRefs {
    readonly userId: FieldRef<"ChatSetting", 'Int'>
    readonly historyMessageCount: FieldRef<"ChatSetting", 'Int'>
    readonly submitKey: FieldRef<"ChatSetting", 'String'>
    readonly tightBorder: FieldRef<"ChatSetting", 'Boolean'>
    readonly defalutModelId: FieldRef<"ChatSetting", 'Int'>
    readonly temperature: FieldRef<"ChatSetting", 'Float'>
    readonly maxTokens: FieldRef<"ChatSetting", 'Int'>
    readonly presencePenalty: FieldRef<"ChatSetting", 'Float'>
  }
    

  // Custom InputTypes

  /**
   * ChatSetting findUnique
   */
  export type ChatSettingFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSetting
     */
    select?: ChatSettingSelect<ExtArgs> | null
    /**
     * Filter, which ChatSetting to fetch.
     */
    where: ChatSettingWhereUniqueInput
  }


  /**
   * ChatSetting findUniqueOrThrow
   */
  export type ChatSettingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSetting
     */
    select?: ChatSettingSelect<ExtArgs> | null
    /**
     * Filter, which ChatSetting to fetch.
     */
    where: ChatSettingWhereUniqueInput
  }


  /**
   * ChatSetting findFirst
   */
  export type ChatSettingFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSetting
     */
    select?: ChatSettingSelect<ExtArgs> | null
    /**
     * Filter, which ChatSetting to fetch.
     */
    where?: ChatSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatSettings to fetch.
     */
    orderBy?: ChatSettingOrderByWithRelationInput | ChatSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatSettings.
     */
    cursor?: ChatSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatSettings.
     */
    distinct?: ChatSettingScalarFieldEnum | ChatSettingScalarFieldEnum[]
  }


  /**
   * ChatSetting findFirstOrThrow
   */
  export type ChatSettingFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSetting
     */
    select?: ChatSettingSelect<ExtArgs> | null
    /**
     * Filter, which ChatSetting to fetch.
     */
    where?: ChatSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatSettings to fetch.
     */
    orderBy?: ChatSettingOrderByWithRelationInput | ChatSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatSettings.
     */
    cursor?: ChatSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatSettings.
     */
    distinct?: ChatSettingScalarFieldEnum | ChatSettingScalarFieldEnum[]
  }


  /**
   * ChatSetting findMany
   */
  export type ChatSettingFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSetting
     */
    select?: ChatSettingSelect<ExtArgs> | null
    /**
     * Filter, which ChatSettings to fetch.
     */
    where?: ChatSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatSettings to fetch.
     */
    orderBy?: ChatSettingOrderByWithRelationInput | ChatSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ChatSettings.
     */
    cursor?: ChatSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatSettings.
     */
    skip?: number
    distinct?: ChatSettingScalarFieldEnum | ChatSettingScalarFieldEnum[]
  }


  /**
   * ChatSetting create
   */
  export type ChatSettingCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSetting
     */
    select?: ChatSettingSelect<ExtArgs> | null
    /**
     * The data needed to create a ChatSetting.
     */
    data: XOR<ChatSettingCreateInput, ChatSettingUncheckedCreateInput>
  }


  /**
   * ChatSetting createMany
   */
  export type ChatSettingCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ChatSettings.
     */
    data: ChatSettingCreateManyInput | ChatSettingCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * ChatSetting update
   */
  export type ChatSettingUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSetting
     */
    select?: ChatSettingSelect<ExtArgs> | null
    /**
     * The data needed to update a ChatSetting.
     */
    data: XOR<ChatSettingUpdateInput, ChatSettingUncheckedUpdateInput>
    /**
     * Choose, which ChatSetting to update.
     */
    where: ChatSettingWhereUniqueInput
  }


  /**
   * ChatSetting updateMany
   */
  export type ChatSettingUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ChatSettings.
     */
    data: XOR<ChatSettingUpdateManyMutationInput, ChatSettingUncheckedUpdateManyInput>
    /**
     * Filter which ChatSettings to update
     */
    where?: ChatSettingWhereInput
  }


  /**
   * ChatSetting upsert
   */
  export type ChatSettingUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSetting
     */
    select?: ChatSettingSelect<ExtArgs> | null
    /**
     * The filter to search for the ChatSetting to update in case it exists.
     */
    where: ChatSettingWhereUniqueInput
    /**
     * In case the ChatSetting found by the `where` argument doesn't exist, create a new ChatSetting with this data.
     */
    create: XOR<ChatSettingCreateInput, ChatSettingUncheckedCreateInput>
    /**
     * In case the ChatSetting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChatSettingUpdateInput, ChatSettingUncheckedUpdateInput>
  }


  /**
   * ChatSetting delete
   */
  export type ChatSettingDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSetting
     */
    select?: ChatSettingSelect<ExtArgs> | null
    /**
     * Filter which ChatSetting to delete.
     */
    where: ChatSettingWhereUniqueInput
  }


  /**
   * ChatSetting deleteMany
   */
  export type ChatSettingDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatSettings to delete
     */
    where?: ChatSettingWhereInput
  }


  /**
   * ChatSetting without action
   */
  export type ChatSettingDefaultArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatSetting
     */
    select?: ChatSettingSelect<ExtArgs> | null
  }



  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
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

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const OAuthScalarFieldEnum: {
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

  export type OAuthScalarFieldEnum = (typeof OAuthScalarFieldEnum)[keyof typeof OAuthScalarFieldEnum]


  export const ModelScalarFieldEnum: {
    id: 'id',
    name: 'name',
    price: 'price'
  };

  export type ModelScalarFieldEnum = (typeof ModelScalarFieldEnum)[keyof typeof ModelScalarFieldEnum]


  export const ProductScalarFieldEnum: {
    id: 'id',
    name: 'name',
    features: 'features',
    isHidden: 'isHidden',
    price: 'price',
    stock: 'stock',
    duration: 'duration',
    categoryId: 'categoryId'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const ModelInProductScalarFieldEnum: {
    times: 'times',
    duration: 'duration',
    modelId: 'modelId',
    productId: 'productId'
  };

  export type ModelInProductScalarFieldEnum = (typeof ModelInProductScalarFieldEnum)[keyof typeof ModelInProductScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const OrderScalarFieldEnum: {
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

  export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum]


  export const OpenAIKeyScalarFieldEnum: {
    key: 'key',
    weight: 'weight',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OpenAIKeyScalarFieldEnum = (typeof OpenAIKeyScalarFieldEnum)[keyof typeof OpenAIKeyScalarFieldEnum]


  export const RateLimitScalarFieldEnum: {
    key: 'key',
    value: 'value'
  };

  export type RateLimitScalarFieldEnum = (typeof RateLimitScalarFieldEnum)[keyof typeof RateLimitScalarFieldEnum]


  export const ChatSessionScalarFieldEnum: {
    id: 'id',
    topic: 'topic',
    lastSummarizeIndex: 'lastSummarizeIndex',
    memoryPrompt: 'memoryPrompt',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ChatSessionScalarFieldEnum = (typeof ChatSessionScalarFieldEnum)[keyof typeof ChatSessionScalarFieldEnum]


  export const ChatMessageScalarFieldEnum: {
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

  export type ChatMessageScalarFieldEnum = (typeof ChatMessageScalarFieldEnum)[keyof typeof ChatMessageScalarFieldEnum]


  export const ChatSettingScalarFieldEnum: {
    userId: 'userId',
    historyMessageCount: 'historyMessageCount',
    submitKey: 'submitKey',
    tightBorder: 'tightBorder',
    defalutModelId: 'defalutModelId',
    temperature: 'temperature',
    maxTokens: 'maxTokens',
    presencePenalty: 'presencePenalty'
  };

  export type ChatSettingScalarFieldEnum = (typeof ChatSettingScalarFieldEnum)[keyof typeof ChatSettingScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'OAuthProvider'
   */
  export type EnumOAuthProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OAuthProvider'>
    


  /**
   * Reference to a field of type 'OAuthProvider[]'
   */
  export type ListEnumOAuthProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OAuthProvider[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'OrderType'
   */
  export type EnumOrderTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderType'>
    


  /**
   * Reference to a field of type 'OrderType[]'
   */
  export type ListEnumOrderTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderType[]'>
    


  /**
   * Reference to a field of type 'OrderStatus'
   */
  export type EnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus'>
    


  /**
   * Reference to a field of type 'OrderStatus[]'
   */
  export type ListEnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus[]'>
    


  /**
   * Reference to a field of type 'ChatMessageRole'
   */
  export type EnumChatMessageRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ChatMessageRole'>
    


  /**
   * Reference to a field of type 'ChatMessageRole[]'
   */
  export type ListEnumChatMessageRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ChatMessageRole[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    role?: EnumRoleFilter<"User"> | $Enums.Role
    name?: StringFilter<"User"> | string
    email?: StringNullableFilter<"User"> | string | null
    phone?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    isBlocked?: BoolFilter<"User"> | boolean
    oauths?: OAuthListRelationFilter
    orders?: OrderListRelationFilter
    chatSessions?: ChatSessionListRelationFilter
    chatMessages?: ChatMessageListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    role?: SortOrder
    name?: SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isBlocked?: SortOrder
    oauths?: OAuthOrderByRelationAggregateInput
    orders?: OrderOrderByRelationAggregateInput
    chatSessions?: ChatSessionOrderByRelationAggregateInput
    chatMessages?: ChatMessageOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    email?: string
    phone?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    role?: EnumRoleFilter<"User"> | $Enums.Role
    password?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    isBlocked?: BoolFilter<"User"> | boolean
    oauths?: OAuthListRelationFilter
    orders?: OrderListRelationFilter
    chatSessions?: ChatSessionListRelationFilter
    chatMessages?: ChatMessageListRelationFilter
  }, "id" | "name" | "email" | "phone">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    role?: SortOrder
    name?: SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isBlocked?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    isBlocked?: BoolWithAggregatesFilter<"User"> | boolean
  }

  export type OAuthWhereInput = {
    AND?: OAuthWhereInput | OAuthWhereInput[]
    OR?: OAuthWhereInput[]
    NOT?: OAuthWhereInput | OAuthWhereInput[]
    id?: IntFilter<"OAuth"> | number
    provider?: EnumOAuthProviderFilter<"OAuth"> | $Enums.OAuthProvider
    providerId?: StringFilter<"OAuth"> | string
    accessToken?: StringFilter<"OAuth"> | string
    refreshToken?: StringFilter<"OAuth"> | string
    expiredAt?: DateTimeFilter<"OAuth"> | Date | string
    data?: JsonNullableFilter<"OAuth">
    userId?: IntFilter<"OAuth"> | number
    createdAt?: DateTimeFilter<"OAuth"> | Date | string
    updatedAt?: DateTimeFilter<"OAuth"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type OAuthOrderByWithRelationInput = {
    id?: SortOrder
    provider?: SortOrder
    providerId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    expiredAt?: SortOrder
    data?: SortOrderInput | SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type OAuthWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    provider_providerId?: OAuthProviderProviderIdCompoundUniqueInput
    AND?: OAuthWhereInput | OAuthWhereInput[]
    OR?: OAuthWhereInput[]
    NOT?: OAuthWhereInput | OAuthWhereInput[]
    provider?: EnumOAuthProviderFilter<"OAuth"> | $Enums.OAuthProvider
    providerId?: StringFilter<"OAuth"> | string
    accessToken?: StringFilter<"OAuth"> | string
    refreshToken?: StringFilter<"OAuth"> | string
    expiredAt?: DateTimeFilter<"OAuth"> | Date | string
    data?: JsonNullableFilter<"OAuth">
    userId?: IntFilter<"OAuth"> | number
    createdAt?: DateTimeFilter<"OAuth"> | Date | string
    updatedAt?: DateTimeFilter<"OAuth"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "provider_providerId">

  export type OAuthOrderByWithAggregationInput = {
    id?: SortOrder
    provider?: SortOrder
    providerId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    expiredAt?: SortOrder
    data?: SortOrderInput | SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OAuthCountOrderByAggregateInput
    _avg?: OAuthAvgOrderByAggregateInput
    _max?: OAuthMaxOrderByAggregateInput
    _min?: OAuthMinOrderByAggregateInput
    _sum?: OAuthSumOrderByAggregateInput
  }

  export type OAuthScalarWhereWithAggregatesInput = {
    AND?: OAuthScalarWhereWithAggregatesInput | OAuthScalarWhereWithAggregatesInput[]
    OR?: OAuthScalarWhereWithAggregatesInput[]
    NOT?: OAuthScalarWhereWithAggregatesInput | OAuthScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"OAuth"> | number
    provider?: EnumOAuthProviderWithAggregatesFilter<"OAuth"> | $Enums.OAuthProvider
    providerId?: StringWithAggregatesFilter<"OAuth"> | string
    accessToken?: StringWithAggregatesFilter<"OAuth"> | string
    refreshToken?: StringWithAggregatesFilter<"OAuth"> | string
    expiredAt?: DateTimeWithAggregatesFilter<"OAuth"> | Date | string
    data?: JsonNullableWithAggregatesFilter<"OAuth">
    userId?: IntWithAggregatesFilter<"OAuth"> | number
    createdAt?: DateTimeWithAggregatesFilter<"OAuth"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"OAuth"> | Date | string
  }

  export type ModelWhereInput = {
    AND?: ModelWhereInput | ModelWhereInput[]
    OR?: ModelWhereInput[]
    NOT?: ModelWhereInput | ModelWhereInput[]
    id?: IntFilter<"Model"> | number
    name?: StringFilter<"Model"> | string
    price?: IntFilter<"Model"> | number
    products?: ModelInProductListRelationFilter
    messages?: ChatMessageListRelationFilter
  }

  export type ModelOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    products?: ModelInProductOrderByRelationAggregateInput
    messages?: ChatMessageOrderByRelationAggregateInput
  }

  export type ModelWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    id_name?: ModelIdNameCompoundUniqueInput
    AND?: ModelWhereInput | ModelWhereInput[]
    OR?: ModelWhereInput[]
    NOT?: ModelWhereInput | ModelWhereInput[]
    price?: IntFilter<"Model"> | number
    products?: ModelInProductListRelationFilter
    messages?: ChatMessageListRelationFilter
  }, "id" | "name" | "id_name">

  export type ModelOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    _count?: ModelCountOrderByAggregateInput
    _avg?: ModelAvgOrderByAggregateInput
    _max?: ModelMaxOrderByAggregateInput
    _min?: ModelMinOrderByAggregateInput
    _sum?: ModelSumOrderByAggregateInput
  }

  export type ModelScalarWhereWithAggregatesInput = {
    AND?: ModelScalarWhereWithAggregatesInput | ModelScalarWhereWithAggregatesInput[]
    OR?: ModelScalarWhereWithAggregatesInput[]
    NOT?: ModelScalarWhereWithAggregatesInput | ModelScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Model"> | number
    name?: StringWithAggregatesFilter<"Model"> | string
    price?: IntWithAggregatesFilter<"Model"> | number
  }

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: IntFilter<"Product"> | number
    name?: StringFilter<"Product"> | string
    features?: StringNullableListFilter<"Product">
    isHidden?: BoolFilter<"Product"> | boolean
    price?: IntFilter<"Product"> | number
    stock?: IntFilter<"Product"> | number
    duration?: IntFilter<"Product"> | number
    categoryId?: IntNullableFilter<"Product"> | number | null
    models?: ModelInProductListRelationFilter
    order?: OrderListRelationFilter
    category?: XOR<CategoryNullableRelationFilter, CategoryWhereInput> | null
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    features?: SortOrder
    isHidden?: SortOrder
    price?: SortOrder
    stock?: SortOrder
    duration?: SortOrder
    categoryId?: SortOrderInput | SortOrder
    models?: ModelInProductOrderByRelationAggregateInput
    order?: OrderOrderByRelationAggregateInput
    category?: CategoryOrderByWithRelationInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    features?: StringNullableListFilter<"Product">
    isHidden?: BoolFilter<"Product"> | boolean
    price?: IntFilter<"Product"> | number
    stock?: IntFilter<"Product"> | number
    duration?: IntFilter<"Product"> | number
    categoryId?: IntNullableFilter<"Product"> | number | null
    models?: ModelInProductListRelationFilter
    order?: OrderListRelationFilter
    category?: XOR<CategoryNullableRelationFilter, CategoryWhereInput> | null
  }, "id" | "name">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    features?: SortOrder
    isHidden?: SortOrder
    price?: SortOrder
    stock?: SortOrder
    duration?: SortOrder
    categoryId?: SortOrderInput | SortOrder
    _count?: ProductCountOrderByAggregateInput
    _avg?: ProductAvgOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
    _sum?: ProductSumOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Product"> | number
    name?: StringWithAggregatesFilter<"Product"> | string
    features?: StringNullableListFilter<"Product">
    isHidden?: BoolWithAggregatesFilter<"Product"> | boolean
    price?: IntWithAggregatesFilter<"Product"> | number
    stock?: IntWithAggregatesFilter<"Product"> | number
    duration?: IntWithAggregatesFilter<"Product"> | number
    categoryId?: IntNullableWithAggregatesFilter<"Product"> | number | null
  }

  export type ModelInProductWhereInput = {
    AND?: ModelInProductWhereInput | ModelInProductWhereInput[]
    OR?: ModelInProductWhereInput[]
    NOT?: ModelInProductWhereInput | ModelInProductWhereInput[]
    times?: IntFilter<"ModelInProduct"> | number
    duration?: IntFilter<"ModelInProduct"> | number
    modelId?: IntFilter<"ModelInProduct"> | number
    productId?: IntFilter<"ModelInProduct"> | number
    model?: XOR<ModelRelationFilter, ModelWhereInput>
    product?: XOR<ProductRelationFilter, ProductWhereInput>
  }

  export type ModelInProductOrderByWithRelationInput = {
    times?: SortOrder
    duration?: SortOrder
    modelId?: SortOrder
    productId?: SortOrder
    model?: ModelOrderByWithRelationInput
    product?: ProductOrderByWithRelationInput
  }

  export type ModelInProductWhereUniqueInput = Prisma.AtLeast<{
    modelId_productId?: ModelInProductModelIdProductIdCompoundUniqueInput
    AND?: ModelInProductWhereInput | ModelInProductWhereInput[]
    OR?: ModelInProductWhereInput[]
    NOT?: ModelInProductWhereInput | ModelInProductWhereInput[]
    times?: IntFilter<"ModelInProduct"> | number
    duration?: IntFilter<"ModelInProduct"> | number
    modelId?: IntFilter<"ModelInProduct"> | number
    productId?: IntFilter<"ModelInProduct"> | number
    model?: XOR<ModelRelationFilter, ModelWhereInput>
    product?: XOR<ProductRelationFilter, ProductWhereInput>
  }, "modelId_productId">

  export type ModelInProductOrderByWithAggregationInput = {
    times?: SortOrder
    duration?: SortOrder
    modelId?: SortOrder
    productId?: SortOrder
    _count?: ModelInProductCountOrderByAggregateInput
    _avg?: ModelInProductAvgOrderByAggregateInput
    _max?: ModelInProductMaxOrderByAggregateInput
    _min?: ModelInProductMinOrderByAggregateInput
    _sum?: ModelInProductSumOrderByAggregateInput
  }

  export type ModelInProductScalarWhereWithAggregatesInput = {
    AND?: ModelInProductScalarWhereWithAggregatesInput | ModelInProductScalarWhereWithAggregatesInput[]
    OR?: ModelInProductScalarWhereWithAggregatesInput[]
    NOT?: ModelInProductScalarWhereWithAggregatesInput | ModelInProductScalarWhereWithAggregatesInput[]
    times?: IntWithAggregatesFilter<"ModelInProduct"> | number
    duration?: IntWithAggregatesFilter<"ModelInProduct"> | number
    modelId?: IntWithAggregatesFilter<"ModelInProduct"> | number
    productId?: IntWithAggregatesFilter<"ModelInProduct"> | number
  }

  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    id?: IntFilter<"Category"> | number
    name?: StringFilter<"Category"> | string
    products?: ProductListRelationFilter
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    products?: ProductOrderByRelationAggregateInput
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    products?: ProductListRelationFilter
  }, "id" | "name">

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _avg?: CategoryAvgOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
    _sum?: CategorySumOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Category"> | number
    name?: StringWithAggregatesFilter<"Category"> | string
  }

  export type OrderWhereInput = {
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    id?: StringFilter<"Order"> | string
    type?: EnumOrderTypeFilter<"Order"> | $Enums.OrderType
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    count?: IntFilter<"Order"> | number
    amount?: IntFilter<"Order"> | number
    startAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    endAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    isCurrent?: BoolFilter<"Order"> | boolean
    userId?: IntFilter<"Order"> | number
    productId?: IntFilter<"Order"> | number
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    rawData?: JsonNullableFilter<"Order">
    user?: XOR<UserRelationFilter, UserWhereInput>
    product?: XOR<ProductRelationFilter, ProductWhereInput>
  }

  export type OrderOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    status?: SortOrder
    count?: SortOrder
    amount?: SortOrder
    startAt?: SortOrderInput | SortOrder
    endAt?: SortOrderInput | SortOrder
    isCurrent?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    rawData?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    product?: ProductOrderByWithRelationInput
  }

  export type OrderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    type?: EnumOrderTypeFilter<"Order"> | $Enums.OrderType
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    count?: IntFilter<"Order"> | number
    amount?: IntFilter<"Order"> | number
    startAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    endAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    isCurrent?: BoolFilter<"Order"> | boolean
    userId?: IntFilter<"Order"> | number
    productId?: IntFilter<"Order"> | number
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    rawData?: JsonNullableFilter<"Order">
    user?: XOR<UserRelationFilter, UserWhereInput>
    product?: XOR<ProductRelationFilter, ProductWhereInput>
  }, "id" | "id">

  export type OrderOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    status?: SortOrder
    count?: SortOrder
    amount?: SortOrder
    startAt?: SortOrderInput | SortOrder
    endAt?: SortOrderInput | SortOrder
    isCurrent?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    rawData?: SortOrderInput | SortOrder
    _count?: OrderCountOrderByAggregateInput
    _avg?: OrderAvgOrderByAggregateInput
    _max?: OrderMaxOrderByAggregateInput
    _min?: OrderMinOrderByAggregateInput
    _sum?: OrderSumOrderByAggregateInput
  }

  export type OrderScalarWhereWithAggregatesInput = {
    AND?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    OR?: OrderScalarWhereWithAggregatesInput[]
    NOT?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Order"> | string
    type?: EnumOrderTypeWithAggregatesFilter<"Order"> | $Enums.OrderType
    status?: EnumOrderStatusWithAggregatesFilter<"Order"> | $Enums.OrderStatus
    count?: IntWithAggregatesFilter<"Order"> | number
    amount?: IntWithAggregatesFilter<"Order"> | number
    startAt?: DateTimeNullableWithAggregatesFilter<"Order"> | Date | string | null
    endAt?: DateTimeNullableWithAggregatesFilter<"Order"> | Date | string | null
    isCurrent?: BoolWithAggregatesFilter<"Order"> | boolean
    userId?: IntWithAggregatesFilter<"Order"> | number
    productId?: IntWithAggregatesFilter<"Order"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
    rawData?: JsonNullableWithAggregatesFilter<"Order">
  }

  export type OpenAIKeyWhereInput = {
    AND?: OpenAIKeyWhereInput | OpenAIKeyWhereInput[]
    OR?: OpenAIKeyWhereInput[]
    NOT?: OpenAIKeyWhereInput | OpenAIKeyWhereInput[]
    key?: StringFilter<"OpenAIKey"> | string
    weight?: IntFilter<"OpenAIKey"> | number
    createdAt?: DateTimeFilter<"OpenAIKey"> | Date | string
    updatedAt?: DateTimeFilter<"OpenAIKey"> | Date | string
  }

  export type OpenAIKeyOrderByWithRelationInput = {
    key?: SortOrder
    weight?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OpenAIKeyWhereUniqueInput = Prisma.AtLeast<{
    key?: string
    AND?: OpenAIKeyWhereInput | OpenAIKeyWhereInput[]
    OR?: OpenAIKeyWhereInput[]
    NOT?: OpenAIKeyWhereInput | OpenAIKeyWhereInput[]
    weight?: IntFilter<"OpenAIKey"> | number
    createdAt?: DateTimeFilter<"OpenAIKey"> | Date | string
    updatedAt?: DateTimeFilter<"OpenAIKey"> | Date | string
  }, "key">

  export type OpenAIKeyOrderByWithAggregationInput = {
    key?: SortOrder
    weight?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OpenAIKeyCountOrderByAggregateInput
    _avg?: OpenAIKeyAvgOrderByAggregateInput
    _max?: OpenAIKeyMaxOrderByAggregateInput
    _min?: OpenAIKeyMinOrderByAggregateInput
    _sum?: OpenAIKeySumOrderByAggregateInput
  }

  export type OpenAIKeyScalarWhereWithAggregatesInput = {
    AND?: OpenAIKeyScalarWhereWithAggregatesInput | OpenAIKeyScalarWhereWithAggregatesInput[]
    OR?: OpenAIKeyScalarWhereWithAggregatesInput[]
    NOT?: OpenAIKeyScalarWhereWithAggregatesInput | OpenAIKeyScalarWhereWithAggregatesInput[]
    key?: StringWithAggregatesFilter<"OpenAIKey"> | string
    weight?: IntWithAggregatesFilter<"OpenAIKey"> | number
    createdAt?: DateTimeWithAggregatesFilter<"OpenAIKey"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"OpenAIKey"> | Date | string
  }

  export type RateLimitWhereInput = {
    AND?: RateLimitWhereInput | RateLimitWhereInput[]
    OR?: RateLimitWhereInput[]
    NOT?: RateLimitWhereInput | RateLimitWhereInput[]
    key?: StringFilter<"RateLimit"> | string
    value?: IntNullableListFilter<"RateLimit">
  }

  export type RateLimitOrderByWithRelationInput = {
    key?: SortOrder
    value?: SortOrder
  }

  export type RateLimitWhereUniqueInput = Prisma.AtLeast<{
    key?: string
    AND?: RateLimitWhereInput | RateLimitWhereInput[]
    OR?: RateLimitWhereInput[]
    NOT?: RateLimitWhereInput | RateLimitWhereInput[]
    value?: IntNullableListFilter<"RateLimit">
  }, "key">

  export type RateLimitOrderByWithAggregationInput = {
    key?: SortOrder
    value?: SortOrder
    _count?: RateLimitCountOrderByAggregateInput
    _avg?: RateLimitAvgOrderByAggregateInput
    _max?: RateLimitMaxOrderByAggregateInput
    _min?: RateLimitMinOrderByAggregateInput
    _sum?: RateLimitSumOrderByAggregateInput
  }

  export type RateLimitScalarWhereWithAggregatesInput = {
    AND?: RateLimitScalarWhereWithAggregatesInput | RateLimitScalarWhereWithAggregatesInput[]
    OR?: RateLimitScalarWhereWithAggregatesInput[]
    NOT?: RateLimitScalarWhereWithAggregatesInput | RateLimitScalarWhereWithAggregatesInput[]
    key?: StringWithAggregatesFilter<"RateLimit"> | string
    value?: IntNullableListFilter<"RateLimit">
  }

  export type ChatSessionWhereInput = {
    AND?: ChatSessionWhereInput | ChatSessionWhereInput[]
    OR?: ChatSessionWhereInput[]
    NOT?: ChatSessionWhereInput | ChatSessionWhereInput[]
    id?: StringFilter<"ChatSession"> | string
    topic?: StringNullableFilter<"ChatSession"> | string | null
    lastSummarizeIndex?: IntNullableFilter<"ChatSession"> | number | null
    memoryPrompt?: StringNullableFilter<"ChatSession"> | string | null
    userId?: IntFilter<"ChatSession"> | number
    createdAt?: DateTimeFilter<"ChatSession"> | Date | string
    updatedAt?: DateTimeFilter<"ChatSession"> | Date | string
    messages?: ChatMessageListRelationFilter
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type ChatSessionOrderByWithRelationInput = {
    id?: SortOrder
    topic?: SortOrderInput | SortOrder
    lastSummarizeIndex?: SortOrderInput | SortOrder
    memoryPrompt?: SortOrderInput | SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    messages?: ChatMessageOrderByRelationAggregateInput
    user?: UserOrderByWithRelationInput
  }

  export type ChatSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ChatSessionWhereInput | ChatSessionWhereInput[]
    OR?: ChatSessionWhereInput[]
    NOT?: ChatSessionWhereInput | ChatSessionWhereInput[]
    topic?: StringNullableFilter<"ChatSession"> | string | null
    lastSummarizeIndex?: IntNullableFilter<"ChatSession"> | number | null
    memoryPrompt?: StringNullableFilter<"ChatSession"> | string | null
    userId?: IntFilter<"ChatSession"> | number
    createdAt?: DateTimeFilter<"ChatSession"> | Date | string
    updatedAt?: DateTimeFilter<"ChatSession"> | Date | string
    messages?: ChatMessageListRelationFilter
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type ChatSessionOrderByWithAggregationInput = {
    id?: SortOrder
    topic?: SortOrderInput | SortOrder
    lastSummarizeIndex?: SortOrderInput | SortOrder
    memoryPrompt?: SortOrderInput | SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ChatSessionCountOrderByAggregateInput
    _avg?: ChatSessionAvgOrderByAggregateInput
    _max?: ChatSessionMaxOrderByAggregateInput
    _min?: ChatSessionMinOrderByAggregateInput
    _sum?: ChatSessionSumOrderByAggregateInput
  }

  export type ChatSessionScalarWhereWithAggregatesInput = {
    AND?: ChatSessionScalarWhereWithAggregatesInput | ChatSessionScalarWhereWithAggregatesInput[]
    OR?: ChatSessionScalarWhereWithAggregatesInput[]
    NOT?: ChatSessionScalarWhereWithAggregatesInput | ChatSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ChatSession"> | string
    topic?: StringNullableWithAggregatesFilter<"ChatSession"> | string | null
    lastSummarizeIndex?: IntNullableWithAggregatesFilter<"ChatSession"> | number | null
    memoryPrompt?: StringNullableWithAggregatesFilter<"ChatSession"> | string | null
    userId?: IntWithAggregatesFilter<"ChatSession"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ChatSession"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ChatSession"> | Date | string
  }

  export type ChatMessageWhereInput = {
    AND?: ChatMessageWhereInput | ChatMessageWhereInput[]
    OR?: ChatMessageWhereInput[]
    NOT?: ChatMessageWhereInput | ChatMessageWhereInput[]
    id?: StringFilter<"ChatMessage"> | string
    role?: EnumChatMessageRoleFilter<"ChatMessage"> | $Enums.ChatMessageRole
    content?: StringFilter<"ChatMessage"> | string
    deleted?: BoolFilter<"ChatMessage"> | boolean
    chatSessionId?: StringNullableFilter<"ChatMessage"> | string | null
    modelId?: IntNullableFilter<"ChatMessage"> | number | null
    userId?: IntFilter<"ChatMessage"> | number
    createdAt?: DateTimeFilter<"ChatMessage"> | Date | string
    updatedAt?: DateTimeFilter<"ChatMessage"> | Date | string
    chatSession?: XOR<ChatSessionNullableRelationFilter, ChatSessionWhereInput> | null
    model?: XOR<ModelNullableRelationFilter, ModelWhereInput> | null
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type ChatMessageOrderByWithRelationInput = {
    id?: SortOrder
    role?: SortOrder
    content?: SortOrder
    deleted?: SortOrder
    chatSessionId?: SortOrderInput | SortOrder
    modelId?: SortOrderInput | SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    chatSession?: ChatSessionOrderByWithRelationInput
    model?: ModelOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type ChatMessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ChatMessageWhereInput | ChatMessageWhereInput[]
    OR?: ChatMessageWhereInput[]
    NOT?: ChatMessageWhereInput | ChatMessageWhereInput[]
    role?: EnumChatMessageRoleFilter<"ChatMessage"> | $Enums.ChatMessageRole
    content?: StringFilter<"ChatMessage"> | string
    deleted?: BoolFilter<"ChatMessage"> | boolean
    chatSessionId?: StringNullableFilter<"ChatMessage"> | string | null
    modelId?: IntNullableFilter<"ChatMessage"> | number | null
    userId?: IntFilter<"ChatMessage"> | number
    createdAt?: DateTimeFilter<"ChatMessage"> | Date | string
    updatedAt?: DateTimeFilter<"ChatMessage"> | Date | string
    chatSession?: XOR<ChatSessionNullableRelationFilter, ChatSessionWhereInput> | null
    model?: XOR<ModelNullableRelationFilter, ModelWhereInput> | null
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type ChatMessageOrderByWithAggregationInput = {
    id?: SortOrder
    role?: SortOrder
    content?: SortOrder
    deleted?: SortOrder
    chatSessionId?: SortOrderInput | SortOrder
    modelId?: SortOrderInput | SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ChatMessageCountOrderByAggregateInput
    _avg?: ChatMessageAvgOrderByAggregateInput
    _max?: ChatMessageMaxOrderByAggregateInput
    _min?: ChatMessageMinOrderByAggregateInput
    _sum?: ChatMessageSumOrderByAggregateInput
  }

  export type ChatMessageScalarWhereWithAggregatesInput = {
    AND?: ChatMessageScalarWhereWithAggregatesInput | ChatMessageScalarWhereWithAggregatesInput[]
    OR?: ChatMessageScalarWhereWithAggregatesInput[]
    NOT?: ChatMessageScalarWhereWithAggregatesInput | ChatMessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ChatMessage"> | string
    role?: EnumChatMessageRoleWithAggregatesFilter<"ChatMessage"> | $Enums.ChatMessageRole
    content?: StringWithAggregatesFilter<"ChatMessage"> | string
    deleted?: BoolWithAggregatesFilter<"ChatMessage"> | boolean
    chatSessionId?: StringNullableWithAggregatesFilter<"ChatMessage"> | string | null
    modelId?: IntNullableWithAggregatesFilter<"ChatMessage"> | number | null
    userId?: IntWithAggregatesFilter<"ChatMessage"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ChatMessage"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ChatMessage"> | Date | string
  }

  export type ChatSettingWhereInput = {
    AND?: ChatSettingWhereInput | ChatSettingWhereInput[]
    OR?: ChatSettingWhereInput[]
    NOT?: ChatSettingWhereInput | ChatSettingWhereInput[]
    userId?: IntFilter<"ChatSetting"> | number
    historyMessageCount?: IntNullableFilter<"ChatSetting"> | number | null
    submitKey?: StringNullableFilter<"ChatSetting"> | string | null
    tightBorder?: BoolFilter<"ChatSetting"> | boolean
    defalutModelId?: IntNullableFilter<"ChatSetting"> | number | null
    temperature?: FloatNullableFilter<"ChatSetting"> | number | null
    maxTokens?: IntNullableFilter<"ChatSetting"> | number | null
    presencePenalty?: FloatNullableFilter<"ChatSetting"> | number | null
  }

  export type ChatSettingOrderByWithRelationInput = {
    userId?: SortOrder
    historyMessageCount?: SortOrderInput | SortOrder
    submitKey?: SortOrderInput | SortOrder
    tightBorder?: SortOrder
    defalutModelId?: SortOrderInput | SortOrder
    temperature?: SortOrderInput | SortOrder
    maxTokens?: SortOrderInput | SortOrder
    presencePenalty?: SortOrderInput | SortOrder
  }

  export type ChatSettingWhereUniqueInput = Prisma.AtLeast<{
    userId?: number
    AND?: ChatSettingWhereInput | ChatSettingWhereInput[]
    OR?: ChatSettingWhereInput[]
    NOT?: ChatSettingWhereInput | ChatSettingWhereInput[]
    historyMessageCount?: IntNullableFilter<"ChatSetting"> | number | null
    submitKey?: StringNullableFilter<"ChatSetting"> | string | null
    tightBorder?: BoolFilter<"ChatSetting"> | boolean
    defalutModelId?: IntNullableFilter<"ChatSetting"> | number | null
    temperature?: FloatNullableFilter<"ChatSetting"> | number | null
    maxTokens?: IntNullableFilter<"ChatSetting"> | number | null
    presencePenalty?: FloatNullableFilter<"ChatSetting"> | number | null
  }, "userId">

  export type ChatSettingOrderByWithAggregationInput = {
    userId?: SortOrder
    historyMessageCount?: SortOrderInput | SortOrder
    submitKey?: SortOrderInput | SortOrder
    tightBorder?: SortOrder
    defalutModelId?: SortOrderInput | SortOrder
    temperature?: SortOrderInput | SortOrder
    maxTokens?: SortOrderInput | SortOrder
    presencePenalty?: SortOrderInput | SortOrder
    _count?: ChatSettingCountOrderByAggregateInput
    _avg?: ChatSettingAvgOrderByAggregateInput
    _max?: ChatSettingMaxOrderByAggregateInput
    _min?: ChatSettingMinOrderByAggregateInput
    _sum?: ChatSettingSumOrderByAggregateInput
  }

  export type ChatSettingScalarWhereWithAggregatesInput = {
    AND?: ChatSettingScalarWhereWithAggregatesInput | ChatSettingScalarWhereWithAggregatesInput[]
    OR?: ChatSettingScalarWhereWithAggregatesInput[]
    NOT?: ChatSettingScalarWhereWithAggregatesInput | ChatSettingScalarWhereWithAggregatesInput[]
    userId?: IntWithAggregatesFilter<"ChatSetting"> | number
    historyMessageCount?: IntNullableWithAggregatesFilter<"ChatSetting"> | number | null
    submitKey?: StringNullableWithAggregatesFilter<"ChatSetting"> | string | null
    tightBorder?: BoolWithAggregatesFilter<"ChatSetting"> | boolean
    defalutModelId?: IntNullableWithAggregatesFilter<"ChatSetting"> | number | null
    temperature?: FloatNullableWithAggregatesFilter<"ChatSetting"> | number | null
    maxTokens?: IntNullableWithAggregatesFilter<"ChatSetting"> | number | null
    presencePenalty?: FloatNullableWithAggregatesFilter<"ChatSetting"> | number | null
  }

  export type UserCreateInput = {
    role?: $Enums.Role
    name: string
    email?: string | null
    phone?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isBlocked?: boolean
    oauths?: OAuthCreateNestedManyWithoutUserInput
    orders?: OrderCreateNestedManyWithoutUserInput
    chatSessions?: ChatSessionCreateNestedManyWithoutUserInput
    chatMessages?: ChatMessageCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    role?: $Enums.Role
    name: string
    email?: string | null
    phone?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isBlocked?: boolean
    oauths?: OAuthUncheckedCreateNestedManyWithoutUserInput
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
    chatSessions?: ChatSessionUncheckedCreateNestedManyWithoutUserInput
    chatMessages?: ChatMessageUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
    oauths?: OAuthUpdateManyWithoutUserNestedInput
    orders?: OrderUpdateManyWithoutUserNestedInput
    chatSessions?: ChatSessionUpdateManyWithoutUserNestedInput
    chatMessages?: ChatMessageUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
    oauths?: OAuthUncheckedUpdateManyWithoutUserNestedInput
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
    chatSessions?: ChatSessionUncheckedUpdateManyWithoutUserNestedInput
    chatMessages?: ChatMessageUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    role?: $Enums.Role
    name: string
    email?: string | null
    phone?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isBlocked?: boolean
  }

  export type UserUpdateManyMutationInput = {
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
  }

  export type OAuthCreateInput = {
    provider: $Enums.OAuthProvider
    providerId: string
    accessToken: string
    refreshToken: string
    expiredAt: Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutOauthsInput
  }

  export type OAuthUncheckedCreateInput = {
    id?: number
    provider: $Enums.OAuthProvider
    providerId: string
    accessToken: string
    refreshToken: string
    expiredAt: Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OAuthUpdateInput = {
    provider?: EnumOAuthProviderFieldUpdateOperationsInput | $Enums.OAuthProvider
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    expiredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutOauthsNestedInput
  }

  export type OAuthUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    provider?: EnumOAuthProviderFieldUpdateOperationsInput | $Enums.OAuthProvider
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    expiredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthCreateManyInput = {
    id?: number
    provider: $Enums.OAuthProvider
    providerId: string
    accessToken: string
    refreshToken: string
    expiredAt: Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OAuthUpdateManyMutationInput = {
    provider?: EnumOAuthProviderFieldUpdateOperationsInput | $Enums.OAuthProvider
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    expiredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    provider?: EnumOAuthProviderFieldUpdateOperationsInput | $Enums.OAuthProvider
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    expiredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModelCreateInput = {
    name: string
    price: number
    products?: ModelInProductCreateNestedManyWithoutModelInput
    messages?: ChatMessageCreateNestedManyWithoutModelInput
  }

  export type ModelUncheckedCreateInput = {
    id?: number
    name: string
    price: number
    products?: ModelInProductUncheckedCreateNestedManyWithoutModelInput
    messages?: ChatMessageUncheckedCreateNestedManyWithoutModelInput
  }

  export type ModelUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    products?: ModelInProductUpdateManyWithoutModelNestedInput
    messages?: ChatMessageUpdateManyWithoutModelNestedInput
  }

  export type ModelUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    products?: ModelInProductUncheckedUpdateManyWithoutModelNestedInput
    messages?: ChatMessageUncheckedUpdateManyWithoutModelNestedInput
  }

  export type ModelCreateManyInput = {
    id?: number
    name: string
    price: number
  }

  export type ModelUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
  }

  export type ModelUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
  }

  export type ProductCreateInput = {
    name: string
    features?: ProductCreatefeaturesInput | string[]
    isHidden?: boolean
    price: number
    stock?: number
    duration: number
    models?: ModelInProductCreateNestedManyWithoutProductInput
    order?: OrderCreateNestedManyWithoutProductInput
    category?: CategoryCreateNestedOneWithoutProductsInput
  }

  export type ProductUncheckedCreateInput = {
    id?: number
    name: string
    features?: ProductCreatefeaturesInput | string[]
    isHidden?: boolean
    price: number
    stock?: number
    duration: number
    categoryId?: number | null
    models?: ModelInProductUncheckedCreateNestedManyWithoutProductInput
    order?: OrderUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    features?: ProductUpdatefeaturesInput | string[]
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    price?: IntFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    models?: ModelInProductUpdateManyWithoutProductNestedInput
    order?: OrderUpdateManyWithoutProductNestedInput
    category?: CategoryUpdateOneWithoutProductsNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    features?: ProductUpdatefeaturesInput | string[]
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    price?: IntFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
    models?: ModelInProductUncheckedUpdateManyWithoutProductNestedInput
    order?: OrderUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateManyInput = {
    id?: number
    name: string
    features?: ProductCreatefeaturesInput | string[]
    isHidden?: boolean
    price: number
    stock?: number
    duration: number
    categoryId?: number | null
  }

  export type ProductUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    features?: ProductUpdatefeaturesInput | string[]
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    price?: IntFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
  }

  export type ProductUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    features?: ProductUpdatefeaturesInput | string[]
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    price?: IntFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ModelInProductCreateInput = {
    times: number
    duration: number
    model: ModelCreateNestedOneWithoutProductsInput
    product: ProductCreateNestedOneWithoutModelsInput
  }

  export type ModelInProductUncheckedCreateInput = {
    times: number
    duration: number
    modelId: number
    productId: number
  }

  export type ModelInProductUpdateInput = {
    times?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    model?: ModelUpdateOneRequiredWithoutProductsNestedInput
    product?: ProductUpdateOneRequiredWithoutModelsNestedInput
  }

  export type ModelInProductUncheckedUpdateInput = {
    times?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    modelId?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
  }

  export type ModelInProductCreateManyInput = {
    times: number
    duration: number
    modelId: number
    productId: number
  }

  export type ModelInProductUpdateManyMutationInput = {
    times?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
  }

  export type ModelInProductUncheckedUpdateManyInput = {
    times?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    modelId?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
  }

  export type CategoryCreateInput = {
    name: string
    products?: ProductCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    id?: number
    name: string
    products?: ProductUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    products?: ProductUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    products?: ProductUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    id?: number
    name: string
  }

  export type CategoryUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type OrderCreateInput = {
    id: string
    type: $Enums.OrderType
    status?: $Enums.OrderStatus
    count?: number
    amount: number
    startAt?: Date | string | null
    endAt?: Date | string | null
    isCurrent?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    rawData?: NullableJsonNullValueInput | InputJsonValue
    user: UserCreateNestedOneWithoutOrdersInput
    product: ProductCreateNestedOneWithoutOrderInput
  }

  export type OrderUncheckedCreateInput = {
    id: string
    type: $Enums.OrderType
    status?: $Enums.OrderStatus
    count?: number
    amount: number
    startAt?: Date | string | null
    endAt?: Date | string | null
    isCurrent?: boolean
    userId: number
    productId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    rawData?: NullableJsonNullValueInput | InputJsonValue
  }

  export type OrderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    count?: IntFieldUpdateOperationsInput | number
    amount?: IntFieldUpdateOperationsInput | number
    startAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rawData?: NullableJsonNullValueInput | InputJsonValue
    user?: UserUpdateOneRequiredWithoutOrdersNestedInput
    product?: ProductUpdateOneRequiredWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    count?: IntFieldUpdateOperationsInput | number
    amount?: IntFieldUpdateOperationsInput | number
    startAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    userId?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rawData?: NullableJsonNullValueInput | InputJsonValue
  }

  export type OrderCreateManyInput = {
    id: string
    type: $Enums.OrderType
    status?: $Enums.OrderStatus
    count?: number
    amount: number
    startAt?: Date | string | null
    endAt?: Date | string | null
    isCurrent?: boolean
    userId: number
    productId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    rawData?: NullableJsonNullValueInput | InputJsonValue
  }

  export type OrderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    count?: IntFieldUpdateOperationsInput | number
    amount?: IntFieldUpdateOperationsInput | number
    startAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rawData?: NullableJsonNullValueInput | InputJsonValue
  }

  export type OrderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    count?: IntFieldUpdateOperationsInput | number
    amount?: IntFieldUpdateOperationsInput | number
    startAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    userId?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rawData?: NullableJsonNullValueInput | InputJsonValue
  }

  export type OpenAIKeyCreateInput = {
    key: string
    weight?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OpenAIKeyUncheckedCreateInput = {
    key: string
    weight?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OpenAIKeyUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    weight?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OpenAIKeyUncheckedUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    weight?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OpenAIKeyCreateManyInput = {
    key: string
    weight?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OpenAIKeyUpdateManyMutationInput = {
    key?: StringFieldUpdateOperationsInput | string
    weight?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OpenAIKeyUncheckedUpdateManyInput = {
    key?: StringFieldUpdateOperationsInput | string
    weight?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RateLimitCreateInput = {
    key: string
    value?: RateLimitCreatevalueInput | number[]
  }

  export type RateLimitUncheckedCreateInput = {
    key: string
    value?: RateLimitCreatevalueInput | number[]
  }

  export type RateLimitUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: RateLimitUpdatevalueInput | number[]
  }

  export type RateLimitUncheckedUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: RateLimitUpdatevalueInput | number[]
  }

  export type RateLimitCreateManyInput = {
    key: string
    value?: RateLimitCreatevalueInput | number[]
  }

  export type RateLimitUpdateManyMutationInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: RateLimitUpdatevalueInput | number[]
  }

  export type RateLimitUncheckedUpdateManyInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: RateLimitUpdatevalueInput | number[]
  }

  export type ChatSessionCreateInput = {
    id?: string
    topic?: string | null
    lastSummarizeIndex?: number | null
    memoryPrompt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: ChatMessageCreateNestedManyWithoutChatSessionInput
    user: UserCreateNestedOneWithoutChatSessionsInput
  }

  export type ChatSessionUncheckedCreateInput = {
    id?: string
    topic?: string | null
    lastSummarizeIndex?: number | null
    memoryPrompt?: string | null
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: ChatMessageUncheckedCreateNestedManyWithoutChatSessionInput
  }

  export type ChatSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    lastSummarizeIndex?: NullableIntFieldUpdateOperationsInput | number | null
    memoryPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: ChatMessageUpdateManyWithoutChatSessionNestedInput
    user?: UserUpdateOneRequiredWithoutChatSessionsNestedInput
  }

  export type ChatSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    lastSummarizeIndex?: NullableIntFieldUpdateOperationsInput | number | null
    memoryPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: ChatMessageUncheckedUpdateManyWithoutChatSessionNestedInput
  }

  export type ChatSessionCreateManyInput = {
    id?: string
    topic?: string | null
    lastSummarizeIndex?: number | null
    memoryPrompt?: string | null
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChatSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    lastSummarizeIndex?: NullableIntFieldUpdateOperationsInput | number | null
    memoryPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    lastSummarizeIndex?: NullableIntFieldUpdateOperationsInput | number | null
    memoryPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatMessageCreateInput = {
    id?: string
    role: $Enums.ChatMessageRole
    content: string
    deleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    chatSession?: ChatSessionCreateNestedOneWithoutMessagesInput
    model?: ModelCreateNestedOneWithoutMessagesInput
    user: UserCreateNestedOneWithoutChatMessagesInput
  }

  export type ChatMessageUncheckedCreateInput = {
    id?: string
    role: $Enums.ChatMessageRole
    content: string
    deleted?: boolean
    chatSessionId?: string | null
    modelId?: number | null
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChatMessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumChatMessageRoleFieldUpdateOperationsInput | $Enums.ChatMessageRole
    content?: StringFieldUpdateOperationsInput | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chatSession?: ChatSessionUpdateOneWithoutMessagesNestedInput
    model?: ModelUpdateOneWithoutMessagesNestedInput
    user?: UserUpdateOneRequiredWithoutChatMessagesNestedInput
  }

  export type ChatMessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumChatMessageRoleFieldUpdateOperationsInput | $Enums.ChatMessageRole
    content?: StringFieldUpdateOperationsInput | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    chatSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    modelId?: NullableIntFieldUpdateOperationsInput | number | null
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatMessageCreateManyInput = {
    id?: string
    role: $Enums.ChatMessageRole
    content: string
    deleted?: boolean
    chatSessionId?: string | null
    modelId?: number | null
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChatMessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumChatMessageRoleFieldUpdateOperationsInput | $Enums.ChatMessageRole
    content?: StringFieldUpdateOperationsInput | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatMessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumChatMessageRoleFieldUpdateOperationsInput | $Enums.ChatMessageRole
    content?: StringFieldUpdateOperationsInput | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    chatSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    modelId?: NullableIntFieldUpdateOperationsInput | number | null
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatSettingCreateInput = {
    userId: number
    historyMessageCount?: number | null
    submitKey?: string | null
    tightBorder?: boolean
    defalutModelId?: number | null
    temperature?: number | null
    maxTokens?: number | null
    presencePenalty?: number | null
  }

  export type ChatSettingUncheckedCreateInput = {
    userId: number
    historyMessageCount?: number | null
    submitKey?: string | null
    tightBorder?: boolean
    defalutModelId?: number | null
    temperature?: number | null
    maxTokens?: number | null
    presencePenalty?: number | null
  }

  export type ChatSettingUpdateInput = {
    userId?: IntFieldUpdateOperationsInput | number
    historyMessageCount?: NullableIntFieldUpdateOperationsInput | number | null
    submitKey?: NullableStringFieldUpdateOperationsInput | string | null
    tightBorder?: BoolFieldUpdateOperationsInput | boolean
    defalutModelId?: NullableIntFieldUpdateOperationsInput | number | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    maxTokens?: NullableIntFieldUpdateOperationsInput | number | null
    presencePenalty?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type ChatSettingUncheckedUpdateInput = {
    userId?: IntFieldUpdateOperationsInput | number
    historyMessageCount?: NullableIntFieldUpdateOperationsInput | number | null
    submitKey?: NullableStringFieldUpdateOperationsInput | string | null
    tightBorder?: BoolFieldUpdateOperationsInput | boolean
    defalutModelId?: NullableIntFieldUpdateOperationsInput | number | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    maxTokens?: NullableIntFieldUpdateOperationsInput | number | null
    presencePenalty?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type ChatSettingCreateManyInput = {
    userId: number
    historyMessageCount?: number | null
    submitKey?: string | null
    tightBorder?: boolean
    defalutModelId?: number | null
    temperature?: number | null
    maxTokens?: number | null
    presencePenalty?: number | null
  }

  export type ChatSettingUpdateManyMutationInput = {
    userId?: IntFieldUpdateOperationsInput | number
    historyMessageCount?: NullableIntFieldUpdateOperationsInput | number | null
    submitKey?: NullableStringFieldUpdateOperationsInput | string | null
    tightBorder?: BoolFieldUpdateOperationsInput | boolean
    defalutModelId?: NullableIntFieldUpdateOperationsInput | number | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    maxTokens?: NullableIntFieldUpdateOperationsInput | number | null
    presencePenalty?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type ChatSettingUncheckedUpdateManyInput = {
    userId?: IntFieldUpdateOperationsInput | number
    historyMessageCount?: NullableIntFieldUpdateOperationsInput | number | null
    submitKey?: NullableStringFieldUpdateOperationsInput | string | null
    tightBorder?: BoolFieldUpdateOperationsInput | boolean
    defalutModelId?: NullableIntFieldUpdateOperationsInput | number | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    maxTokens?: NullableIntFieldUpdateOperationsInput | number | null
    presencePenalty?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type OAuthListRelationFilter = {
    every?: OAuthWhereInput
    some?: OAuthWhereInput
    none?: OAuthWhereInput
  }

  export type OrderListRelationFilter = {
    every?: OrderWhereInput
    some?: OrderWhereInput
    none?: OrderWhereInput
  }

  export type ChatSessionListRelationFilter = {
    every?: ChatSessionWhereInput
    some?: ChatSessionWhereInput
    none?: ChatSessionWhereInput
  }

  export type ChatMessageListRelationFilter = {
    every?: ChatMessageWhereInput
    some?: ChatMessageWhereInput
    none?: ChatMessageWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type OAuthOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ChatSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ChatMessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isBlocked?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isBlocked?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isBlocked?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumOAuthProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.OAuthProvider | EnumOAuthProviderFieldRefInput<$PrismaModel>
    in?: $Enums.OAuthProvider[] | ListEnumOAuthProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.OAuthProvider[] | ListEnumOAuthProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumOAuthProviderFilter<$PrismaModel> | $Enums.OAuthProvider
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type OAuthProviderProviderIdCompoundUniqueInput = {
    provider: $Enums.OAuthProvider
    providerId: string
  }

  export type OAuthCountOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    providerId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    expiredAt?: SortOrder
    data?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OAuthAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type OAuthMaxOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    providerId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    expiredAt?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OAuthMinOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    providerId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    expiredAt?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OAuthSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type EnumOAuthProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OAuthProvider | EnumOAuthProviderFieldRefInput<$PrismaModel>
    in?: $Enums.OAuthProvider[] | ListEnumOAuthProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.OAuthProvider[] | ListEnumOAuthProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumOAuthProviderWithAggregatesFilter<$PrismaModel> | $Enums.OAuthProvider
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOAuthProviderFilter<$PrismaModel>
    _max?: NestedEnumOAuthProviderFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type ModelInProductListRelationFilter = {
    every?: ModelInProductWhereInput
    some?: ModelInProductWhereInput
    none?: ModelInProductWhereInput
  }

  export type ModelInProductOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ModelIdNameCompoundUniqueInput = {
    id: number
    name: string
  }

  export type ModelCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
  }

  export type ModelAvgOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
  }

  export type ModelMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
  }

  export type ModelMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
  }

  export type ModelSumOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type CategoryNullableRelationFilter = {
    is?: CategoryWhereInput | null
    isNot?: CategoryWhereInput | null
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    features?: SortOrder
    isHidden?: SortOrder
    price?: SortOrder
    stock?: SortOrder
    duration?: SortOrder
    categoryId?: SortOrder
  }

  export type ProductAvgOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
    stock?: SortOrder
    duration?: SortOrder
    categoryId?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    isHidden?: SortOrder
    price?: SortOrder
    stock?: SortOrder
    duration?: SortOrder
    categoryId?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    isHidden?: SortOrder
    price?: SortOrder
    stock?: SortOrder
    duration?: SortOrder
    categoryId?: SortOrder
  }

  export type ProductSumOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
    stock?: SortOrder
    duration?: SortOrder
    categoryId?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type ModelRelationFilter = {
    is?: ModelWhereInput
    isNot?: ModelWhereInput
  }

  export type ProductRelationFilter = {
    is?: ProductWhereInput
    isNot?: ProductWhereInput
  }

  export type ModelInProductModelIdProductIdCompoundUniqueInput = {
    modelId: number
    productId: number
  }

  export type ModelInProductCountOrderByAggregateInput = {
    times?: SortOrder
    duration?: SortOrder
    modelId?: SortOrder
    productId?: SortOrder
  }

  export type ModelInProductAvgOrderByAggregateInput = {
    times?: SortOrder
    duration?: SortOrder
    modelId?: SortOrder
    productId?: SortOrder
  }

  export type ModelInProductMaxOrderByAggregateInput = {
    times?: SortOrder
    duration?: SortOrder
    modelId?: SortOrder
    productId?: SortOrder
  }

  export type ModelInProductMinOrderByAggregateInput = {
    times?: SortOrder
    duration?: SortOrder
    modelId?: SortOrder
    productId?: SortOrder
  }

  export type ModelInProductSumOrderByAggregateInput = {
    times?: SortOrder
    duration?: SortOrder
    modelId?: SortOrder
    productId?: SortOrder
  }

  export type ProductListRelationFilter = {
    every?: ProductWhereInput
    some?: ProductWhereInput
    none?: ProductWhereInput
  }

  export type ProductOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type CategoryAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type CategorySumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnumOrderTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderType | EnumOrderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.OrderType[] | ListEnumOrderTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderType[] | ListEnumOrderTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderTypeFilter<$PrismaModel> | $Enums.OrderType
  }

  export type EnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type OrderCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    status?: SortOrder
    count?: SortOrder
    amount?: SortOrder
    startAt?: SortOrder
    endAt?: SortOrder
    isCurrent?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    rawData?: SortOrder
  }

  export type OrderAvgOrderByAggregateInput = {
    count?: SortOrder
    amount?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
  }

  export type OrderMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    status?: SortOrder
    count?: SortOrder
    amount?: SortOrder
    startAt?: SortOrder
    endAt?: SortOrder
    isCurrent?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    status?: SortOrder
    count?: SortOrder
    amount?: SortOrder
    startAt?: SortOrder
    endAt?: SortOrder
    isCurrent?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderSumOrderByAggregateInput = {
    count?: SortOrder
    amount?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
  }

  export type EnumOrderTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderType | EnumOrderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.OrderType[] | ListEnumOrderTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderType[] | ListEnumOrderTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderTypeWithAggregatesFilter<$PrismaModel> | $Enums.OrderType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderTypeFilter<$PrismaModel>
    _max?: NestedEnumOrderTypeFilter<$PrismaModel>
  }

  export type EnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type OpenAIKeyCountOrderByAggregateInput = {
    key?: SortOrder
    weight?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OpenAIKeyAvgOrderByAggregateInput = {
    weight?: SortOrder
  }

  export type OpenAIKeyMaxOrderByAggregateInput = {
    key?: SortOrder
    weight?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OpenAIKeyMinOrderByAggregateInput = {
    key?: SortOrder
    weight?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OpenAIKeySumOrderByAggregateInput = {
    weight?: SortOrder
  }

  export type IntNullableListFilter<$PrismaModel = never> = {
    equals?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    has?: number | IntFieldRefInput<$PrismaModel> | null
    hasEvery?: number[] | ListIntFieldRefInput<$PrismaModel>
    hasSome?: number[] | ListIntFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type RateLimitCountOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
  }

  export type RateLimitAvgOrderByAggregateInput = {
    value?: SortOrder
  }

  export type RateLimitMaxOrderByAggregateInput = {
    key?: SortOrder
  }

  export type RateLimitMinOrderByAggregateInput = {
    key?: SortOrder
  }

  export type RateLimitSumOrderByAggregateInput = {
    value?: SortOrder
  }

  export type ChatSessionCountOrderByAggregateInput = {
    id?: SortOrder
    topic?: SortOrder
    lastSummarizeIndex?: SortOrder
    memoryPrompt?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChatSessionAvgOrderByAggregateInput = {
    lastSummarizeIndex?: SortOrder
    userId?: SortOrder
  }

  export type ChatSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    topic?: SortOrder
    lastSummarizeIndex?: SortOrder
    memoryPrompt?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChatSessionMinOrderByAggregateInput = {
    id?: SortOrder
    topic?: SortOrder
    lastSummarizeIndex?: SortOrder
    memoryPrompt?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChatSessionSumOrderByAggregateInput = {
    lastSummarizeIndex?: SortOrder
    userId?: SortOrder
  }

  export type EnumChatMessageRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.ChatMessageRole | EnumChatMessageRoleFieldRefInput<$PrismaModel>
    in?: $Enums.ChatMessageRole[] | ListEnumChatMessageRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChatMessageRole[] | ListEnumChatMessageRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumChatMessageRoleFilter<$PrismaModel> | $Enums.ChatMessageRole
  }

  export type ChatSessionNullableRelationFilter = {
    is?: ChatSessionWhereInput | null
    isNot?: ChatSessionWhereInput | null
  }

  export type ModelNullableRelationFilter = {
    is?: ModelWhereInput | null
    isNot?: ModelWhereInput | null
  }

  export type ChatMessageCountOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    content?: SortOrder
    deleted?: SortOrder
    chatSessionId?: SortOrder
    modelId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChatMessageAvgOrderByAggregateInput = {
    modelId?: SortOrder
    userId?: SortOrder
  }

  export type ChatMessageMaxOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    content?: SortOrder
    deleted?: SortOrder
    chatSessionId?: SortOrder
    modelId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChatMessageMinOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    content?: SortOrder
    deleted?: SortOrder
    chatSessionId?: SortOrder
    modelId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChatMessageSumOrderByAggregateInput = {
    modelId?: SortOrder
    userId?: SortOrder
  }

  export type EnumChatMessageRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChatMessageRole | EnumChatMessageRoleFieldRefInput<$PrismaModel>
    in?: $Enums.ChatMessageRole[] | ListEnumChatMessageRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChatMessageRole[] | ListEnumChatMessageRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumChatMessageRoleWithAggregatesFilter<$PrismaModel> | $Enums.ChatMessageRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumChatMessageRoleFilter<$PrismaModel>
    _max?: NestedEnumChatMessageRoleFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type ChatSettingCountOrderByAggregateInput = {
    userId?: SortOrder
    historyMessageCount?: SortOrder
    submitKey?: SortOrder
    tightBorder?: SortOrder
    defalutModelId?: SortOrder
    temperature?: SortOrder
    maxTokens?: SortOrder
    presencePenalty?: SortOrder
  }

  export type ChatSettingAvgOrderByAggregateInput = {
    userId?: SortOrder
    historyMessageCount?: SortOrder
    defalutModelId?: SortOrder
    temperature?: SortOrder
    maxTokens?: SortOrder
    presencePenalty?: SortOrder
  }

  export type ChatSettingMaxOrderByAggregateInput = {
    userId?: SortOrder
    historyMessageCount?: SortOrder
    submitKey?: SortOrder
    tightBorder?: SortOrder
    defalutModelId?: SortOrder
    temperature?: SortOrder
    maxTokens?: SortOrder
    presencePenalty?: SortOrder
  }

  export type ChatSettingMinOrderByAggregateInput = {
    userId?: SortOrder
    historyMessageCount?: SortOrder
    submitKey?: SortOrder
    tightBorder?: SortOrder
    defalutModelId?: SortOrder
    temperature?: SortOrder
    maxTokens?: SortOrder
    presencePenalty?: SortOrder
  }

  export type ChatSettingSumOrderByAggregateInput = {
    userId?: SortOrder
    historyMessageCount?: SortOrder
    defalutModelId?: SortOrder
    temperature?: SortOrder
    maxTokens?: SortOrder
    presencePenalty?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type OAuthCreateNestedManyWithoutUserInput = {
    create?: XOR<OAuthCreateWithoutUserInput, OAuthUncheckedCreateWithoutUserInput> | OAuthCreateWithoutUserInput[] | OAuthUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthCreateOrConnectWithoutUserInput | OAuthCreateOrConnectWithoutUserInput[]
    createMany?: OAuthCreateManyUserInputEnvelope
    connect?: OAuthWhereUniqueInput | OAuthWhereUniqueInput[]
  }

  export type OrderCreateNestedManyWithoutUserInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    createMany?: OrderCreateManyUserInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type ChatSessionCreateNestedManyWithoutUserInput = {
    create?: XOR<ChatSessionCreateWithoutUserInput, ChatSessionUncheckedCreateWithoutUserInput> | ChatSessionCreateWithoutUserInput[] | ChatSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ChatSessionCreateOrConnectWithoutUserInput | ChatSessionCreateOrConnectWithoutUserInput[]
    createMany?: ChatSessionCreateManyUserInputEnvelope
    connect?: ChatSessionWhereUniqueInput | ChatSessionWhereUniqueInput[]
  }

  export type ChatMessageCreateNestedManyWithoutUserInput = {
    create?: XOR<ChatMessageCreateWithoutUserInput, ChatMessageUncheckedCreateWithoutUserInput> | ChatMessageCreateWithoutUserInput[] | ChatMessageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ChatMessageCreateOrConnectWithoutUserInput | ChatMessageCreateOrConnectWithoutUserInput[]
    createMany?: ChatMessageCreateManyUserInputEnvelope
    connect?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
  }

  export type OAuthUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<OAuthCreateWithoutUserInput, OAuthUncheckedCreateWithoutUserInput> | OAuthCreateWithoutUserInput[] | OAuthUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthCreateOrConnectWithoutUserInput | OAuthCreateOrConnectWithoutUserInput[]
    createMany?: OAuthCreateManyUserInputEnvelope
    connect?: OAuthWhereUniqueInput | OAuthWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    createMany?: OrderCreateManyUserInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type ChatSessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ChatSessionCreateWithoutUserInput, ChatSessionUncheckedCreateWithoutUserInput> | ChatSessionCreateWithoutUserInput[] | ChatSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ChatSessionCreateOrConnectWithoutUserInput | ChatSessionCreateOrConnectWithoutUserInput[]
    createMany?: ChatSessionCreateManyUserInputEnvelope
    connect?: ChatSessionWhereUniqueInput | ChatSessionWhereUniqueInput[]
  }

  export type ChatMessageUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ChatMessageCreateWithoutUserInput, ChatMessageUncheckedCreateWithoutUserInput> | ChatMessageCreateWithoutUserInput[] | ChatMessageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ChatMessageCreateOrConnectWithoutUserInput | ChatMessageCreateOrConnectWithoutUserInput[]
    createMany?: ChatMessageCreateManyUserInputEnvelope
    connect?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type OAuthUpdateManyWithoutUserNestedInput = {
    create?: XOR<OAuthCreateWithoutUserInput, OAuthUncheckedCreateWithoutUserInput> | OAuthCreateWithoutUserInput[] | OAuthUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthCreateOrConnectWithoutUserInput | OAuthCreateOrConnectWithoutUserInput[]
    upsert?: OAuthUpsertWithWhereUniqueWithoutUserInput | OAuthUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OAuthCreateManyUserInputEnvelope
    set?: OAuthWhereUniqueInput | OAuthWhereUniqueInput[]
    disconnect?: OAuthWhereUniqueInput | OAuthWhereUniqueInput[]
    delete?: OAuthWhereUniqueInput | OAuthWhereUniqueInput[]
    connect?: OAuthWhereUniqueInput | OAuthWhereUniqueInput[]
    update?: OAuthUpdateWithWhereUniqueWithoutUserInput | OAuthUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OAuthUpdateManyWithWhereWithoutUserInput | OAuthUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OAuthScalarWhereInput | OAuthScalarWhereInput[]
  }

  export type OrderUpdateManyWithoutUserNestedInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutUserInput | OrderUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OrderCreateManyUserInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutUserInput | OrderUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutUserInput | OrderUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type ChatSessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<ChatSessionCreateWithoutUserInput, ChatSessionUncheckedCreateWithoutUserInput> | ChatSessionCreateWithoutUserInput[] | ChatSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ChatSessionCreateOrConnectWithoutUserInput | ChatSessionCreateOrConnectWithoutUserInput[]
    upsert?: ChatSessionUpsertWithWhereUniqueWithoutUserInput | ChatSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ChatSessionCreateManyUserInputEnvelope
    set?: ChatSessionWhereUniqueInput | ChatSessionWhereUniqueInput[]
    disconnect?: ChatSessionWhereUniqueInput | ChatSessionWhereUniqueInput[]
    delete?: ChatSessionWhereUniqueInput | ChatSessionWhereUniqueInput[]
    connect?: ChatSessionWhereUniqueInput | ChatSessionWhereUniqueInput[]
    update?: ChatSessionUpdateWithWhereUniqueWithoutUserInput | ChatSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ChatSessionUpdateManyWithWhereWithoutUserInput | ChatSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ChatSessionScalarWhereInput | ChatSessionScalarWhereInput[]
  }

  export type ChatMessageUpdateManyWithoutUserNestedInput = {
    create?: XOR<ChatMessageCreateWithoutUserInput, ChatMessageUncheckedCreateWithoutUserInput> | ChatMessageCreateWithoutUserInput[] | ChatMessageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ChatMessageCreateOrConnectWithoutUserInput | ChatMessageCreateOrConnectWithoutUserInput[]
    upsert?: ChatMessageUpsertWithWhereUniqueWithoutUserInput | ChatMessageUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ChatMessageCreateManyUserInputEnvelope
    set?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    disconnect?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    delete?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    connect?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    update?: ChatMessageUpdateWithWhereUniqueWithoutUserInput | ChatMessageUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ChatMessageUpdateManyWithWhereWithoutUserInput | ChatMessageUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ChatMessageScalarWhereInput | ChatMessageScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type OAuthUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<OAuthCreateWithoutUserInput, OAuthUncheckedCreateWithoutUserInput> | OAuthCreateWithoutUserInput[] | OAuthUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthCreateOrConnectWithoutUserInput | OAuthCreateOrConnectWithoutUserInput[]
    upsert?: OAuthUpsertWithWhereUniqueWithoutUserInput | OAuthUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OAuthCreateManyUserInputEnvelope
    set?: OAuthWhereUniqueInput | OAuthWhereUniqueInput[]
    disconnect?: OAuthWhereUniqueInput | OAuthWhereUniqueInput[]
    delete?: OAuthWhereUniqueInput | OAuthWhereUniqueInput[]
    connect?: OAuthWhereUniqueInput | OAuthWhereUniqueInput[]
    update?: OAuthUpdateWithWhereUniqueWithoutUserInput | OAuthUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OAuthUpdateManyWithWhereWithoutUserInput | OAuthUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OAuthScalarWhereInput | OAuthScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutUserInput | OrderUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OrderCreateManyUserInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutUserInput | OrderUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutUserInput | OrderUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type ChatSessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ChatSessionCreateWithoutUserInput, ChatSessionUncheckedCreateWithoutUserInput> | ChatSessionCreateWithoutUserInput[] | ChatSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ChatSessionCreateOrConnectWithoutUserInput | ChatSessionCreateOrConnectWithoutUserInput[]
    upsert?: ChatSessionUpsertWithWhereUniqueWithoutUserInput | ChatSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ChatSessionCreateManyUserInputEnvelope
    set?: ChatSessionWhereUniqueInput | ChatSessionWhereUniqueInput[]
    disconnect?: ChatSessionWhereUniqueInput | ChatSessionWhereUniqueInput[]
    delete?: ChatSessionWhereUniqueInput | ChatSessionWhereUniqueInput[]
    connect?: ChatSessionWhereUniqueInput | ChatSessionWhereUniqueInput[]
    update?: ChatSessionUpdateWithWhereUniqueWithoutUserInput | ChatSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ChatSessionUpdateManyWithWhereWithoutUserInput | ChatSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ChatSessionScalarWhereInput | ChatSessionScalarWhereInput[]
  }

  export type ChatMessageUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ChatMessageCreateWithoutUserInput, ChatMessageUncheckedCreateWithoutUserInput> | ChatMessageCreateWithoutUserInput[] | ChatMessageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ChatMessageCreateOrConnectWithoutUserInput | ChatMessageCreateOrConnectWithoutUserInput[]
    upsert?: ChatMessageUpsertWithWhereUniqueWithoutUserInput | ChatMessageUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ChatMessageCreateManyUserInputEnvelope
    set?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    disconnect?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    delete?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    connect?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    update?: ChatMessageUpdateWithWhereUniqueWithoutUserInput | ChatMessageUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ChatMessageUpdateManyWithWhereWithoutUserInput | ChatMessageUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ChatMessageScalarWhereInput | ChatMessageScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutOauthsInput = {
    create?: XOR<UserCreateWithoutOauthsInput, UserUncheckedCreateWithoutOauthsInput>
    connectOrCreate?: UserCreateOrConnectWithoutOauthsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumOAuthProviderFieldUpdateOperationsInput = {
    set?: $Enums.OAuthProvider
  }

  export type UserUpdateOneRequiredWithoutOauthsNestedInput = {
    create?: XOR<UserCreateWithoutOauthsInput, UserUncheckedCreateWithoutOauthsInput>
    connectOrCreate?: UserCreateOrConnectWithoutOauthsInput
    upsert?: UserUpsertWithoutOauthsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOauthsInput, UserUpdateWithoutOauthsInput>, UserUncheckedUpdateWithoutOauthsInput>
  }

  export type ModelInProductCreateNestedManyWithoutModelInput = {
    create?: XOR<ModelInProductCreateWithoutModelInput, ModelInProductUncheckedCreateWithoutModelInput> | ModelInProductCreateWithoutModelInput[] | ModelInProductUncheckedCreateWithoutModelInput[]
    connectOrCreate?: ModelInProductCreateOrConnectWithoutModelInput | ModelInProductCreateOrConnectWithoutModelInput[]
    createMany?: ModelInProductCreateManyModelInputEnvelope
    connect?: ModelInProductWhereUniqueInput | ModelInProductWhereUniqueInput[]
  }

  export type ChatMessageCreateNestedManyWithoutModelInput = {
    create?: XOR<ChatMessageCreateWithoutModelInput, ChatMessageUncheckedCreateWithoutModelInput> | ChatMessageCreateWithoutModelInput[] | ChatMessageUncheckedCreateWithoutModelInput[]
    connectOrCreate?: ChatMessageCreateOrConnectWithoutModelInput | ChatMessageCreateOrConnectWithoutModelInput[]
    createMany?: ChatMessageCreateManyModelInputEnvelope
    connect?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
  }

  export type ModelInProductUncheckedCreateNestedManyWithoutModelInput = {
    create?: XOR<ModelInProductCreateWithoutModelInput, ModelInProductUncheckedCreateWithoutModelInput> | ModelInProductCreateWithoutModelInput[] | ModelInProductUncheckedCreateWithoutModelInput[]
    connectOrCreate?: ModelInProductCreateOrConnectWithoutModelInput | ModelInProductCreateOrConnectWithoutModelInput[]
    createMany?: ModelInProductCreateManyModelInputEnvelope
    connect?: ModelInProductWhereUniqueInput | ModelInProductWhereUniqueInput[]
  }

  export type ChatMessageUncheckedCreateNestedManyWithoutModelInput = {
    create?: XOR<ChatMessageCreateWithoutModelInput, ChatMessageUncheckedCreateWithoutModelInput> | ChatMessageCreateWithoutModelInput[] | ChatMessageUncheckedCreateWithoutModelInput[]
    connectOrCreate?: ChatMessageCreateOrConnectWithoutModelInput | ChatMessageCreateOrConnectWithoutModelInput[]
    createMany?: ChatMessageCreateManyModelInputEnvelope
    connect?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
  }

  export type ModelInProductUpdateManyWithoutModelNestedInput = {
    create?: XOR<ModelInProductCreateWithoutModelInput, ModelInProductUncheckedCreateWithoutModelInput> | ModelInProductCreateWithoutModelInput[] | ModelInProductUncheckedCreateWithoutModelInput[]
    connectOrCreate?: ModelInProductCreateOrConnectWithoutModelInput | ModelInProductCreateOrConnectWithoutModelInput[]
    upsert?: ModelInProductUpsertWithWhereUniqueWithoutModelInput | ModelInProductUpsertWithWhereUniqueWithoutModelInput[]
    createMany?: ModelInProductCreateManyModelInputEnvelope
    set?: ModelInProductWhereUniqueInput | ModelInProductWhereUniqueInput[]
    disconnect?: ModelInProductWhereUniqueInput | ModelInProductWhereUniqueInput[]
    delete?: ModelInProductWhereUniqueInput | ModelInProductWhereUniqueInput[]
    connect?: ModelInProductWhereUniqueInput | ModelInProductWhereUniqueInput[]
    update?: ModelInProductUpdateWithWhereUniqueWithoutModelInput | ModelInProductUpdateWithWhereUniqueWithoutModelInput[]
    updateMany?: ModelInProductUpdateManyWithWhereWithoutModelInput | ModelInProductUpdateManyWithWhereWithoutModelInput[]
    deleteMany?: ModelInProductScalarWhereInput | ModelInProductScalarWhereInput[]
  }

  export type ChatMessageUpdateManyWithoutModelNestedInput = {
    create?: XOR<ChatMessageCreateWithoutModelInput, ChatMessageUncheckedCreateWithoutModelInput> | ChatMessageCreateWithoutModelInput[] | ChatMessageUncheckedCreateWithoutModelInput[]
    connectOrCreate?: ChatMessageCreateOrConnectWithoutModelInput | ChatMessageCreateOrConnectWithoutModelInput[]
    upsert?: ChatMessageUpsertWithWhereUniqueWithoutModelInput | ChatMessageUpsertWithWhereUniqueWithoutModelInput[]
    createMany?: ChatMessageCreateManyModelInputEnvelope
    set?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    disconnect?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    delete?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    connect?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    update?: ChatMessageUpdateWithWhereUniqueWithoutModelInput | ChatMessageUpdateWithWhereUniqueWithoutModelInput[]
    updateMany?: ChatMessageUpdateManyWithWhereWithoutModelInput | ChatMessageUpdateManyWithWhereWithoutModelInput[]
    deleteMany?: ChatMessageScalarWhereInput | ChatMessageScalarWhereInput[]
  }

  export type ModelInProductUncheckedUpdateManyWithoutModelNestedInput = {
    create?: XOR<ModelInProductCreateWithoutModelInput, ModelInProductUncheckedCreateWithoutModelInput> | ModelInProductCreateWithoutModelInput[] | ModelInProductUncheckedCreateWithoutModelInput[]
    connectOrCreate?: ModelInProductCreateOrConnectWithoutModelInput | ModelInProductCreateOrConnectWithoutModelInput[]
    upsert?: ModelInProductUpsertWithWhereUniqueWithoutModelInput | ModelInProductUpsertWithWhereUniqueWithoutModelInput[]
    createMany?: ModelInProductCreateManyModelInputEnvelope
    set?: ModelInProductWhereUniqueInput | ModelInProductWhereUniqueInput[]
    disconnect?: ModelInProductWhereUniqueInput | ModelInProductWhereUniqueInput[]
    delete?: ModelInProductWhereUniqueInput | ModelInProductWhereUniqueInput[]
    connect?: ModelInProductWhereUniqueInput | ModelInProductWhereUniqueInput[]
    update?: ModelInProductUpdateWithWhereUniqueWithoutModelInput | ModelInProductUpdateWithWhereUniqueWithoutModelInput[]
    updateMany?: ModelInProductUpdateManyWithWhereWithoutModelInput | ModelInProductUpdateManyWithWhereWithoutModelInput[]
    deleteMany?: ModelInProductScalarWhereInput | ModelInProductScalarWhereInput[]
  }

  export type ChatMessageUncheckedUpdateManyWithoutModelNestedInput = {
    create?: XOR<ChatMessageCreateWithoutModelInput, ChatMessageUncheckedCreateWithoutModelInput> | ChatMessageCreateWithoutModelInput[] | ChatMessageUncheckedCreateWithoutModelInput[]
    connectOrCreate?: ChatMessageCreateOrConnectWithoutModelInput | ChatMessageCreateOrConnectWithoutModelInput[]
    upsert?: ChatMessageUpsertWithWhereUniqueWithoutModelInput | ChatMessageUpsertWithWhereUniqueWithoutModelInput[]
    createMany?: ChatMessageCreateManyModelInputEnvelope
    set?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    disconnect?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    delete?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    connect?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    update?: ChatMessageUpdateWithWhereUniqueWithoutModelInput | ChatMessageUpdateWithWhereUniqueWithoutModelInput[]
    updateMany?: ChatMessageUpdateManyWithWhereWithoutModelInput | ChatMessageUpdateManyWithWhereWithoutModelInput[]
    deleteMany?: ChatMessageScalarWhereInput | ChatMessageScalarWhereInput[]
  }

  export type ProductCreatefeaturesInput = {
    set: string[]
  }

  export type ModelInProductCreateNestedManyWithoutProductInput = {
    create?: XOR<ModelInProductCreateWithoutProductInput, ModelInProductUncheckedCreateWithoutProductInput> | ModelInProductCreateWithoutProductInput[] | ModelInProductUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ModelInProductCreateOrConnectWithoutProductInput | ModelInProductCreateOrConnectWithoutProductInput[]
    createMany?: ModelInProductCreateManyProductInputEnvelope
    connect?: ModelInProductWhereUniqueInput | ModelInProductWhereUniqueInput[]
  }

  export type OrderCreateNestedManyWithoutProductInput = {
    create?: XOR<OrderCreateWithoutProductInput, OrderUncheckedCreateWithoutProductInput> | OrderCreateWithoutProductInput[] | OrderUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutProductInput | OrderCreateOrConnectWithoutProductInput[]
    createMany?: OrderCreateManyProductInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type CategoryCreateNestedOneWithoutProductsInput = {
    create?: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutProductsInput
    connect?: CategoryWhereUniqueInput
  }

  export type ModelInProductUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<ModelInProductCreateWithoutProductInput, ModelInProductUncheckedCreateWithoutProductInput> | ModelInProductCreateWithoutProductInput[] | ModelInProductUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ModelInProductCreateOrConnectWithoutProductInput | ModelInProductCreateOrConnectWithoutProductInput[]
    createMany?: ModelInProductCreateManyProductInputEnvelope
    connect?: ModelInProductWhereUniqueInput | ModelInProductWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<OrderCreateWithoutProductInput, OrderUncheckedCreateWithoutProductInput> | OrderCreateWithoutProductInput[] | OrderUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutProductInput | OrderCreateOrConnectWithoutProductInput[]
    createMany?: OrderCreateManyProductInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type ProductUpdatefeaturesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ModelInProductUpdateManyWithoutProductNestedInput = {
    create?: XOR<ModelInProductCreateWithoutProductInput, ModelInProductUncheckedCreateWithoutProductInput> | ModelInProductCreateWithoutProductInput[] | ModelInProductUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ModelInProductCreateOrConnectWithoutProductInput | ModelInProductCreateOrConnectWithoutProductInput[]
    upsert?: ModelInProductUpsertWithWhereUniqueWithoutProductInput | ModelInProductUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ModelInProductCreateManyProductInputEnvelope
    set?: ModelInProductWhereUniqueInput | ModelInProductWhereUniqueInput[]
    disconnect?: ModelInProductWhereUniqueInput | ModelInProductWhereUniqueInput[]
    delete?: ModelInProductWhereUniqueInput | ModelInProductWhereUniqueInput[]
    connect?: ModelInProductWhereUniqueInput | ModelInProductWhereUniqueInput[]
    update?: ModelInProductUpdateWithWhereUniqueWithoutProductInput | ModelInProductUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ModelInProductUpdateManyWithWhereWithoutProductInput | ModelInProductUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ModelInProductScalarWhereInput | ModelInProductScalarWhereInput[]
  }

  export type OrderUpdateManyWithoutProductNestedInput = {
    create?: XOR<OrderCreateWithoutProductInput, OrderUncheckedCreateWithoutProductInput> | OrderCreateWithoutProductInput[] | OrderUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutProductInput | OrderCreateOrConnectWithoutProductInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutProductInput | OrderUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: OrderCreateManyProductInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutProductInput | OrderUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutProductInput | OrderUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type CategoryUpdateOneWithoutProductsNestedInput = {
    create?: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutProductsInput
    upsert?: CategoryUpsertWithoutProductsInput
    disconnect?: CategoryWhereInput | boolean
    delete?: CategoryWhereInput | boolean
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutProductsInput, CategoryUpdateWithoutProductsInput>, CategoryUncheckedUpdateWithoutProductsInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ModelInProductUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<ModelInProductCreateWithoutProductInput, ModelInProductUncheckedCreateWithoutProductInput> | ModelInProductCreateWithoutProductInput[] | ModelInProductUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ModelInProductCreateOrConnectWithoutProductInput | ModelInProductCreateOrConnectWithoutProductInput[]
    upsert?: ModelInProductUpsertWithWhereUniqueWithoutProductInput | ModelInProductUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ModelInProductCreateManyProductInputEnvelope
    set?: ModelInProductWhereUniqueInput | ModelInProductWhereUniqueInput[]
    disconnect?: ModelInProductWhereUniqueInput | ModelInProductWhereUniqueInput[]
    delete?: ModelInProductWhereUniqueInput | ModelInProductWhereUniqueInput[]
    connect?: ModelInProductWhereUniqueInput | ModelInProductWhereUniqueInput[]
    update?: ModelInProductUpdateWithWhereUniqueWithoutProductInput | ModelInProductUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ModelInProductUpdateManyWithWhereWithoutProductInput | ModelInProductUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ModelInProductScalarWhereInput | ModelInProductScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<OrderCreateWithoutProductInput, OrderUncheckedCreateWithoutProductInput> | OrderCreateWithoutProductInput[] | OrderUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutProductInput | OrderCreateOrConnectWithoutProductInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutProductInput | OrderUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: OrderCreateManyProductInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutProductInput | OrderUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutProductInput | OrderUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type ModelCreateNestedOneWithoutProductsInput = {
    create?: XOR<ModelCreateWithoutProductsInput, ModelUncheckedCreateWithoutProductsInput>
    connectOrCreate?: ModelCreateOrConnectWithoutProductsInput
    connect?: ModelWhereUniqueInput
  }

  export type ProductCreateNestedOneWithoutModelsInput = {
    create?: XOR<ProductCreateWithoutModelsInput, ProductUncheckedCreateWithoutModelsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutModelsInput
    connect?: ProductWhereUniqueInput
  }

  export type ModelUpdateOneRequiredWithoutProductsNestedInput = {
    create?: XOR<ModelCreateWithoutProductsInput, ModelUncheckedCreateWithoutProductsInput>
    connectOrCreate?: ModelCreateOrConnectWithoutProductsInput
    upsert?: ModelUpsertWithoutProductsInput
    connect?: ModelWhereUniqueInput
    update?: XOR<XOR<ModelUpdateToOneWithWhereWithoutProductsInput, ModelUpdateWithoutProductsInput>, ModelUncheckedUpdateWithoutProductsInput>
  }

  export type ProductUpdateOneRequiredWithoutModelsNestedInput = {
    create?: XOR<ProductCreateWithoutModelsInput, ProductUncheckedCreateWithoutModelsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutModelsInput
    upsert?: ProductUpsertWithoutModelsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutModelsInput, ProductUpdateWithoutModelsInput>, ProductUncheckedUpdateWithoutModelsInput>
  }

  export type ProductCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type ProductUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type ProductUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutCategoryInput | ProductUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutCategoryInput | ProductUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutCategoryInput | ProductUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type ProductUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutCategoryInput | ProductUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutCategoryInput | ProductUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutCategoryInput | ProductUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutOrdersInput = {
    create?: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: UserCreateOrConnectWithoutOrdersInput
    connect?: UserWhereUniqueInput
  }

  export type ProductCreateNestedOneWithoutOrderInput = {
    create?: XOR<ProductCreateWithoutOrderInput, ProductUncheckedCreateWithoutOrderInput>
    connectOrCreate?: ProductCreateOrConnectWithoutOrderInput
    connect?: ProductWhereUniqueInput
  }

  export type EnumOrderTypeFieldUpdateOperationsInput = {
    set?: $Enums.OrderType
  }

  export type EnumOrderStatusFieldUpdateOperationsInput = {
    set?: $Enums.OrderStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: UserCreateOrConnectWithoutOrdersInput
    upsert?: UserUpsertWithoutOrdersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOrdersInput, UserUpdateWithoutOrdersInput>, UserUncheckedUpdateWithoutOrdersInput>
  }

  export type ProductUpdateOneRequiredWithoutOrderNestedInput = {
    create?: XOR<ProductCreateWithoutOrderInput, ProductUncheckedCreateWithoutOrderInput>
    connectOrCreate?: ProductCreateOrConnectWithoutOrderInput
    upsert?: ProductUpsertWithoutOrderInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutOrderInput, ProductUpdateWithoutOrderInput>, ProductUncheckedUpdateWithoutOrderInput>
  }

  export type RateLimitCreatevalueInput = {
    set: number[]
  }

  export type RateLimitUpdatevalueInput = {
    set?: number[]
    push?: number | number[]
  }

  export type ChatMessageCreateNestedManyWithoutChatSessionInput = {
    create?: XOR<ChatMessageCreateWithoutChatSessionInput, ChatMessageUncheckedCreateWithoutChatSessionInput> | ChatMessageCreateWithoutChatSessionInput[] | ChatMessageUncheckedCreateWithoutChatSessionInput[]
    connectOrCreate?: ChatMessageCreateOrConnectWithoutChatSessionInput | ChatMessageCreateOrConnectWithoutChatSessionInput[]
    createMany?: ChatMessageCreateManyChatSessionInputEnvelope
    connect?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutChatSessionsInput = {
    create?: XOR<UserCreateWithoutChatSessionsInput, UserUncheckedCreateWithoutChatSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutChatSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type ChatMessageUncheckedCreateNestedManyWithoutChatSessionInput = {
    create?: XOR<ChatMessageCreateWithoutChatSessionInput, ChatMessageUncheckedCreateWithoutChatSessionInput> | ChatMessageCreateWithoutChatSessionInput[] | ChatMessageUncheckedCreateWithoutChatSessionInput[]
    connectOrCreate?: ChatMessageCreateOrConnectWithoutChatSessionInput | ChatMessageCreateOrConnectWithoutChatSessionInput[]
    createMany?: ChatMessageCreateManyChatSessionInputEnvelope
    connect?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
  }

  export type ChatMessageUpdateManyWithoutChatSessionNestedInput = {
    create?: XOR<ChatMessageCreateWithoutChatSessionInput, ChatMessageUncheckedCreateWithoutChatSessionInput> | ChatMessageCreateWithoutChatSessionInput[] | ChatMessageUncheckedCreateWithoutChatSessionInput[]
    connectOrCreate?: ChatMessageCreateOrConnectWithoutChatSessionInput | ChatMessageCreateOrConnectWithoutChatSessionInput[]
    upsert?: ChatMessageUpsertWithWhereUniqueWithoutChatSessionInput | ChatMessageUpsertWithWhereUniqueWithoutChatSessionInput[]
    createMany?: ChatMessageCreateManyChatSessionInputEnvelope
    set?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    disconnect?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    delete?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    connect?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    update?: ChatMessageUpdateWithWhereUniqueWithoutChatSessionInput | ChatMessageUpdateWithWhereUniqueWithoutChatSessionInput[]
    updateMany?: ChatMessageUpdateManyWithWhereWithoutChatSessionInput | ChatMessageUpdateManyWithWhereWithoutChatSessionInput[]
    deleteMany?: ChatMessageScalarWhereInput | ChatMessageScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutChatSessionsNestedInput = {
    create?: XOR<UserCreateWithoutChatSessionsInput, UserUncheckedCreateWithoutChatSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutChatSessionsInput
    upsert?: UserUpsertWithoutChatSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutChatSessionsInput, UserUpdateWithoutChatSessionsInput>, UserUncheckedUpdateWithoutChatSessionsInput>
  }

  export type ChatMessageUncheckedUpdateManyWithoutChatSessionNestedInput = {
    create?: XOR<ChatMessageCreateWithoutChatSessionInput, ChatMessageUncheckedCreateWithoutChatSessionInput> | ChatMessageCreateWithoutChatSessionInput[] | ChatMessageUncheckedCreateWithoutChatSessionInput[]
    connectOrCreate?: ChatMessageCreateOrConnectWithoutChatSessionInput | ChatMessageCreateOrConnectWithoutChatSessionInput[]
    upsert?: ChatMessageUpsertWithWhereUniqueWithoutChatSessionInput | ChatMessageUpsertWithWhereUniqueWithoutChatSessionInput[]
    createMany?: ChatMessageCreateManyChatSessionInputEnvelope
    set?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    disconnect?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    delete?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    connect?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    update?: ChatMessageUpdateWithWhereUniqueWithoutChatSessionInput | ChatMessageUpdateWithWhereUniqueWithoutChatSessionInput[]
    updateMany?: ChatMessageUpdateManyWithWhereWithoutChatSessionInput | ChatMessageUpdateManyWithWhereWithoutChatSessionInput[]
    deleteMany?: ChatMessageScalarWhereInput | ChatMessageScalarWhereInput[]
  }

  export type ChatSessionCreateNestedOneWithoutMessagesInput = {
    create?: XOR<ChatSessionCreateWithoutMessagesInput, ChatSessionUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ChatSessionCreateOrConnectWithoutMessagesInput
    connect?: ChatSessionWhereUniqueInput
  }

  export type ModelCreateNestedOneWithoutMessagesInput = {
    create?: XOR<ModelCreateWithoutMessagesInput, ModelUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ModelCreateOrConnectWithoutMessagesInput
    connect?: ModelWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutChatMessagesInput = {
    create?: XOR<UserCreateWithoutChatMessagesInput, UserUncheckedCreateWithoutChatMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutChatMessagesInput
    connect?: UserWhereUniqueInput
  }

  export type EnumChatMessageRoleFieldUpdateOperationsInput = {
    set?: $Enums.ChatMessageRole
  }

  export type ChatSessionUpdateOneWithoutMessagesNestedInput = {
    create?: XOR<ChatSessionCreateWithoutMessagesInput, ChatSessionUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ChatSessionCreateOrConnectWithoutMessagesInput
    upsert?: ChatSessionUpsertWithoutMessagesInput
    disconnect?: ChatSessionWhereInput | boolean
    delete?: ChatSessionWhereInput | boolean
    connect?: ChatSessionWhereUniqueInput
    update?: XOR<XOR<ChatSessionUpdateToOneWithWhereWithoutMessagesInput, ChatSessionUpdateWithoutMessagesInput>, ChatSessionUncheckedUpdateWithoutMessagesInput>
  }

  export type ModelUpdateOneWithoutMessagesNestedInput = {
    create?: XOR<ModelCreateWithoutMessagesInput, ModelUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ModelCreateOrConnectWithoutMessagesInput
    upsert?: ModelUpsertWithoutMessagesInput
    disconnect?: ModelWhereInput | boolean
    delete?: ModelWhereInput | boolean
    connect?: ModelWhereUniqueInput
    update?: XOR<XOR<ModelUpdateToOneWithWhereWithoutMessagesInput, ModelUpdateWithoutMessagesInput>, ModelUncheckedUpdateWithoutMessagesInput>
  }

  export type UserUpdateOneRequiredWithoutChatMessagesNestedInput = {
    create?: XOR<UserCreateWithoutChatMessagesInput, UserUncheckedCreateWithoutChatMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutChatMessagesInput
    upsert?: UserUpsertWithoutChatMessagesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutChatMessagesInput, UserUpdateWithoutChatMessagesInput>, UserUncheckedUpdateWithoutChatMessagesInput>
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumOAuthProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.OAuthProvider | EnumOAuthProviderFieldRefInput<$PrismaModel>
    in?: $Enums.OAuthProvider[] | ListEnumOAuthProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.OAuthProvider[] | ListEnumOAuthProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumOAuthProviderFilter<$PrismaModel> | $Enums.OAuthProvider
  }

  export type NestedEnumOAuthProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OAuthProvider | EnumOAuthProviderFieldRefInput<$PrismaModel>
    in?: $Enums.OAuthProvider[] | ListEnumOAuthProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.OAuthProvider[] | ListEnumOAuthProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumOAuthProviderWithAggregatesFilter<$PrismaModel> | $Enums.OAuthProvider
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOAuthProviderFilter<$PrismaModel>
    _max?: NestedEnumOAuthProviderFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumOrderTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderType | EnumOrderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.OrderType[] | ListEnumOrderTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderType[] | ListEnumOrderTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderTypeFilter<$PrismaModel> | $Enums.OrderType
  }

  export type NestedEnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumOrderTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderType | EnumOrderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.OrderType[] | ListEnumOrderTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderType[] | ListEnumOrderTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderTypeWithAggregatesFilter<$PrismaModel> | $Enums.OrderType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderTypeFilter<$PrismaModel>
    _max?: NestedEnumOrderTypeFilter<$PrismaModel>
  }

  export type NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumChatMessageRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.ChatMessageRole | EnumChatMessageRoleFieldRefInput<$PrismaModel>
    in?: $Enums.ChatMessageRole[] | ListEnumChatMessageRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChatMessageRole[] | ListEnumChatMessageRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumChatMessageRoleFilter<$PrismaModel> | $Enums.ChatMessageRole
  }

  export type NestedEnumChatMessageRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChatMessageRole | EnumChatMessageRoleFieldRefInput<$PrismaModel>
    in?: $Enums.ChatMessageRole[] | ListEnumChatMessageRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChatMessageRole[] | ListEnumChatMessageRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumChatMessageRoleWithAggregatesFilter<$PrismaModel> | $Enums.ChatMessageRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumChatMessageRoleFilter<$PrismaModel>
    _max?: NestedEnumChatMessageRoleFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type OAuthCreateWithoutUserInput = {
    provider: $Enums.OAuthProvider
    providerId: string
    accessToken: string
    refreshToken: string
    expiredAt: Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OAuthUncheckedCreateWithoutUserInput = {
    id?: number
    provider: $Enums.OAuthProvider
    providerId: string
    accessToken: string
    refreshToken: string
    expiredAt: Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OAuthCreateOrConnectWithoutUserInput = {
    where: OAuthWhereUniqueInput
    create: XOR<OAuthCreateWithoutUserInput, OAuthUncheckedCreateWithoutUserInput>
  }

  export type OAuthCreateManyUserInputEnvelope = {
    data: OAuthCreateManyUserInput | OAuthCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type OrderCreateWithoutUserInput = {
    id: string
    type: $Enums.OrderType
    status?: $Enums.OrderStatus
    count?: number
    amount: number
    startAt?: Date | string | null
    endAt?: Date | string | null
    isCurrent?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    rawData?: NullableJsonNullValueInput | InputJsonValue
    product: ProductCreateNestedOneWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutUserInput = {
    id: string
    type: $Enums.OrderType
    status?: $Enums.OrderStatus
    count?: number
    amount: number
    startAt?: Date | string | null
    endAt?: Date | string | null
    isCurrent?: boolean
    productId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    rawData?: NullableJsonNullValueInput | InputJsonValue
  }

  export type OrderCreateOrConnectWithoutUserInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput>
  }

  export type OrderCreateManyUserInputEnvelope = {
    data: OrderCreateManyUserInput | OrderCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ChatSessionCreateWithoutUserInput = {
    id?: string
    topic?: string | null
    lastSummarizeIndex?: number | null
    memoryPrompt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: ChatMessageCreateNestedManyWithoutChatSessionInput
  }

  export type ChatSessionUncheckedCreateWithoutUserInput = {
    id?: string
    topic?: string | null
    lastSummarizeIndex?: number | null
    memoryPrompt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: ChatMessageUncheckedCreateNestedManyWithoutChatSessionInput
  }

  export type ChatSessionCreateOrConnectWithoutUserInput = {
    where: ChatSessionWhereUniqueInput
    create: XOR<ChatSessionCreateWithoutUserInput, ChatSessionUncheckedCreateWithoutUserInput>
  }

  export type ChatSessionCreateManyUserInputEnvelope = {
    data: ChatSessionCreateManyUserInput | ChatSessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ChatMessageCreateWithoutUserInput = {
    id?: string
    role: $Enums.ChatMessageRole
    content: string
    deleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    chatSession?: ChatSessionCreateNestedOneWithoutMessagesInput
    model?: ModelCreateNestedOneWithoutMessagesInput
  }

  export type ChatMessageUncheckedCreateWithoutUserInput = {
    id?: string
    role: $Enums.ChatMessageRole
    content: string
    deleted?: boolean
    chatSessionId?: string | null
    modelId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChatMessageCreateOrConnectWithoutUserInput = {
    where: ChatMessageWhereUniqueInput
    create: XOR<ChatMessageCreateWithoutUserInput, ChatMessageUncheckedCreateWithoutUserInput>
  }

  export type ChatMessageCreateManyUserInputEnvelope = {
    data: ChatMessageCreateManyUserInput | ChatMessageCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type OAuthUpsertWithWhereUniqueWithoutUserInput = {
    where: OAuthWhereUniqueInput
    update: XOR<OAuthUpdateWithoutUserInput, OAuthUncheckedUpdateWithoutUserInput>
    create: XOR<OAuthCreateWithoutUserInput, OAuthUncheckedCreateWithoutUserInput>
  }

  export type OAuthUpdateWithWhereUniqueWithoutUserInput = {
    where: OAuthWhereUniqueInput
    data: XOR<OAuthUpdateWithoutUserInput, OAuthUncheckedUpdateWithoutUserInput>
  }

  export type OAuthUpdateManyWithWhereWithoutUserInput = {
    where: OAuthScalarWhereInput
    data: XOR<OAuthUpdateManyMutationInput, OAuthUncheckedUpdateManyWithoutUserInput>
  }

  export type OAuthScalarWhereInput = {
    AND?: OAuthScalarWhereInput | OAuthScalarWhereInput[]
    OR?: OAuthScalarWhereInput[]
    NOT?: OAuthScalarWhereInput | OAuthScalarWhereInput[]
    id?: IntFilter<"OAuth"> | number
    provider?: EnumOAuthProviderFilter<"OAuth"> | $Enums.OAuthProvider
    providerId?: StringFilter<"OAuth"> | string
    accessToken?: StringFilter<"OAuth"> | string
    refreshToken?: StringFilter<"OAuth"> | string
    expiredAt?: DateTimeFilter<"OAuth"> | Date | string
    data?: JsonNullableFilter<"OAuth">
    userId?: IntFilter<"OAuth"> | number
    createdAt?: DateTimeFilter<"OAuth"> | Date | string
    updatedAt?: DateTimeFilter<"OAuth"> | Date | string
  }

  export type OrderUpsertWithWhereUniqueWithoutUserInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutUserInput, OrderUncheckedUpdateWithoutUserInput>
    create: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutUserInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutUserInput, OrderUncheckedUpdateWithoutUserInput>
  }

  export type OrderUpdateManyWithWhereWithoutUserInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutUserInput>
  }

  export type OrderScalarWhereInput = {
    AND?: OrderScalarWhereInput | OrderScalarWhereInput[]
    OR?: OrderScalarWhereInput[]
    NOT?: OrderScalarWhereInput | OrderScalarWhereInput[]
    id?: StringFilter<"Order"> | string
    type?: EnumOrderTypeFilter<"Order"> | $Enums.OrderType
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    count?: IntFilter<"Order"> | number
    amount?: IntFilter<"Order"> | number
    startAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    endAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    isCurrent?: BoolFilter<"Order"> | boolean
    userId?: IntFilter<"Order"> | number
    productId?: IntFilter<"Order"> | number
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    rawData?: JsonNullableFilter<"Order">
  }

  export type ChatSessionUpsertWithWhereUniqueWithoutUserInput = {
    where: ChatSessionWhereUniqueInput
    update: XOR<ChatSessionUpdateWithoutUserInput, ChatSessionUncheckedUpdateWithoutUserInput>
    create: XOR<ChatSessionCreateWithoutUserInput, ChatSessionUncheckedCreateWithoutUserInput>
  }

  export type ChatSessionUpdateWithWhereUniqueWithoutUserInput = {
    where: ChatSessionWhereUniqueInput
    data: XOR<ChatSessionUpdateWithoutUserInput, ChatSessionUncheckedUpdateWithoutUserInput>
  }

  export type ChatSessionUpdateManyWithWhereWithoutUserInput = {
    where: ChatSessionScalarWhereInput
    data: XOR<ChatSessionUpdateManyMutationInput, ChatSessionUncheckedUpdateManyWithoutUserInput>
  }

  export type ChatSessionScalarWhereInput = {
    AND?: ChatSessionScalarWhereInput | ChatSessionScalarWhereInput[]
    OR?: ChatSessionScalarWhereInput[]
    NOT?: ChatSessionScalarWhereInput | ChatSessionScalarWhereInput[]
    id?: StringFilter<"ChatSession"> | string
    topic?: StringNullableFilter<"ChatSession"> | string | null
    lastSummarizeIndex?: IntNullableFilter<"ChatSession"> | number | null
    memoryPrompt?: StringNullableFilter<"ChatSession"> | string | null
    userId?: IntFilter<"ChatSession"> | number
    createdAt?: DateTimeFilter<"ChatSession"> | Date | string
    updatedAt?: DateTimeFilter<"ChatSession"> | Date | string
  }

  export type ChatMessageUpsertWithWhereUniqueWithoutUserInput = {
    where: ChatMessageWhereUniqueInput
    update: XOR<ChatMessageUpdateWithoutUserInput, ChatMessageUncheckedUpdateWithoutUserInput>
    create: XOR<ChatMessageCreateWithoutUserInput, ChatMessageUncheckedCreateWithoutUserInput>
  }

  export type ChatMessageUpdateWithWhereUniqueWithoutUserInput = {
    where: ChatMessageWhereUniqueInput
    data: XOR<ChatMessageUpdateWithoutUserInput, ChatMessageUncheckedUpdateWithoutUserInput>
  }

  export type ChatMessageUpdateManyWithWhereWithoutUserInput = {
    where: ChatMessageScalarWhereInput
    data: XOR<ChatMessageUpdateManyMutationInput, ChatMessageUncheckedUpdateManyWithoutUserInput>
  }

  export type ChatMessageScalarWhereInput = {
    AND?: ChatMessageScalarWhereInput | ChatMessageScalarWhereInput[]
    OR?: ChatMessageScalarWhereInput[]
    NOT?: ChatMessageScalarWhereInput | ChatMessageScalarWhereInput[]
    id?: StringFilter<"ChatMessage"> | string
    role?: EnumChatMessageRoleFilter<"ChatMessage"> | $Enums.ChatMessageRole
    content?: StringFilter<"ChatMessage"> | string
    deleted?: BoolFilter<"ChatMessage"> | boolean
    chatSessionId?: StringNullableFilter<"ChatMessage"> | string | null
    modelId?: IntNullableFilter<"ChatMessage"> | number | null
    userId?: IntFilter<"ChatMessage"> | number
    createdAt?: DateTimeFilter<"ChatMessage"> | Date | string
    updatedAt?: DateTimeFilter<"ChatMessage"> | Date | string
  }

  export type UserCreateWithoutOauthsInput = {
    role?: $Enums.Role
    name: string
    email?: string | null
    phone?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isBlocked?: boolean
    orders?: OrderCreateNestedManyWithoutUserInput
    chatSessions?: ChatSessionCreateNestedManyWithoutUserInput
    chatMessages?: ChatMessageCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOauthsInput = {
    id?: number
    role?: $Enums.Role
    name: string
    email?: string | null
    phone?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isBlocked?: boolean
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
    chatSessions?: ChatSessionUncheckedCreateNestedManyWithoutUserInput
    chatMessages?: ChatMessageUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOauthsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOauthsInput, UserUncheckedCreateWithoutOauthsInput>
  }

  export type UserUpsertWithoutOauthsInput = {
    update: XOR<UserUpdateWithoutOauthsInput, UserUncheckedUpdateWithoutOauthsInput>
    create: XOR<UserCreateWithoutOauthsInput, UserUncheckedCreateWithoutOauthsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOauthsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOauthsInput, UserUncheckedUpdateWithoutOauthsInput>
  }

  export type UserUpdateWithoutOauthsInput = {
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
    orders?: OrderUpdateManyWithoutUserNestedInput
    chatSessions?: ChatSessionUpdateManyWithoutUserNestedInput
    chatMessages?: ChatMessageUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOauthsInput = {
    id?: IntFieldUpdateOperationsInput | number
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
    chatSessions?: ChatSessionUncheckedUpdateManyWithoutUserNestedInput
    chatMessages?: ChatMessageUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ModelInProductCreateWithoutModelInput = {
    times: number
    duration: number
    product: ProductCreateNestedOneWithoutModelsInput
  }

  export type ModelInProductUncheckedCreateWithoutModelInput = {
    times: number
    duration: number
    productId: number
  }

  export type ModelInProductCreateOrConnectWithoutModelInput = {
    where: ModelInProductWhereUniqueInput
    create: XOR<ModelInProductCreateWithoutModelInput, ModelInProductUncheckedCreateWithoutModelInput>
  }

  export type ModelInProductCreateManyModelInputEnvelope = {
    data: ModelInProductCreateManyModelInput | ModelInProductCreateManyModelInput[]
    skipDuplicates?: boolean
  }

  export type ChatMessageCreateWithoutModelInput = {
    id?: string
    role: $Enums.ChatMessageRole
    content: string
    deleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    chatSession?: ChatSessionCreateNestedOneWithoutMessagesInput
    user: UserCreateNestedOneWithoutChatMessagesInput
  }

  export type ChatMessageUncheckedCreateWithoutModelInput = {
    id?: string
    role: $Enums.ChatMessageRole
    content: string
    deleted?: boolean
    chatSessionId?: string | null
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChatMessageCreateOrConnectWithoutModelInput = {
    where: ChatMessageWhereUniqueInput
    create: XOR<ChatMessageCreateWithoutModelInput, ChatMessageUncheckedCreateWithoutModelInput>
  }

  export type ChatMessageCreateManyModelInputEnvelope = {
    data: ChatMessageCreateManyModelInput | ChatMessageCreateManyModelInput[]
    skipDuplicates?: boolean
  }

  export type ModelInProductUpsertWithWhereUniqueWithoutModelInput = {
    where: ModelInProductWhereUniqueInput
    update: XOR<ModelInProductUpdateWithoutModelInput, ModelInProductUncheckedUpdateWithoutModelInput>
    create: XOR<ModelInProductCreateWithoutModelInput, ModelInProductUncheckedCreateWithoutModelInput>
  }

  export type ModelInProductUpdateWithWhereUniqueWithoutModelInput = {
    where: ModelInProductWhereUniqueInput
    data: XOR<ModelInProductUpdateWithoutModelInput, ModelInProductUncheckedUpdateWithoutModelInput>
  }

  export type ModelInProductUpdateManyWithWhereWithoutModelInput = {
    where: ModelInProductScalarWhereInput
    data: XOR<ModelInProductUpdateManyMutationInput, ModelInProductUncheckedUpdateManyWithoutModelInput>
  }

  export type ModelInProductScalarWhereInput = {
    AND?: ModelInProductScalarWhereInput | ModelInProductScalarWhereInput[]
    OR?: ModelInProductScalarWhereInput[]
    NOT?: ModelInProductScalarWhereInput | ModelInProductScalarWhereInput[]
    times?: IntFilter<"ModelInProduct"> | number
    duration?: IntFilter<"ModelInProduct"> | number
    modelId?: IntFilter<"ModelInProduct"> | number
    productId?: IntFilter<"ModelInProduct"> | number
  }

  export type ChatMessageUpsertWithWhereUniqueWithoutModelInput = {
    where: ChatMessageWhereUniqueInput
    update: XOR<ChatMessageUpdateWithoutModelInput, ChatMessageUncheckedUpdateWithoutModelInput>
    create: XOR<ChatMessageCreateWithoutModelInput, ChatMessageUncheckedCreateWithoutModelInput>
  }

  export type ChatMessageUpdateWithWhereUniqueWithoutModelInput = {
    where: ChatMessageWhereUniqueInput
    data: XOR<ChatMessageUpdateWithoutModelInput, ChatMessageUncheckedUpdateWithoutModelInput>
  }

  export type ChatMessageUpdateManyWithWhereWithoutModelInput = {
    where: ChatMessageScalarWhereInput
    data: XOR<ChatMessageUpdateManyMutationInput, ChatMessageUncheckedUpdateManyWithoutModelInput>
  }

  export type ModelInProductCreateWithoutProductInput = {
    times: number
    duration: number
    model: ModelCreateNestedOneWithoutProductsInput
  }

  export type ModelInProductUncheckedCreateWithoutProductInput = {
    times: number
    duration: number
    modelId: number
  }

  export type ModelInProductCreateOrConnectWithoutProductInput = {
    where: ModelInProductWhereUniqueInput
    create: XOR<ModelInProductCreateWithoutProductInput, ModelInProductUncheckedCreateWithoutProductInput>
  }

  export type ModelInProductCreateManyProductInputEnvelope = {
    data: ModelInProductCreateManyProductInput | ModelInProductCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type OrderCreateWithoutProductInput = {
    id: string
    type: $Enums.OrderType
    status?: $Enums.OrderStatus
    count?: number
    amount: number
    startAt?: Date | string | null
    endAt?: Date | string | null
    isCurrent?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    rawData?: NullableJsonNullValueInput | InputJsonValue
    user: UserCreateNestedOneWithoutOrdersInput
  }

  export type OrderUncheckedCreateWithoutProductInput = {
    id: string
    type: $Enums.OrderType
    status?: $Enums.OrderStatus
    count?: number
    amount: number
    startAt?: Date | string | null
    endAt?: Date | string | null
    isCurrent?: boolean
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    rawData?: NullableJsonNullValueInput | InputJsonValue
  }

  export type OrderCreateOrConnectWithoutProductInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutProductInput, OrderUncheckedCreateWithoutProductInput>
  }

  export type OrderCreateManyProductInputEnvelope = {
    data: OrderCreateManyProductInput | OrderCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type CategoryCreateWithoutProductsInput = {
    name: string
  }

  export type CategoryUncheckedCreateWithoutProductsInput = {
    id?: number
    name: string
  }

  export type CategoryCreateOrConnectWithoutProductsInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
  }

  export type ModelInProductUpsertWithWhereUniqueWithoutProductInput = {
    where: ModelInProductWhereUniqueInput
    update: XOR<ModelInProductUpdateWithoutProductInput, ModelInProductUncheckedUpdateWithoutProductInput>
    create: XOR<ModelInProductCreateWithoutProductInput, ModelInProductUncheckedCreateWithoutProductInput>
  }

  export type ModelInProductUpdateWithWhereUniqueWithoutProductInput = {
    where: ModelInProductWhereUniqueInput
    data: XOR<ModelInProductUpdateWithoutProductInput, ModelInProductUncheckedUpdateWithoutProductInput>
  }

  export type ModelInProductUpdateManyWithWhereWithoutProductInput = {
    where: ModelInProductScalarWhereInput
    data: XOR<ModelInProductUpdateManyMutationInput, ModelInProductUncheckedUpdateManyWithoutProductInput>
  }

  export type OrderUpsertWithWhereUniqueWithoutProductInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutProductInput, OrderUncheckedUpdateWithoutProductInput>
    create: XOR<OrderCreateWithoutProductInput, OrderUncheckedCreateWithoutProductInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutProductInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutProductInput, OrderUncheckedUpdateWithoutProductInput>
  }

  export type OrderUpdateManyWithWhereWithoutProductInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutProductInput>
  }

  export type CategoryUpsertWithoutProductsInput = {
    update: XOR<CategoryUpdateWithoutProductsInput, CategoryUncheckedUpdateWithoutProductsInput>
    create: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutProductsInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutProductsInput, CategoryUncheckedUpdateWithoutProductsInput>
  }

  export type CategoryUpdateWithoutProductsInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type CategoryUncheckedUpdateWithoutProductsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type ModelCreateWithoutProductsInput = {
    name: string
    price: number
    messages?: ChatMessageCreateNestedManyWithoutModelInput
  }

  export type ModelUncheckedCreateWithoutProductsInput = {
    id?: number
    name: string
    price: number
    messages?: ChatMessageUncheckedCreateNestedManyWithoutModelInput
  }

  export type ModelCreateOrConnectWithoutProductsInput = {
    where: ModelWhereUniqueInput
    create: XOR<ModelCreateWithoutProductsInput, ModelUncheckedCreateWithoutProductsInput>
  }

  export type ProductCreateWithoutModelsInput = {
    name: string
    features?: ProductCreatefeaturesInput | string[]
    isHidden?: boolean
    price: number
    stock?: number
    duration: number
    order?: OrderCreateNestedManyWithoutProductInput
    category?: CategoryCreateNestedOneWithoutProductsInput
  }

  export type ProductUncheckedCreateWithoutModelsInput = {
    id?: number
    name: string
    features?: ProductCreatefeaturesInput | string[]
    isHidden?: boolean
    price: number
    stock?: number
    duration: number
    categoryId?: number | null
    order?: OrderUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutModelsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutModelsInput, ProductUncheckedCreateWithoutModelsInput>
  }

  export type ModelUpsertWithoutProductsInput = {
    update: XOR<ModelUpdateWithoutProductsInput, ModelUncheckedUpdateWithoutProductsInput>
    create: XOR<ModelCreateWithoutProductsInput, ModelUncheckedCreateWithoutProductsInput>
    where?: ModelWhereInput
  }

  export type ModelUpdateToOneWithWhereWithoutProductsInput = {
    where?: ModelWhereInput
    data: XOR<ModelUpdateWithoutProductsInput, ModelUncheckedUpdateWithoutProductsInput>
  }

  export type ModelUpdateWithoutProductsInput = {
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    messages?: ChatMessageUpdateManyWithoutModelNestedInput
  }

  export type ModelUncheckedUpdateWithoutProductsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    messages?: ChatMessageUncheckedUpdateManyWithoutModelNestedInput
  }

  export type ProductUpsertWithoutModelsInput = {
    update: XOR<ProductUpdateWithoutModelsInput, ProductUncheckedUpdateWithoutModelsInput>
    create: XOR<ProductCreateWithoutModelsInput, ProductUncheckedCreateWithoutModelsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutModelsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutModelsInput, ProductUncheckedUpdateWithoutModelsInput>
  }

  export type ProductUpdateWithoutModelsInput = {
    name?: StringFieldUpdateOperationsInput | string
    features?: ProductUpdatefeaturesInput | string[]
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    price?: IntFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    order?: OrderUpdateManyWithoutProductNestedInput
    category?: CategoryUpdateOneWithoutProductsNestedInput
  }

  export type ProductUncheckedUpdateWithoutModelsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    features?: ProductUpdatefeaturesInput | string[]
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    price?: IntFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
    order?: OrderUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateWithoutCategoryInput = {
    name: string
    features?: ProductCreatefeaturesInput | string[]
    isHidden?: boolean
    price: number
    stock?: number
    duration: number
    models?: ModelInProductCreateNestedManyWithoutProductInput
    order?: OrderCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutCategoryInput = {
    id?: number
    name: string
    features?: ProductCreatefeaturesInput | string[]
    isHidden?: boolean
    price: number
    stock?: number
    duration: number
    models?: ModelInProductUncheckedCreateNestedManyWithoutProductInput
    order?: OrderUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput>
  }

  export type ProductCreateManyCategoryInputEnvelope = {
    data: ProductCreateManyCategoryInput | ProductCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type ProductUpsertWithWhereUniqueWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    update: XOR<ProductUpdateWithoutCategoryInput, ProductUncheckedUpdateWithoutCategoryInput>
    create: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput>
  }

  export type ProductUpdateWithWhereUniqueWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    data: XOR<ProductUpdateWithoutCategoryInput, ProductUncheckedUpdateWithoutCategoryInput>
  }

  export type ProductUpdateManyWithWhereWithoutCategoryInput = {
    where: ProductScalarWhereInput
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyWithoutCategoryInput>
  }

  export type ProductScalarWhereInput = {
    AND?: ProductScalarWhereInput | ProductScalarWhereInput[]
    OR?: ProductScalarWhereInput[]
    NOT?: ProductScalarWhereInput | ProductScalarWhereInput[]
    id?: IntFilter<"Product"> | number
    name?: StringFilter<"Product"> | string
    features?: StringNullableListFilter<"Product">
    isHidden?: BoolFilter<"Product"> | boolean
    price?: IntFilter<"Product"> | number
    stock?: IntFilter<"Product"> | number
    duration?: IntFilter<"Product"> | number
    categoryId?: IntNullableFilter<"Product"> | number | null
  }

  export type UserCreateWithoutOrdersInput = {
    role?: $Enums.Role
    name: string
    email?: string | null
    phone?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isBlocked?: boolean
    oauths?: OAuthCreateNestedManyWithoutUserInput
    chatSessions?: ChatSessionCreateNestedManyWithoutUserInput
    chatMessages?: ChatMessageCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOrdersInput = {
    id?: number
    role?: $Enums.Role
    name: string
    email?: string | null
    phone?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isBlocked?: boolean
    oauths?: OAuthUncheckedCreateNestedManyWithoutUserInput
    chatSessions?: ChatSessionUncheckedCreateNestedManyWithoutUserInput
    chatMessages?: ChatMessageUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOrdersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
  }

  export type ProductCreateWithoutOrderInput = {
    name: string
    features?: ProductCreatefeaturesInput | string[]
    isHidden?: boolean
    price: number
    stock?: number
    duration: number
    models?: ModelInProductCreateNestedManyWithoutProductInput
    category?: CategoryCreateNestedOneWithoutProductsInput
  }

  export type ProductUncheckedCreateWithoutOrderInput = {
    id?: number
    name: string
    features?: ProductCreatefeaturesInput | string[]
    isHidden?: boolean
    price: number
    stock?: number
    duration: number
    categoryId?: number | null
    models?: ModelInProductUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutOrderInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutOrderInput, ProductUncheckedCreateWithoutOrderInput>
  }

  export type UserUpsertWithoutOrdersInput = {
    update: XOR<UserUpdateWithoutOrdersInput, UserUncheckedUpdateWithoutOrdersInput>
    create: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOrdersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOrdersInput, UserUncheckedUpdateWithoutOrdersInput>
  }

  export type UserUpdateWithoutOrdersInput = {
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
    oauths?: OAuthUpdateManyWithoutUserNestedInput
    chatSessions?: ChatSessionUpdateManyWithoutUserNestedInput
    chatMessages?: ChatMessageUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOrdersInput = {
    id?: IntFieldUpdateOperationsInput | number
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
    oauths?: OAuthUncheckedUpdateManyWithoutUserNestedInput
    chatSessions?: ChatSessionUncheckedUpdateManyWithoutUserNestedInput
    chatMessages?: ChatMessageUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ProductUpsertWithoutOrderInput = {
    update: XOR<ProductUpdateWithoutOrderInput, ProductUncheckedUpdateWithoutOrderInput>
    create: XOR<ProductCreateWithoutOrderInput, ProductUncheckedCreateWithoutOrderInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutOrderInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutOrderInput, ProductUncheckedUpdateWithoutOrderInput>
  }

  export type ProductUpdateWithoutOrderInput = {
    name?: StringFieldUpdateOperationsInput | string
    features?: ProductUpdatefeaturesInput | string[]
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    price?: IntFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    models?: ModelInProductUpdateManyWithoutProductNestedInput
    category?: CategoryUpdateOneWithoutProductsNestedInput
  }

  export type ProductUncheckedUpdateWithoutOrderInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    features?: ProductUpdatefeaturesInput | string[]
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    price?: IntFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
    models?: ModelInProductUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ChatMessageCreateWithoutChatSessionInput = {
    id?: string
    role: $Enums.ChatMessageRole
    content: string
    deleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    model?: ModelCreateNestedOneWithoutMessagesInput
    user: UserCreateNestedOneWithoutChatMessagesInput
  }

  export type ChatMessageUncheckedCreateWithoutChatSessionInput = {
    id?: string
    role: $Enums.ChatMessageRole
    content: string
    deleted?: boolean
    modelId?: number | null
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChatMessageCreateOrConnectWithoutChatSessionInput = {
    where: ChatMessageWhereUniqueInput
    create: XOR<ChatMessageCreateWithoutChatSessionInput, ChatMessageUncheckedCreateWithoutChatSessionInput>
  }

  export type ChatMessageCreateManyChatSessionInputEnvelope = {
    data: ChatMessageCreateManyChatSessionInput | ChatMessageCreateManyChatSessionInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutChatSessionsInput = {
    role?: $Enums.Role
    name: string
    email?: string | null
    phone?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isBlocked?: boolean
    oauths?: OAuthCreateNestedManyWithoutUserInput
    orders?: OrderCreateNestedManyWithoutUserInput
    chatMessages?: ChatMessageCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutChatSessionsInput = {
    id?: number
    role?: $Enums.Role
    name: string
    email?: string | null
    phone?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isBlocked?: boolean
    oauths?: OAuthUncheckedCreateNestedManyWithoutUserInput
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
    chatMessages?: ChatMessageUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutChatSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutChatSessionsInput, UserUncheckedCreateWithoutChatSessionsInput>
  }

  export type ChatMessageUpsertWithWhereUniqueWithoutChatSessionInput = {
    where: ChatMessageWhereUniqueInput
    update: XOR<ChatMessageUpdateWithoutChatSessionInput, ChatMessageUncheckedUpdateWithoutChatSessionInput>
    create: XOR<ChatMessageCreateWithoutChatSessionInput, ChatMessageUncheckedCreateWithoutChatSessionInput>
  }

  export type ChatMessageUpdateWithWhereUniqueWithoutChatSessionInput = {
    where: ChatMessageWhereUniqueInput
    data: XOR<ChatMessageUpdateWithoutChatSessionInput, ChatMessageUncheckedUpdateWithoutChatSessionInput>
  }

  export type ChatMessageUpdateManyWithWhereWithoutChatSessionInput = {
    where: ChatMessageScalarWhereInput
    data: XOR<ChatMessageUpdateManyMutationInput, ChatMessageUncheckedUpdateManyWithoutChatSessionInput>
  }

  export type UserUpsertWithoutChatSessionsInput = {
    update: XOR<UserUpdateWithoutChatSessionsInput, UserUncheckedUpdateWithoutChatSessionsInput>
    create: XOR<UserCreateWithoutChatSessionsInput, UserUncheckedCreateWithoutChatSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutChatSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutChatSessionsInput, UserUncheckedUpdateWithoutChatSessionsInput>
  }

  export type UserUpdateWithoutChatSessionsInput = {
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
    oauths?: OAuthUpdateManyWithoutUserNestedInput
    orders?: OrderUpdateManyWithoutUserNestedInput
    chatMessages?: ChatMessageUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutChatSessionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
    oauths?: OAuthUncheckedUpdateManyWithoutUserNestedInput
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
    chatMessages?: ChatMessageUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ChatSessionCreateWithoutMessagesInput = {
    id?: string
    topic?: string | null
    lastSummarizeIndex?: number | null
    memoryPrompt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutChatSessionsInput
  }

  export type ChatSessionUncheckedCreateWithoutMessagesInput = {
    id?: string
    topic?: string | null
    lastSummarizeIndex?: number | null
    memoryPrompt?: string | null
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChatSessionCreateOrConnectWithoutMessagesInput = {
    where: ChatSessionWhereUniqueInput
    create: XOR<ChatSessionCreateWithoutMessagesInput, ChatSessionUncheckedCreateWithoutMessagesInput>
  }

  export type ModelCreateWithoutMessagesInput = {
    name: string
    price: number
    products?: ModelInProductCreateNestedManyWithoutModelInput
  }

  export type ModelUncheckedCreateWithoutMessagesInput = {
    id?: number
    name: string
    price: number
    products?: ModelInProductUncheckedCreateNestedManyWithoutModelInput
  }

  export type ModelCreateOrConnectWithoutMessagesInput = {
    where: ModelWhereUniqueInput
    create: XOR<ModelCreateWithoutMessagesInput, ModelUncheckedCreateWithoutMessagesInput>
  }

  export type UserCreateWithoutChatMessagesInput = {
    role?: $Enums.Role
    name: string
    email?: string | null
    phone?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isBlocked?: boolean
    oauths?: OAuthCreateNestedManyWithoutUserInput
    orders?: OrderCreateNestedManyWithoutUserInput
    chatSessions?: ChatSessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutChatMessagesInput = {
    id?: number
    role?: $Enums.Role
    name: string
    email?: string | null
    phone?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isBlocked?: boolean
    oauths?: OAuthUncheckedCreateNestedManyWithoutUserInput
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
    chatSessions?: ChatSessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutChatMessagesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutChatMessagesInput, UserUncheckedCreateWithoutChatMessagesInput>
  }

  export type ChatSessionUpsertWithoutMessagesInput = {
    update: XOR<ChatSessionUpdateWithoutMessagesInput, ChatSessionUncheckedUpdateWithoutMessagesInput>
    create: XOR<ChatSessionCreateWithoutMessagesInput, ChatSessionUncheckedCreateWithoutMessagesInput>
    where?: ChatSessionWhereInput
  }

  export type ChatSessionUpdateToOneWithWhereWithoutMessagesInput = {
    where?: ChatSessionWhereInput
    data: XOR<ChatSessionUpdateWithoutMessagesInput, ChatSessionUncheckedUpdateWithoutMessagesInput>
  }

  export type ChatSessionUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    lastSummarizeIndex?: NullableIntFieldUpdateOperationsInput | number | null
    memoryPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutChatSessionsNestedInput
  }

  export type ChatSessionUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    lastSummarizeIndex?: NullableIntFieldUpdateOperationsInput | number | null
    memoryPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModelUpsertWithoutMessagesInput = {
    update: XOR<ModelUpdateWithoutMessagesInput, ModelUncheckedUpdateWithoutMessagesInput>
    create: XOR<ModelCreateWithoutMessagesInput, ModelUncheckedCreateWithoutMessagesInput>
    where?: ModelWhereInput
  }

  export type ModelUpdateToOneWithWhereWithoutMessagesInput = {
    where?: ModelWhereInput
    data: XOR<ModelUpdateWithoutMessagesInput, ModelUncheckedUpdateWithoutMessagesInput>
  }

  export type ModelUpdateWithoutMessagesInput = {
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    products?: ModelInProductUpdateManyWithoutModelNestedInput
  }

  export type ModelUncheckedUpdateWithoutMessagesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    products?: ModelInProductUncheckedUpdateManyWithoutModelNestedInput
  }

  export type UserUpsertWithoutChatMessagesInput = {
    update: XOR<UserUpdateWithoutChatMessagesInput, UserUncheckedUpdateWithoutChatMessagesInput>
    create: XOR<UserCreateWithoutChatMessagesInput, UserUncheckedCreateWithoutChatMessagesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutChatMessagesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutChatMessagesInput, UserUncheckedUpdateWithoutChatMessagesInput>
  }

  export type UserUpdateWithoutChatMessagesInput = {
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
    oauths?: OAuthUpdateManyWithoutUserNestedInput
    orders?: OrderUpdateManyWithoutUserNestedInput
    chatSessions?: ChatSessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutChatMessagesInput = {
    id?: IntFieldUpdateOperationsInput | number
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
    oauths?: OAuthUncheckedUpdateManyWithoutUserNestedInput
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
    chatSessions?: ChatSessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type OAuthCreateManyUserInput = {
    id?: number
    provider: $Enums.OAuthProvider
    providerId: string
    accessToken: string
    refreshToken: string
    expiredAt: Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderCreateManyUserInput = {
    id: string
    type: $Enums.OrderType
    status?: $Enums.OrderStatus
    count?: number
    amount: number
    startAt?: Date | string | null
    endAt?: Date | string | null
    isCurrent?: boolean
    productId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    rawData?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ChatSessionCreateManyUserInput = {
    id?: string
    topic?: string | null
    lastSummarizeIndex?: number | null
    memoryPrompt?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChatMessageCreateManyUserInput = {
    id?: string
    role: $Enums.ChatMessageRole
    content: string
    deleted?: boolean
    chatSessionId?: string | null
    modelId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OAuthUpdateWithoutUserInput = {
    provider?: EnumOAuthProviderFieldUpdateOperationsInput | $Enums.OAuthProvider
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    expiredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    provider?: EnumOAuthProviderFieldUpdateOperationsInput | $Enums.OAuthProvider
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    expiredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    provider?: EnumOAuthProviderFieldUpdateOperationsInput | $Enums.OAuthProvider
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    expiredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    data?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    count?: IntFieldUpdateOperationsInput | number
    amount?: IntFieldUpdateOperationsInput | number
    startAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rawData?: NullableJsonNullValueInput | InputJsonValue
    product?: ProductUpdateOneRequiredWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    count?: IntFieldUpdateOperationsInput | number
    amount?: IntFieldUpdateOperationsInput | number
    startAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    productId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rawData?: NullableJsonNullValueInput | InputJsonValue
  }

  export type OrderUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    count?: IntFieldUpdateOperationsInput | number
    amount?: IntFieldUpdateOperationsInput | number
    startAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    productId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rawData?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ChatSessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    lastSummarizeIndex?: NullableIntFieldUpdateOperationsInput | number | null
    memoryPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: ChatMessageUpdateManyWithoutChatSessionNestedInput
  }

  export type ChatSessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    lastSummarizeIndex?: NullableIntFieldUpdateOperationsInput | number | null
    memoryPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: ChatMessageUncheckedUpdateManyWithoutChatSessionNestedInput
  }

  export type ChatSessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    lastSummarizeIndex?: NullableIntFieldUpdateOperationsInput | number | null
    memoryPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatMessageUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumChatMessageRoleFieldUpdateOperationsInput | $Enums.ChatMessageRole
    content?: StringFieldUpdateOperationsInput | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chatSession?: ChatSessionUpdateOneWithoutMessagesNestedInput
    model?: ModelUpdateOneWithoutMessagesNestedInput
  }

  export type ChatMessageUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumChatMessageRoleFieldUpdateOperationsInput | $Enums.ChatMessageRole
    content?: StringFieldUpdateOperationsInput | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    chatSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    modelId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatMessageUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumChatMessageRoleFieldUpdateOperationsInput | $Enums.ChatMessageRole
    content?: StringFieldUpdateOperationsInput | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    chatSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    modelId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModelInProductCreateManyModelInput = {
    times: number
    duration: number
    productId: number
  }

  export type ChatMessageCreateManyModelInput = {
    id?: string
    role: $Enums.ChatMessageRole
    content: string
    deleted?: boolean
    chatSessionId?: string | null
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ModelInProductUpdateWithoutModelInput = {
    times?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    product?: ProductUpdateOneRequiredWithoutModelsNestedInput
  }

  export type ModelInProductUncheckedUpdateWithoutModelInput = {
    times?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
  }

  export type ModelInProductUncheckedUpdateManyWithoutModelInput = {
    times?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
  }

  export type ChatMessageUpdateWithoutModelInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumChatMessageRoleFieldUpdateOperationsInput | $Enums.ChatMessageRole
    content?: StringFieldUpdateOperationsInput | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chatSession?: ChatSessionUpdateOneWithoutMessagesNestedInput
    user?: UserUpdateOneRequiredWithoutChatMessagesNestedInput
  }

  export type ChatMessageUncheckedUpdateWithoutModelInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumChatMessageRoleFieldUpdateOperationsInput | $Enums.ChatMessageRole
    content?: StringFieldUpdateOperationsInput | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    chatSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatMessageUncheckedUpdateManyWithoutModelInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumChatMessageRoleFieldUpdateOperationsInput | $Enums.ChatMessageRole
    content?: StringFieldUpdateOperationsInput | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    chatSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModelInProductCreateManyProductInput = {
    times: number
    duration: number
    modelId: number
  }

  export type OrderCreateManyProductInput = {
    id: string
    type: $Enums.OrderType
    status?: $Enums.OrderStatus
    count?: number
    amount: number
    startAt?: Date | string | null
    endAt?: Date | string | null
    isCurrent?: boolean
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    rawData?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ModelInProductUpdateWithoutProductInput = {
    times?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    model?: ModelUpdateOneRequiredWithoutProductsNestedInput
  }

  export type ModelInProductUncheckedUpdateWithoutProductInput = {
    times?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    modelId?: IntFieldUpdateOperationsInput | number
  }

  export type ModelInProductUncheckedUpdateManyWithoutProductInput = {
    times?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    modelId?: IntFieldUpdateOperationsInput | number
  }

  export type OrderUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    count?: IntFieldUpdateOperationsInput | number
    amount?: IntFieldUpdateOperationsInput | number
    startAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rawData?: NullableJsonNullValueInput | InputJsonValue
    user?: UserUpdateOneRequiredWithoutOrdersNestedInput
  }

  export type OrderUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    count?: IntFieldUpdateOperationsInput | number
    amount?: IntFieldUpdateOperationsInput | number
    startAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rawData?: NullableJsonNullValueInput | InputJsonValue
  }

  export type OrderUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    count?: IntFieldUpdateOperationsInput | number
    amount?: IntFieldUpdateOperationsInput | number
    startAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rawData?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ProductCreateManyCategoryInput = {
    id?: number
    name: string
    features?: ProductCreatefeaturesInput | string[]
    isHidden?: boolean
    price: number
    stock?: number
    duration: number
  }

  export type ProductUpdateWithoutCategoryInput = {
    name?: StringFieldUpdateOperationsInput | string
    features?: ProductUpdatefeaturesInput | string[]
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    price?: IntFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    models?: ModelInProductUpdateManyWithoutProductNestedInput
    order?: OrderUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    features?: ProductUpdatefeaturesInput | string[]
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    price?: IntFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    models?: ModelInProductUncheckedUpdateManyWithoutProductNestedInput
    order?: OrderUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateManyWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    features?: ProductUpdatefeaturesInput | string[]
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    price?: IntFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
  }

  export type ChatMessageCreateManyChatSessionInput = {
    id?: string
    role: $Enums.ChatMessageRole
    content: string
    deleted?: boolean
    modelId?: number | null
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChatMessageUpdateWithoutChatSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumChatMessageRoleFieldUpdateOperationsInput | $Enums.ChatMessageRole
    content?: StringFieldUpdateOperationsInput | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    model?: ModelUpdateOneWithoutMessagesNestedInput
    user?: UserUpdateOneRequiredWithoutChatMessagesNestedInput
  }

  export type ChatMessageUncheckedUpdateWithoutChatSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumChatMessageRoleFieldUpdateOperationsInput | $Enums.ChatMessageRole
    content?: StringFieldUpdateOperationsInput | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    modelId?: NullableIntFieldUpdateOperationsInput | number | null
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatMessageUncheckedUpdateManyWithoutChatSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumChatMessageRoleFieldUpdateOperationsInput | $Enums.ChatMessageRole
    content?: StringFieldUpdateOperationsInput | string
    deleted?: BoolFieldUpdateOperationsInput | boolean
    modelId?: NullableIntFieldUpdateOperationsInput | number | null
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ModelCountOutputTypeDefaultArgs instead
     */
    export type ModelCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = ModelCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProductCountOutputTypeDefaultArgs instead
     */
    export type ProductCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = ProductCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CategoryCountOutputTypeDefaultArgs instead
     */
    export type CategoryCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = CategoryCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ChatSessionCountOutputTypeDefaultArgs instead
     */
    export type ChatSessionCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = ChatSessionCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use OAuthDefaultArgs instead
     */
    export type OAuthArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = OAuthDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ModelDefaultArgs instead
     */
    export type ModelArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = ModelDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProductDefaultArgs instead
     */
    export type ProductArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = ProductDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ModelInProductDefaultArgs instead
     */
    export type ModelInProductArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = ModelInProductDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CategoryDefaultArgs instead
     */
    export type CategoryArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = CategoryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use OrderDefaultArgs instead
     */
    export type OrderArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = OrderDefaultArgs<ExtArgs>
    /**
     * @deprecated Use OpenAIKeyDefaultArgs instead
     */
    export type OpenAIKeyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = OpenAIKeyDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RateLimitDefaultArgs instead
     */
    export type RateLimitArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = RateLimitDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ChatSessionDefaultArgs instead
     */
    export type ChatSessionArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = ChatSessionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ChatMessageDefaultArgs instead
     */
    export type ChatMessageArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = ChatMessageDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ChatSettingDefaultArgs instead
     */
    export type ChatSettingArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = ChatSettingDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}