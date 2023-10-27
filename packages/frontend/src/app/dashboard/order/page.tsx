"use client";

import useSWR from "swr";
import { useStore } from "@/store";

export default function OrderPage() {
  const { fetcher } = useStore();
  const { data } = useSWR("/order", (url) =>
    fetcher(url).then((res) => res.json()),
  );
}
