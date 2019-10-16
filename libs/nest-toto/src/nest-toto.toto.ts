import { NestTotoModuleOptions } from './nest-toto.interfaces';
import { Injectable, Logger } from '@nestjs/common';
import { delay } from './nest-toto.utils';

const logger = new Logger('NestTotoObject', true);

@Injectable()
export class TotoObject {
  public constructor(public readonly reference: string) {}

  public async listen(execute: (data: {}, message: string) => void) {
    await delay(1000);
    logger.log(`binded to ${execute}`);
    throw new Error('test');
  }
}

export async function buildToto(option: NestTotoModuleOptions) {
  await delay(1000);
  return new TotoObject(option.reference);
}
