export class SummaryInfo {
  delete?: number;
  error?: number;
  finished?: number;
  init?: number;
  other?: number;
  payment_success?: number;
  pending?: number;
  progress?: number;
  refund?: number;
  rejected?: number;
  timeout?: number;
  revenue?: number;
}

export class BasedApiResponseModel<T extends Object> {
  passedDelete: any;
  constructor(
    public code?: number,
    public data?: T,
    public message?: string,
    public extras?: {
      extras?: Error;
    },
    public pagination?: Paging,
    public summary?: SummaryInfo,
  ) {}
}

export class BasedListApiResponseModel<T> {
  data?: Array<T>;
  isSaymee?: boolean;
  pagination?: Paging;
  pagingnation?: Paging;
  summary?: SummaryInfo;
  error?: Error;
}

export interface Paging {
  limit?: number;
  page?: number;
  total?: number;
  success?: number;
  error?: number;
  other?: number;
  revenue?: number;
  deposit?: string;
  withdrawal?: string;
}

export class Error {
  code?: number;
  message?: string;
}

export class Report {
  day?: number;
  week?: number;
  month?: number;
  lastMonth?: number;
}

export class Result {
  type?: "success" | "error";
  message?: string;
}
