const Cookies = require('js-cookie')

class CookieUtils{
    setCookie(name,value,expires){
        Cookies.set(name,JSON.stringify(value),expires)
    }

    getCookie(name){
        const dataCookieJson = Cookies.get(name)
        if(dataCookieJson){
            const dataCookieObject = JSON.parse(dataCookieJson)
            return dataCookieObject
        } else {
            return ""
        }
    }

    removeCookie(name){
        Cookies.remove(name)
    }
}

export default CookieUtils