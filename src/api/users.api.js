const axios = require('axios')
const url = "http://localhost:3000/v1"

class Users{
    async registration(payload){
        try {
            const response = await axios.post(`${url}/users/registration`,{
                name : payload.name,
                email : payload.email,
                password : payload.password,
            })
            return response.data
        } catch (error) {
            throw error
        }
    }
    async login(payload){
        try {
            const response = await axios.post(`${url}/users/login`,{
                email:payload.email,
                password:payload.password
            })
            return response.data
        } catch (error) {
            throw error
        }
    }
}

export default Users