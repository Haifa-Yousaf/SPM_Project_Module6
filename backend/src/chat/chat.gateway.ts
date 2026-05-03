import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  // ============================================
  // CONNECTION
  // ============================================
  handleConnection(client: Socket) {
    console.log('✅ User connected:', client.id);
    console.log('ROOMS:', Array.from(client.rooms));
  }

  handleDisconnect(client: Socket) {
    console.log('❌ User disconnected:', client.id);
  }

  // ============================================
  // JOIN PRIVATE ROOM
  // ============================================
  @SubscribeMessage('join')
  handleJoin(
    @MessageBody() userId: string,
    @ConnectedSocket() client: Socket,
  ) {
    const roomId = String(userId).trim();
    client.join(roomId);

    console.log(`✅ User ${roomId} joined private room`);
  }

  // ============================================
  // JOIN GROUP ROOM
  // ============================================
  @SubscribeMessage('joinGroup')
  handleJoinGroup(
    @MessageBody() data: { roomId: string; userId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const roomId = String(data.roomId).trim();
    client.join(roomId);

    console.log(`✅ User ${data.userId} joined group ${roomId}`);
  }

  // ============================================
  // PRIVATE MESSAGE
  // ============================================
  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      if (!data?.senderId || !data?.receiverId || !data?.content) {
        console.log('❌ Invalid message:', data);
        return;
      }

      const message = {
        messageId: data.messageId,
        senderId: String(data.senderId),
        receiverId: String(data.receiverId),
        content: data.content,
        type: data.type || 'text',
        timestamp: new Date(),
        status: 'sent',
      };

      console.log('📨 Sending message:', message);

      // ============================================
      // CHECK RECEIVER ONLINE
      // ============================================
      const sockets = await this.server
        .in(message.receiverId)
        .fetchSockets();

      const isOnline = sockets.length > 0;

      if (isOnline) {
        // SEND TO RECEIVER
        this.server
          .to(message.receiverId)
          .emit('receiveMessage', message);

        console.log('📤 Delivered to receiver:', message.receiverId);
      } else {
        console.log('⚠ Receiver offline');
      }

      // ============================================
      // STATUS: DELIVERED (ONLY TO SENDER)
      // ============================================
      client.emit('statusUpdate', {
        messageId: message.messageId,
        status: isOnline ? 'delivered' : 'sent',
      });

      await this.sendToDB(message);
    } catch (err) {
      console.log('❌ sendMessage error:', err);
    }
  }

  // ============================================
  // GROUP MESSAGE
  // ============================================
  @SubscribeMessage('sendGroupMessage')
  async handleGroupMessage(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      if (!data?.roomId || !data?.senderId || !data?.content) {
        console.log('❌ Invalid group message:', data);
        return;
      }

      const groupMessage = {
        messageId: data.messageId,
        roomId: String(data.roomId),
        senderId: String(data.senderId),
        content: data.content,
        type: data.type || 'text',
        timestamp: new Date(),
        status: 'sent',
      };

      console.log('📨 Group message:', groupMessage);

      // SEND TO GROUP EXCEPT SENDER
      client.to(groupMessage.roomId).emit(
        'receiveGroupMessage',
        groupMessage,
      );

      // ACK SENDER
      client.emit('statusUpdate', {
        messageId: groupMessage.messageId,
        status: 'delivered',
      });

      await this.sendToDB(groupMessage);
    } catch (err) {
      console.log('❌ group message error:', err);
    }
  }

  // ============================================
  // MESSAGE READ (FIXED - TARGET SENDER ONLY)
  // ============================================
  @SubscribeMessage('messageRead')
  handleRead(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    if (!data?.messageId || !data?.senderId) return;

    console.log('👁 Read receipt:', data);

    // ONLY SEND TO ORIGINAL SENDER
    this.server.to(String(data.senderId)).emit('statusUpdate', {
      messageId: data.messageId,
      status: 'read',
    });
  }

  // ============================================
  // RECEIVER ACK (optional fallback)
  // ============================================
  @SubscribeMessage('messageReceived')
  handleMessageReceived(@MessageBody() data: any) {
    if (!data?.messageId || !data?.senderId) return;

    this.server.to(String(data.senderId)).emit('statusUpdate', {
      messageId: data.messageId,
      status: 'seen',
    });
  }

  // ============================================
  // DB SAVE
  // ============================================
  async sendToDB(message: any) {
    try {
      await fetch('http://localhost:3000/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message),
      });

      console.log('💾 Saved to DB');
    } catch (err) {
      console.log('❌ DB error:', err);
    }
  }
}