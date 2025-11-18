// order-service/src/orders/dto/create-order.dto.ts
import { IsString, IsInt, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ProductDetailDto {
  @IsString()
  id: string;

  @IsInt()
  quantity: number;
}

export class CreateOrderDto {
  @IsString()
  user_id: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDetailDto)
  products: ProductDetailDto[];

  @IsInt()
  total_price: number;
}
