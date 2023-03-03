import { LoggerService } from '@nestjs/common';
import { BaseLogger } from 'tslog';
import { ILogObjMeta } from 'tslog/dist/types/interfaces';

import { CONTEXT_CLC, NEST_LOG_LEVELS } from './constants';
import { TLogCallback } from './ts/types/logger.types';

export class TsLogLogger<TLogObj = unknown> implements LoggerService {
  private context?: string;

  private logCallback?: TLogCallback<TLogObj>;

  constructor(
    private readonly logger: BaseLogger<TLogObj>,
    globalLogCallback?: TLogCallback<TLogObj>
  ) {
    this.logCallback = globalLogCallback;
  }

  public log(message: unknown, ...optionalParams: unknown[]): void {
    const { logLevelId, logLevelName } = NEST_LOG_LEVELS['log'];
    this.printLog(logLevelId, logLevelName, message, ...optionalParams);
  }

  public debug(message: unknown, ...optionalParams: unknown[]): void {
    const { logLevelId, logLevelName } = NEST_LOG_LEVELS['debug'];
    this.printLog(logLevelId, logLevelName, message, ...optionalParams);
  }

  public verbose(message: unknown, ...optionalParams: unknown[]): void {
    const { logLevelId, logLevelName } = NEST_LOG_LEVELS['verbose'];
    this.printLog(logLevelId, logLevelName, message, ...optionalParams);
  }

  public warn(message: unknown, ...optionalParams: unknown[]): void {
    const { logLevelId, logLevelName } = NEST_LOG_LEVELS['warn'];
    this.printLog(logLevelId, logLevelName, message, ...optionalParams);
  }

  public error(message: unknown, ...optionalParams: unknown[]): void {
    const { logLevelId, logLevelName } = NEST_LOG_LEVELS['error'];
    this.printLog(logLevelId, logLevelName, message, ...optionalParams);
  }

  public setContext(context: string): void {
    this.context = context;
  }

  public setLogCallback(logCallback: TLogCallback<TLogObj>): void {
    this.logCallback = logCallback;
  }

  public get tslogRef(): BaseLogger<TLogObj> {
    return this.logger;
  }

  public printLog(
    logLevelId: number,
    logLevelName: string,
    message: unknown,
    ...optionalParams: unknown[]
  ): void {
    const { context, messages } = this.getContextAndMessagesFromMeta(
      this.context && this.context.length > 0
        ? [message, ...optionalParams, this.context]
        : [message, ...optionalParams]
    );

    let logResult: (TLogObj & ILogObjMeta) | undefined;

    if (context.length > 0) {
      const colorizedContext = CONTEXT_CLC(`[${context}]`);

      logResult = this.logger.log(logLevelId, logLevelName, colorizedContext, ...messages);
    } else {
      logResult = this.logger.log(logLevelId, logLevelName, ...messages);
    }

    if (this.logCallback) {
      this.logCallback(logResult);
    }
  }

  private getContextAndMessagesFromMeta(meta: unknown[]): {
    messages: unknown[];
    context: string;
  } {
    if (meta.length <= 1) {
      return {
        messages: meta,
        context: this.context || ''
      };
    }

    const lastEl = meta[meta.length - 1];

    const isContext = typeof lastEl === 'string';

    if (!isContext) {
      return {
        messages: meta,
        context: this.context || ''
      };
    }

    return {
      messages: meta.slice(0, meta.length - 1),
      context: lastEl
    };
  }
}
