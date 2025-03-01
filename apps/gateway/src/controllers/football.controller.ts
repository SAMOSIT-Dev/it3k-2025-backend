import { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const footballServiceURL = process.env.FOOTBALL_BASE_API_URL;

export const getOpeningMatch = async (_req: Request, res: Response): Promise<void> => {
    try {
        const response = await axios.get(`${footballServiceURL}/api/football/matches`);
        res.status(200).json(response.data);
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error) && error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

export const getScoreboard = async (_req: Request, res: Response): Promise<void> => {
    try {
        const response = await axios.get(`${footballServiceURL}/api/football/score-board`);
        res.status(200).json(response.data);
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error) && error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}