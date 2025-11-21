import { Global, Module } from "@nestjs/common";
import { RabbitMQModule } from "@golevelup/nestjs-rabbitmq";

@Global()
@Module({
  imports: [
    RabbitMQModule.forRoot({
      exchanges: [
        {
          name: "order_exchange",
          type: "topic",
        },
      ],
      uri: "amqp://rabbit:rabbit@rabbitmq:5672",
    }),
  ],
  exports: [RabbitMQModule],
})
export class GlobalRabbitMQModule { }
