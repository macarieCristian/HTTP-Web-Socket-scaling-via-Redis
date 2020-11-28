import { WebsocketMessageType } from '../../../domain/enums/websocket-message-type';
import { Product } from '../../../domain/product.model';

export class WebsocketMessage {
  constructor(public type: WebsocketMessageType,
              public payload?: Product | string,
              public serverId?: string) {
  }

  static toMsg(type: WebsocketMessageType, payload?: Product | string): WebsocketMessage {
    return new WebsocketMessage(type, payload);
  }
}
