import { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";
import {HealthCheckResponse} from "@it3k-2025-backend/shared";
dotenv.config();

const basketballServiceURL = process.env.BASKETBALL_BASE_API_URL;

export const checkBasketballConnection = async (req: Request, res: Response): Promise<void> => {
    try {
        const response = await axios.get(`${basketballServiceURL}/health`);
        res.status(200).json(response.data as HealthCheckResponse);
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error) && error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
};
