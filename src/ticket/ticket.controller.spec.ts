import { Test, TestingModule } from '@nestjs/testing';
import { TicketController } from './ticket.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketService } from './ticket.service';
import { closeInMongodConnection, rootMongooseTestModule } from '../tests/db-handler';
import{UserSchema} from './schemas/user.schema';
import {TicketSchema} from './schemas/ticket.schema';
describe('TicketController', () => {
  let controller: TicketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema },{ name: 'Ticket', schema: TicketSchema }]),
      ],
      controllers: [TicketController],
      providers:[TicketService]
    }).compile();

    controller = module.get<TicketController>(TicketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  afterAll(async () => {
    await closeInMongodConnection();
  });
});
