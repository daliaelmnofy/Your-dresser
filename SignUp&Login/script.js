
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("submit-btn").addEventListener("click", validation);
});

const setError = (ele, msg) => {
    if (ele && ele.parentElement) {
        let box = ele.parentElement;
        let error = box.querySelector(".error");
        error.innerText = msg;
        box.classList.add("error");
        box.classList.remove("success");
    }
};

const setSuccess = (ele) => {
    if (ele && ele.parentElement) {
        let box = ele.parentElement;
        let error = box.querySelector(".error");
        error.innerText = "";
        box.classList.add("success");
        box.classList.remove("error");
    }
};

const mailFormat = (e) => {
    const re = /\w+@\w+\.\w+/;
    return re.test(String(e).toLowerCase());
};

const passFormat = (p) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/;
    return re.test(p);
};

function validation() {
    let user = document.getElementById("username").value.trim();
    let mail = document.getElementById("useremail").value.trim();
    let pass1 = document.getElementById("userpassword").value.trim();
    let pass2 = document.getElementById("conuserpassword").value.trim();

    setSuccess(document.getElementById("username"));
    setSuccess(document.getElementById("useremail"));
    setSuccess(document.getElementById("userpassword"));
    setSuccess(document.getElementById("conuserpassword"));

    if (user === "") {
        setError(document.getElementById("username"), "Username is required");
    } else if (!userFormat(user)) {
        setError(document.getElementById("username"), "Digits are not allowed in the username");
    }

    if (mail === "") {
        setError(document.getElementById("useremail"), "Email is required");
    } else if (!mailFormat(mail)) {
        setError(document.getElementById("useremail"), "Please enter a valid email");
    }

    if (pass1 === "") {
        setError(document.getElementById("userpassword"), "Password is required");
    } else if (!passFormat(pass1)) {
        setError(document.getElementById("userpassword"), "Password must meet the criteria");
    }

    if (pass2 === "") {
        setError(document.getElementById("conuserpassword"), "Please confirm your password");
    } else if (pass2 !== pass1) {
        setError(document.getElementById("conuserpassword"), "Passwords don't match");
    } else if (!passFormat(pass2)) {
        setError(document.getElementById("conuserpassword"), "Password must meet the criteria");
    }

    if (
        !document.getElementById("username").parentElement.classList.contains("error") &&
        !document.getElementById("useremail").parentElement.classList.contains("error") &&
        !document.getElementById("userpassword").parentElement.classList.contains("error") &&
        !document.getElementById("conuserpassword").parentElement.classList.contains("error")
    ) {
        storeData();
    }
}

function storeData() {

    let username = document.getElementById("username").value;
    let useremail = document.getElementById("useremail").value;
    let userpassword = document.getElementById("userpassword").value;
    let user_records = JSON.parse(localStorage.getItem("users")) || [];
    
    if (user_records.some((v) => v.useremail === useremail)) {
        alert("This email is already in use");
    } else {
        user_records.push({
            "username": username,
            "useremail": useremail,
            "userpassword": userpassword
        });
        localStorage.setItem("users", JSON.stringify(user_records));
        alert("Registration successful!");
        window.location.href='LOGIN.html';

    }
}

function userFormat(u) {
    const re = /[^0-9]/;
    return re.test(u);
}
