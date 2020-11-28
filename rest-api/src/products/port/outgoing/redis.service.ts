import { Inject, Injectable } from '@nestjs/common';
import { Service } from '../../../domain/enums/service';
import { ClientProxy } from '@nestjs/microservices';
import { RedisChannels } from '../../../domain/enums/redis-channels';
import { WebsocketMessage } from '../../../events/port/dto/websocket-message';

@Injectable()
export class RedisService {
  constructor(@Inject(Service.REDIS) private client: ClientProxy) {
  }

  publishMessage(channel: RedisChannels, message: WebsocketMessage) {
    this.client.emit({ channel: channel }, message);
  }
}
