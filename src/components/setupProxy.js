const proxy =  require("http-proxy-middleware")

module.exports = function(app){
    app.use(
        proxy("/users",{
            target:"localhost:8000/api/users",
            secure:false,
            changeOrigin:true
        })
    );
    app.use(
        proxy("/auth",{
            target:"localhost:8000/api/auth",
            secure:false,
            changeOrigin:true
        })
    );
};