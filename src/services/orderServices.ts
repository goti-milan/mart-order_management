import { ValidationError, UniqueConstraintError } from "sequelize";
import { Order } from "../models/order";

// Improved typing for whereQuery using Partial<Order>
export const findOrderByQuery = async (whereQuery: Partial<Order>): Promise<Order | null> => {
  try {
    const order = await Order.findOne({ where: whereQuery });
    return order?.dataValues || null; // Return null if no order is found
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error finding order: ${error.message}`);
    }
    throw new Error(`Unexpected error: ${String(error)}`);
  }
};

export const createOrder = async (orderData: Order): Promise<Order> => {
  try {
    const order = await Order.create(orderData);
    return order.dataValues; // Return the created order data
  } catch (error: unknown) {
    if (error instanceof UniqueConstraintError) {
      throw new Error(`Duplicate entry: ${error.message}`);
    } else if (error instanceof ValidationError) {
      throw new Error(`Validation error: ${error.message}`);
    } else if (error instanceof Error) {
      throw new Error(`Error creating order: ${error.message}`);
    }
    throw new Error(`Unexpected error: ${String(error)}`);
  }
};

export const updateOrder = async (updateQuery: Partial<Order>, updateCondition: any): Promise<Order | null> => {
  try {
    // Update the order record based on the condition
    const [affectedRows, [updatedOrder]] = await Order.update(updateQuery, {
      where: updateCondition, // Condition to find the correct order(s)
      returning: true, // Ensures the updated row is returned
    });

    console.log("updatedOrder", updatedOrder);
    

    if (affectedRows === 0) {
      throw new Error('Order not found or no changes made');
    }

    return updatedOrder?.dataValues || null; // Return the updated order data or null if not found
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error updating order: ${error.message}`);
    }
    throw new Error(`Unexpected error: ${String(error)}`);
  }
};

export const deleteOrderById = async (id: string): Promise<boolean> => {
  try {
    const deletedRows = await Order.destroy({
      where: { id }, // Condition to find the correct order
    });

    if (deletedRows === 0) {
      throw new Error('Order not found or already deleted');
    }

    return true; // Return true if deletion was successful
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error deleting order: ${error.message}`);
    }
    throw new Error(`Unexpected error: ${String(error)}`);
  }
};
