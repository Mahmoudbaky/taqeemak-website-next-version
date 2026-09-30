export class ApiClientError extends Error {
  status?: number;
  data?: unknown;

  constructor(message: string, status?: number, data?: unknown) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.data = data;
  }
}

export const isUnauthorized = (error: unknown) =>
  error instanceof ApiClientError && error.status === 401;
