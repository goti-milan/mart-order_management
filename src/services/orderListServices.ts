import { ValidationError, UniqueConstraintError } from "sequelize";
import { OrderList } from "../models/orderList";

export const findOrderListByQuery = async (whereQuery: Partial<OrderList>): Promise<any> => {
  try {
    const orderList = await OrderList.findOne({ where: whereQuery });
    return orderList ? orderList.dataValues : null; // Return null if no order is found
  } catch (error: unknown) {
    handleError(error, 'finding orderList');
  }
};

export const createOrderList = async (orderListData: OrderList): Promise<any> => {
  try {
    const orderList = await OrderList.create(orderListData);
    return orderList.dataValues; // Return the created order data
  } catch (error: unknown) {
    handleCreateError(error);
  }
};

export const updateOrderList = async (updateQuery: Partial<OrderList>, updateCondition: Partial<OrderList>): Promise<any> => {
  try {
    const [affectedRows, [updatedOrderList]] = await OrderList.update(updateQuery, {
      where: updateCondition,
      returning: true,
    });

    if (affectedRows === 0) {
      throw new Error('Order not found or no changes made');
    }
    return updatedOrderList ? updatedOrderList.dataValues : null; 
  } catch (error: unknown) {
    handleError(error, 'updating order');
  }
};

export const deleteOrderById = async (id: string): Promise<any> => {
  try {
    const deletedRows = await OrderList.destroy({
      where: { id },
    });

    if (deletedRows === 0) {
      throw new Error('Order list not found or already deleted');
    }

    return true; // Return true if deletion was successful
  } catch (error: unknown) {
    handleError(error, 'deleting order');
  }
};

// Helper functions for error handling
const handleError = (error: unknown, action: string) => {
  if (error instanceof UniqueConstraintError) {
    throw new Error(`Duplicate entry while ${action}: ${error.message}`);
  } else if (error instanceof ValidationError) {
    throw new Error(`Validation error while ${action}: ${error.message}`);
  } else if (error instanceof Error) {
    throw new Error(`Error ${action}: ${error.message}`);
  }
  throw new Error(`Unexpected error while ${action}: ${String(error)}`);
};

const handleCreateError = (error: unknown) => {
  if (error instanceof UniqueConstraintError) {
    throw new Error(`Duplicate entry: ${error.message}`);
  } else if (error instanceof ValidationError) {
    throw new Error(`Validation error: ${error.message}`);
  }
  throw new Error(`Error creating order: ${error instanceof Error ? error.message : String(error)}`);
};
