document.getElementById('mobile-menu-button').addEventListener('click', function() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        });

        // Filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                button.classList.toggle('active');
                // Here you would filter the donor list based on the selected filters
                // For demo purposes, we're just toggling the active class
            });
        });

        // Booking modal functionality
        const bookButtons = document.querySelectorAll('.book-btn');
        const bookingModal = document.getElementById('booking-modal');
        const closeModal = document.getElementById('close-modal');
        const bookingForm = document.getElementById('booking-form');
        
        bookButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Get donor data from the clicked card
                const card = button.closest('.donor-card');
                const donorName = card.querySelector('h4').textContent;
                const donorImg = card.querySelector('img').src;
                const donorBlood = card.querySelector('.blood-type span').textContent;
                const donorDistance = card.querySelector('span:has(i.fa-map-marker-alt)').textContent;
                
                // Populate modal with donor data
                document.getElementById('donor-name').textContent = donorName;
                document.getElementById('donor-img').src = donorImg;
                document.getElementById('donor-blood').textContent = donorBlood;
                document.getElementById('donor-distance').innerHTML = `<i class="fas fa-map-marker-alt mr-1"></i>${donorDistance}`;
                
                // Show modal
                bookingModal.classList.add('active');
            });
        });
        
        closeModal.addEventListener('click', () => {
            bookingModal.classList.remove('active');
        });
        
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Your booking request has been sent to the donor. They will contact you shortly to confirm.');
            bookingModal.classList.remove('active');
            bookingForm.reset();
        });

        // Search functionality
        document.getElementById('search-btn').addEventListener('click', () => {
            const location = document.getElementById('location-input').value;
            const bloodType = document.getElementById('blood-type-select').value;
            const distance = document.getElementById('distance-select').value;
            
            if (!location) {
                alert('Please enter a location to search');
                return;
            }
            
            // In a real implementation, this would call the MapStreet API
            // and update the map and donor list with the results
            console.log(`Searching for ${bloodType || 'all'} blood donors within ${distance} miles of ${location}`);
            
            // Simulate loading
            const donorList = document.getElementById('donors-list');
            donorList.innerHTML = '<div class="text-center py-8"><i class="fas fa-spinner fa-spin text-3xl text-red-600 mb-4"></i><p>Finding donors near you...</p></div>';
            
            // Simulate API delay
            setTimeout(() => {
                // This would be replaced with actual API data
                const sampleDonor = `
                <div class="donor-card bg-white border rounded-lg p-4 mb-4">
                    <div class="flex items-start">
                        <img src="https://randomuser.me/api/portraits/men/22.jpg" alt="New Donor" class="w-12 h-12 rounded-full object-cover mr-4">
                        <div class="flex-grow">
                            <div class="flex justify-between items-start">
                                <div>
                                    <h4 class="font-bold text-gray-900">Alex R.</h4>
                                    <p class="text-gray-600 text-sm">New Donor</p>
                                </div>
                                <div class="blood-type">
                                    <span class="text-red-600 font-bold">${bloodType || 'O+'}</span>
                                </div>
                            </div>
                            <div class="mt-2 flex items-center text-sm text-gray-500">
                                <i class="fas fa-map-marker-alt mr-1"></i>
                                <span>${Math.floor(Math.random() * 5) + 1} miles away</span>
                            </div>
                            <div class="mt-2 flex items-center text-sm text-gray-500">
                                <i class="fas fa-check-circle mr-1 text-blue-500"></i>
                                <span class="text-blue-600">Verified</span>
                            </div>
                        </div>
                    </div>
                    <div class="mt-4 flex justify-between items-center">
                        <div class="flex space-x-1 text-yellow-400">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                        <button class="book-btn bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300" data-id="5">
                            <i class="fas fa-calendar-alt mr-1"></i> Book
                        </button>
                    </div>
                </div>
                `;
                
                // Update donor list with new results
                donorList.innerHTML = sampleDonor + sampleDonor + sampleDonor;
                
                // Update donor count
                document.getElementById('donor-count').textContent = '3';
                
                // Add event listeners to new book buttons
                document.querySelectorAll('.book-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                        // Same booking functionality as above
                        const card = this.closest('.donor-card');
                        const donorName = card.querySelector('h4').textContent;
                        const donorImg = card.querySelector('img').src;
                        const donorBlood = card.querySelector('.blood-type span').textContent;
                        const donorDistance = card.querySelector('span:has(i.fa-map-marker-alt)').textContent;
                        
                        document.getElementById('donor-name').textContent = donorName;
                        document.getElementById('donor-img').src = donorImg;
                        document.getElementById('donor-blood').textContent = donorBlood;
                        document.getElementById('donor-distance').innerHTML = `<i class="fas fa-map-marker-alt mr-1"></i>${donorDistance}`;
                        
                        bookingModal.classList.add('active');
                    });
                });
            }, 1500);
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

        // In a real implementation, you would integrate with MapStreet API like this:
        /*
        function initMap() {
            const map = new MapStreet.Map('map-container', {
                center: [latitude, longitude],
                zoom: 12
            });
            
            // Add donor markers
            donors.forEach(donor => {
                const marker = new MapStreet.Marker({
                    position: [donor.lat, donor.lng],
                    map: map,
                    title: donor.name,
                    icon: {
                        url: 'blood-drop-icon.png',
                        scaledSize: new MapStreet.Size(30, 30)
                    }
                });
                
                marker.addListener('click', () => {
                    // Show donor info window
                });
            });
        }
        
        // Call this when the search is performed
        initMap();
        */
document.addEventListener('DOMContentLoaded', function () {
    // Only initialize once
    if (document.getElementById('map') && !window._leafletMapInitialized) {
        window._leafletMapInitialized = true;
        // Initialize the map
        var map = L.map('map').setView([20.5937, 78.9629], 5); // Centered on India

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Enable location button
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
