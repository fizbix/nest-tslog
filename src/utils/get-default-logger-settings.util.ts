import { ISettingsParam } from 'tslog';
import { NEST_LOG_LEVELS } from '../constants';

export function getLoggerDefaultSettings<TLogObj = unknown>(): ISettingsParam<TLogObj> {
  return {
    prettyLogTemplate:
      '{{yyyy}}.{{mm}}.{{dd}} {{hh}}:{{MM}}:{{ss}}:{{ms}} {{logLevelName}} {{name}} ',
    stylePrettyLogs: true,
    prettyLogTimeZone: 'local',
    prettyErrorParentNamesSeparator: ':',
    prettyErrorLoggerNameDelimiter: '\t',
    prettyLogStyles: {
      dateIsoStr: 'white',
      logLevelName: Object.entries(NEST_LOG_LEVELS).reduce((acc, [key, value]) => {
        acc[key.toUpperCase()] = value.styles;
        return acc;
      }, {} as Record<string, string[]>),
      name: ['yellow', 'bold'],
      errorName: ['bold', 'bgRedBright', 'whiteBright'],
      filePathWithLine: 'white'
    }
  };
}
