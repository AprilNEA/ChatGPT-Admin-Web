interface BaseSettingOptions {
  label: string;
  description?: string;
  isOptional?: boolean;
}

interface TypeSettingSchema extends BaseSettingOptions {
  key: string;
  type: 'switch' | 'input' | 'list';
  items?: never;
}

interface MultiInputSettingSchema extends BaseSettingOptions {
  key: string;
  keys: string[];
  type: 'multi-input';
  items?: never;
}

interface SelectSettingSchema extends BaseSettingOptions {
  key: string;
  type: 'select';
  items?: never;
  selectOptions: string[];
}

interface ItemsSettingSchema extends BaseSettingOptions {
  key: string;
  type?: never;
  items: ISettingSchema[];
}

export type ISettingSchema =
  | TypeSettingSchema
  | ItemsSettingSchema
  | SelectSettingSchema
  | MultiInputSettingSchema;
