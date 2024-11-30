# PLP-final-project-VibandaConnect

# Vendor Management System

# The **Vendor Management System**, **VibandaConnect**, is a web-based application designed to streamline vendor operations. It allows administrators to manage orders, monitor riders, and efficiently interact with vendors. This system is tailored to small-scale vendors to improve their order management and delivery processes.

---

## Features

### **1. Order Management**
# - Place new orders with the following details:
#   - **Vendor ID**
#   - **Customer ID**
#   - Optional **Rider ID**
#   - List of items (comma-separated)
#   - Order delivery date
#   - Order status (e.g., *Pending* or *Completed*)
# - View all existing orders.

### **2. Rider Management**
# - View a list of available riders to assign for order deliveries.

### **3. User Roles**
# - **Admin**:
#   - Manage vendor orders.
#   - Monitor available riders.
# - **Vendors**:
#   - Submit and view orders.

---

## Technologies Used
# - **Frontend**: HTML, CSS (with inline styling for easier setup)
# - **Backend**: Node.js with Express.js
# - **Database**: MySQL

---

## Installation and Setup

# 1. **Clone the Repository**
#    ```bash
#    git clone https://github.com/hananmyy/PLP-final-project-VibandaConnect.git
#    cd vendor-management-system-hananmyy
#    ```

# 2. **Install Dependencies**
#    ```bash
#    npm install
#    ```

# 3. **Setup Database**
#    - Create a MySQL database named `vibanda_connect`.
#    - Run the provided SQL scripts in `/db` to set up the required tables (`vendors`, `orders`, `riders` and `customers`).

# 4. **Configure Database Connection**
#    - Open the `config.json` file in the `config` folder.
#    - Update the database connection details as required:
#      ```json
#      {
#        "development": {
#          "username": "your_db_user",
#          "password": "your_db_password",
#          "database": "vibanda_connect",
#          "host": "your_db_host",
#          "dialect": "mysql"
#        }
#      }
#    ```

# 5. **Run the Application**
#    ```bash
#    npm start
#    ```
#    The server will run on `http://localhost:3000`.

---

## How to Use

# 1. **Access the System**
#    - Open the app in your browser at `http://localhost:3000`.

# 2. **Login**
#    - Customers, riders and vendors can log in using their credentials.

# 3. **Register**
#    - Customers, riders and vendors can register using their credentials.

# 3. **Manage Orders**
#    - Use the order form to create new orders.
#    - Navigate to the *View All Orders* page to monitor existing orders.

# 4. **Rider Management**
#    - Click *View Available Riders* to see a list of active riders.

---

## Future Enhancements
# - Implement authentication and role-based access control.
# - Add detailed reporting features for vendors and admins.
# - Integrate notifications for order updates.
# - Improve the user interface with responsive design.

---

## License

# This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact
# For inquiries or feedback, feel free to reach out:

# **Hanan Mohamud Yusuf**  
# hananmohamudy@gmail.com  
# [https://github.com/](https://github.com/hananmyy)
