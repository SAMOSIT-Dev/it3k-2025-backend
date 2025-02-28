import { Response } from "express";
import Joi from "joi";

interface ISuccessResponsePayload {
    res: Response
    data: any;
    message?: string;
    statusCode?: number;
}

interface IErrorResponsePayload {
    res: Response;
    error: any;
    statusCode?: number
}

interface IValidationResponsePayload {
    res: Response;
    error_details: Joi.ValidationErrorItem[];
    statusCode?: number
}

export const successResponse = ({
    res, data, message = 'Success', statusCode = 200
}: ISuccessResponsePayload) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};

export const errorResponse = ({
    res, error, statusCode = 500
}: IErrorResponsePayload) => {
    return res.status(statusCode).json({
        success: false,
        message: error || 'An error occurred',
    });
};

export const validationErrorResponse = ({
    res, error_details, statusCode = 400
}: IValidationResponsePayload) => {
    return res.status(statusCode).json({
        success: false,
        message: 'Validation failed',
        errors: error_details.map((detail) => detail.message),
    });
};

