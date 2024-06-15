import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const createToken = (email, name) => {
    const token = jwt.sign({ email, name }, process.env.JWT_SECRET, {
        expiresIn: "3d",
    });
    return token;
};

export const decodeToken = (token) => {
    const decodeDetails = jwt.verify(token, process.env.JWT_SECRET);
    return decodeDetails;
};