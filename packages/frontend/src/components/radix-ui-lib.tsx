'use client';

import { Switch, TextField, Select, Button, Table } from "@radix-ui/themes";
import { ISettingSchema } from "shared";
import styles from "@/styles/module/radix-ui-lib.module.scss";
import { PlusIcon, MinusIcon } from '@radix-ui/react-icons';
import useInstallStore from "@/store/install";

export function OptionListRoot(props: { children: JSX.Element | JSX.Element[] }){
    return(
        <div className={styles['option-list-root']}>{props.children}</div>
    )
}

export function OptionListItem(props: { schema: ISettingSchema, masterKey?: string}){
    const installStore = useInstallStore();

    return(
        <div className={styles['option-list-item']}>
            <div className={styles['item-info']}>
                <div className={styles['label']}>{props.schema.label}</div>
                <div className={styles['description']}>{props.schema.description}</div>
            </div>
            <div className={styles['item-value']}>
                {
                    props.schema.type === 'switch' ? <Switch id={props.schema.key}></Switch> :
                    props.schema.type === 'input' ? <TextField.Input id={props.schema.key}></TextField.Input> :
                    props.schema.type === 'select' ? 
                        <Select.Root>
                            <Select.Trigger />
                            <Select.Content position="popper">
                                {props.schema.selectOptions.map((option) => (
                                    <Select.Item key={option} value={option}>{option}</Select.Item>
                                )
                                )}
                            </Select.Content>
                        </Select.Root> :
                    props.schema.type === 'multi-input' || props.schema.type === 'list' ?
                        <Button><PlusIcon /></Button> : ''
                }
            </div>
            <div className={styles['item-additional-area']}>
                {
                    props.schema.items ? props.schema.items.map((item) => (<OptionListItem schema={item} key={props.schema.key} masterKey={props.schema.key} />)) :
                    props.schema.type === 'multi-input' || props.schema.type === 'list' ?
                        <Table.Root>
                            {
                                props.schema.type === 'multi-input' ?
                                    <Table.Header>
                                        <Table.Row>
                                            {props.schema.keys.map((key) => (<Table.ColumnHeaderCell key={key}>{key}</Table.ColumnHeaderCell>))}
                                        </Table.Row>
                                    </Table.Header>
                                    : ''
                            }
                            <Table.Body>
                            </Table.Body>
                        </Table.Root>
                    : ''
                }
            </div>
        </div>
    )
}