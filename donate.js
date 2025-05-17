 document.getElementById('mobile-menu-button').addEventListener('click', function() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        });

        // Eligibility form submission
        document.getElementById('eligibility-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const age = parseInt(this.querySelector('input[type="number"]').value);
            const weight = parseInt(this.querySelectorAll('input[type="number"]')[1].value);
            const recentDonation = this.querySelector('input[name="recent-donation"]:checked').value;
            
            let eligible = true;
            let message = "You appear to be eligible to donate blood!";
            
            if (age < 17) {
                eligible = false;
                message = "You must be at least 17 years old to donate (16 with parental consent).";
            } else if (weight < 110) {
                eligible = false;
                message = "You must weigh at least 110 pounds (50 kg) to donate.";
            } else if (recentDonation === 'yes') {
                eligible = false;
                message = "You must wait at least 56 days between blood donations.";
            }
            
            alert(message);
            
            if (eligible) {
                // Scroll to donation form
                document.getElementById('donation-form').scrollIntoView({ behavior: 'smooth' });
            }
        });

        // Blood type selector
        document.querySelectorAll('.blood-type-selector input').forEach(input => {
            input.addEventListener('change', function() {
                document.querySelectorAll('.blood-type-label').forEach(label => {
                    label.classList.remove('border-red-600', 'bg-red-50');
                });
                
                if (this.checked) {
                    const label = this.nextElementSibling;
                    label.classList.add('border-red-600', 'bg-red-50');
                }
            });
        });

        // Eligibility checkboxes
        document.querySelectorAll('.eligibility-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const label = this.nextElementSibling;
                
                if (this.checked) {
                    label.classList.add('bg-red-600', 'text-white');
                } else {
                    label.classList.remove('bg-red-600', 'text-white');
                }
            });
        });

        // FAQ accordion
        document.querySelectorAll('.faq-question').forEach(button => {
            button.addEventListener('click', () => {
                const answer = button.nextElementSibling;
                const icon = button.querySelector('i');
                
                answer.classList.toggle('hidden');
                icon.classList.toggle('transform');
                icon.classList.toggle('rotate-180');
            });
        });

        // Donation form submission
        document.getElementById('donation-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Check if all eligibility checkboxes are checked
            const allChecked = Array.from(document.querySelectorAll('.eligibility-checkbox')).every(checkbox => checkbox.checked);
            
            if (!allChecked) {
                alert('Please confirm all eligibility requirements before submitting.');
                return;
            }
            
            // In a real implementation, this would submit the form data to your backend
            alert('Thank you for scheduling your blood donation! A confirmation has been sent to your email.');
            this.reset();
            
            // Reset blood type selection
            document.querySelectorAll('.blood-type-label').forEach(label => {
                label.classList.remove('border-red-600', 'bg-red-50');
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