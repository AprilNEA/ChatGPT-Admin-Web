"use client";

import { useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import {
  Button,
  Card,
  Description,
  Drawer,
  Grid,
  Input,
  Pagination,
  Select,
  Spacer,
} from "@geist-ui/core";

import fetcher from "@/utils/fetcher";

import Loading from "@/app/loading";
import { Table } from "@/components/table";
import { planColumns } from "@/app/setting/item";
import { data } from "@/components/charts";

const emptyData = {
  limits: {
    "gpt-3.5-turbo": {
      window: "3h",
      limit: 0,
    },
    "gpt-4": {
      window: "3h",
      limit: 0,
    },
  },
  prices: {
    monthly: 0,
    quarterly: 0,
    yearly: 0,
  },
  plan: "",
};
export default function Page() {
  const { mutate } = useSWRConfig();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [targetValue, setTargetValue] = useState(emptyData);

  const {
    data: planData,
    isLoading: planDataLoading,
    mutate: planMutate,
  } = useSWR("/api/plan", (url) =>
    fetcher(url).then((res) => res.json().then((res) => res.data))
  );

  if (planDataLoading) return <Loading />;

  async function newData() {
    setTargetValue(emptyData);
    setDrawerOpen(true);
  }

  const handleChangeTop = (e, field) => {
    const { value } = e.target;
    setTargetValue((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleChange = (e, field, subfield, row) => {
    const { value } = e.target;
    setTargetValue((prevValues) => ({
      ...prevValues,
      [field]: row
        ? {
            ...prevValues[field],
            [row]: {
              ...prevValues[field][row],
              [subfield]: value,
            },
          }
        : {
            ...prevValues[field],
            [subfield]: value,
          },
    }));
  };

  const handlerSubmit = async () => {
    await fetcher("/api/plan/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(targetValue),
    });
  };

  return (
    <>
      <Grid.Container gap={2} justify="center">
        <Grid xs={24}>
          <Card width="100%">
            <span>可用操作：</span>
            <Button auto onClick={newData}>
              新建数据
            </Button>
          </Card>
        </Grid>
        <Grid xs={24}>
          <Table
            tableColumn={[
              ...planColumns,
              {
                prop: "p",
                label: "操作",
                render: (value: T[keyof T], rowData: T, rowIndex: number) => {
                  return (
                    <Button
                      auto
                      onClick={() => {
                        setDrawerOpen(true);
                        setTargetValue(rowData);
                      }}
                      scale={1 / 2}
                      mr="10px"
                    >
                      更新
                    </Button>
                  );
                },
              },
            ]}
            tableData={planData?.data}
          />
        </Grid>
        <Grid xs={12}>
          {/*<Pagination page={currentPage} initialPage={1} onChange={pageChange} />*/}
        </Grid>
      </Grid.Container>
      <div>
        <Drawer
          visible={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          placement="bottom"
        >
          <Drawer.Title>
            <Input
              label="计划名称"
              placeholder="请输入计划名称"
              value={targetValue.plan ?? ""}
              onChange={(e) => handleChangeTop(e, "plan")}
            />
          </Drawer.Title>
          <Drawer.Content>
            <Grid.Container gap={2} justify="center">
              <Grid xs={24}>
                <span> 价格：</span>
                <Input
                  label="每月"
                  value={targetValue.prices.monthly}
                  onChange={(e) => handleChange(e, "prices", "monthly")}
                />
                <Spacer w={1} />
                <Input
                  label="每季"
                  value={targetValue.prices.quarterly}
                  onChange={(e) => handleChange(e, "prices", "quarterly")}
                />
                <Spacer w={1} />
                <Input
                  label="每年"
                  value={targetValue.prices.yearly}
                  onChange={(e) => handleChange(e, "prices", "yearly")}
                />
              </Grid>

              <Grid xs={24}>
                <span> 滑动窗口：</span>
                {Object.keys(targetValue.limits).map((row) => {
                  return (
                    <>
                      <Input
                        label={row}
                        value={targetValue.limits?.[row]?.window}
                        onChange={(e) =>
                          handleChange(e, "limits", "window", row)
                        }
                      />
                      <Spacer w={1} />
                    </>
                  );
                })}
              </Grid>
              <Grid xs={24}>
                <span> 次数限制：</span>
                {Object.keys(targetValue.limits).map((row) => {
                  return (
                    <>
                      <Input
                        label={row}
                        value={targetValue.limits?.[row]?.limit}
                        onChange={(e) =>
                          handleChange(e, "limits", "limit", row)
                        }
                      />
                      <Spacer w={1} />
                    </>
                  );
                })}
              </Grid>
              <Grid xs={24}>
                <Button auto type="secondary" onClick={handlerSubmit}>
                  更新
                </Button>
              </Grid>
            </Grid.Container>
          </Drawer.Content>
        </Drawer>
      </div>
    </>
  );
}
