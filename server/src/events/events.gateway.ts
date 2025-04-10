// import {
//   ConnectedSocket,
//   MessageBody,
//   OnGatewayConnection,
//   OnGatewayDisconnect,
//   SubscribeMessage,
//   WebSocketGateway,
//   WebSocketServer,
// } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';

// @WebSocketGateway({ namespace: 'events', cors: { origin: '*' } })
// export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
//   @WebSocketServer() server: Server;

//   // Called when the client connects
//   handleConnection(client: Socket) {
//     console.log(`Client connected: ${client.id}`);
//     client.emit('connected', { message: 'Welcome to the server!' });
//   }

//   // Called when a client disconnects
//   handleDisconnect(client: Socket) {
//     console.log(`Client disconnected: ${client.id}`);
//   }

//   @SubscribeMessage('events')
//   handleEvent(
//     @MessageBody() data: string,
//     @ConnectedSocket() client: Socket,
//   ): any {
//     // Optional: broadcast back to all clients
//     this.server.emit('events', { from: client.id, data });

//     return { status: 'ok', received: data };
//   }
// }

// events.gateway.ts

import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'events', cors: { origin: '*' } })
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // userId -> socket.id
  private userSockets = new Map<string, string>();

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;

    if (userId) {
      this.userSockets.set(userId, client.id);
      console.log(`User ${userId} connected with socket ID: ${client.id}`);
    } else {
      console.log('Connection attempt without userId');
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const userId = [...this.userSockets.entries()].find(
      ([, socketId]) => socketId === client.id,
    )?.[0];

    if (userId) {
      this.userSockets.delete(userId);
      console.log(`User ${userId} disconnected`);
    }
  }

  @SubscribeMessage('private-message')
  handlePrivateMessage(
    @MessageBody()
    payload: { to: string; message: string },
    @ConnectedSocket() client: Socket,
  ) {
    const targetSocketId = this.userSockets.get(payload.to);
    if (targetSocketId) {
      this.server.to(targetSocketId).emit('private-message', {
        from: client.id,
        message: payload.message,
      });
    } else {
      client.emit('user-offline', { to: payload.to });
    }
  }


  @SubscribeMessage('send')
  handleSend(@MessageBody() data:string){
    console.log(data);
    
    this.server.emit('reply',{message:'Reply from backend'})
  }
}
