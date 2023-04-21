import { useEffect } from "react";
import { useSettingStore } from "@/store";

export function useSwitchTheme() {
  const config = useSettingStore((state) => state.config);

  useEffect(() => {
    document.body.classList.remove("light");
    document.body.classList.remove("dark");
    if (config.theme === "dark") {
      document.body.classList.add("dark");
    } else if (config.theme === "light") {
      document.body.classList.add("light");
    }
  }, [config.theme]);
}
