'use client';

import { Switch, TextField, Select, Button, Table } from "@radix-ui/themes";
import { ISettingSchema } from "shared";
import styles from "@/styles/module/radix-ui-lib.module.scss";
import { PlusIcon, MinusIcon } from '@radix-ui/react-icons';
import useInstallStore from "@/store/install";
import { useState } from "react";

export function OptionListRoot(props: { children: JSX.Element | JSX.Element[] }){
    return(
        <div className={styles['option-list-root']}>{props.children}</div>
    )
}

export function OptionListItem(props: { schema: ISettingSchema, masterKeyTree?: string[]}){
    const installStore = useInstallStore();
    installStore.addItem(props.schema.key, null);
    const [tableItems, setTableItems] = useState<JSX.Element[]>([]);

    function getKeyTree(){
        return [...props.masterKeyTree ?? props.schema.key];
    }
 
    function addSingleItem(keys?: string[]){
        if(!keys){
            const item = <Table.Row>
            <Table.Cell>
                <TextField.Input key={null} id={JSON.stringify(tableItems.length - 1)} onChange={(event) => {
                    installStore.updateItemRamda([...getKeyTree(), parseInt(event.currentTarget.id)], event.target.value);
                }}></TextField.Input>
            </Table.Cell>
            <Table.Cell>
                <Button id={JSON.stringify(tableItems.length - 1)} onClick={(event) => {
                    let tableList = tableItems;
                    tableList.splice(parseInt(event.currentTarget.id), 1);
                    setTableItems(tableList);
                }}><MinusIcon /></Button>
            </Table.Cell>
            </Table.Row>
            setTableItems([...tableItems, item]);
            return;
        }

        const item = <Table.Row>
            {keys.map((key: string) => {
                return (
                    <Table.Cell key={null}>
                        <TextField.Input key={key} id={JSON.stringify(tableItems.length - 1)} onChange={(event) => {
                            installStore.updateItemRamda([...getKeyTree(), parseInt(event.currentTarget.id), key], event.target.value);
                        }}></TextField.Input>
                    </Table.Cell>
                )
            })}
            <Table.Cell>
                <Button id={JSON.stringify(tableItems.length - 1)} onClick={(event) => {
                    let tableList = tableItems;
                    tableList.splice(parseInt(event.currentTarget.id), 1);
                    setTableItems(tableList);
                }}><MinusIcon /></Button>
            </Table.Cell>
        </Table.Row>
        setTableItems([...tableItems, item]);
    }

    return(
        <div className={styles['option-list-item']}>
            <div className={styles['item-info']}>
                <div className={styles['label']}>{props.schema.label}</div>
                <div className={styles['description']}>{props.schema.description}</div>
            </div>
            <div className={styles['item-value']}>
                {
                    props.schema.type === 'switch' ? <Switch key={getKeyTree().join('.')} onCheckedChange={(boolean) => {
                        installStore.updateItemRamda(getKeyTree(), boolean);
                    }}></Switch> :
                    props.schema.type === 'input' ? <TextField.Input key={getKeyTree().join('.')} onChange={(event) => {
                        installStore.updateItemRamda(getKeyTree(), event.target.value);
                    }}></TextField.Input> :
                    props.schema.type === 'select' ? 
                        <Select.Root key={getKeyTree().join('.')} onValueChange={(value) => {
                            installStore.updateItemRamda(getKeyTree(), value);
                        }}>
                            <Select.Trigger />
                            <Select.Content position="popper">
                                {props.schema.selectOptions.map((option) => (
                                    <Select.Item key={option} value={option}>{option}</Select.Item>
                                )
                                )}
                            </Select.Content>
                        </Select.Root> :
                    props.schema.type === 'multi-input' || props.schema.type === 'list' ?
                        <Button onClick={() => {
                            addSingleItem(props.schema.type === 'multi-input' ? props.schema.keys : undefined);
                        }}><PlusIcon /></Button> : ''
                }
            </div>
            <div className={styles['item-additional-area']}>
                {
                    props.schema.items ? props.schema.items.map((item) => (<OptionListItem schema={item} key={[...getKeyTree(), item.key].join('.')} masterKeyTree={[...getKeyTree(), item.key]} />)) :
                    props.schema.type === 'multi-input' || props.schema.type === 'list' ?
                        <Table.Root>
                            {
                                props.schema.type === 'multi-input' ?
                                    <Table.Header>
                                        <Table.Row>
                                            {props.schema.keys.map((key) => (<Table.ColumnHeaderCell key={key}>{key}</Table.ColumnHeaderCell>))}
                                            <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    : ''
                            }
                            <Table.Body>
                                {tableItems}
                            </Table.Body>
                        </Table.Root>
                    : ''
                }
            </div>
        </div>
    )
}