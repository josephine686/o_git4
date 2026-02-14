const loginMail = document.querySelector("input[name='email']")
const loginPasswd = document.querySelector("input[name='passwd']")
const form = document.getElementById("form-id");
let responseToken= ""


if(window.sessionStorage.getItem("token") === null){
    
    form.addEventListener("submit", async (event) => {
        event.preventDefault()

        const passwdDynaOk = document.getElementById("logDynaOk")
        const passwdDynaEr = document.getElementById("logDynaEr")
        const mailValue = loginMail.value
        const passwdValue = loginPasswd.value

        const loginData = {
                email: mailValue,
                password: passwdValue
            }
        
        const response = await fetch("http://localhost:5678/api/users/login",{
            method : "POST",
            headers : {"Content-Type":"application/json; charset=UTF-8"},
            body : JSON.stringify(loginData)
        })

        if (response.status === 200){
            console.log("login ok")

            responseToken = await response.json()
            console.log(responseToken)

            const token = responseToken.token
            const userId = responseToken.userId
            console.log(token + userId)
            
            window.sessionStorage.setItem("token", token)
            window.sessionStorage.setItem("userId", userId)

            window.location.href = "homepage_edit.html"

        }else{
            console.log("error log" + response.status)
            passwdDynaOk.classList.add("h2Masque")
            passwdDynaEr.classList.remove("h2Masque")
        }
        
    })
}else{
    window.location.href="homepage_edit.html"
}
