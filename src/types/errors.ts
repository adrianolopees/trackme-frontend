export class ApiError extends Error {
  public status?: number;
  public apiData?: any;

  constructor(message: string, status?: number, apiData?: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.apiData = apiData;
  }
}
