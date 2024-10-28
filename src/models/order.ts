import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AllowNull,
  DataType,
  IsUUID,
  Default,
  BeforeCreate,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
} from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';
import { OrderList } from './orderList';

@Table({
  tableName: 'orders',
  timestamps: true,
  underscored: true,
  paranoid: true,
})
export class Order extends Model<Order> {
  @PrimaryKey
  @IsUUID(4)
  @Default(UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @AutoIncrement
  @Column(DataType.INTEGER)
  orderId!: number;

  @BeforeCreate
  static generateOrderId(order: Order) {
    order.orderId = Math.floor(100000000 + Math.random() * 1400000000);
  }

  @AllowNull(false)
  @IsUUID(4)
  @Column(DataType.UUID)
  buyerId!: string;

  @AllowNull(false)
  @IsUUID(4)
  @Column(DataType.UUID)
  sellerId!: string;

  @ForeignKey(() => OrderList)
  @Column(DataType.UUID) // Assuming orderId is a UUID from the Order model
  orderListId!: string;

  @Column(DataType.FLOAT)
  totalAmount!: number;

  @Column
  status!: 'pending' | 'completed' | 'cancelled';

  @Column(DataType.JSONB) // Store address as JSONB
  billingAddress!: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    addressType: 'home' | 'office';
  };

  @Column(DataType.JSONB) // Store address as JSONB
  shippingAddress!: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    addressType: 'home' | 'office';
  };


  @Column
  returnRequested!: boolean; // Flag for return requests

  @AllowNull(true)
  @Column(DataType.DATE)
  returnRequestedAt!: Date; // Timestamp for return requests
}
