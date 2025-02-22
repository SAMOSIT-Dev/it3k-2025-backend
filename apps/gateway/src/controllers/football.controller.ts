import { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";
import {CheckConnectionResponse} from "@it3k-2025-backend/shared/models";
dotenv.config();

const footballServiceURL = process.env.FOOTBALL_BASE_API_URL;

export const checkFootballConnection = async (req: Request, res: Response): Promise<void> => {
    try {
        const response = await axios.get(`${footballServiceURL}/check`);
        res.status(200).json(response.data as CheckConnectionResponse);
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
