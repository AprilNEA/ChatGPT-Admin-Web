export interface BaseSettingOptions {
  label: string;
  description?: string;
  isOptional?: boolean;
  value?: string | boolean | number;
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
  | Record<string, string | number | boolean>[]
  | ISettingResult;

/* 回传表单的数据 */
export interface ISettingResult {
  [key: string]: ISettingResultValue;
}
