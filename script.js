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

// Elements
const submitButton = document.getElementById("submit");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const phoneInput = document.getElementById("phone-number");
const sendOtpButton = document.getElementById("send-otp");
const otpInput = document.getElementById("otp");
const otpLabel = document.getElementById("otp-label");
const verifyOtpButton = document.getElementById("verify-otp");

let recaptchaVerifier;

// Initialize reCAPTCHA
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

// Email and Password Login
submitButton.addEventListener("click", () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      window.alert("Login successful! Welcome back!");
      // Redirect to home page after successful login
      window.location.href = "home.html";
    })
    .catch((error) => {
      window.alert(`Login failed: ${error.message}`);
    });
});

// Phone Number OTP
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
    // Redirect to home page after successful OTP verification
    window.location.href = "home.html";
  }).catch((error) => {
    window.alert(`Error verifying OTP: ${error.message}`);
  });
});

// Signup Page Switch
const signupButton = document.getElementById("sign-up");
const main = document.getElementById("main");
const createAcct = document.getElementById("create-acct");

signupButton.addEventListener("click", () => {
  main.style.display = "none";
  createAcct.style.display = "block";
});

// Account Creation
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

// Return to Main Login Page
const returnBtn = document.getElementById("return-btn");
returnBtn.addEventListener("click", () => {
  main.style.display = "block";
  createAcct.style.display = "none";
});

// Protect home.html (Code to add in home.html)
window.addEventListener('load', () => {
  auth.onAuthStateChanged((user) => {
    if (!user) {
      // Redirect to login page if the user is not logged in
      window.location.href = "login.html";
    }
  });
});

// Logout Functionality (in home.html)
const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", () => {
  auth.signOut().then(() => {
    window.alert("Logged out successfully!");
    window.location.href = "login.html";
  }).catch((error) => {
    window.alert(`Error logging out: ${error.message}`);
  });
});
 
 
 
 // Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const auth = firebase.auth();
const storage = firebase.storage();

// Get Elements
const submitButton = document.getElementById("submit");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signUpButton = document.getElementById("sign-up");
const logoutButton = document.getElementById("logout");
const editProfileButton = document.getElementById("edit-profile");
const saveProfileButton = document.getElementById("save-profile");
const profilePicUpload = document.getElementById("profile-pic-upload");
const profilePicDisplay = document.getElementById("profile-pic");
const profileNameInput = document.getElementById("profile-name");
const profileEmailInput = document.getElementById("profile-email");
const profilePhoneInput = document.getElementById("profile-phone");
let updatedProfilePicFile = null;

// On successful login, redirect to home page
submitButton.addEventListener("click", () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      window.alert("Login successful! Redirecting to home page...");
      window.location.href = "home.html"; // Redirect to the homepage
    })
    .catch((error) => {
      window.alert(`Login failed: ${error.message}`);
    });
});

// Register new users
signUpButton.addEventListener("click", () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      window.alert("Account created successfully! Redirecting to home page...");
      window.location.href = "home.html"; // Redirect to the homepage after registration
    })
    .catch((error) => {
      window.alert(`Error creating account: ${error.message}`);
    });
});

// Add user data to the database
function addUserData(uid, name, phone, email, profilePicture) {
  firebase.database().ref('users/' + uid).set({
    name: name,
    phone: phone,
    email: email,
    profilePicture: profilePicture || 'default-profile-pic.png'
  });
}

// Store user data on profile edit
function updateUserData(uid, updatedData) {
  firebase.database().ref('users/' + uid).update(updatedData);
}

// Display user data on homepage
function displayUserData(uid) {
  const userRef = database.ref('users/' + uid);
  
  userRef.once('value').then(snapshot => {
    const userData = snapshot.val();
    profileNameInput.value = userData.name;
    profileEmailInput.value = userData.email;
    profilePhoneInput.value = userData.phone;
    profilePicDisplay.src = userData.profilePicture;
  });
}

// Preview uploaded image
profilePicUpload.addEventListener("change", (event) => {
  const reader = new FileReader();
  updatedProfilePicFile = event.target.files[0];
  
  reader.onload = function (e) {
    profilePicDisplay.src = e.target.result; // Preview the new image
  };
  reader.readAsDataURL(updatedProfilePicFile);
});

// Edit mode: Enable inputs for editing
editProfileButton.addEventListener("click", () => {
  profileNameInput.disabled = false;
  profilePhoneInput.disabled = false;
  profilePicUpload.style.display = "block";
  saveProfileButton.style.display = "inline-block";
  editProfileButton.style.display = "none";
});

// Save profile changes
saveProfileButton.addEventListener("click", () => {
  const updatedName = profileNameInput.value;
  const updatedPhone = profilePhoneInput.value;
  
  const user = auth.currentUser;
  if (user) {
    const uid = user.uid;

    // Update profile picture in Firebase Storage if a new picture is uploaded
    if (updatedProfilePicFile) {
      const storageRef = firebase.storage().ref();
      const profilePicRef = storageRef.child('profile_pictures/' + uid + '.jpg');
      
      profilePicRef.put(updatedProfilePicFile).then(() => {
        profilePicRef.getDownloadURL().then(url => {
          updateUserData(uid, {
            name: updatedName,
            phone: updatedPhone,
            profilePicture: url
          });
          profilePicDisplay.src = url;
        });
      });
    } else {
      updateUserData(uid, {
        name: updatedName,
        phone: updatedPhone
      });
    }

    // Disable edit mode
    profileNameInput.disabled = true;
    profilePhoneInput.disabled = true;
    profilePicUpload.style.display = "none";
    saveProfileButton.style.display = "none";
    editProfileButton.style.display = "inline-block";

    window.alert("Profile updated successfully!");
  }
});

