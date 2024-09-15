// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGgjxRmwVBgJ2NOp2akkOad5hVmYjPA8c",
  authDomain: "frrdrj-a460a.firebaseapp.com",
  projectId: "frrdrj-a460a",
  storageBucket: "frrdrj-a460a.appspot.com",
  messagingSenderId: "352280969666",
  appId: "1:352280969666:web:af8289699716b8a6b8165b",
  measurementId: "G-LE0D05SZV2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firestore Database Reference
const db = firebase.firestore();

// Form Submission
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  
  // Save Data to Firestore
  db.collection('contacts').add({
    name: name,
    email: email
  }).then(() => {
    alert("Message sent successfully!");
    document.getElementById('contactForm').reset();
  }).catch((error) => {
    console.error("Error saving message: ", error);
  });
});
