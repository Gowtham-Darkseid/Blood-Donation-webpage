 document.getElementById('mobile-menu-button').addEventListener('click', function() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        });

        // Back to top button
        window.addEventListener('scroll', function() {
            const backToTopButton = document.getElementById('back-to-top');
            if (window.pageYOffset > 300) {
                backToTopButton.classList.remove('opacity-0', 'invisible');
                backToTopButton.classList.add('opacity-100', 'visible');
            } else {
                backToTopButton.classList.remove('opacity-100', 'visible');
                backToTopButton.classList.add('opacity-0', 'invisible');
            }
        });

        document.getElementById('back-to-top').addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // FAQ accordion
        const faqQuestions = document.querySelectorAll('.faq-question');
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                this.classList.toggle('active');
                const answer = this.nextElementSibling;
                answer.classList.toggle('hidden');
            });
        });

        // Eligibility form submission
        document.getElementById('eligibility-form').addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would normally process the form data
            alert('Thank you for checking your eligibility! Our team will review your information and contact you soon.');
        });