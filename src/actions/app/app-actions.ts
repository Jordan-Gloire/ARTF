"use server";

import AppService from "@/src/services/app.service";
import { DefaultAppRowTypeInterface, ExtendedRowType } from "@/types/app_types";

export async function getNextPage<
  T extends ExtendedRowType<DefaultAppRowTypeInterface>
>(url: string) {
  const appService = new AppService();
  return await appService.getNextPage<T>(url);
}

export async function sendRequestServer({
  url,
  method,
  body,
  headers,
  cache = "no-store",
}: {
  url: string;
  method: string;
  body?: string;
  headers?: Headers;
  cache?: RequestCache;
}) {
  console.log({ url });

  if (method == "GET") {
    return await fetch(url, {
      method,
      headers,
      cache,
    });
  }

  return await fetch(url, {
    method,
    body,
    headers,
    cache,
  });
}
