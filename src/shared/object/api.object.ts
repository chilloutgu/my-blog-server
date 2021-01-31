import { HttpStatus } from "@nestjs/common";

export class ApiResponse<T = undefined> {
  private httpStatus: HttpStatus;
  private message: ResponseMessage;
  private data?: T;

  constructor(httpStatus: HttpStatus, message: ResponseMessage) {
    this.httpStatus = httpStatus;
    this.message = message;
  }

  public setData(data: T): ApiResponse<T> {
    this.data = data;
    return this;
  }
}

export enum ResponseMessage {
  SUCCESS = 'success',
  FAILURE = 'failure'
}
