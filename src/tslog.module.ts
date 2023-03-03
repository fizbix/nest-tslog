import { DynamicModule, Module, Provider } from '@nestjs/common';
import { BaseLogger } from 'tslog';

import { ICreateLoggerOptions, ITsLogModuleOptions } from './ts';
import {
  TsLogModuleHost,
  TS_LOG_OPTIONS_TYPE,
  TS_LOG_ASYNC_OPTIONS_TYPE
} from './module.declaration';
import { TsLogLogger } from './tslog.logger';
import { MODULE_OPTIONS_TOKEN } from './constants';

@Module({})
export class TsLogModule extends TsLogModuleHost {
  public static forRoot(options: typeof TS_LOG_OPTIONS_TYPE = {}): DynamicModule {
    const {
      providers: defProviders = [],
      exports: defExports = [],
      ...rest
    } = super.forRoot(options);

    const loggerProvider = this.createLoggerProvider();

    return {
      ...rest,
      providers: [...defProviders, loggerProvider],
      exports: [...defExports, loggerProvider],
      global: true
    };
  }

  public static createLogger<TLogObj = unknown>(
    options: ICreateLoggerOptions<TLogObj>
  ): TsLogLogger<TLogObj> {
    const baseLogger = new BaseLogger<TLogObj>(options.loggerSettings, options.logObject);
    return new TsLogLogger<TLogObj>(baseLogger, options.globalLogCallback);
  }

  public static forRootAsync(
    options: typeof TS_LOG_ASYNC_OPTIONS_TYPE = {
      useFactory: () => ({})
    }
  ): DynamicModule {
    const {
      providers: defProviders = [],
      exports: defExports = [],
      ...rest
    } = super.forRootAsync(options);

    const provider = this.createLoggerProvider();

    return {
      ...rest,
      providers: [...defProviders, provider],
      exports: [...defExports, provider],
      global: true
    };
  }

  private static createLoggerProvider<TLogObj>(): Provider<TsLogLogger<TLogObj>> {
    return {
      provide: TsLogLogger,
      useFactory: ({
        loggerSettings,
        logObject: mainLogObject,
        globalLogCallback
      }: ITsLogModuleOptions<TLogObj>): TsLogLogger<TLogObj> => {
        const baseLogger = new BaseLogger<TLogObj>(loggerSettings, mainLogObject);
        return new TsLogLogger(baseLogger, globalLogCallback);
      },
      inject: [MODULE_OPTIONS_TOKEN]
    };
  }
}
