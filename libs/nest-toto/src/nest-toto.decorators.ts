import { Inject, SetMetadata } from '@nestjs/common';
import { TotoToken } from './nest-toto.utils';

export const InjectToto = (name?: string): ParameterDecorator => Inject(TotoToken.getTokenForToto(name));

export const TOTO_MODULE_TOTO = '__toto_module_toto';
export const Toto = (options: { reference: string }): ClassDecorator => SetMetadata(TOTO_MODULE_TOTO, options);
