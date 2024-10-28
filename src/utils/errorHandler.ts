import { Response } from 'express';

// Logs the error (could use external logging service, like Sentry or custom logs)
export const logError = (message: string, error: any): void => {
    console.error(`${message} ${error.message}`, error.stack);
};

// Sends error response to client
export const handleError = (res: Response, error: any): void => {
    res.status(500).json({
        success: false,
        message: 'An internal server error occurred. Please try again later.',
        error: error.message // You can hide this message in production for security reasons
    });
};
