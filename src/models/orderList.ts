import {
    Table,
    Column,
    Model,
    PrimaryKey,
    DataType,
    IsUUID,
    Default,
    ForeignKey,
    AllowNull,
} from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';
import { Order } from './order';
// Ensure you have the correct import for the Order model

// Define an enum for return status
export enum ReturnStatus {
    Requested = 1,
    Approved = 2,
    Denied = 3,
    Completed = 4,
}

@Table({
    tableName: 'order list',
    timestamps: true,
    underscored: true,
    paranoid: true,
})
export class OrderList extends Model<OrderList> {
    @PrimaryKey
    @IsUUID(4)
    @Default(UUIDV4)
    @Column(DataType.UUID)
    id!: string;



    @AllowNull(false)
    @Column(DataType.UUID)
    productId!: string; // Assuming productId is a UUID from the product table

    @AllowNull(false)
    @Column(DataType.INTEGER)
    qty!: number; // Default can be set in the database or model

    @AllowNull(false)
    @Column(DataType.FLOAT)
    price!: number;

    @AllowNull(false)
    @Column(DataType.FLOAT)
    mrp!: number; // Maximum Retail Price

    @AllowNull(false)
    @Column(DataType.FLOAT)
    discount!: number;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    returnQty!: number; // Quantity for returns

    @AllowNull(false)
    @Column(DataType.INTEGER) // Store return status as a number
    returnStatus!: ReturnStatus; // Using the enum for return status

    @AllowNull(false)
    @Column(DataType.STRING)
    returnReason!: string; // Reason for return

    @AllowNull(false)
    @Column(DataType.DATE)
    returnInitializedAt!: Date; // Timestamp when return was initialized

    @AllowNull(false)
    @Column(DataType.BOOLEAN)
    returnApproved!: boolean; // Flag indicating if the return is approved

    @AllowNull(false)
    @Column(DataType.DATE)
    returnApprovedAt!: Date; // Timestamp when return was approved
}
