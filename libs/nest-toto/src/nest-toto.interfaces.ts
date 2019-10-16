import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

export interface NestTotoModuleOptions {
  reference: string;
  instances: any[];
}
export interface NestTotoOptionsFactory {
  createNestTotoOptions(): Promise<NestTotoModuleOptions> | NestTotoModuleOptions;
}
export interface NestTotoModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  reference: string;
  useExisting?: Type<NestTotoOptionsFactory>;
  useClass?: Type<NestTotoOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<NestTotoModuleOptions> | NestTotoModuleOptions;
  inject?: any[];
}

export abstract class AbstractToto {
  abstract execute(data: {}, message: string): void;
}
