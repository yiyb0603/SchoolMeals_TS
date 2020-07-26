export interface Error {
  response: {
    data: {
      status: number;
      message: string;
    }
  }
};