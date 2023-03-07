export interface IMessage {
  message: string;
}

export interface IError extends Error {
  status: number;
}
