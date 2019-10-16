import * as _ from 'lodash';

export class TotoToken {
  public static getTokenForToto(reference: string) {
    return `TestModuleToto${_.capitalize(reference)}`;
  }
  public static getTokenForTotoOptions(reference: string) {
    return `TestModuleTotoOptions${_.capitalize(reference)}`;
  }
}

export const delay = (timeInMs: number) =>
  new Promise(resolve => {
    setTimeout(resolve, timeInMs);
  });
