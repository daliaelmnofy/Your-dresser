document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("adminLogin").addEventListener("click", saveDataa);
  });
  function saveDataa() {
    // Get useremail and userpassword from input fields
    let adminEmail = document.getElementById("adminEmail").value;
    let adminPassword = document.getElementById("adminPassword").value;

    // Get user records from localStorage
    let admin_records = JSON.parse(localStorage.getItem("admins")) || [];

    // Check if there are any matching records
    let matchingAdmin = admin_records.find((v) => v.adminEmail === adminEmail && v.adminPassword === adminPassword);
    if (matchingAdmin) {
        alert("Login Successfully");
        let current_admin=admin_records.filter((v)=>{
          return v.adminEmail==adminEmail &&v.adminPassword==adminPassword
        })[0]
        localStorage.setItem("adminName",current_admin.adminName);
        localStorage.setItem("adminEmail",current_admin.adminEmail);
        window.location.href='../Admin/Admin/index.html';

  }
  else {
    // Check specific cases for displaying appropriate error messages
    let emailExist = admin_records.some((v) => v.adminEmail === adminEmail);
    let passMatch = admin_records.some((v) => v.adminEmail !== adminEmail && v.adminPassword === adminPassword);

    if (emailExist && !passMatch) {
        alert("Wrong Password");
     }  
    else if (!emailExist) {
        alert("This Email isn't Exist");
    }  
    else {
        alert("Wrong Email and Password");
    }
}}
