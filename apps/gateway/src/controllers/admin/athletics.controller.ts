import { Request, Response } from "express";
import axios from "axios";
import adminServiceURL from "./base_url";

export const createAthleticsMatch = async (req: Request, res: Response): Promise<void> => {
    try {
        const response = await axios.post(`${adminServiceURL}/api/admin/athletics`, req.body, {
            headers : {
                Authorization: req.headers.authorization,
            },
        });
        res.status(201).json(response.data);
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

export const updateAthleticsMatch = async (req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;
        const response = await axios.put(`${adminServiceURL}/api/admin/athletics/${id}`, req.body, {
            headers : {
                Authorization: req.headers.authorization,
            },
        });
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

export const deleteAthleticsMatch = async (req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;
        const response = await axios.delete(`${adminServiceURL}/api/admin/athletics/${id}`, {
            headers : {
                Authorization: req.headers.authorization,
            },
        });
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