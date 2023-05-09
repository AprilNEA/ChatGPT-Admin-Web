"use client";

import React from "react";
import useSWR from "swr";
import { Card, Description, Grid, Input, Spacer } from "@geist-ui/core";
import { PlanStatus, UserAnalysisTable } from "@/components/charts";
import fetcher from "@/utils/fetcher";

import { AnalysisResponse } from "@/app/api/typing";
import Loading from "@/app/loading";

export default function Page() {
  const { data, isLoading } = useSWR<AnalysisResponse>(
    "/api/analyze/monthly",
    (url) => fetcher(url).then((res) => res.json().then((res) => res.data))
  );

  if (isLoading) return <Loading />;

  return (
    <Grid.Container gap={2} justify="center">
      <Grid xs={12}>
        <Card shadow width="100%" height="100px">
          <Description
            title="ChatGPT-Admin-Web"
            content="带有用户管理的ChatGPT-WebUI"
          />
          <Spacer />
          <span>当前用户总数: {data?.total_users}</span>
        </Card>
      </Grid>
      <Grid xs={12} direction="row">
        <Card shadow width="100%" height="100px">
          <Grid.Container
            direction="row"
            gap={1}
            alignItems="center"
            justify="center"
          >
            <Grid xs={8}>
              <Input
                disabled
                label="Free"
                placeholder={data!.plan_status?.free.toString()}
              />
            </Grid>
            <Grid xs={8}>
              <Input
                disabled
                label="Pro"
                placeholder={data!.plan_status?.pro.toString()}
              />
            </Grid>
            <Grid xs={8}>
              <Input
                disabled
                label="Premium"
                placeholder={data!.plan_status?.premium.toString()}
              />
            </Grid>
          </Grid.Container>
        </Card>
      </Grid>
      <Grid xs={12}>
        <Card shadow width="100%" height="350px">
          <UserAnalysisTable />
        </Card>
      </Grid>
      <Grid xs={12}>
        <Card shadow width="100%" height="350px">
          <PlanStatus
            freeCount={data!.plan_status?.free}
            proCount={data!.plan_status?.pro}
            premiumCount={data!.plan_status?.premium}
          />
        </Card>
      </Grid>
    </Grid.Container>
  );
}
