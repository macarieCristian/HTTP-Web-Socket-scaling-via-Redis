import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RedisChannels } from '../../../domain/enums/redis-channels';
import { WebsocketMessage } from '../../../events/port/dto/websocket-message';
import { EventsGateway } from '../../../events/port/events.gateway';
import { WebsocketEvent } from '../../../domain/enums/websocket-event';

@Controller()
export class RedisController {

  constructor(private eventsGateway: EventsGateway) {
  }

  @MessagePattern({ channel: RedisChannels.WS_MESSAGES })
  getWebsocketMessages(@Payload() message: WebsocketMessage) {
    message.serverId = process.env.APPID || 'LOCAL';
    this.eventsGateway.broadcastMessage(WebsocketEvent.PRODUCT, message);
  }
}
