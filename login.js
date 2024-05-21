function showSignupForm() {
    document.getElementById('loginBox').style.display = 'none';
    document.getElementById('signupBox').style.display = 'block';
}

function showLoginForm() {
    document.getElementById('signupBox').style.display = 'none';
    document.getElementById('loginBox').style.display = 'block';
}
function validateEmail(email) {
    return email.endsWith('@gmail.com');
}

// Validate email during sign up
document.getElementById('signupForm').onsubmit = function(event) {
    const emailInput = document.getElementById('signupEmail');
    if (!validateEmail(emailInput.value)) {
        alert('Please use a Gmail account for sign up.');
        event.preventDefault(); // Prevent form submission if email is invalid
    }
}

// Validate email during login
document.getElementById('loginForm').onsubmit = function(event) {
    const emailInput = document.getElementById('loginUsername');
    if (!validateEmail(emailInput.value)) {
        alert('Please use a Gmail account for login.');
        event.preventDefault(); // Prevent form submission if email is invalid
    }
}

// Define a function to handle form submission
function login(event) {
    event.preventDefault(); // Prevent default form submission
    
    // Retrieve username and password entered by the user
    var username = document.getElementById("loginUsername").value;
    var password = document.getElementById("loginPassword").value;
    
    // You can add your authentication logic here
    // For simplicity, let's assume a hardcoded username and password
    var validUsername = "app@gmail.com"; // Change this to your valid username
    var validPassword = "password123"; // Change this to your valid password
    
    // Check if entered username and password match the valid ones
    if (username === validUsername && password === validPassword) {
      // If credentials are valid, redirect to dashboard or perform any desired action
      window.location.href = "dasboard.html"; // Redirect to the dashboard page
    } else {
      // If credentials are not valid, display an error message
      alert("Invalid username or password. Please try again.");
    }
  }
  
  // Add event listener to the login form
  document.getElementById("loginForm").addEventListener("submit", login);
  