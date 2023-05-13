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
      <Grid xs={4}>
        <Card shadow width="100%" height="100px">
          <div style={{ fontSize: "16px" }}>当前用户总数:</div>
          <div style={{ fontWeight: "normal", fontSize: "36px" }}>
            {data?.total_users}
          </div>
        </Card>
      </Grid>
      <Grid xs={4}>
        <Card shadow width="100%" height="100px">
          <div style={{ fontSize: "16px" }}>Free :</div>
          <div style={{ fontWeight: "normal", fontSize: "36px" }}>
            {data!.plan_status?.free.toString()}
          </div>
        </Card>
      </Grid>
      <Grid xs={4}>
        <Card shadow width="100%" height="100px">
          <div style={{ fontSize: "16px" }}>Pro :</div>
          <div style={{ fontWeight: "normal", fontSize: "36px" }}>
            {data!.plan_status?.pro.toString()}
          </div>
        </Card>
      </Grid>
      <Grid xs={4}>
        <Card shadow width="100%" height="100px">
          <div style={{ fontSize: "16px" }}>Premium :</div>
          <div style={{ fontWeight: "normal", fontSize: "36px" }}>
            {data!.plan_status?.premium.toString()}
          </div>
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
