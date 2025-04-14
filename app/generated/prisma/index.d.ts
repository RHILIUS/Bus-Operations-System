
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Quota_Policy
 * 
 */
export type Quota_Policy = $Result.DefaultSelection<Prisma.$Quota_PolicyPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Quota_Policies
 * const quota_Policies = await prisma.quota_Policy.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Quota_Policies
   * const quota_Policies = await prisma.quota_Policy.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

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


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.quota_Policy`: Exposes CRUD operations for the **Quota_Policy** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Quota_Policies
    * const quota_Policies = await prisma.quota_Policy.findMany()
    * ```
    */
  get quota_Policy(): Prisma.Quota_PolicyDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

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

  type SelectAndOmit = {
    select: any
    omit: any
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
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
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
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
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
    Quota_Policy: 'Quota_Policy'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "quota_Policy"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Quota_Policy: {
        payload: Prisma.$Quota_PolicyPayload<ExtArgs>
        fields: Prisma.Quota_PolicyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.Quota_PolicyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Quota_PolicyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.Quota_PolicyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Quota_PolicyPayload>
          }
          findFirst: {
            args: Prisma.Quota_PolicyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Quota_PolicyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.Quota_PolicyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Quota_PolicyPayload>
          }
          findMany: {
            args: Prisma.Quota_PolicyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Quota_PolicyPayload>[]
          }
          create: {
            args: Prisma.Quota_PolicyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Quota_PolicyPayload>
          }
          createMany: {
            args: Prisma.Quota_PolicyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.Quota_PolicyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Quota_PolicyPayload>[]
          }
          delete: {
            args: Prisma.Quota_PolicyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Quota_PolicyPayload>
          }
          update: {
            args: Prisma.Quota_PolicyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Quota_PolicyPayload>
          }
          deleteMany: {
            args: Prisma.Quota_PolicyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.Quota_PolicyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.Quota_PolicyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Quota_PolicyPayload>[]
          }
          upsert: {
            args: Prisma.Quota_PolicyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Quota_PolicyPayload>
          }
          aggregate: {
            args: Prisma.Quota_PolicyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuota_Policy>
          }
          groupBy: {
            args: Prisma.Quota_PolicyGroupByArgs<ExtArgs>
            result: $Utils.Optional<Quota_PolicyGroupByOutputType>[]
          }
          count: {
            args: Prisma.Quota_PolicyCountArgs<ExtArgs>
            result: $Utils.Optional<Quota_PolicyCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
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
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    quota_Policy?: Quota_PolicyOmit
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
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
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
   * Models
   */

  /**
   * Model Quota_Policy
   */

  export type AggregateQuota_Policy = {
    _count: Quota_PolicyCountAggregateOutputType | null
    _avg: Quota_PolicyAvgAggregateOutputType | null
    _sum: Quota_PolicySumAggregateOutputType | null
    _min: Quota_PolicyMinAggregateOutputType | null
    _max: Quota_PolicyMaxAggregateOutputType | null
  }

  export type Quota_PolicyAvgAggregateOutputType = {
    QuotaPolicyID: number | null
  }

  export type Quota_PolicySumAggregateOutputType = {
    QuotaPolicyID: number | null
  }

  export type Quota_PolicyMinAggregateOutputType = {
    QuotaPolicyID: number | null
    StartDate: Date | null
    EndDate: Date | null
  }

  export type Quota_PolicyMaxAggregateOutputType = {
    QuotaPolicyID: number | null
    StartDate: Date | null
    EndDate: Date | null
  }

  export type Quota_PolicyCountAggregateOutputType = {
    QuotaPolicyID: number
    StartDate: number
    EndDate: number
    _all: number
  }


  export type Quota_PolicyAvgAggregateInputType = {
    QuotaPolicyID?: true
  }

  export type Quota_PolicySumAggregateInputType = {
    QuotaPolicyID?: true
  }

  export type Quota_PolicyMinAggregateInputType = {
    QuotaPolicyID?: true
    StartDate?: true
    EndDate?: true
  }

  export type Quota_PolicyMaxAggregateInputType = {
    QuotaPolicyID?: true
    StartDate?: true
    EndDate?: true
  }

  export type Quota_PolicyCountAggregateInputType = {
    QuotaPolicyID?: true
    StartDate?: true
    EndDate?: true
    _all?: true
  }

  export type Quota_PolicyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Quota_Policy to aggregate.
     */
    where?: Quota_PolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quota_Policies to fetch.
     */
    orderBy?: Quota_PolicyOrderByWithRelationInput | Quota_PolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: Quota_PolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quota_Policies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quota_Policies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Quota_Policies
    **/
    _count?: true | Quota_PolicyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Quota_PolicyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Quota_PolicySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Quota_PolicyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Quota_PolicyMaxAggregateInputType
  }

  export type GetQuota_PolicyAggregateType<T extends Quota_PolicyAggregateArgs> = {
        [P in keyof T & keyof AggregateQuota_Policy]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuota_Policy[P]>
      : GetScalarType<T[P], AggregateQuota_Policy[P]>
  }




  export type Quota_PolicyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Quota_PolicyWhereInput
    orderBy?: Quota_PolicyOrderByWithAggregationInput | Quota_PolicyOrderByWithAggregationInput[]
    by: Quota_PolicyScalarFieldEnum[] | Quota_PolicyScalarFieldEnum
    having?: Quota_PolicyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Quota_PolicyCountAggregateInputType | true
    _avg?: Quota_PolicyAvgAggregateInputType
    _sum?: Quota_PolicySumAggregateInputType
    _min?: Quota_PolicyMinAggregateInputType
    _max?: Quota_PolicyMaxAggregateInputType
  }

  export type Quota_PolicyGroupByOutputType = {
    QuotaPolicyID: number
    StartDate: Date
    EndDate: Date
    _count: Quota_PolicyCountAggregateOutputType | null
    _avg: Quota_PolicyAvgAggregateOutputType | null
    _sum: Quota_PolicySumAggregateOutputType | null
    _min: Quota_PolicyMinAggregateOutputType | null
    _max: Quota_PolicyMaxAggregateOutputType | null
  }

  type GetQuota_PolicyGroupByPayload<T extends Quota_PolicyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Quota_PolicyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Quota_PolicyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Quota_PolicyGroupByOutputType[P]>
            : GetScalarType<T[P], Quota_PolicyGroupByOutputType[P]>
        }
      >
    >


  export type Quota_PolicySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    QuotaPolicyID?: boolean
    StartDate?: boolean
    EndDate?: boolean
  }, ExtArgs["result"]["quota_Policy"]>

  export type Quota_PolicySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    QuotaPolicyID?: boolean
    StartDate?: boolean
    EndDate?: boolean
  }, ExtArgs["result"]["quota_Policy"]>

  export type Quota_PolicySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    QuotaPolicyID?: boolean
    StartDate?: boolean
    EndDate?: boolean
  }, ExtArgs["result"]["quota_Policy"]>

  export type Quota_PolicySelectScalar = {
    QuotaPolicyID?: boolean
    StartDate?: boolean
    EndDate?: boolean
  }

  export type Quota_PolicyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"QuotaPolicyID" | "StartDate" | "EndDate", ExtArgs["result"]["quota_Policy"]>

  export type $Quota_PolicyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Quota_Policy"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      QuotaPolicyID: number
      StartDate: Date
      EndDate: Date
    }, ExtArgs["result"]["quota_Policy"]>
    composites: {}
  }

  type Quota_PolicyGetPayload<S extends boolean | null | undefined | Quota_PolicyDefaultArgs> = $Result.GetResult<Prisma.$Quota_PolicyPayload, S>

  type Quota_PolicyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<Quota_PolicyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Quota_PolicyCountAggregateInputType | true
    }

  export interface Quota_PolicyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Quota_Policy'], meta: { name: 'Quota_Policy' } }
    /**
     * Find zero or one Quota_Policy that matches the filter.
     * @param {Quota_PolicyFindUniqueArgs} args - Arguments to find a Quota_Policy
     * @example
     * // Get one Quota_Policy
     * const quota_Policy = await prisma.quota_Policy.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends Quota_PolicyFindUniqueArgs>(args: SelectSubset<T, Quota_PolicyFindUniqueArgs<ExtArgs>>): Prisma__Quota_PolicyClient<$Result.GetResult<Prisma.$Quota_PolicyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Quota_Policy that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {Quota_PolicyFindUniqueOrThrowArgs} args - Arguments to find a Quota_Policy
     * @example
     * // Get one Quota_Policy
     * const quota_Policy = await prisma.quota_Policy.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends Quota_PolicyFindUniqueOrThrowArgs>(args: SelectSubset<T, Quota_PolicyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__Quota_PolicyClient<$Result.GetResult<Prisma.$Quota_PolicyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Quota_Policy that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Quota_PolicyFindFirstArgs} args - Arguments to find a Quota_Policy
     * @example
     * // Get one Quota_Policy
     * const quota_Policy = await prisma.quota_Policy.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends Quota_PolicyFindFirstArgs>(args?: SelectSubset<T, Quota_PolicyFindFirstArgs<ExtArgs>>): Prisma__Quota_PolicyClient<$Result.GetResult<Prisma.$Quota_PolicyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Quota_Policy that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Quota_PolicyFindFirstOrThrowArgs} args - Arguments to find a Quota_Policy
     * @example
     * // Get one Quota_Policy
     * const quota_Policy = await prisma.quota_Policy.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends Quota_PolicyFindFirstOrThrowArgs>(args?: SelectSubset<T, Quota_PolicyFindFirstOrThrowArgs<ExtArgs>>): Prisma__Quota_PolicyClient<$Result.GetResult<Prisma.$Quota_PolicyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Quota_Policies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Quota_PolicyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Quota_Policies
     * const quota_Policies = await prisma.quota_Policy.findMany()
     * 
     * // Get first 10 Quota_Policies
     * const quota_Policies = await prisma.quota_Policy.findMany({ take: 10 })
     * 
     * // Only select the `QuotaPolicyID`
     * const quota_PolicyWithQuotaPolicyIDOnly = await prisma.quota_Policy.findMany({ select: { QuotaPolicyID: true } })
     * 
     */
    findMany<T extends Quota_PolicyFindManyArgs>(args?: SelectSubset<T, Quota_PolicyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Quota_PolicyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Quota_Policy.
     * @param {Quota_PolicyCreateArgs} args - Arguments to create a Quota_Policy.
     * @example
     * // Create one Quota_Policy
     * const Quota_Policy = await prisma.quota_Policy.create({
     *   data: {
     *     // ... data to create a Quota_Policy
     *   }
     * })
     * 
     */
    create<T extends Quota_PolicyCreateArgs>(args: SelectSubset<T, Quota_PolicyCreateArgs<ExtArgs>>): Prisma__Quota_PolicyClient<$Result.GetResult<Prisma.$Quota_PolicyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Quota_Policies.
     * @param {Quota_PolicyCreateManyArgs} args - Arguments to create many Quota_Policies.
     * @example
     * // Create many Quota_Policies
     * const quota_Policy = await prisma.quota_Policy.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends Quota_PolicyCreateManyArgs>(args?: SelectSubset<T, Quota_PolicyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Quota_Policies and returns the data saved in the database.
     * @param {Quota_PolicyCreateManyAndReturnArgs} args - Arguments to create many Quota_Policies.
     * @example
     * // Create many Quota_Policies
     * const quota_Policy = await prisma.quota_Policy.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Quota_Policies and only return the `QuotaPolicyID`
     * const quota_PolicyWithQuotaPolicyIDOnly = await prisma.quota_Policy.createManyAndReturn({
     *   select: { QuotaPolicyID: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends Quota_PolicyCreateManyAndReturnArgs>(args?: SelectSubset<T, Quota_PolicyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Quota_PolicyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Quota_Policy.
     * @param {Quota_PolicyDeleteArgs} args - Arguments to delete one Quota_Policy.
     * @example
     * // Delete one Quota_Policy
     * const Quota_Policy = await prisma.quota_Policy.delete({
     *   where: {
     *     // ... filter to delete one Quota_Policy
     *   }
     * })
     * 
     */
    delete<T extends Quota_PolicyDeleteArgs>(args: SelectSubset<T, Quota_PolicyDeleteArgs<ExtArgs>>): Prisma__Quota_PolicyClient<$Result.GetResult<Prisma.$Quota_PolicyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Quota_Policy.
     * @param {Quota_PolicyUpdateArgs} args - Arguments to update one Quota_Policy.
     * @example
     * // Update one Quota_Policy
     * const quota_Policy = await prisma.quota_Policy.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends Quota_PolicyUpdateArgs>(args: SelectSubset<T, Quota_PolicyUpdateArgs<ExtArgs>>): Prisma__Quota_PolicyClient<$Result.GetResult<Prisma.$Quota_PolicyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Quota_Policies.
     * @param {Quota_PolicyDeleteManyArgs} args - Arguments to filter Quota_Policies to delete.
     * @example
     * // Delete a few Quota_Policies
     * const { count } = await prisma.quota_Policy.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends Quota_PolicyDeleteManyArgs>(args?: SelectSubset<T, Quota_PolicyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Quota_Policies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Quota_PolicyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Quota_Policies
     * const quota_Policy = await prisma.quota_Policy.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends Quota_PolicyUpdateManyArgs>(args: SelectSubset<T, Quota_PolicyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Quota_Policies and returns the data updated in the database.
     * @param {Quota_PolicyUpdateManyAndReturnArgs} args - Arguments to update many Quota_Policies.
     * @example
     * // Update many Quota_Policies
     * const quota_Policy = await prisma.quota_Policy.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Quota_Policies and only return the `QuotaPolicyID`
     * const quota_PolicyWithQuotaPolicyIDOnly = await prisma.quota_Policy.updateManyAndReturn({
     *   select: { QuotaPolicyID: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends Quota_PolicyUpdateManyAndReturnArgs>(args: SelectSubset<T, Quota_PolicyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Quota_PolicyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Quota_Policy.
     * @param {Quota_PolicyUpsertArgs} args - Arguments to update or create a Quota_Policy.
     * @example
     * // Update or create a Quota_Policy
     * const quota_Policy = await prisma.quota_Policy.upsert({
     *   create: {
     *     // ... data to create a Quota_Policy
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Quota_Policy we want to update
     *   }
     * })
     */
    upsert<T extends Quota_PolicyUpsertArgs>(args: SelectSubset<T, Quota_PolicyUpsertArgs<ExtArgs>>): Prisma__Quota_PolicyClient<$Result.GetResult<Prisma.$Quota_PolicyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Quota_Policies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Quota_PolicyCountArgs} args - Arguments to filter Quota_Policies to count.
     * @example
     * // Count the number of Quota_Policies
     * const count = await prisma.quota_Policy.count({
     *   where: {
     *     // ... the filter for the Quota_Policies we want to count
     *   }
     * })
    **/
    count<T extends Quota_PolicyCountArgs>(
      args?: Subset<T, Quota_PolicyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Quota_PolicyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Quota_Policy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Quota_PolicyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Quota_PolicyAggregateArgs>(args: Subset<T, Quota_PolicyAggregateArgs>): Prisma.PrismaPromise<GetQuota_PolicyAggregateType<T>>

    /**
     * Group by Quota_Policy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Quota_PolicyGroupByArgs} args - Group by arguments.
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
      T extends Quota_PolicyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Quota_PolicyGroupByArgs['orderBy'] }
        : { orderBy?: Quota_PolicyGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, Quota_PolicyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuota_PolicyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Quota_Policy model
   */
  readonly fields: Quota_PolicyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Quota_Policy.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__Quota_PolicyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Quota_Policy model
   */
  interface Quota_PolicyFieldRefs {
    readonly QuotaPolicyID: FieldRef<"Quota_Policy", 'Int'>
    readonly StartDate: FieldRef<"Quota_Policy", 'DateTime'>
    readonly EndDate: FieldRef<"Quota_Policy", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Quota_Policy findUnique
   */
  export type Quota_PolicyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quota_Policy
     */
    select?: Quota_PolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quota_Policy
     */
    omit?: Quota_PolicyOmit<ExtArgs> | null
    /**
     * Filter, which Quota_Policy to fetch.
     */
    where: Quota_PolicyWhereUniqueInput
  }

  /**
   * Quota_Policy findUniqueOrThrow
   */
  export type Quota_PolicyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quota_Policy
     */
    select?: Quota_PolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quota_Policy
     */
    omit?: Quota_PolicyOmit<ExtArgs> | null
    /**
     * Filter, which Quota_Policy to fetch.
     */
    where: Quota_PolicyWhereUniqueInput
  }

  /**
   * Quota_Policy findFirst
   */
  export type Quota_PolicyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quota_Policy
     */
    select?: Quota_PolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quota_Policy
     */
    omit?: Quota_PolicyOmit<ExtArgs> | null
    /**
     * Filter, which Quota_Policy to fetch.
     */
    where?: Quota_PolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quota_Policies to fetch.
     */
    orderBy?: Quota_PolicyOrderByWithRelationInput | Quota_PolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Quota_Policies.
     */
    cursor?: Quota_PolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quota_Policies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quota_Policies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Quota_Policies.
     */
    distinct?: Quota_PolicyScalarFieldEnum | Quota_PolicyScalarFieldEnum[]
  }

  /**
   * Quota_Policy findFirstOrThrow
   */
  export type Quota_PolicyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quota_Policy
     */
    select?: Quota_PolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quota_Policy
     */
    omit?: Quota_PolicyOmit<ExtArgs> | null
    /**
     * Filter, which Quota_Policy to fetch.
     */
    where?: Quota_PolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quota_Policies to fetch.
     */
    orderBy?: Quota_PolicyOrderByWithRelationInput | Quota_PolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Quota_Policies.
     */
    cursor?: Quota_PolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quota_Policies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quota_Policies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Quota_Policies.
     */
    distinct?: Quota_PolicyScalarFieldEnum | Quota_PolicyScalarFieldEnum[]
  }

  /**
   * Quota_Policy findMany
   */
  export type Quota_PolicyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quota_Policy
     */
    select?: Quota_PolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quota_Policy
     */
    omit?: Quota_PolicyOmit<ExtArgs> | null
    /**
     * Filter, which Quota_Policies to fetch.
     */
    where?: Quota_PolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quota_Policies to fetch.
     */
    orderBy?: Quota_PolicyOrderByWithRelationInput | Quota_PolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Quota_Policies.
     */
    cursor?: Quota_PolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quota_Policies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quota_Policies.
     */
    skip?: number
    distinct?: Quota_PolicyScalarFieldEnum | Quota_PolicyScalarFieldEnum[]
  }

  /**
   * Quota_Policy create
   */
  export type Quota_PolicyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quota_Policy
     */
    select?: Quota_PolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quota_Policy
     */
    omit?: Quota_PolicyOmit<ExtArgs> | null
    /**
     * The data needed to create a Quota_Policy.
     */
    data: XOR<Quota_PolicyCreateInput, Quota_PolicyUncheckedCreateInput>
  }

  /**
   * Quota_Policy createMany
   */
  export type Quota_PolicyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Quota_Policies.
     */
    data: Quota_PolicyCreateManyInput | Quota_PolicyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Quota_Policy createManyAndReturn
   */
  export type Quota_PolicyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quota_Policy
     */
    select?: Quota_PolicySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Quota_Policy
     */
    omit?: Quota_PolicyOmit<ExtArgs> | null
    /**
     * The data used to create many Quota_Policies.
     */
    data: Quota_PolicyCreateManyInput | Quota_PolicyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Quota_Policy update
   */
  export type Quota_PolicyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quota_Policy
     */
    select?: Quota_PolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quota_Policy
     */
    omit?: Quota_PolicyOmit<ExtArgs> | null
    /**
     * The data needed to update a Quota_Policy.
     */
    data: XOR<Quota_PolicyUpdateInput, Quota_PolicyUncheckedUpdateInput>
    /**
     * Choose, which Quota_Policy to update.
     */
    where: Quota_PolicyWhereUniqueInput
  }

  /**
   * Quota_Policy updateMany
   */
  export type Quota_PolicyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Quota_Policies.
     */
    data: XOR<Quota_PolicyUpdateManyMutationInput, Quota_PolicyUncheckedUpdateManyInput>
    /**
     * Filter which Quota_Policies to update
     */
    where?: Quota_PolicyWhereInput
    /**
     * Limit how many Quota_Policies to update.
     */
    limit?: number
  }

  /**
   * Quota_Policy updateManyAndReturn
   */
  export type Quota_PolicyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quota_Policy
     */
    select?: Quota_PolicySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Quota_Policy
     */
    omit?: Quota_PolicyOmit<ExtArgs> | null
    /**
     * The data used to update Quota_Policies.
     */
    data: XOR<Quota_PolicyUpdateManyMutationInput, Quota_PolicyUncheckedUpdateManyInput>
    /**
     * Filter which Quota_Policies to update
     */
    where?: Quota_PolicyWhereInput
    /**
     * Limit how many Quota_Policies to update.
     */
    limit?: number
  }

  /**
   * Quota_Policy upsert
   */
  export type Quota_PolicyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quota_Policy
     */
    select?: Quota_PolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quota_Policy
     */
    omit?: Quota_PolicyOmit<ExtArgs> | null
    /**
     * The filter to search for the Quota_Policy to update in case it exists.
     */
    where: Quota_PolicyWhereUniqueInput
    /**
     * In case the Quota_Policy found by the `where` argument doesn't exist, create a new Quota_Policy with this data.
     */
    create: XOR<Quota_PolicyCreateInput, Quota_PolicyUncheckedCreateInput>
    /**
     * In case the Quota_Policy was found with the provided `where` argument, update it with this data.
     */
    update: XOR<Quota_PolicyUpdateInput, Quota_PolicyUncheckedUpdateInput>
  }

  /**
   * Quota_Policy delete
   */
  export type Quota_PolicyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quota_Policy
     */
    select?: Quota_PolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quota_Policy
     */
    omit?: Quota_PolicyOmit<ExtArgs> | null
    /**
     * Filter which Quota_Policy to delete.
     */
    where: Quota_PolicyWhereUniqueInput
  }

  /**
   * Quota_Policy deleteMany
   */
  export type Quota_PolicyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Quota_Policies to delete
     */
    where?: Quota_PolicyWhereInput
    /**
     * Limit how many Quota_Policies to delete.
     */
    limit?: number
  }

  /**
   * Quota_Policy without action
   */
  export type Quota_PolicyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quota_Policy
     */
    select?: Quota_PolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quota_Policy
     */
    omit?: Quota_PolicyOmit<ExtArgs> | null
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


  export const Quota_PolicyScalarFieldEnum: {
    QuotaPolicyID: 'QuotaPolicyID',
    StartDate: 'StartDate',
    EndDate: 'EndDate'
  };

  export type Quota_PolicyScalarFieldEnum = (typeof Quota_PolicyScalarFieldEnum)[keyof typeof Quota_PolicyScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


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
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


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


  export type Quota_PolicyWhereInput = {
    AND?: Quota_PolicyWhereInput | Quota_PolicyWhereInput[]
    OR?: Quota_PolicyWhereInput[]
    NOT?: Quota_PolicyWhereInput | Quota_PolicyWhereInput[]
    QuotaPolicyID?: IntFilter<"Quota_Policy"> | number
    StartDate?: DateTimeFilter<"Quota_Policy"> | Date | string
    EndDate?: DateTimeFilter<"Quota_Policy"> | Date | string
  }

  export type Quota_PolicyOrderByWithRelationInput = {
    QuotaPolicyID?: SortOrder
    StartDate?: SortOrder
    EndDate?: SortOrder
  }

  export type Quota_PolicyWhereUniqueInput = Prisma.AtLeast<{
    QuotaPolicyID?: number
    AND?: Quota_PolicyWhereInput | Quota_PolicyWhereInput[]
    OR?: Quota_PolicyWhereInput[]
    NOT?: Quota_PolicyWhereInput | Quota_PolicyWhereInput[]
    StartDate?: DateTimeFilter<"Quota_Policy"> | Date | string
    EndDate?: DateTimeFilter<"Quota_Policy"> | Date | string
  }, "QuotaPolicyID">

  export type Quota_PolicyOrderByWithAggregationInput = {
    QuotaPolicyID?: SortOrder
    StartDate?: SortOrder
    EndDate?: SortOrder
    _count?: Quota_PolicyCountOrderByAggregateInput
    _avg?: Quota_PolicyAvgOrderByAggregateInput
    _max?: Quota_PolicyMaxOrderByAggregateInput
    _min?: Quota_PolicyMinOrderByAggregateInput
    _sum?: Quota_PolicySumOrderByAggregateInput
  }

  export type Quota_PolicyScalarWhereWithAggregatesInput = {
    AND?: Quota_PolicyScalarWhereWithAggregatesInput | Quota_PolicyScalarWhereWithAggregatesInput[]
    OR?: Quota_PolicyScalarWhereWithAggregatesInput[]
    NOT?: Quota_PolicyScalarWhereWithAggregatesInput | Quota_PolicyScalarWhereWithAggregatesInput[]
    QuotaPolicyID?: IntWithAggregatesFilter<"Quota_Policy"> | number
    StartDate?: DateTimeWithAggregatesFilter<"Quota_Policy"> | Date | string
    EndDate?: DateTimeWithAggregatesFilter<"Quota_Policy"> | Date | string
  }

  export type Quota_PolicyCreateInput = {
    StartDate: Date | string
    EndDate: Date | string
  }

  export type Quota_PolicyUncheckedCreateInput = {
    QuotaPolicyID?: number
    StartDate: Date | string
    EndDate: Date | string
  }

  export type Quota_PolicyUpdateInput = {
    StartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    EndDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Quota_PolicyUncheckedUpdateInput = {
    QuotaPolicyID?: IntFieldUpdateOperationsInput | number
    StartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    EndDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Quota_PolicyCreateManyInput = {
    QuotaPolicyID?: number
    StartDate: Date | string
    EndDate: Date | string
  }

  export type Quota_PolicyUpdateManyMutationInput = {
    StartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    EndDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Quota_PolicyUncheckedUpdateManyInput = {
    QuotaPolicyID?: IntFieldUpdateOperationsInput | number
    StartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    EndDate?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type Quota_PolicyCountOrderByAggregateInput = {
    QuotaPolicyID?: SortOrder
    StartDate?: SortOrder
    EndDate?: SortOrder
  }

  export type Quota_PolicyAvgOrderByAggregateInput = {
    QuotaPolicyID?: SortOrder
  }

  export type Quota_PolicyMaxOrderByAggregateInput = {
    QuotaPolicyID?: SortOrder
    StartDate?: SortOrder
    EndDate?: SortOrder
  }

  export type Quota_PolicyMinOrderByAggregateInput = {
    QuotaPolicyID?: SortOrder
    StartDate?: SortOrder
    EndDate?: SortOrder
  }

  export type Quota_PolicySumOrderByAggregateInput = {
    QuotaPolicyID?: SortOrder
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

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
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