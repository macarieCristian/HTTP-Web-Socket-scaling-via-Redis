import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from '../../auth/core/auth.service';
import { WebsocketEvent } from '../../domain/enums/websocket-event';
import { WebsocketMessage } from './dto/websocket-message';

@WebSocketGateway()
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private authService: AuthService) {
  }

  // @SubscribeMessage(WebsocketEvent.PRODUCT)
  // async onChat(@MessageBody() message: string, @ConnectedSocket() client: Socket) {
  //   // client.broadcast.emit('chat', message); // broadcast without current client
  //   // throw new WsException('Invalid credentials.');
  //   this.server.emit(WebsocketEvent.PRODUCT, message); // broadcast with current client
  // }

  broadcastMessage(event: WebsocketEvent, message: WebsocketMessage) {
    this.server.emit(event, message);
  }

  async handleConnection(@ConnectedSocket() client: Socket) {
    const token = this.authService.validateToken(client.handshake.query.authorization);
    if (!token) {
      client.disconnect(true);
      return;
    }
    console.log("connected - " + client.id);
  }

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log("disconnected - " + client.id);
  }
}
