const axios = require("axios");
import CookieUtils from "../../utils/cookie.utils";

const cookie = new CookieUtils();
const dataCookie = cookie.getCookie("user-access");

class Order {
    async get() {
        try {
            if (dataCookie) {
                const response = await axios.get(`http://localhost:3000/v1/order/${dataCookie.id}`);
                return response.data.data;
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }
    async add(payload) {
        try {
            if (dataCookie) {
                const response = await axios.post(`http://localhost:3000/v1/order`, {
                    user_id: dataCookie.id,
                    products: payload.products,
                    totalPrice : payload.totalPrice
                });
                return response.data;
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }
    async setStatus(payload) {
        try {
            if (dataCookie) {
                const response = await axios.patch(`http://localhost:3000/v1/order`, {
                    _id: payload,
                });
                return response.data;
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Order;
