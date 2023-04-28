"use client";

import React from "react";
import { Page } from "@geist-ui/core";
import Menu from "@/components/layout/menu/menu";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Page>
      <Page.Header>
        <Menu />
      </Page.Header>
      <Page.Content>{children}</Page.Content>
      <Page.Footer></Page.Footer>
    </Page>
  );
}
