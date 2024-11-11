"use client";
import { useAppStore } from "@/src/stores/app_store";
import { LayoutTitle } from "./Layout";
import { useShallow } from "zustand/react/shallow";

export default function CustomTitle() {
  const myTitle = useAppStore(useShallow((state) => state.title));
  return <LayoutTitle>{myTitle}</LayoutTitle>;
}
