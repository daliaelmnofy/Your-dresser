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
    let admin = document.getElementById("adminName").value.trim();
    let email = document.getElementById("adminEmail").value.trim();
    let passw1 = document.getElementById("adminPassword").value.trim();
    let passw2 = document.getElementById("conadminPassword").value.trim();

    setSuccess(document.getElementById("adminName"));
    setSuccess(document.getElementById("adminEmail"));
    setSuccess(document.getElementById("adminPassword"));
    setSuccess(document.getElementById("conadminPassword"));

    if (admin === "") {
        setError(document.getElementById("adminName"), "adminName is required");
    } else if (!userFormat(admin)) {
        setError(document.getElementById("adminName"), "Digits are not allowed in the adminName");
    }

    if (email === "") {
        setError(document.getElementById("adminEmail"), "Email is required");
    } else if (!mailFormat(email)) {
        setError(document.getElementById("adminEmail"), "Please enter a valid email");
    }

    if (passw1 === "") {
        setError(document.getElementById("adminPassword"), "Password is required");
    } else if (!passFormat(passw1)) {
        setError(document.getElementById("adminPassword"), "Password must meet the criteria");
    }

    if (passw2 === "") {
        setError(document.getElementById("conadminPassword"), "Please confirm your password");
    } else if (passw2 !== passw1) {
        setError(document.getElementById("conadminPassword"), "Passwords don't match");
    } else if (!passFormat(passw2)) {
        setError(document.getElementById("conadminPassword"), "Password must meet the criteria");
    }

    if (
        !document.getElementById("adminName").parentElement.classList.contains("error") &&
        !document.getElementById("adminEmail").parentElement.classList.contains("error") &&
        !document.getElementById("adminPassword").parentElement.classList.contains("error") &&
        !document.getElementById("conadminPassword").parentElement.classList.contains("error")
    ) {
        storeData();
    }
}

function storeData() {

    let adminName = document.getElementById("adminName").value;
    let adminEmail = document.getElementById("adminEmail").value;
    let adminPassword = document.getElementById("adminPassword").value;
    let admin_records = JSON.parse(localStorage.getItem("admins")) || [];
    
    if (admin_records.some((v) => v.adminEmail === adminEmail)) {
        alert("This email is already in use");
    } else {
        admin_records.push({
            "adminName": adminName,
            "adminEmail": adminEmail,
            "adminPassword": adminPassword
        });
        localStorage.setItem("admins", JSON.stringify(admin_records));
        alert("Registration successful!");
        window.location.href='adminLogin.html';

    }
}

function userFormat(u) {
    const re = /[^0-9]/;
    return re.test(u);
}