// Ensure user is logged in before accessing the home page
auth.onAuthStateChanged(user => {
  if (user) {
    const uid = user.uid;
    displayUserData(uid); // Load the user data if authenticated
  } else {
    window.location.href = "index.html"; // Redirect to login if not authenticated
  }
});

// Logout function
logoutButton.addEventListener("click", () => {
  auth.signOut().then(() => {
    window.location.href = "index.html"; // Redirect to login after logging out
  });
});
      
     // Firebase configuration const firebaseConfig = { apiKey: "AIzaSyAGgjxRmwVBgJ2NOp2akkOad5hVmYjPA8c", authDomain: "frrdrj-a460a.firebaseapp.com", databaseURL: "https://frrdrj-a460a-default-rtdb.firebaseio.com", // Firebase Realtime Database URL projectId: "frrdrj-a460a", storageBucket: "frrdrj-a460a.appspot.com", messagingSenderId: "352280969666", appId: "1:352280969666:web:af8289699716b8a6b8165b", measurementId: "G-LE0D05SZV2" }; // Initialize Firebase const app = initializeApp(firebaseConfig); const auth = getAuth(app); const database = getDatabase(app); const storage = getStorage(app);
// Get Elements
const submitButton = document.getElementById("submit");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signUpButton = document.getElementById("sign-up");
const logoutButton = document.getElementById("logout");
const editProfileButton = document.getElementById("edit-profile");
const saveProfileButton = document.getElementById("save-profile");
const profilePicUpload = document.getElementById("profile-pic-upload");
const profilePicDisplay = document.getElementById("profile-pic");
const profileNameInput = document.getElementById("profile-name");
const profileEmailInput = document.getElementById("profile-email");
const profilePhoneInput = document.getElementById("profile-phone");
let updatedProfilePicFile = null;

// On successful login, redirect to home page
submitButton.addEventListener("click", () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      window.alert("Login successful! Redirecting to home page...");
      window.location.href = "home.html"; // Redirect to the homepage
    })
    .catch((error) => {
      window.alert(`Login failed: ${error.message}`);
    });
});

// Register new users
signUpButton.addEventListener("click", () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      window.alert("Account created successfully! Redirecting to home page...");
      window.location.href = "home.html"; // Redirect to the homepage after registration
    })
    .catch((error) => {
      window.alert(`Error creating account: ${error.message}`);
    });
});

// Add user data to the database
function addUserData(uid, name, phone, email, profilePicture) {
  database.ref('users/' + uid).set({
    name: name,
    phone: phone,
    email: email,
    profilePicture: profilePicture || 'default-profile-pic.png'
  });
}

// Store user data on profile edit
function updateUserData(uid, updatedData) {
  database.ref('users/' + uid).update(updatedData);
}

// Display user data on homepage
function displayUserData(uid) {
  const userRef = database.ref('users/' + uid);
  
  userRef.once('value').then(snapshot => {
    const userData = snapshot.val();
    profileNameInput.value = userData.name;
    profileEmailInput.value = userData.email;
    profilePhoneInput.value = userData.phone;
    profilePicDisplay.src = userData.profilePicture;
  }).catch(error => {
    console.error("Error fetching user data:", error);
  });
}

// Preview uploaded image
profilePicUpload.addEventListener("change", (event) => {
  const reader = new FileReader();
  updatedProfilePicFile = event.target.files[0];
  
  reader.onload = function (e) {
    profilePicDisplay.src = e.target.result; // Preview the new image
  };
  reader.readAsDataURL(updatedProfilePicFile);
});

// Edit mode: Enable inputs for editing
editProfileButton.addEventListener("click", () => {
  profileNameInput.disabled = false;
  profilePhoneInput.disabled = false;
  profilePicUpload.style.display = "block";
  saveProfileButton.style.display = "inline-block";
  editProfileButton.style.display = "none";
});

// Save profile changes
saveProfileButton.addEventListener("click", () => {
  const updatedName = profileNameInput.value;
  const updatedPhone = profilePhoneInput.value;
  
  const user = auth.currentUser;
  if (user) {
    const uid = user.uid;

    // Update profile picture in Firebase Storage if a new picture is uploaded
    if (updatedProfilePicFile) {
      const storageRef = storage.ref();
      const profilePicRef = storageRef.child('profile_pictures/' + uid + '.jpg');
      
      profilePicRef.put(updatedProfilePicFile).then(() => {
        profilePicRef.getDownloadURL().then(url => {
          updateUserData(uid, {
            name: updatedName,
            phone: updatedPhone,
            profilePicture: url
          });
          profilePicDisplay.src = url;
        }).catch(error => {
          console.error("Error getting download URL:", error);
        });
      }).catch(error => {
        console.error("Error uploading file:", error);
      });
    } else {
      updateUserData(uid, {
        name: updatedName,
        phone: updatedPhone
      });
    }

    // Disable edit mode
    profileNameInput.disabled = true;
    profilePhoneInput.disabled = true;
    profilePicUpload.style.display = "none";
    saveProfileButton.style.display = "none";
    editProfileButton.style.display = "inline-block";

    window.alert("Profile updated successfully!");
  }
});

// Ensure user is logged in before accessing the home page
auth.onAuthStateChanged(user => {
  if (user) {
    const uid = user.uid;
    displayUserData(uid); // Load the user data if authenticated
  } else {
    window.location.href = "index.html"; // Redirect to login if not authenticated
  }
});

// Logout function
logoutButton.addEventListener("click", () => {
  auth.signOut().then(() => {
    window.location.href = "index.html"; // Redirect to login after logging out
  }).catch(error => {
    console.error("Error logging out:", error);
  });
});
