"use client";
import { AppStore, makeStore } from "@/lib/redux/store";
import { setupListeners } from "@reduxjs/toolkit/query";
import type { ReactNode } from "react";
import React from "react";
import { Provider } from "react-redux";

interface Props {
  readonly children: ReactNode;
}

export const StoreProvider = ({ children }: Props) => {
  const storeRef = React.useRef<AppStore | null>(null);

  if (storeRef.current == null) {
    storeRef.current = makeStore();
  }

  React.useEffect(() => {
    if (storeRef.current != null) {
      // configure listeners using the provided defaults
      // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
      const unsubscribe = setupListeners(storeRef.current.dispatch);
      return unsubscribe;
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
};
