        // Mobile menu toggle
        document.getElementById('mobile-menu-button').addEventListener('click', function() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        });

        // FAQ accordion
        const faqQuestions = document.querySelectorAll('.faq-question');
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                const icon = question.querySelector('i');
                
                // Toggle answer
                answer.classList.toggle('hidden');
                
                // Rotate icon
                if (answer.classList.contains('hidden')) {
                    icon.classList.remove('transform', 'rotate-180');
                } else {
                    icon.classList.add('transform', 'rotate-180');
                }
                
                // Close other open answers
                faqQuestions.forEach(q => {
                    if (q !== question) {
                        q.nextElementSibling.classList.add('hidden');
                        q.querySelector('i').classList.remove('transform', 'rotate-180');
                    }
                });
            });
        });

        // Back to top button
        const backToTopButton = document.getElementById('back-to-top');
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.remove('opacity-0', 'invisible');
                backToTopButton.classList.add('opacity-100', 'visible');
            } else {
                backToTopButton.classList.remove('opacity-100', 'visible');
                backToTopButton.classList.add('opacity-0', 'invisible');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const mobileMenu = document.getElementById('mobile-menu');
                    if (!mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                    }
                }
            });
        });

        // Form submission handling
        document.getElementById('eligibility-form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for checking your eligibility! Our team will review your information and contact you shortly.');
            this.reset();
        });

        // Animation on scroll
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.fade-in, .slide-in');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if (elementPosition < screenPosition) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        };

        // Set initial state for animated elements
        document.querySelectorAll('.fade-in, .slide-in').forEach(element => {
            element.style.opacity = '0';
        });

        window.addEventListener('scroll', animateOnScroll);
        window.addEventListener('load', animateOnScroll);