import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketModule } from './ticket/ticket.module';
import {MongooseModule} from '@nestjs/mongoose';
@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.vq9op.mongodb.net/movie?retryWrites=true&w=majority'),TicketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}



//mongodb+srv://admin:admin@cluster0.vq9op.mongodb.net/movie?retryWrites=true&w=majority