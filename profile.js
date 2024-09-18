// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGgjxRmwVBgJ2NOp2akkOad5hVmYjPA8c",
  authDomain: "frrdrj-a460a.firebaseapp.com",
  databaseURL: "https://frrdrj-a460a-default-rtdb.firebaseio.com",
  projectId: "frrdrj-a460a",
  storageBucket: "frrdrj-a460a.appspot.com",
  messagingSenderId: "352280969666",
  appId: "1:352280969666:web:af8289699716b8a6b8165b",
  measurementId: "G-LE0D05SZV2"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();
const storage = firebase.storage();

// DOM Elements
const registerBtn = document.getElementById('register-btn');
const loginBtn = document.getElementById('login-btn');
const registerEmail = document.getElementById('register-email');
const registerPassword = document.getElementById('register-password');
const registerProfilePic = document.getElementById('register-profile-pic');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');

// Register Functionality
registerBtn.addEventListener('click', () => {
  const email = registerEmail.value;
  const password = registerPassword.value;
  const profilePicFile = registerProfilePic.files[0];

  // Register the user
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const uid = user.uid;

      // Upload profile picture to Firebase Storage
      const profilePicRef = storage.ref('profile_pictures/' + uid + '.jpg');
      if (profilePicFile) {
        profilePicRef.put(profilePicFile).then(() => {
          // Get the profile picture URL
          profilePicRef.getDownloadURL().then(url => {
            // Save user data to the Realtime Database
            database.ref('users/' + uid).set({
              email: email,
              profilePicture: url
            }).then(() => {
              window.alert("User registered successfully!");
            }).catch(error => {
              console.error("Error saving user data:", error);
            });
          }).catch(error => {
            console.error("Error getting profile picture URL:", error);
          });
        }).catch(error => {
          console.error("Error uploading profile picture:", error);
        });
      } else {
        window.alert("Please upload a profile picture.");
      }
    })
    .catch((error) => {
      window.alert(`Registration failed: ${error.message}`);
    });
});

// Login Functionality
loginBtn.addEventListener('click', () => {
  const email = loginEmail.value;
  const password = loginPassword.value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      window.alert("Login successful!");
      window.location.href = "profile.html"; // Redirect to profile page after login
    })
    .catch((error) => {
      window.alert(`Login failed: ${error.message}`);
    });
});
