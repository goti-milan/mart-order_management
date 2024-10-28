import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { generateResponse } from '../utils/responseGenerator';
import { handleError } from '../utils/errorHandler';
import { createOrder, deleteOrderById, findOrderByQuery, updateOrder,  } from '../services/orderServices';

// Controller for registering a new order
export const orderRegistration = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    try {
        // Create the order in the database
        const order = await createOrder(req.body);

        // Log the created order for auditing
        console.log(`Order created successfully: ${order.id}`, order);

        // Return success response with order details
        return res.status(201).json(generateResponse(true, 'Order created successfully', { order }));
    } catch (error) {
        // Handle and log the error
        console.error('Error during order registration:', error);
        return handleError(res, error);
    }
});

// Controller for updating an existing order
export const orderUpdate = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    try {
        const { discount } = req.body;
        const { id } = req.params;

        // Ensure discount is within valid range
        if (discount !== undefined && (discount < 0 || discount > 100)) {
            return res.status(400).json(generateResponse(false, 'Discount must be between 0 and 100'));
        }

        // Update the order in the database
        const updatedOrder = await updateOrder(req.body, { id });

        if (!updatedOrder) {
            return res.status(404).json(generateResponse(false, 'Order not found or no changes made'));
        }

        // Log the successful update
        console.log(`Order updated successfully: ${id}`);

        // Respond with success and updated order details
        return res.status(200).json(generateResponse(true, 'Order updated successfully', { id }));
    } catch (error) {
        // Centralized error handling with detailed logging
        console.error('Error during order update:', error);
        return handleError(res, error);
    }
});

// Controller for fetching a single order by ID
export const getOrder = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;

        // Fetch order using service
        const order = await findOrderByQuery({id});

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
export const deleteOrder = asyncHandler(async (req: Request, res: Response): Promise<any> => {
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
