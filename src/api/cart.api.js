const axios = require("axios");
import CookieUtils from "../../utils/cookie.utils";

const cookie = new CookieUtils();
const dataCookie = cookie.getCookie("user-access");

class Cart {
    async get() {
        try {
            if (dataCookie) {
                const response = await axios.get(`http://localhost:3000/v1/cart/${dataCookie.id}`);
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
                const response = await axios.post(`http://localhost:3000/v1/cart`, {
                    user_id: dataCookie.id,
                    products: {
                        item: payload,
                        quantity: 1,
                    },
                });
                return response.data;
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }
    async delete(payload) {
        try {
            if (dataCookie) {
                const response = await axios.delete(`http://localhost:3000/v1/cart`, {
                    data: {
                        user_id: dataCookie.id,
                        item: payload,
                    },
                });
                return response.data.data;
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }
    async deleteCart() {
        try {
            if (dataCookie) {
                const response = await axios.delete(`http://localhost:3000/v1/deletecart`, {
                    data: {
                        user_id: dataCookie.id,
                    },
                });
                return response.data.data;
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Cart;
