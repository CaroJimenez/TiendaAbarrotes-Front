import { doGet } from "../utils/Axios";

export const getProducts = async () => {
    return await doGet("/products");
}