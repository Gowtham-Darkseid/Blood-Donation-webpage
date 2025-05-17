
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
        
        bloodTypes.forEach(type => {
            type.addEventListener('click', () => {
                bloodTypes.forEach(t => t.classList.remove('selected'));
                type.classList.add('selected');
                bloodTypeInput.value = type.getAttribute('data-type');
            });
        });
        
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            console.log('Login attempt with:', { email, password });
            
            alert('Login successful! Redirecting to dashboard...');
        });
        
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = {
                firstName: document.getElementById('first-name').value,
                lastName: document.getElementById('last-name').value,
                email: document.getElementById('register-email').value,
                password: document.getElementById('register-password').value,
                phone: document.getElementById('phone').value,
                bloodType: bloodTypeInput.value,
                location: document.getElementById('location').value
            };
            
            if (!formData.bloodType) {
                alert('Please select your blood type');
                return;
            }
            
            console.log('Registration attempt with:', formData);
            
            alert('Registration successful! Welcome to our donor community.');
            
            registerForm.reset();
            bloodTypes.forEach(t => t.classList.remove('selected'));
            bloodTypeInput.value = '';
            signinTab.click();
        });
        
        function signInWithGoogle() {
            console.log('Signing in with Google...');
            alert('Redirecting to Google Sign-In...');
        }
        
        function signInWithFacebook() {
            console.log('Signing in with Facebook...');
            alert('Redirecting to Facebook Login...');
        }
        
        function signInWithApple() {
            console.log('Signing in with Apple...');
            alert('Redirecting to Apple Sign-In...');
        }
        
        function signUpWithGoogle() {
            console.log('Signing up with Google...');
            alert('Redirecting to Google Sign-In for registration...');
        }
        
        function signUpWithFacebook() {
            console.log('Signing up with Facebook...');
            alert('Redirecting to Facebook Login for registration...');
        }
        
        function signUpWithApple() {
            console.log('Signing up with Apple...');
            alert('Redirecting to Apple Sign-In for registration...');
        }
        
        document.querySelector('.blood-type').click();
