import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { OrdersModule } from "./orders/orders.module";
import { GlobalRabbitMQModule } from "./rabbitmq/rabbitmq.module";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { MikroOrmModule } from "@mikro-orm/nestjs";

@Module({
  imports: [
    MikroOrmModule.forRoot({
      entities: ["./dist/entities"],
      entitiesTs: ["./src/entities"],
      clientUrl: process.env.DATABASE_URL,
      driver: PostgreSqlDriver,
    }),
    GlobalRabbitMQModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
