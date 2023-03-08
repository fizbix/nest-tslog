import { Injectable } from '@nestjs/common';
import { ITsLogModuleOptions, ITsLogOptionsFactory } from './ts';

@Injectable()
export class TsLogModuleOptions implements ITsLogOptionsFactory {
  createTsLogOptions(): ITsLogModuleOptions | Promise<ITsLogModuleOptions> {
    return {
      loggerSettings: {
        // ... your settings
      }
    };
  }
}
