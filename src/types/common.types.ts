export interface IMessage {
  message: string;
}

export interface ICommonResponse<T> extends IMessage {
  data: T;
}

export interface IError extends Error {
  status: number;
}
