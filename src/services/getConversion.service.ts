import { NextFunction, Request, Response } from 'express';
import momentTimezone from 'moment-timezone';
import { HttpClientUtil } from '../../expressium/src/index.js';
import { IResponse, IResponseData } from '../interfaces/index.js';

export const getConversion = async (
  req: Request, 
  _res: Response,
  _next: NextFunction,
  timestamp: string
): Promise<IResponse.IResponse<IResponseData.IGetConversionResponseData | IResponseData.IResponseData>> => {  
  try {
    const httpClientInstance = new HttpClientUtil.HttpClient();
    const response = await httpClientInstance.get<unknown>(`http://${ req.query.ip }${ process.env.BASE_PATH as string }`);

    return {
      status: 200,
      data: {
        timestamp,
        status: true,
        statusCode: 200,
        method: req.method,
        path: req.originalUrl || req.url,
        query: req.query,
        headers: req.headers,
        body: req.body,
        data: response.data
      }
    };
  } catch (error: unknown) {
    console.log(`Error | Timestamp: ${ momentTimezone().utc().format('DD-MM-YYYY HH:mm:ss') } | Path: src/services/getConversion.service.ts | Location: getConversion | Error: ${ error instanceof Error ? error.message : String(error) }`);
    
    return {
      status: 500,
      data: {
        timestamp,
        status: false,
        statusCode: 500,
        method: req.method,
        path: req.originalUrl || req.url,
        query: req.query,
        headers: req.headers,
        body: req.body,
        message: 'Something went wrong.',
        suggestion: 'Please try again later. If this issue persists, contact our support team for assistance.'
      }
    };
  }
}
