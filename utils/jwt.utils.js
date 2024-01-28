const jwt = require('jsonwebtoken')

class JwtUtils{
    constructor(){
        this.jwt = jwt
    }
    decoded(token){
        const decoded = this.jwt.decode(token)
        return decoded

    }
}

export default JwtUtils