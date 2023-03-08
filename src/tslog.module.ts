import { DynamicModule, Module } from '@nestjs/common';

import { ICreateNestTsLogLoggerOptions } from './ts';
import {
  TsLogModuleHost,
  TS_LOG_OPTIONS_TYPE,
  TS_LOG_ASYNC_OPTIONS_TYPE
} from './module.declaration';

import { createModuleProviders, createNestTsLogLogger } from './utils/tslog.providers';

import { NestTsLogLogger } from './instances/nest-tslog.logger';

@Module({})
export class TsLogModule extends TsLogModuleHost {
  public static forRoot(options: typeof TS_LOG_OPTIONS_TYPE = {}): DynamicModule {
    const {
      providers: defProviders = [],
      exports: defExports = [],
      ...rest
    } = super.forRoot(options);

    const providers = createModuleProviders();

    return {
      ...rest,
      providers: [...defProviders, ...providers],
      exports: [...defExports, ...providers],
      global: true
    };
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

    const providers = createModuleProviders();

    return {
      ...rest,
      providers: [...defProviders, ...providers],
      exports: [...defExports, ...providers],
      global: true
    };
  }

  public static createLogger<TLogObj = unknown>(
    options: ICreateNestTsLogLoggerOptions<TLogObj>
  ): NestTsLogLogger<TLogObj> {
    return createNestTsLogLogger(options);
  }
}
