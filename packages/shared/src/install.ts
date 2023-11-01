/* 前端渲染界面 */
export type ISettingSchema = {
  key: string;
  items?: ISettingSchema[];
  /* 单一的值或数组 */
  type: 'switch' | 'input' | 'list' | 'select';
  /* 标签 i18n */
  label: string;
  description?: string;
  isOptional?: boolean;
  selectOptions?: string[];
};

/* */
export type ISetting = {
  key: string;
  value: string | ISetting | ISetting[];
};
