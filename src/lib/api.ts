import type { PostgrestError } from "@supabase/supabase-js";

export type ApiSuccess<T> = {
  ok: true;
  data: T;
};

export type ApiFailure<E> = {
  ok: false;
  error: E;
};

export type ApiResult<T, E = PostgrestError> = ApiSuccess<T> | ApiFailure<E>;

export type ApiResponse<T, E = PostgrestError> = Promise<ApiResult<T, E>>;
