import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinProblem')
  handleJoinProblem(@MessageBody() problemId: string, @ConnectedSocket() client: Socket) {
    client.join(`problem_${problemId}`);
    return { event: 'joined', data: problemId };
  }

  @SubscribeMessage('sendMessage')
  handleMessage(
    @MessageBody() data: { problemId: string; message: string; user: string },
    @ConnectedSocket() client: Socket,
  ) {
    this.server.to(`problem_${data.problemId}`).emit('newMessage', data);
  }
}
