"use client";

import useSWR from "swr";
import fetcher from "@/utils/fetcher";

import {
  Button,
  Card,
  Grid,
  Input,
  Spacer,
  Select,
  Pagination,
  useInput,
} from "@geist-ui/core";

import { Table } from "@/components/table";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";

import { userColumn, orderColumns } from "@/app/[area]/items";

type Area = "user" | "order";

export default function Page({
  params,
}: {
  params: {
    area: Area;
  };
}) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [cursor, setCursor] = useState<number>(0);
  const [count, setCount] = useState<number>(100);
  const [key, setKey] = useState<string>("");

  const { data, isLoading } = useSWR(
    `/api/${params.area}?cursor=${cursor}&count=${count}&key=${key}` as string,
    (url) => fetcher(url).then((res) => res.json())
  );

  const {
    state: searchUser,
    setState: setSearchUser,
    reset,
    bindings: bindSearchUser,
  } = useInput("");

  useEffect(() => {}, [searchUser]);

  let columns;
  switch (params.area) {
    case "user":
      columns = userColumn;
      break;
    case "order":
      columns = orderColumns;
      break;
    default:
      return <p>404</p>;
  }
  const pageChange = (page: number) => {
    const gap = page - currentPage;
    if (gap < 0) {
      setCurrentPage(0);
      setCount(Math.abs(gap) * 10);
    }
    // setCount();
  };

  const handleSearch = () => {
    setKey(searchUser);
  };

  if (isLoading) return <Loading />;

  return (
    <Grid.Container gap={2} justify="center">
      <Grid xs={12}>
        <Card>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Input label="用户名" placeholder="" {...bindSearchUser} />

            <Spacer w={5} />

            <Select placeholder="订阅计划">
              <Select.Option value="1">Free</Select.Option>
              <Select.Option value="2">Pro</Select.Option>
              <Select.Option value="3">Premium</Select.Option>
            </Select>
            <Spacer w={5} />

            <Button loading={isLoading} onClick={handleSearch}>
              搜索
            </Button>
          </div>
        </Card>
      </Grid>
      <Grid xs={24}>
        <Table tableColumn={columns} tableData={data?.data?.data} />
      </Grid>
      {/*<Grid xs={12}>*/}
      {/*  <Pagination page={currentPage} initialPage={1} onChange={pageChange} />*/}
      {/*</Grid>*/}
    </Grid.Container>
  );
}
