document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("login").addEventListener("click", saveData);
});

function saveData() {
    // Get useremail and userpassword from input fields
    let useremail = document.getElementById("useremail").value;
    let userpassword = document.getElementById("userpassword").value;

    // Get user records from localStorage
    let user_records = JSON.parse(localStorage.getItem("users")) || [];

    // Check if there are any matching records
    let matchingUser = user_records.find((v) => v.useremail === useremail && v.userpassword === userpassword);

    if (matchingUser) {
        alert("Login Successfully");
        let current_user=user_records.filter((v)=>{
          return v.useremail==useremail &&v.userpassword==userpassword
        })[0]
        localStorage.setItem("username",current_user.username);
        localStorage.setItem("useremail",current_user.useremail);
        window.location.href='../index.html';

    } else {
        // Check specific cases for displaying appropriate error messages
        let emailExists = user_records.some((v) => v.useremail === useremail);
        let passwordMatch = user_records.some((v) => v.useremail !== useremail && v.userpassword === userpassword);

        if (emailExists && !passwordMatch) {
            alert("Wrong Password");
        } else if (!emailExists) {
            alert("This Email isn't Exist");
        } else {
            alert("Wrong Email and Password");
        }
    }
}
