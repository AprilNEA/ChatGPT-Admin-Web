"use client";

import { FC } from "react";
import { Table as T } from "@geist-ui/core";

interface TableProps {
  tableData: any;
  tableColumn: TableColumnType[];
}

export interface TableColumnType {
  prop: string;
  label: string;
  render?: any;
}

export const Table: FC<TableProps> = (props) => {
  return (
    <T data={props.tableData}>
      {props.tableColumn.map((column) => (
        <T.Column
          prop={column.prop}
          label={column.label}
          render={column?.render}
        />
      ))}
    </T>
  );
};
