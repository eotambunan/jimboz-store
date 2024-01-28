const axios = require("axios");
import CookieUtils from "../../utils/cookie.utils";

const cookie = new CookieUtils();
const dataCookie = cookie.getCookie("user-access");

class Payment {
    async pay(payload) {
        console.log(payload)
        try {
            if (dataCookie) {
                const response = await axios.post(`http://localhost:3000/v1/payment`, {
                    user_id: dataCookie.id,
                    price : payload.price,
                    orderId : payload.order_id
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

module.exports = Payment;
