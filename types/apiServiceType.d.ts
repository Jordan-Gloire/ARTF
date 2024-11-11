interface LinkMeta {
  url: string | null;
  label: string;
  active: boolean;
}

declare namespace ApiServiceType {
  type BodyClassic = Record<string, any>;
  type AppHeaders = Record<string, string>;
  interface ListResponse<
    T extends ExtendedRowType<DefaultAppRowTypeInterface>
  > {
    data: T[];
    pagination: {
      current_page: number;
      next_page?: string;
      previous_page?: string;
      first_page: string;
      last_page: string;
      max_per_page: number;
      total_items: number;
      total_pages: number;
    };
    code: string;
  }
}

export default ApiServiceType;


// type GenericRowType<T extends DefaultAppRowTypeInterface> = T;
