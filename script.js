import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAGgjxRmwVBgJ2NOp2akkOad5hVmYjPA8c",
  authDomain: "frrdrj-a460a.firebaseapp.com",
  projectId: "frrdrj-a460a",
  storageBucket: "frrdrj-a460a.appspot.com",
  messagingSenderId: "352280969666",
  appId: "1:352280969666:web:af8289699716b8a6b8165b",
  measurementId: "G-LE0D05SZV2"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const submitButton = document.getElementById("submit");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const phoneInput = document.getElementById("phone-number");
const sendOtpButton = document.getElementById("send-otp");
const otpInput = document.getElementById("otp");
const otpLabel = document.getElementById("otp-label");
const verifyOtpButton = document.getElementById("verify-otp");

let recaptchaVerifier;

function setupRecaptcha() {
  recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
    'size': 'normal',
    'callback': (response) => {
      window.alert('Recaptcha verified.');
    }
  }, auth);
  recaptchaVerifier.render();
}

setupRecaptcha();

submitButton.addEventListener("click", () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      window.alert("Login successful! Welcome back!");
    })
    .catch((error) => {
      window.alert(`Login failed: ${error.message}`);
    });
});

sendOtpButton.addEventListener("click", () => {
  const phoneNumber = phoneInput.value;

  signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      otpLabel.style.display = "block";
      otpInput.style.display = "block";
      verifyOtpButton.style.display = "block";
      window.alert("OTP sent!");
    })
    .catch((error) => {
      window.alert(`Error sending OTP: ${error.message}`);
    });
});

verifyOtpButton.addEventListener("click", () => {
  const otp = otpInput.value;

  window.confirmationResult.confirm(otp).then((result) => {
    window.alert("Phone number verified successfully!");
  }).catch((error) => {
    window.alert(`Error verifying OTP: ${error.message}`);
  });
});

const signupButton = document.getElementById("sign-up");
const main = document.getElementById("main");
const createAcct = document.getElementById("create-acct");

signupButton.addEventListener("click", () => {
  main.style.display = "none";
  createAcct.style.display = "block";
});

const createAcctBtn = document.getElementById("create-acct-btn");
createAcctBtn.addEventListener("click", () => {
  const signupEmail = document.getElementById("email-signup").value;
  const signupPassword = document.getElementById("password-signup").value;

  createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
    .then((userCredential) => {
      window.alert("Account created successfully!");
    })
    .catch((error) => {
      window.alert(`Error creating account: ${error.message}`);
    });
});

const returnBtn = document.getElementById("return-btn");
returnBtn.addEventListener("click", () => {
  main.style.display = "block";
  createAcct.style.display = "none";
});
firm-password-signup");
const createacctbtn = document.getElementById("create-acct-btn");

const returnBtn = document.getElementById("return-btn");

var email, password, signupEmail, signupPassword, confirmSignupEmail, confirmSignUpPassword;

createacctbtn.addEventListener("click", function() {
  var isVerified = true;

  signupEmail = signupEmailIn.value;
  confirmSignupEmail = confirmSignupEmailIn.value;
  if(signupEmail != confirmSignupEmail) {
      window.alert("Email fields do not match. Try again.")
      isVerified = false;
  }

  signupPassword = signupPasswordIn.value;
  confirmSignUpPassword = confirmSignUpPasswordIn.value;
  if(signupPassword != confirmSignUpPassword) {
      window.alert("Password fields do not match. Try again.")
      isVerified = false;
  }
  
  if(signupEmail == null || confirmSignupEmail == null || signupPassword == null || confirmSignUpPassword == null) {
    window.alert("Please fill out all required fields.");
    isVerified = false;
  }
  
  if(isVerified) {
    createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
      .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
      window.alert("Success! Account created.");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      window.alert("Error occurred. Try again.");
    });
  }
});

submitButton.addEventListener("click", function() {
  email = emailInput.value;
  console.log(email);
  password = passwordInput.value;
  console.log(password);

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("Success! Welcome back!");
      window.alert("Success! Welcome back!");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error occurred. Try again.");
      window.alert("Error occurred. Try again.");
    });
});

signupButton.addEventListener("click", function() {
    main.style.display = "none";
    createacct.style.display = "block";
});

returnBtn.addEventListener("click", function() {
    main.style.display = "block";
    createacct.style.display = "none";
});
