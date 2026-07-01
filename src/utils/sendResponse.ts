import { Response } from "express";
import status from "http-status";

type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number
};

type TResponseData<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  total?: number,
  meta?: TMeta;
};

export const sendResponse = <T>(res: Response, data: TResponseData<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    status: status.OK,
    message: data.message,
    total: data.total,
    data: data.data,
    meta: data.meta,
  });
};
