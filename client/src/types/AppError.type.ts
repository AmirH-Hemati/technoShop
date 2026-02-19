import type { AxiosError } from "axios";

export type AppError = AxiosError<{ message?: string }>;
