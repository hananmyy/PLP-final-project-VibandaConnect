document.addEventListener('DOMContentLoaded', function() {
    // Customer Form Handling
    const customerForm = document.getElementById("customerForm");
    const customerList = document.getElementById("customerList");

    if (customerForm) {
        customerForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const name = document.getElementById("customerName").value;
            const email = document.getElementById("customerEmail").value;
            const password = document.getElementById("customerPassword").value;
            const contactNumber = document.getElementById("customerContactNumber").value;
            const location = document.getElementById("customerLocation").value;

            try {
                const response = await fetch("http://localhost:3000/customers/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, password, contactNumber, location }),
                });

                if (response.ok) {
                    alert("Customer added successfully!");
                    window.location.href = "login.html";  // Redirect to login page
                } else {
                    alert("Failed to add customer");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        });
    } else {
        console.error("Customer form element not found!");
    }

    // Rider Form Handling
    const riderForm = document.getElementById("riderForm");
    const riderList = document.getElementById("riderList");

    if (riderForm) {
        riderForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const name = document.getElementById("riderName").value;
            const email = document.getElementById("riderEmail").value;
            const password = document.getElementById("riderPassword").value;
            const contactNumber = document.getElementById("riderContactNumber").value;
            const vehicleType = document.getElementById("riderVehicleType").value;
            const location = document.getElementById("riderLocation").value;
            const available = document.getElementById("riderAvailable").checked;

            try {
                const response = await fetch("http://localhost:3000/riders/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, password, contactNumber, vehicleType, location, available }),
                });

                if (response.ok) {
                    alert("Rider added successfully!");
                    window.location.href = "login.html";  // Redirect to login page
                } else {
                    alert("Failed to add rider");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        });
    } else {
        console.error("Rider form element not found!");
    }

    // Vendor Form Handling
    const vendorForm = document.getElementById("vendorForm");
    const vendorList = document.getElementById("vendorList");

    if (vendorForm) {
        vendorForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const name = document.getElementById("vendorName").value;
            const email = document.getElementById("vendorEmail").value;
            const password = document.getElementById("vendorPassword").value;
            const contactNumber = document.getElementById("vendorContactNumber").value;
            const location = document.getElementById("vendorLocation").value;
            const shopName = document.getElementById("vendorShopName").value;

            try {
                const response = await fetch("http://localhost:3000/vendors/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, password, contactNumber, location, shopName }),
                });

                if (response.ok) {
                    alert("Vendor added successfully!");
                    window.location.href = "login.html";  // Redirect to login page
                } else {
                    alert("Failed to add vendor");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        });
    } else {
        console.error("Vendor form element not found!");
    }

    // Order Form Handling
    const orderForm = document.getElementById("orderForm");
    const orderList = document.getElementById("orderList");

    if (orderForm) {
        orderForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const vendorId = document.getElementById("orderVendorId").value;
            const customerId = document.getElementById("orderCustomerId").value;
            const riderId = document.getElementById("orderRiderId").value || null;
            const items = document.getElementById("orderItems").value;
            const status = document.getElementById("orderStatus").value;
            const deliveryDate = document.getElementById("orderDeliveryDate").value;

            try {
                const response = await fetch("http://localhost:3000/orders", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ vendorId, customerId, riderId, items, status, deliveryDate }),
                });

                if (response.ok) {
                    alert("Order placed successfully!");
                    fetchOrders();
                } else {
                    alert("Failed to place order");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        });
    } else {
        console.error("Order form element not found!");
    }

    async function fetchOrders() {
        try {
            const response = await fetch("http://localhost:3000/orders");
            const orders = await response.json();

            if (orderList) {
                orderList.innerHTML = orders
                    .map((order) => `
                        <div>
                            <h4>Order ID: ${order.id}</h4>
                            <p>Vendor ID: ${order.vendorId}</p>
                            <p>Customer ID: ${order.customerId}</p>
                            <p>Rider ID: ${order.riderId || "N/A"}</p>
                            <p>Items: ${order.items}</p>
                            <p>Status: ${order.status}</p>
                            <p>Delivery Date: ${order.deliveryDate}</p>
                        </div>
                    `)
                    .join("");
            } else {
                console.error("Order list element not found!");
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    }

});
