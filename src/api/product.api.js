const axios = require('axios');

class Product{
    async getAll(){
        try {
            const response = await axios.get("http://localhost:3000/v1/product")
            return response.data.data    
        } catch (error) {
            throw error

        }
    }
}

module.exports =  Product