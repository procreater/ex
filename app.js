var errors = function (err) {
    if (!errorFuncOpt) alert(JSON.stringify(err));
    else errorFuncOpt(err);
};
var app = { // ana sınıf oluşturuldu
    token: "C3N8zj73cgoGN0Q_19hvp5OT05QDWKM2-00hejsl9VCfo_7SpEDGMd1NbQj_oJvOHrPSJRAnEo7ZBP75wvOd82boU6qcv0w19CE1YG_SLyfO_VA29bEcbEbGs-2QNIfehcdzn2gUDyzehsgFojtH2BG7NRqzqzfBmH0u93HSh-3LRnIombFMa1onplURW9vWJjGLpQrAvuL0bdJUquZnXLVz5-kbStr8-2SNHDNDu4Km-xIgkRJ9HsKhgGN0XzqxLMVSPkvduX4IO6fCMT2j3yW0NvtH_t38DTPRBnqlUTgSGSSf52IK747VRHiWT4ZW1qkFfG0OAgvglUnk4jPpLpsel60znO-yehseCjibIF21EkM4bvx0ujzk-NhqAUFg516QpMemVzuwmzubymtzo6co46yEvWL1AWP96fuA-zAeKfbHDqHER8MusTC2JerZPVu0fP8E1VKijXO2PIBE7FKpNF9gQsShl_n2PaGzeJHn5nB4I4-VkZhnlHqinhGa",
    // token hazırlandı

    

    apiHostAddress: "http://valuetics-apps.cloudapp.net:8088",
    //apiHostAddress: "http://localhost:53566",

    query: function (method, url, data, successFunc, errorFuncOpt) {
        var _data;
        if (data) _data = data;
        $.ajax({
            method: method,
            url: app.apiHostAddress + url,
            data: _data,
            contentType: "application/json; charset=utf-8",
            success: successFunc,
            error: function (err) {
                if (!errorFuncOpt) console.log(err);
                else errorFuncOpt(err);
            }
        });
    },

    loadContent: function (contentAddress) {

        var loader = function (stringContent) {
            $(".body").html(stringContent);
        }
       
        $.ajax({
            method: "get",
            url: contentAddress,
            contentType: "text/html; charset=utf-8",
            success: loader,
            error: function (err) {
                alert(err);
            }
        }); // burda miss gibi telefonda da öyle olsun
    },

    queryWithToken: function (method, url, data, successFunc, errorFuncOpt) {
        var _data;
        if (data) _data = data;
        $.ajax({
            method: method,
            url: app.apiHostAddress + url,
            data: _data,
            contentType: "application/json; charset=utf-8",
            headers: { "Authorization": 'Bearer ' + token },
            success: successFunc,
            error: function (err) {
                if (!errorFuncOpt) console.log(err);
                else errorFuncOpt();
            }
        });
    },

    repeater: function (data, rowFunc, elementId) {
        var html = "";
        if (data.constructor === Array) {
            for (var i = 0; i < data.length; i++) {
                html += rowFunc(data[i]);
            }
        }
        else {
            html = rowFunc(data);
        }
        document.getElementById(elementId).innerHTML = html;
    },

    createTemplate: function(createRowFunc, elementId, finalizerFuncOpt)
    {
        return function (data) {
            app.repeater(data, createRowFunc, elementId);
            if (finalizerFuncOpt) finalizerFuncOpt();
        }
    },

    selectedItemId : -1,
}



//PRODUCTS
products = {
    //DATABASE OPERATIONS
    query: {

        getAll: function (successFunc) {
            app.query("get", "/api/products/getAll", null, successFunc);
        },

        getByCategory: function (categoryId, successFunc) {
            app.query("get", "/api/products/getByCategory/" + categoryId, null, successFunc);
        },

        getById: function (productId, successFunc) {
            app.query("get", "/api/products/getById/" + productId, null, successFunc);
        },

        getByCategories: function (successFunc) {
            app.query("get", "/api/productCategories/getProductCategories", null, successFunc);
        }
    },

    screen: {
        selectedProductId: -1
    }


}
// altta giriş yapmayanlara producst gösterme demiş ve products yolu /products.htmlymiş onu düzenledim ne ? anlattıyım gibi :D nanlamadım :D  / evet nie yol göster mı bozuyor
users = {
    query: {
        login: function (username, password) {
            var loginSuccess = function () {
                window.location = "products.html"
            }
            var loginFailed = function () {
                document.getElementById("error-box").innerHTML = "<div class='card-panel red lighten-1 blue-text text-darken-4'>Kullanıcı adı veya şifre yanlış!</div>";
            }

            //Pseudo Code
            var returnFunc = loginFailed;
            if (username = 1) returnFunc = loginSuccess;

            app.query("post", "/users/login", { "username": username, "password": password }, returnFunc, errorFunc)
        },

        logout: function () {
            var successFunc = function () {
                window.location = "/??"
            }
            var errorFunc = function () {
                //???
            }
            app.queryWithToken("post", "/users/logout", null, successFunc, errorFunc)
        }
    }
}


//PRODUCT CATEGORIES
categories = {
    //db operations
    query: {
        getAll: function (successFunc) {
            app.query("get", "/api/productcategories/getAll", null, successFunc);
        },
        getById: function(categoryId, successFunc) {
            app.query("get", "/api/ProductCategories/GetById/"+ categoryId, null, successFunc)
        }
    }
}