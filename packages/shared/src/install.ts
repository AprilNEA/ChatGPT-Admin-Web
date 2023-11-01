interface BaseSettingOptions {
  key: string;
  label: string;
  description?: string;
  isOptional?: boolean;
}

interface TypeSettingSchema extends BaseSettingOptions {
  type: 'switch' | 'input' | 'multi-input' | 'list';
  items?: never;
}

interface SelectSettingSchema extends BaseSettingOptions {
  type: 'select';
  items?: never;
  selectOptions: string[];
}

interface ItemsSettingSchema extends BaseSettingOptions {
  type?: never;
  items: ISettingSchema[];
}

export type ISettingSchema =
  | TypeSettingSchema
  | ItemsSettingSchema
  | SelectSettingSchema;
