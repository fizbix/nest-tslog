import { ISettingsParam, BaseLogger } from 'tslog';

export interface ITsLogModuleOptions<TLogObj = unknown> {
  readonly loggerSettings?: ISettingsParam<TLogObj>;
  readonly mainLogObject?: TLogObj;
}

export interface ICreateNestTsLogLoggerOptions<TLogObj = unknown>
  extends ITsLogModuleOptions<TLogObj> {
  readonly instance?: BaseLogger<TLogObj>;
}

export interface ITsLogOptionsFactory<TLogObj = unknown> {
  createTsLogOptions(): Promise<ITsLogModuleOptions<TLogObj>> | ITsLogModuleOptions<TLogObj>;
}
