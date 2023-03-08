# Nest.js tslog

Custom Nest.js wrapper for [tslog](https://www.npmjs.com/package/tslog)

## Version

1.0.0

## Installation

```bash
$ npm install --save @fizbix/nest-tslog tslog
```

## Usage

Just import the TsLogModule to your app module.

```typescript
import { Module } from '@nestjs/common';
import { TsLogModule } from '@fizbix/nest-tslog';

@Module({
  imports: [TsLogModule.forRoot()]
})
export class AppModule {}
```

And inject the logger into your service. The logger is a singleton and is available globally.
Example below contains logger from `tslog`.

```typescript
@Injectable()
export class AppService {
  constructor(private readonly tslog: TsLogLogger) {}
}
```

To use Nest Logger, you can use the `NestTsLogLogger` class.

```typescript
@Injectable()
export class AppService {
  constructor(private readonly nestLogger: NestTsLogLogger) {}
}
```

## Configuration

You can configure the logger by passing a configuration object to the `forRoot` method.

```typescript
import { Module } from '@nestjs/common';
import { TsLogModule } from '@fizbix/nest-tslog';

@Module({
  imports: [
    TsLogModule.forRoot({
      loggerSettings: {},
      logObject: {}
    })
  ]
})
export class AppModule {}
```

You can also use predefined logger settings.

```typescript
import { Module } from '@nestjs/common';
import { getLoggerDefaultSettings } from '@fizbix/nest-tslog';

@Module({
  imports: [
    TsLogModule.forRoot({
      loggerSettings: getLoggerDefaultSettings()
    })
  ]
})
export class AppModule {}
```

## Async Configuration

You can also use async configuration, like in typical Nest.js modules.

```typescript
@Module({
  imports: [
    TsLogModule.forRootAsync({
      useFactory: () => ({
        loggerSettings: {
          // config here
        }
      })
    })
  ]
})
export class AppModule {}
```

Or use the `useClass` option.

```typescript
import { Injectable } from '@nestjs/common';
import { ITsLogModuleOptions, ITsLogOptionsFactory } from '@fizbix/nest-tslog';

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
```

## Replacing the default Nest Logger

Module provides a `NestTsLogLogger` class, which can be used to replace the default Nest Logger.

```typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(NestTsLogLogger));
}
```

You can also use the `createLogger` method to create a new logger instance, when Nest.js is bootstrapping.

```typescript
async function bootstrap() {
  const logger = TsLogModule.createLogger({
    loggerSettings: {
      // ... your settings
    }
  });

  const app = await NestFactory.create(AppModule, {
    logger
  });
}
```

After that, you can use logger in your services.

**_NOTE_**: If you're providing the logger in the `NestFactory.create` method, you don't need to import the `TsLogModule` in your app module. Additionally, you **CAN'T** use the DI Tokens (`TsLogLogger`, `NestTsLogLogger`) in your services to get the logger. You need to inject the logger manually like in the example below.

```typescript
@Injectable()
export class AppService {
  private readonly logger: Logger = new Logger(AppService.name);
}
```

Or provide `Logger` in the `providers` array of your module.

```typescript
import { Logger, Module } from '@nestjs/common';

@Module({
  providers: [Logger]
})
export class AppModule {}
```

## License

License under the [MIT license](LICENSE).
