import { Toto } from '@app/nest-toto';
import { AbstractToto } from '@app/nest-toto/nest-toto.interfaces';

@Toto({ reference: 'titi' })
export class TotoTest extends AbstractToto {
  public execute() {}
}
