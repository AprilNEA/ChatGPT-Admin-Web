"use client";

import React, { useState } from "react";

import "@/styles/login.css";
import { useUserStore } from "@/store";
import { useRouter } from "next/navigation";

import { Button, Card, Text, Input, Spacer, useToasts } from "@geist-ui/core";

const loginStyle: React.CSSProperties = {
  backgroundColor: "#ffffff",
  border: "1px solid #cccccc",
  borderRadius: "8px",
  width: "300px", // 您可以根据需要调整宽度
  padding: "20px", // 您可以根据需要调整内边距
  margin: "0 auto", // 水平居中
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

interface formType {
  email: string;
  password: string;
  remember: boolean;
}

export default function LoginPage() {
  const router = useRouter();
  const { setToast } = useToasts();

  const updateSessionToken = useUserStore((store) => store.updateSessionToken);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) return;

    const data = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (data.ok) {
      const { sessionToken } = await data.json();
      updateSessionToken(sessionToken);
      setToast({ text: "登录成功" });
      router.push("/");
    }
  };

  return (
    <Card shadow>
      <Text h4 my={0}>
        Dashboard
      </Text>
      <Spacer h={1} />
      <Input
        placeholder="邮箱"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        width="100%"
      />
      <Spacer h={1} />
      <Input.Password
        placeholder="密码"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        width="100%"
      />
      <Spacer h={1} />
      <Button auto type="secondary" onClick={handleLogin}>
        登录
      </Button>
    </Card>
  );
}
