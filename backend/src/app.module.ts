import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MediaModule } from './media/media.module';
import { ConfigModule } from '@nestjs/config';
import { MeetingModule } from './meeting/meeting.module';
import { ChatModule } from './chat/chat.module';   

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MediaModule,
    MeetingModule,
    ChatModule,   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}