import dotenv from "dotenv";
dotenv.config();

const adminServiceURL: string = process.env.ADMIN_BASE_API_URL;

export default adminServiceURL