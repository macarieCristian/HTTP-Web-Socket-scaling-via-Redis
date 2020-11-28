import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {take, tap} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {WebsocketEvent} from '../domain/websocket-event';
import {environment} from '../../environments/environment';
import {CurrentUserService} from '../auth/current-user.service';
import {ProductMessage} from './dto/product-message';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  product = new Subject<ProductMessage>();
  private socket: SocketIOClient.Socket;

  constructor(private currentUser: CurrentUserService) {
  }

  // sendChat(event: WebsocketEvent, message: any): void {
  //   if (this.socket) {
  //     this.socket.emit(event, message);
  //   }
  // }

  connect(): void {
    this.currentUser.user.pipe(
      take(1),
      tap(user => {
        this.establishConnectionAndSubscriptions(user.token);
      })).subscribe();
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
    this.socket = null;
  }

  private establishConnectionAndSubscriptions(token: string): void {
    if (this.socket) {
      return;
    }
    this.socket = io(environment.restApiBaseUrl, {query: {authorization: token}});
    this.socket.on(WebsocketEvent.CONNECT, () => {
      console.log(WebsocketEvent.CONNECT);
    });
    this.socket.on(WebsocketEvent.PRODUCT, (message: ProductMessage) => {
      console.log(`Received message type: "${message.type}" form server: "${message.serverId}"`);
      this.product.next(message);
    });
    this.socket.on(WebsocketEvent.EXCEPTION, (error) => {
      console.log(`${error} ${WebsocketEvent.EXCEPTION}`);
    });
    this.socket.on(WebsocketEvent.DISCONNECT, () => {
      console.log(WebsocketEvent.DISCONNECT);
    });
  }
}
