// console.log("Hello world");

function signIn () {
    const username = document.getElementById ("username").value;
    const password = document.getElementById ("password").value;

    if (username === "admin" & password === "admin123") {
        alert ("Congratulation! Your Sign In is Successful.");
        window.location.href ="../dashboard.html"
        
    }
    else{
        alert ("Invalid Sign In, Please try again.")
    }
}