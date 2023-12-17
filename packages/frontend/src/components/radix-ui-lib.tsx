'use client';

import clsx from 'clsx';
import { ChangeEvent, useState } from 'react';

import { MinusIcon, PlusIcon } from '@radix-ui/react-icons';
import { Button, Select, Switch, Table, TextField } from '@radix-ui/themes';

import useInstallStore from '@/store/install';
import styles from '@/styles/module/radix-ui-lib.module.scss';

import {
  ISettingSchema,
  MultiInputSettingSchema,
  SelectSettingSchema,
  TypeSettingSchema,
} from 'shared';

/* 开关选项 */
function SwitchItem(props: {
  schema: ISettingSchema;
  value: boolean;
  onCheckedChange: (boolean: boolean) => void;
}) {
  return (
    <Switch
      checked={props.value ?? !!props.schema.value ?? false}
      onCheckedChange={props.onCheckedChange}
    />
  );
}

/* 输入选项 */
function InputItem(props: {
  schema: TypeSettingSchema;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <TextField.Input
      width={160}
      value={props.value ?? props.schema.value ?? ''}
      onChange={(e) => {
        console.log(e.target.value);
        props.onChange(e);
      }}
    />
  );
}

/* 选择 */
function SelectItem(props: {
  schema: SelectSettingSchema;
  value: string;
  onValueChange: (value: string) => void;
}) {
  return (
    <Select.Root
      value={props.value ?? props.schema.value ?? ''}
      onValueChange={props.onValueChange}
    >
      <Select.Trigger />
      <Select.Content position="popper">
        {props.schema.selectOptions.map((option) => (
          <Select.Item key={option} value={option}>
            {option}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}

/* List组件 */
function ListInputHeaderArea(props: {
  schema: TypeSettingSchema;
  addValue: () => void;
}) {
  return (
    <Button variant="outline" onClick={props.addValue}>
      <PlusIcon />
    </Button>
  );
}

function ListInputChildrenArea(props: { schema: TypeSettingSchema }) {
  return (
    <Table.Root>
      <Table.Body>
        <Table.Row>
          {/*{props.schema.keys.map((key, index) => (*/}
          {/*  <Table.Cell key={index}>*/}
          {/*    <TextField.Input*/}
          {/*    // id={JSON.stringify(values.length - 1)}*/}
          {/*    // onChange={(event) => {*/}
          {/*    //   installStore.updateItemRamda(*/}
          {/*    //     [...getKeyTree(), parseInt(event.currentTarget.id), key],*/}
          {/*    //     event.target.value,*/}
          {/*    //   );*/}
          {/*    // }}*/}
          {/*    />*/}
          {/*  </Table.Cell>*/}
          {/*))}*/}
          <Table.Cell>
            <Button
            // id={JSON.stringify(tableItems.length - 1)}
            // onClick={(event) => {
            //   let tableList = tableItems;
            //   tableList.splice(parseInt(event.currentTarget.id), 1);
            //   setTableItems(tableList);
            // }}
            >
              <MinusIcon />
            </Button>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  );
}

function MultiInputHeaderArea(props: {
  schema: MultiInputSettingSchema;
  addKeyValue: () => void;
}) {
  return (
    <Button variant="outline" onClick={props.addKeyValue}>
      <PlusIcon />
    </Button>
  );
}

function MultiInputChildrenArea(props: {
  values: { [key: string]: string }[];
  schema: MultiInputSettingSchema;
  onKeyValueChange: (index: number, key: string, value: string) => void;
  removeKeyValue: (index: number) => void;
}) {
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          {props.schema.keys.map((key, index) => (
            <Table.ColumnHeaderCell key={`Head.${index}`}>
              {key}
            </Table.ColumnHeaderCell>
          ))}
          <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {props.values?.map((row, indexRow) => (
          <Table.Row key={`Row.${indexRow}`}>
            {Object.entries(row).map(([k, v], indexCol) => (
              <Table.Cell key={`Row.${indexRow}-Col.${indexCol}`}>
                <TextField.Input
                  value={v}
                  onChange={(event) =>
                    props.onKeyValueChange(indexRow, k, event.target.value)
                  }
                />
              </Table.Cell>
            ))}
            <Table.Cell>
              <Button
                onClick={() => {
                  props.removeKeyValue(indexRow);
                }}
              >
                <MinusIcon />
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

/**
 * 树形结构的配置选项
 * @param schema 节点结构
 * @param masterKeyTree 父树路径
 */
export function OptionNode({
  schema,
  masterKeyTree = [],
}: {
  schema: ISettingSchema;
  masterKeyTree?: string[];
}) {
  const {
    settings,
    getSettingItem,
    updateSettingItem,
    addEmptyValue,
    addEmptyKeyValue,
    updateKeyValue,
    removeKeyValue,
  } = useInstallStore();

  /* 获取当前节点的完整路径 */
  function getKeyTree() {
    return [...masterKeyTree, schema.key];
  }

  let headerArea, childrenArea;
  switch (schema.type) {
    case 'switch':
      headerArea = (
        <SwitchItem
          schema={schema}
          value={getSettingItem(getKeyTree()) as boolean}
          onCheckedChange={(e) => updateSettingItem(getKeyTree(), e)}
        />
      );
      break;
    case 'input':
      headerArea = (
        <InputItem
          schema={schema}
          value={getSettingItem(getKeyTree()) as string}
          onChange={(e) => updateSettingItem(getKeyTree(), e.target.value)}
        />
      );
      break;
    case 'select':
      headerArea = (
        <SelectItem
          schema={schema}
          value={getSettingItem(getKeyTree()) as string}
          onValueChange={(value) => updateSettingItem(getKeyTree(), value)}
        />
      );
      break;
    case 'list':
      headerArea = (
        <ListInputHeaderArea
          schema={schema}
          addValue={() => addEmptyValue(masterKeyTree)}
        />
      );
      childrenArea = <ListInputChildrenArea schema={schema} />;
      break;
    case 'multi-input':
      headerArea = (
        <MultiInputHeaderArea
          schema={schema}
          addKeyValue={() => addEmptyKeyValue(getKeyTree(), schema.keys)}
        />
      );
      childrenArea = (
        <MultiInputChildrenArea
          values={getSettingItem(getKeyTree()) as { [key: string]: string }[]}
          schema={schema}
          onKeyValueChange={(index, key, value) =>
            updateKeyValue(getKeyTree(), index, key, value)
          }
          removeKeyValue={(index) => removeKeyValue(getKeyTree(), index)}
        />
      );
      break;
    case undefined: // items
      if (schema.items) {
        childrenArea = schema.items.map((item) => (
          <OptionNode
            schema={item}
            key={[...getKeyTree(), item.key].join('.')}
            masterKeyTree={getKeyTree()}
          />
        ));
      }
    default:
      break;
  }

  return (
    <div
      className={
        masterKeyTree
          ? clsx(styles['option-list-item-nested'], styles['option-list-item'])
          : styles['option-list-item']
      }
    >
      {/* Main Area, Header and Input Area */}
      <div className={styles['item-main-area']}>
        <div className={styles['item-info']}>
          <div className={styles['label']}>{schema.label}</div>
          <div className={styles['description']}>{schema.description}</div>
        </div>
        <div className={styles['item-value']}>{!!headerArea && headerArea}</div>
      </div>
      {/* Children item including group, list, multi-input */}
      <div className={styles['item-additional-area']}>
        {!!childrenArea && childrenArea}
      </div>
    </div>
  );
}
