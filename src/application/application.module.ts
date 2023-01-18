import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationController } from './application.controller';
import { Application } from './application.entity';
import { ApplicationService } from './application.service';
import { OFFER_SERVICE_NAME, OFFER_PACKAGE_NAME } from './proto/offer.pb';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: OFFER_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: process.env.HOSTOFFER.concat(':50053'),
          package: OFFER_PACKAGE_NAME,
          protoPath: 'node_modules/grpc-nest-proto/proto/offer.proto',
        },
      },
    ]),
    TypeOrmModule.forFeature([Application]), 
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class OrderModule {}
