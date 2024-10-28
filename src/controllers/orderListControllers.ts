import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { generateResponse } from '../utils/responseGenerator';
import { handleError } from '../utils/errorHandler';
import { findOrderListByQuery, createOrderList, updateOrderList, deleteOrderById } from '../services/orderListServices';

// Controller for creating a new order
export const orderListCreate = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    try {
        // Create the order list in the database
        const orderList = await createOrderList(req.body);
        return res.status(201).json(generateResponse(true, 'Order list created successfully', { orderList }));
    } catch (error) {
        return handleError(res, error);
    }
});

// Controller for updating an existing order
export const orderListUpdate = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    try {
        const { discount } = req.body;
        const { id } = req.params;

        // Ensure discount is within valid range
        if (discount !== undefined && (discount < 0 || discount > 100)) {
            return res.status(400).json(generateResponse(false, 'Discount must be between 0 and 100'));
        }

        // Update the order in the database
        const updatedOrder = await updateOrderList(req.body, { id });
        if (!updatedOrder) {
            return res.status(404).json(generateResponse(false, 'Order not found or no changes made'));
        }

        // Log the successful update
        console.log(`Order updated successfully: ${id}`);

        // Respond with success and updated order details
        return res.status(200).json(generateResponse(true, 'Order updated successfully', { updatedOrder }));
    } catch (error) {
        console.error('Error during order update:', error);
        return handleError(res, error);
    }
});

// Controller for fetching a single order by ID
export const getOrderList = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;

        // Fetch order using service
        const order = await findOrderListByQuery({ id });

        if (!order) {
            return res.status(404).json(generateResponse(false, 'Order not found'));
        }

        return res.status(200).json(generateResponse(true, 'Order fetched successfully', { order }));
    } catch (error) {
        console.error('Error fetching order:', error);
        return handleError(res, error);
    }
});

// Controller for deleting an order by ID
export const deleteOrderList = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;

        // Delete order using service
        const deleted = await deleteOrderById(id);

        if (!deleted) {
            return res.status(404).json(generateResponse(false, 'Order not found or already deleted'));
        }

        return res.status(200).json(generateResponse(true, 'Order deleted successfully'));
    } catch (error) {
        console.error('Error deleting order:', error);
        return handleError(res, error);
    }
});
