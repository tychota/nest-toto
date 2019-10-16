import { Module } from '@nestjs/common';
import { NestTotoModule } from '@app/nest-toto';

import { TotoTest } from './toto';

@Module({
  imports: [NestTotoModule.register({ reference: 'titi', instances: [TotoTest] })],
  providers: [TotoTest],
})
export class AppModule {}
