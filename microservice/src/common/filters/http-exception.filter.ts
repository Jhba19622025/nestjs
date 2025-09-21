import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const isHttp = exception instanceof HttpException;
    const status = isHttp ? (exception as HttpException).getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const payload = isHttp ? (exception as HttpException).getResponse() : null;

    const base = {
      statusCode: status,
      error: HttpStatus[status] ?? 'Error',
      message: this.pickMessage(payload, exception),
      timestamp: new Date().toISOString(),
      path: req?.originalUrl ?? req?.url ?? '',
    };

    if (status === HttpStatus.BAD_REQUEST && payload && typeof payload === 'object') {
      const p: any = payload;
      if (Array.isArray(p.message)) {
        res.status(status).json(base);
        return;
      }
    }
    res.status(status).json(base);
  }

  private pickMessage(payload: any, exception: unknown): string | string[] {
    if (payload && typeof payload === 'object' && 'message' in payload) {
      return (payload as any).message;
    }
    if (exception instanceof Error && exception.message) return exception.message;
    return 'Unexpected error';
  }
}