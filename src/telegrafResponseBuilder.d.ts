import { ResponseBuilder } from '@cfworker/web';

declare class TelegrafResponseBuilder extends ResponseBuilder {
  header: Headers;
  set: (name: string, value: string) => void;
}

declare function getKoaLikeResponse(res: ResponseBuilder): TelegrafResponseBuilder;

export = getKoaLikeResponse;
