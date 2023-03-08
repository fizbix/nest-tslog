import { Provider } from '@nestjs/common';
import { BaseLogger, Logger } from 'tslog';

import { NestTsLogLogger } from '../instances/nest-tslog.logger';
import { TsLogLogger } from '../instances/tslog.logger';

import { ICreateNestTsLogLoggerOptions, ITsLogModuleOptions } from '../ts';

import { TSLOG_MODULE_OPTIONS_TOKEN } from '../module.declaration';

export function createModuleProviders(): Provider[] {
  return [
    {
      provide: TsLogLogger,
      useFactory: (options: ITsLogModuleOptions): BaseLogger<unknown> => {
        const { loggerSettings, mainLogObject } = options;
        return new Logger(loggerSettings, mainLogObject);
      },
      inject: [TSLOG_MODULE_OPTIONS_TOKEN]
    },
    {
      provide: NestTsLogLogger,
      useFactory: (logger: BaseLogger<unknown>) => new NestTsLogLogger(logger),
      inject: [TsLogLogger]
    }
  ];
}

export function createNestTsLogLogger<TLogObj>(
  options: ICreateNestTsLogLoggerOptions<TLogObj>
): NestTsLogLogger<TLogObj> {
  if (options.instance) {
    return new NestTsLogLogger(options.instance);
  }
  const { loggerSettings, mainLogObject } = options;
  const baseLogger = new Logger<TLogObj>(loggerSettings, mainLogObject);
  return new NestTsLogLogger(baseLogger);
}
