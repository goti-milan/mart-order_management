import { ApiResponse } from "./interface";

export const generateResponse = (success: boolean, message: string, data: any = null): ApiResponse => ({
    success,
    message,
    data
});
