document.addEventListener("DOMContentLoaded", function () {
    const urlPaths = {
        '/customer-profile.html': '/api/customer',
        '/rider-profile.html': '/api/rider',
        '/vendor-profile.html': '/api/vendor'
    };

    const currentPath = window.location.pathname;
    const apiEndpoint = urlPaths[currentPath];

    if (!apiEndpoint) {
        console.error('No API endpoint matched for this path.');
        return;
    }

    fetch(apiEndpoint)
        .then(response => response.json())
        .then(data => {
            // Update common profile details
            if (data.profilePicture) document.getElementById('profilePicture').src = data.profilePicture;
            if (data.name) document.getElementById('profileName').innerText = data.name;
            if (data.email) document.getElementById('profileEmail').innerText = data.email;
            if (data.contactNumber) document.getElementById('profileContactNumber').innerText = data.contactNumber;
            if (data.location) document.getElementById('profileLocation').innerText = data.location;

            // Update specific sections based on profile type
            if (currentPath.includes('customer-profile')) {
                updateOrderHistory(data.orderHistory);
            } else if (currentPath.includes('rider-profile')) {
                updateVendorList(data.vendorList);
            } else if (currentPath.includes('vendor-profile')) {
                updateOrderHistory(data.orderHistory);
            }
        })
        .catch(error => console.error('Error fetching profile data:', error));
});

function updateOrderHistory(orderHistory) {
    const orderList = document.getElementById('orderList');
    if (orderList) {
        orderList.innerHTML = ''; // Clear existing items
        orderHistory.forEach(order => {
            const listItem = document.createElement('li');
            listItem.textContent = order;
            orderList.appendChild(listItem);
        });
    }
}

function updateVendorList(vendorList) {
    const vendorListElement = document.getElementById('vendorList');
    if (vendorListElement) {
        vendorListElement.innerHTML = ''; // Clear existing items
        vendorList.forEach(vendor => {
            const listItem = document.createElement('li');
            listItem.textContent = vendor;
            vendorListElement.appendChild(listItem);
        });
    }
}
