export type ApiResult<T> = {
  ok?: boolean;
  data: T;
  message: string;
  status?: number;
};

export type ApiResponse<T> = Promise<ApiResult<T>>;

export function createApiResult<T>({ ok = true, data, message, status = 200 }: ApiResult<T>): ApiResult<T> {
  return { ok, data, message, status };
}
