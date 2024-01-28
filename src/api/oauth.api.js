import { useRouter } from "next/router";
import CookieUtils from "../../utils/cookie.utils";
import JwtUtils from "../../utils/jwt.utils";

class Oauth {
    constructor() {
        this.router = useRouter();
        this.jwtUtils = new JwtUtils();
        this.cookie = new CookieUtils();
    }

    async login() {
        const token = this.router.query.user;
        if (token) {
            const decodedToken = this.jwtUtils.decoded(token);
            this.cookie.setCookie(
                "user-access",
                {
                    name: decodedToken.name,
                    id: decodedToken.id,
                    token: token,
                },
                { expires: 1 }
            );
            window.location.href = "/"
        }
    }
}
export default Oauth;
