document.addEventListener('DOMContentLoaded', () => {
  // Firebase configuration
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
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const database = getDatabase(app);
  const storage = getStorage(app);

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

  // Check if elements are found
  console.log('submitButton:', submitButton);
  console.log('emailInput:', emailInput);
  console.log('passwordInput:', passwordInput);
  console.log('signUpButton:', signUpButton);
  console.log('logoutButton:', logoutButton);
  console.log('editProfileButton:', editProfileButton);
  console.log('saveProfileButton:', saveProfileButton);
  console.log('profilePicUpload:', profilePicUpload);
  console.log('profilePicDisplay:', profilePicDisplay);
  console.log('profileNameInput:', profileNameInput);
  console.log('profileEmailInput:', profileEmailInput);
  console.log('profilePhoneInput:', profilePhoneInput);

  // Add event listeners if elements are found
  if (submitButton) {
    submitButton.addEventListener("click", () => {
      const email = emailInput.value;
      const password = passwordInput.value;

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          window.alert("Login successful! Redirecting to home page...");
          window.location.href = "home.html"; // Redirect to the homepage
        })
        .catch((error) => {
          window.alert(`Login failed: ${error.message}`);
        });
    });
  }

  if (signUpButton) {
    signUpButton.addEventListener("click", () => {
      const email = emailInput.value;
      const password = passwordInput.value;

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          window.alert("Account created successfully! Redirecting to home page...");
          window.location.href = "home.html"; // Redirect to the homepage after registration
        })
        .catch((error) => {
          window.alert(`Error creating account: ${error.message}`);
        });
    });
  }

  if (profilePicUpload) {
    profilePicUpload.addEventListener("change", (event) => {
      const reader = new FileReader();
      updatedProfilePicFile = event.target.files[0];

      reader.onload = function (e) {
        profilePicDisplay.src = e.target.result; // Preview the new image
      };
      reader.readAsDataURL(updatedProfilePicFile);
    });
  }

  if (editProfileButton) {
    editProfileButton.addEventListener("click", () => {
      profileNameInput.disabled = false;
      profilePhoneInput.disabled = false;
      profilePicUpload.style.display = "block";
      saveProfileButton.style.display = "inline-block";
      editProfileButton.style.display = "none";
    });
  }

  if (saveProfileButton) {
    saveProfileButton.addEventListener("click", () => {
      const updatedName = profileNameInput.value;
      const updatedPhone = profilePhoneInput.value;

      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;

        if (updatedProfilePicFile) {
          const profilePictureRef = storageRef(storage, 'profile_pictures/' + uid + '.jpg');

          uploadBytes(profilePictureRef, updatedProfilePicFile).then(() => {
            getDownloadURL(profilePictureRef).then(url => {
              update(ref(database, 'users/' + uid), {
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
          update(ref(database, 'users/' + uid), {
            name: updatedName,
            phone: updatedPhone
          });
        }

        profileNameInput.disabled = true;
        profilePhoneInput.disabled = true;
        profilePicUpload.style.display = "none";
        saveProfileButton.style.display = "none";
        editProfileButton.style.display = "inline-block";

        window.alert("Profile updated successfully!");
      }
    });
  }

  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      auth.signOut().then(() => {
        window.alert("Logged out successfully!");
        window.location.href = "index.html"; // Redirect to login after logging out
      }).catch(error => {
        console.error("Error logging out:", error);
      });
    });
  }
});
