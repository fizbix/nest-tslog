import { ISettingsParam } from 'tslog';

import { TLogCallback } from '../types/logger.types';

export interface ICreateLoggerOptions<TLogObj = unknown> {
  readonly loggerSettings?: ISettingsParam<TLogObj>;
  readonly logObject?: TLogObj;
  readonly globalLogCallback?: TLogCallback<TLogObj>;
}

export interface ITsLogModuleOptions<TLogObj = unknown> extends ICreateLoggerOptions<TLogObj> {}

export interface ITsLogOptionsFactory<TLogObj = unknown> {
  createTsLogOptions(): Promise<ITsLogModuleOptions<TLogObj>> | ITsLogModuleOptions<TLogObj>;
}
