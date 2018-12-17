 class CookieUtil{

    getCookieValue = param => {
        if (document.cookie.length > 0) {
            let cStart = document.cookie.indexOf(param + "=");
            if (cStart != -1) {
                cStart = cStart + param.length + 1;
                let cEnd = document.cookie.indexOf(";", cStart);
                if (cEnd == -1) cEnd = document.cookie.length;
                return decodeURI(document.cookie.substring(cStart, cEnd));
            }
        }
    }
 }

 export const cookieUtil =new CookieUtil();