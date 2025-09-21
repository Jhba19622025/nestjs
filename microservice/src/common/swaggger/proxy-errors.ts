// ======================================================================
// FILE: src/common/swagger/proxy-errors.ts
// ======================================================================
import {
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import {
  errBadGatewayEx,
  errBadRequestValidationEx,
  errConflictEx,
  errForbiddenEx,
  errInternalEx,
  errNotFoundEx,
  errUnauthorizedEx,
  errUnprocessableEx,
} from './examples';
import { ErrorResponseDto } from '../dto/error-response-dto/error-response-dto';
 

export function ApiProxyDefaultErrors() {
  return function (target: any, key?: string, descriptor?: PropertyDescriptor) {
    ApiBadRequestResponse({ type: ErrorResponseDto, description: 'Bad Request', examples: { validation: errBadRequestValidationEx() } })(target, key!, descriptor!);
    ApiUnauthorizedResponse({ type: ErrorResponseDto, description: 'Unauthorized', examples: { unauthorized: errUnauthorizedEx() } })(target, key!, descriptor!);
    ApiForbiddenResponse({ type: ErrorResponseDto, description: 'Forbidden', examples: { forbidden: errForbiddenEx() } })(target, key!, descriptor!);
    ApiNotFoundResponse({ type: ErrorResponseDto, description: 'Not Found', examples: { notFound: errNotFoundEx() } })(target, key!, descriptor!);
    ApiConflictResponse({ type: ErrorResponseDto, description: 'Conflict', examples: { conflict: errConflictEx() } })(target, key!, descriptor!);
    ApiUnprocessableEntityResponse({ type: ErrorResponseDto, description: 'Unprocessable Entity', examples: { unprocessable: errUnprocessableEx() } })(target, key!, descriptor!);
    ApiBadGatewayResponse({ type: ErrorResponseDto, description: 'Upstream/Proxy Error', examples: { upstream: errBadGatewayEx() } })(target, key!, descriptor!);
    ApiInternalServerErrorResponse({ type: ErrorResponseDto, description: 'Internal Server Error', examples: { internal: errInternalEx() } })(target, key!, descriptor!);
  };
}