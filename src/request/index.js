import superagent from "superagent";
import {URL_API} from "../constants/URLConstants";

export const getProducts = async () => {
    try {
        const res = await superagent.get(`${URL_API}`);
        return res.body;
    } catch(err) {
        throw err
    }
}

export const postCash = async (request) => {
    try {
        const res = await superagent.post(`${URL_API}cash`).send(request);
        return res.body;
    } catch(err) {
        throw err;
    }
}