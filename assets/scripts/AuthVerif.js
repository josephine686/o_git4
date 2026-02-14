const token = window.sessionStorage.getItem("token")

if(!token){
    window.location.href = "login.html"
}