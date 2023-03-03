export const MODULE_OPTIONS_TOKEN = Symbol('NEST_TSLOG_MODULE_OPTIONS_TOKEN');

export const CONTEXT_CLC = (text: string): string => `\x1b[33m${text}\x1b[39m`;

export const NEST_LOG_LEVELS = {
  log: {
    logLevelId: 0,
    logLevelName: 'LOG',
    styles: ['bold', 'green']
  },
  debug: {
    logLevelId: 1,
    logLevelName: 'DEBUG',
    styles: ['bold', 'magentaBright']
  },
  verbose: {
    logLevelId: 2,
    logLevelName: 'VERBOSE',
    styles: ['bold', 'cyanBright']
  },
  warn: {
    logLevelId: 3,
    logLevelName: 'WARN',
    styles: ['bold', 'yellow']
  },
  error: {
    logLevelId: 4,
    logLevelName: 'ERROR',
    styles: ['bold', 'red']
  }
};
