import { NestTsLogLogger } from './instances/nest-tslog.logger';
import { TsLogLogger } from './instances/tslog.logger';

import { TsLogModule } from './tslog.module';

import { getLoggerDefaultSettings } from './utils/get-default-logger-settings.util';

export { TsLogModule, TsLogLogger, NestTsLogLogger, getLoggerDefaultSettings };

export * from './constants';
export * from './ts';
