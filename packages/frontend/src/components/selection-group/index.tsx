import styles from "@/styles/module/selection-group.module.scss";
import clsx from 'clsx';
import React from "react";

export function SelectionGroup(props: {
    shadow?: boolean;
    className?: string;
    currentSelection?: string | number;
    children: React.ReactNode;
}) {
    return <div className={clsx(styles['sel-group'], props.className)}>{props.children}</div>;
}

export function SelectionGroupButton(props: {
    onClick?: () => void;
    icon?: JSX.Element;
    content: string | React.ReactNode;
    className?: string;
    disabled?: boolean;
}){
    return(
        <button className={clsx(styles['sel-group-button'], props.className)} disabled={props.disabled} onClick={props.onClick}>{props.content}</button>
    )
}