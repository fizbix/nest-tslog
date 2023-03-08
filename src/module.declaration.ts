import { ConfigurableModuleBuilder } from '@nestjs/common';

import { ITsLogModuleOptions } from './ts';
import { NEST_TSLOG_MODULE_OPTIONS_TOKEN } from './constants';

export const {
  ASYNC_OPTIONS_TYPE: TS_LOG_ASYNC_OPTIONS_TYPE,
  OPTIONS_TYPE: TS_LOG_OPTIONS_TYPE,
  MODULE_OPTIONS_TOKEN: TSLOG_MODULE_OPTIONS_TOKEN,
  ConfigurableModuleClass: TsLogModuleHost
} = new ConfigurableModuleBuilder<ITsLogModuleOptions>({
  moduleName: 'TsLogModule',
  optionsInjectionToken: NEST_TSLOG_MODULE_OPTIONS_TOKEN
})
  .setClassMethodName('forRoot')
  .setFactoryMethodName('createTsLogOptions')
  .build();
