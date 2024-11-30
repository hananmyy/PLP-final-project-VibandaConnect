document.addEventListener('DOMContentLoaded', function () {
    const orderForm = document.getElementById("orderForm");
    const orderList = document.getElementById("orderList");
    const riderList = document.getElementById("riderList");
    const viewOrdersButton = document.getElementById("viewOrdersButton");
    const viewRidersButton = document.getElementById("viewRidersButton");

    // Place Order
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
                const response = await fetch("http://localhost:3000/orders/create", {
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

    // View All Orders
    if (viewOrdersButton) {
        viewOrdersButton.addEventListener("click", fetchOrders);
    } else {
        console.error("View orders button element not found!");
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

    // View Available Riders
    if (viewRidersButton) {
        viewRidersButton.addEventListener("click", fetchRiders);
    } else {
        console.error("View riders button element not found!");
    }

    async function fetchRiders() {
        try {
            const response = await fetch("http://localhost:3000/riders/available");
            const riders = await response.json();

            if (riderList) {
                riderList.innerHTML = riders
                    .map((rider) => `
                        <div>
                            <h4>${rider.name}</h4>
                            <p>Contact: ${rider.contactNumber}</p>
                            <p>Vehicle: ${rider.vehicleType}</p>
                            <p>Location: ${rider.location}</p>
                            <p>Available: ${rider.available ? "Yes" : "No"}</p>
                        </div>
                    `)
                    .join("");
            } else {
                console.error("Rider list element not found!");
            }
        } catch (error) {
            console.error("Error fetching riders:", error);
        }
    }
});
