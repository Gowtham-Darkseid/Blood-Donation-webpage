
         const signinTab = document.getElementById('signin-tab');
         const signupTab = document.getElementById('signup-tab');
         const signinForm = document.getElementById('signin-form');
         const signupForm = document.getElementById('signup-form');
         const toggleForms = document.querySelectorAll('.toggle-form');
         const bloodTypes = document.querySelectorAll('.blood-type');
         const bloodTypeInput = document.getElementById('blood-type');
         const loginForm = document.getElementById('loginForm');
         const registerForm = document.getElementById('registerForm');

         signinTab.addEventListener('click', () => {
             signinTab.classList.add('active');
             signupTab.classList.remove('active');
             signinForm.classList.remove('hidden');
             signupForm.classList.add('hidden');
         });

         signupTab.addEventListener('click', () => {
             signupTab.classList.add('active');
             signinTab.classList.remove('active');
             signupForm.classList.remove('hidden');
             signinForm.classList.add('hidden');
         });

         toggleForms.forEach(button => {
             button.addEventListener('click', () => {
                 const target = button.getAttribute('data-target');

                 if (target === 'signin') {
                     signinTab.click();
                 } else {
                     signupTab.click();
                 }
             });
         });


        import { initializeApp } from "https:www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https:www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBdJv8Gh6Bsz2oFyy6iFjROrim_UBhDnLY",
    authDomain: "blood-debec.firebaseapp.com",
    projectId: "blood-debec",
    storageBucket: "blood-debec.firebasestorage.app",
    messagingSenderId: "522052912092",
    appId: "1:522052912092:web:2afb25dc24e64ae47c0519",
    measurementId: "G-LLZB721K4H"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function signInWithGoogle() {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
           window.location.href = "index.html";
        })
        .catch((error) => {
            alert("Google sign-in failed: " + error.message);
        });
}

window.signInWithGoogle = signInWithGoogle;