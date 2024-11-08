"use client";

import CustomTable from "@/components/features/table/CustomTable";
import { getNextPage } from "@/src/actions/app/app-actions";
import ApiServiceType from "@/types/apiServiceType";
import { DefaultAppRowTypeInterface, ExtendedRowType } from "@/types/app_types";
import { CustomInputFieldInterface } from "@/types/fieldsprops";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface AppProps<T extends ExtendedRowType<DefaultAppRowTypeInterface>> {
  data?: ApiServiceType.ListResponse<T> | null;
  serviceName: string;
  form: CustomInputFieldInterface[];
  columns: ColumnDef<T, any>[];
}

export default function AppPageTable<
  T extends ExtendedRowType<DefaultAppRowTypeInterface>
>({ data, form, columns, serviceName }: Readonly<AppProps<T>>) {
  const [dataRow, setDataRow] = useState<T[]>(data?.data ?? []);
  const [nextPage, setNextPage] = useState(data?.pagination.next_page);
  const [tableColumns, setColumns] = useState(columns);
  const [tableForm, setForm] = useState(form);

  useEffect(() => {
    const fetchNextPage = async () => {
      if (nextPage) {
        try {
          const rep = await getNextPage<T>(nextPage);
          setNextPage(rep.pagination.next_page);
          setDataRow((prev) => [...prev, ...rep.data]);
        } catch (error) {
          toast.error("erreur");
        }
      }
    };
    fetchNextPage();
  }, [dataRow, nextPage]);

  useEffect(() => {
    setDataRow(data?.data ?? []);
  }, [data?.data]);

  return (
    <CustomTable<any, any>
      serviceName={serviceName}
      setData={setDataRow}
      form={tableForm}
      columns={columns}
      data={dataRow}
    />
  );
}
