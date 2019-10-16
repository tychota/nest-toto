import * as _ from 'lodash';
import { ModuleRef, ModulesContainer, Reflector } from '@nestjs/core';
import { Module, DynamicModule, OnModuleInit, Logger } from '@nestjs/common';
import { MetadataScanner } from '@nestjs/core/metadata-scanner';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';

import { NestTotoDynamic } from './nest-toto.provider';
import { NestTotoModuleOptions, NestTotoModuleAsyncOptions, AbstractToto } from './nest-toto.interfaces';
import { TOTO_MODULE_TOTO } from './nest-toto.decorators';
import { TotoToken } from './nest-toto.utils';
import { TotoObject } from './nest-toto.toto';

const logger = new Logger('NestTotoModule', true);

@Module({})
export class NestTotoModule implements OnModuleInit {
  /**
   * Given an options, return a nest `DynamicModule` with everything needed
   *
   * @param options a `NestTotoModuleOptions` or an array of `NestTotoModuleOptions`
   */
  public static register(options: NestTotoModuleOptions | NestTotoModuleOptions[]): DynamicModule {
    return {
      module: NestTotoModule,
      ...NestTotoDynamic.register(options),
    };
  }
  public static registerAsync(options: NestTotoModuleAsyncOptions | NestTotoModuleAsyncOptions[]): DynamicModule {
    return {
      module: NestTotoModule,
      ...NestTotoDynamic.registerAsync(options),
    };
  }
  public constructor(
    private readonly moduleRef: ModuleRef,
    private readonly modulesContainer: ModulesContainer,
    private readonly reflector: Reflector,
  ) {}
  public onModuleInit() {
    this.scanAndBindTotosToTotoObjects();
  }
  private scanAndBindTotosToTotoObjects() {
    const modules = [...this.modulesContainer.values()];
    _.flatMap(modules, module => [...module.components.values()])
      .filter(wr => wr.metatype && !!this.reflector.get(TOTO_MODULE_TOTO, wr.metatype))
      .map(({ instance, metatype }: InstanceWrapper<AbstractToto>) => {
        const metada = this.reflector.get(TOTO_MODULE_TOTO, metatype);
        return { instance, totoObject: this.moduleRef.get<TotoObject>(TotoToken.getTokenForToto(metada.reference)) };
      })
      .forEach(({ instance, totoObject }) => {
        return new MetadataScanner().scanFromPrototype(instance, Object.getPrototypeOf(instance), (key: string) => {
          if (key === 'execute') {
            totoObject.listen(instance.execute).catch(err => logger.error(err.message, err.stack));
          } else {
            // handle other decorators
          }
        });
      });
  }
}
