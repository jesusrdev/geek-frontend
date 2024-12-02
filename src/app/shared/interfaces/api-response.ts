export interface ApiResponse<T> {
  statusCode: number,
  isSuccessfull: boolean,
  message: string,
  result: T,
}
