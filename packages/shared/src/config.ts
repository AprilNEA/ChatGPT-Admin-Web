import z, { ZodFirstPartyTypeKind, ZodString, ZodType, ZodTypeAny } from 'zod';

const useRefine = <T>(schema: z.ZodObject<any>) =>
  schema.refine(
    (data: any) =>
      data.use !== 'disable'
        ? data[data.use as Exclude<T, 'disable'>] !== undefined
        : true,
    {
      message: "When 'use' is not 'disable', the corresponding key must exist",
      path: ['use'],
    },
  );

const CompatibilityConfigSchema = z
  .object({
    port: z.object({
      frontend: z.coerce.number().optional(),
      backend: z.coerce.number().optional(),
    }),
    openai: z.object({
      baseUrl: z.string().url().default('https://api.openai.com'),
      keys: z.array(z.string()).default(['']),
    }),
  })
  .partial();

const smsEnum = z.enum(['disable', 'aliyun', 'tencent', 'uni']);
type smsEnum = z.infer<typeof smsEnum>;
const smsSchema = useRefine<smsEnum>(
  z
    .object({
      use: smsEnum.default('disable'),
      uni: z.object({
        signature: z.string(),
        templateId: z.string(),
        apiKey: z.string(),
        apiSecret: z.string().optional(),
      }),
    })
    .partial(),
);

const emailEnum = z.enum(['disable', 'smtp', 'resend', 'mailgun', 'elastic']);
type emailEnum = z.infer<typeof emailEnum>;
const emailSchema = useRefine<emailEnum>(
  z
    .object({
      use: emailEnum.default('disable'),
      domain: z.string(),
      sender: z.string(),
      smtp: z.object({}), // 根据实际的 smtp 配置细化
      resend: z.object({
        apiKey: z.string(),
      }),
      mailgun: z.object({
        apiKey: z.string(),
        domain: z.string(),
      }),
      elastic: z.object({
        apiKey: z.string(),
      }),
    })
    .partial(),
);

const wechatSchema = z.object({
  oauth: z.object({
    appId: z.string(),
    appSecret: z.string(),
  }),
});

const paymentEnum = z.enum(['disable', 'xunhu']);
type paymentEnum = z.infer<typeof paymentEnum>;

const paymentSchema = useRefine(
  z
    .object({
      use: paymentEnum.default('disable'),
      xunhu: z.object({
        wapName: z.string(),
        appId: z.string(),
        appSecret: z.string(),
        notifyUrl: z.string().optional(),
        returnUrl: z.string().optional(),
      }),
    })
    .partial(),
);

const ThirdPartyServiceConfigSchema = z
  .object({
    sms: smsSchema,
    email: emailSchema,
    wechat: wechatSchema,
    payment: paymentSchema,
  })
  .partial();

export const ConfigSchema = z
  .object({
    mode: z.enum(['nginx', 'docker', 'debug']).optional().default('nginx'),
    title: z.string().optional().default('ChatGPT Admin Web'),
    frontend: z
      .object({
        url: z.string().url().default('http://localhost:3000'),
        port: z.coerce.number().default(3000),
      })
      .optional(),
    backend: z
      .object({
        url: z.string().url().default('http://localhost:4000'),
        port: z.coerce.number().default(3001),
      })
      .optional(),
    jwt: z
      .object({
        algorithm: z.enum(['HS256', 'ES256']).default('HS256'),
        secret: z.string().default('secret'),
        refreshSecret: z.string().default('refreshSecret'),
        privateKey: z.string(),
        publicKey: z.string(),
      })
      .partial()
      .optional(),
    redis: z.object({
      enable: z.boolean().default(true),
      url: z.string().url().default('redis://localhost:6379'),
    }),
    postgres: z.object({
      url: z
        .string()
        .url()
        .default('postgres://postgres:postgres@localhost:5432/postgres'),
    }),
  })
  .merge(CompatibilityConfigSchema)
  .merge(ThirdPartyServiceConfigSchema);

export type ConfigType = z.infer<typeof ConfigSchema>;

export interface BaseSettingOptions {
  label?: string;
  value?: string | boolean | number;
  isOptional?: boolean;
  description?: string;
}

export interface TypeSettingSchema extends BaseSettingOptions {
  key: string;
  type: 'switch' | 'input' | 'list';
  items?: never;
}

export interface MultiInputSettingSchema extends BaseSettingOptions {
  key: string;
  keys: string[];
  type: 'multi-input';
  items?: never;
}

export interface SelectSettingSchema extends BaseSettingOptions {
  key: string;
  type: 'select';
  items?: never;
  selectOptions: string[];
}

export interface ItemsSettingSchema extends BaseSettingOptions {
  key: string;
  type?: never;
  items: ISettingSchema[];
}

/* 渲染表单的结构 */
export type ISettingSchema =
  | TypeSettingSchema
  | ItemsSettingSchema
  | SelectSettingSchema
  | MultiInputSettingSchema;

export type ISettingResultValue =
  | string
  | boolean
  | number
  | string[]
  | number[]
  | Record<string, string | number | boolean>[];

function convertZodSchemaToCustomSchema(
  key: string,
  zodSchema: z.ZodTypeAny,
): ISettingSchema {
  const typeName = zodSchema._def.typeName;
  switch (typeName) {
    case ZodFirstPartyTypeKind.ZodString:
    case ZodFirstPartyTypeKind.ZodNumber:
      return {
        key,
        type: 'input' as const,
        isOptional: zodSchema.isOptional(),
        // default: zodSchema._def.defaultValue,
        description: zodSchema._def.description,
      };
    case ZodFirstPartyTypeKind.ZodObject:
      const customSchema = [];
      for (const key in zodSchema._def.shape) {
        customSchema.push(
          convertZodSchemaToCustomSchema(key, zodSchema._def.shape[key]),
        );
      }
      return {
        key,
        items: customSchema,
      };
    // case ZodFirstPartyTypeKind.ZodArray:
    //   return {
    //     key,
    //     type: 'multi-input' as const,
    //     isOptional: zodSchema.isOptional(),
    //     // default: zodSchema._def.defaultValue,
    //     description: zodSchema._def.description,
    //   };
    case ZodFirstPartyTypeKind.ZodBoolean:
      return {
        key,
        type: 'switch' as const,
        isOptional: zodSchema.isOptional(),
        // default: zodSchema._def.defaultValue,
        description: zodSchema._def.description,
      };
    case ZodFirstPartyTypeKind.ZodEnum:
      return {
        key,
        type: 'select' as const,
        selectOptions: zodSchema._def.values,
        isOptional: zodSchema.isOptional(),
        // default: zodSchema._def.defaultValue,
        description: zodSchema._def.description,
      };
    default:
      throw 'Unknown type';
  }
}
