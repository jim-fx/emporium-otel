import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { Order } from 'src/entities/Orders';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Product } from 'src/entities/Products';

@Module({
  imports: [MikroOrmModule.forFeature([Order, Product])],
  controllers: [OrdersController]
})
export class OrdersModule { }
