export interface ApiResponse<T> {
  statusCode: number,
  isSuccessful: boolean,
  message: string,
  result: T,
}
