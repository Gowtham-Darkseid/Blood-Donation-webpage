 document.getElementById('mobile-menu-button').addEventListener('click', function() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        });

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
                document.getElementById('donation-form').scrollIntoView({ behavior: 'smooth' });
            }
        });

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

        document.querySelectorAll('.faq-question').forEach(button => {
            button.addEventListener('click', () => {
                const answer = button.nextElementSibling;
                const icon = button.querySelector('i');
                
                answer.classList.toggle('hidden');
                icon.classList.toggle('transform');
                icon.classList.toggle('rotate-180');
            });
        });

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

    document.addEventListener('DOMContentLoaded', function () {
        if (document.getElementById('map') && !window._leafletMapInitialized) {
            window._leafletMapInitialized = true;
            var map = L.map('map').setView([20.5937, 78.9629], 5); 

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            document.getElementById('enable-location').addEventListener('click', function () {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        var lat = position.coords.latitude;
                        var lng = position.coords.longitude;
                        map.setView([lat, lng], 13);
                        L.marker([lat, lng]).addTo(map)
                            .bindPopup('You are here').openPopup();
                    }, function () {
                        alert('Unable to retrieve your location.');
                    });
                } else {
                    alert('Geolocation is not supported by your browser.');
                }
            });
        }
    });

    const firebaseConfig = {
    apiKey: "AIzaSyBdJv8Gh6Bsz2oFyy6iFjROrim_UBhDnLY",
    authDomain: "blood-debec.firebaseapp.com",
    projectId: "blood-debec",
    storageBucket: "blood-debec.firebasestorage.app",
    messagingSenderId: "522052912092",
    appId: "1:522052912092:web:2afb25dc24e64ae47c0519",
    measurementId: "G-LLZB721K4H"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.addEventListener('DOMContentLoaded', function () {
const form = document.getElementById('donation-form-form');
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

const firstName = form.querySelector('input[name="first-name"]').value.trim();
const lastName = form.querySelector('input[name="last-name"]').value.trim();
const email = form.querySelector('input[name="email"]').value.trim();
const phone = form.querySelector('input[name="phone"]').value.trim();
const bloodType = form.querySelector('input[name="blood-type"]:checked')?.value || '';
const donationCenter = form.querySelector('select[name="donation-center"]').value;
const preferredDate = form.querySelector('input[name="preferred-date"]').value;
const preferredTime = form.querySelector('select[name="preferred-time"]').value;

    const eligibility = [
      form.querySelector('#eligibility-1').checked,
      form.querySelector('#eligibility-2').checked,
      form.querySelector('#eligibility-3').checked,
      form.querySelector('#eligibility-4').checked,
    ];

    const previousDonor = form.querySelector('input[name="previous-donor"]:checked')?.value || '';
 if (!firstName || !lastName || !email || !phone || !bloodType || !donationCenter || !preferredDate || !preferredTime) {
      alert('Please fill all required fields.');
      return;
    }

    try {
await db.collection('donations').add({
  firstName,
  lastName,
  email,
  phone,
  bloodType,
  donationCenter,
  preferredDate,
  preferredTime,
  previousDonor, 
  eligibility,
  createdAt: firebase.firestore.FieldValue.serverTimestamp()
});
      alert('Thank you for scheduling your donation!');
      form.reset();
    } catch (error) {
      alert('Error saving your donation. Please try again.');
      console.error(error);
    }
  });
});