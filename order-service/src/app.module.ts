import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { OrdersModule } from "./orders/orders.module";
import { GlobalRabbitMQModule } from "./rabbitmq/rabbitmq.module";

@Module({
  imports: [GlobalRabbitMQModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
