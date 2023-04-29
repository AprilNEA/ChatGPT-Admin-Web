"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";

import NextLink from "next/link";
import { Tabs, useTheme } from "@geist-ui/core";
import { addColorAlpha } from "@/utils/color";
import { useRouter } from "next/navigation";

const Menu: React.FC<unknown> = () => {
  const theme = useTheme();
  const router = useRouter();

  const allSides = [
    {
      name: "用户",
      link: "/user",
    },
    {
      name: "订单",
      link: "/order",
    },
  ];

  const handleTabChange = (val: string) => {
    router.push(val);
  };

  return (
    <>
      <div className="menu-wrapper">
        <nav className="menu">
          <div className="content">
            <div className="logo">
              <NextLink href="/">
                {/*<Image*/}
                {/*  src="/images/logo.png"*/}
                {/*  width="20px"*/}
                {/*  height="20px"*/}
                {/*  mr={0.5}*/}
                {/*  draggable={false}*/}
                {/*  title="Logo"*/}
                {/*/>*/}
                Dashboard
              </NextLink>
            </div>

            <div className="tabs">
              <Tabs
                // value={currentUrlTabValue}
                leftSpace={0}
                activeClassName="current"
                align="center"
                hideDivider
                hideBorder
                onChange={handleTabChange}
              >
                <Tabs.Item font="14px" label={"主页"} value="" />
                {allSides.map((tab, index) => (
                  <Tabs.Item
                    font="14px"
                    label={tab.name}
                    value={tab.link}
                    key={`${tab.name}-${index}`}
                  />
                ))}
              </Tabs>
            </div>

            <div className="controls">{/*<Controls />*/}</div>
          </div>
        </nav>
      </div>
      {/*<MenuMobile expanded={expanded} />*/}

      <style jsx>{`
        .menu-wrapper {
          height: 64px;
        }

        .menu {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;

          height: 64px;
          //width: 100%;
          backdrop-filter: saturate(180%) blur(5px);
          background-color: ${addColorAlpha(theme.palette.background, 0.8)};
          box-shadow: ${theme.type === "dark"
            ? "0 0 0 1px #333"
            : "0 0 15px 0 rgba(0, 0, 0, 0.1)"};
          z-index: 999;
        }

        nav .content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1000px;
          height: 100%;
          margin: 0 auto;
          user-select: none;
          padding: 0 ${theme.layout.gap};
        }

        .logo {
          flex: 1 1;
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }

        .logo a {
          display: inline-flex;
          flex-direction: row;
          align-items: center;
          font-size: 1.125rem;
          font-weight: 500;
          color: inherit;
          height: 28px;
        }

        .logo :global(.image) {
          border: 1px solid ${theme.palette.border};
          border-radius: 2rem;
        }

        .tabs {
          flex: 1 1;
          padding: 0 ${theme.layout.gap};
        }

        .tabs :global(.content) {
          display: none;
        }

        @media only screen and (max-width: ${theme.breakpoints.xs.max}) {
          .tabs {
            display: none;
          }
        }

        .controls {
          flex: 1 1;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }

        .controls :global(.menu-toggle) {
          display: flex;
          align-items: center;
          min-width: 40px;
          height: 40px;
          padding: 0;
        }
      `}</style>
    </>
  );
};

export default Menu;
