import * as _ from 'lodash';

import { DynamicModule } from '@nestjs/common';
import { ModuleMetadata, Provider, Type } from '@nestjs/common/interfaces';

import { TotoToken } from './nest-toto.utils';
import { TotoObject, buildToto } from './nest-toto.toto';
import { NestTotoModuleOptions, NestTotoModuleAsyncOptions } from './nest-toto.interfaces';

export class NestTotoDynamic {
  public static register(options: NestTotoModuleOptions | NestTotoModuleOptions[]): Omit<DynamicModule, 'module'> {
    const normalizedOptions = _.flatten([options]);
    const testProviders = NestTotoDynamic.createTotoProviders(normalizedOptions);
    return {
      providers: [
        ...testProviders,
        ...NestTotoDynamic.createSynchronousTotoOptionsProviders(normalizedOptions),
        ...NestTotoDynamic.otherProviders,
      ],
      exports: [...testProviders],
    };
  }
  public static registerAsync(options: NestTotoModuleAsyncOptions | NestTotoModuleAsyncOptions[]): Omit<DynamicModule, 'module'> {
    const normalizedOptions = _.flatten([options]);
    const testProviders = NestTotoDynamic.createTotoProviders(normalizedOptions);
    return {
      imports: NestTotoDynamic.createAsyncImports(normalizedOptions),
      providers: [
        ...testProviders,
        ...NestTotoDynamic.createAsynchronousTotoOptionsProviders(normalizedOptions),
        ...NestTotoDynamic.otherProviders,
      ],
      exports: [...testProviders],
    };
  }
  public static otherProviders: Provider[] = [];
  public static createAsyncImports(normalizedOptions: NestTotoModuleAsyncOptions[]): ModuleMetadata['imports'] {
    return _.flatMap(normalizedOptions, opt => opt.imports);
  }
  public static createTotoProviders(normalizedOptions: Array<NestTotoModuleOptions | NestTotoModuleAsyncOptions>): Provider[] {
    return normalizedOptions.map(opt => ({
      provide: TotoToken.getTokenForToto(opt.reference),
      useFactory: opt => buildToto(opt),
      inject: [TotoToken.getTokenForTotoOptions(opt.reference)],
    }));
  }
  public static createSynchronousTotoOptionsProviders(normalizedOptions: NestTotoModuleOptions[]): Provider[] {
    return normalizedOptions.map(opt => ({
      provide: TotoToken.getTokenForTotoOptions(opt.reference),
      useValue: opt,
    }));
  }
  public static createAsynchronousTotoOptionsProviders(normalizedOptions: NestTotoModuleAsyncOptions[]): Provider[] {
    return normalizedOptions.map(opt => ({
      provide: TotoToken.getTokenForTotoOptions(opt.reference),
      useFactory: opt.useFactory,
      useClass: opt.useClass,
      useExisting: opt.useExisting,
      inject: opt.inject,
    }));
  }
}
