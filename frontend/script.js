const API = "http://localhost:8080";

// ==================== SHOW PRODUCTS ====================

function showProducts() {
    fetch(API + "/products")
        .then(response => response.json())
        .then(data => {
            document.getElementById("sectionTitle").innerText = "Products";

            let output = "";

            data.forEach(product => {
                output += `
                    <div class="card">
                        <p><strong>ID:</strong> ${product.id}</p>
                        <p><strong>Name:</strong> ${product.name}</p>
                        <p><strong>Category:</strong> ${product.category}</p>
                        <p><strong>Serial Number:</strong> ${product.serialNumber}</p>
                    </div>
                `;
            });

            document.getElementById("result").innerHTML =
                output || "<p>No products found.</p>";
        })
        .catch(error => {
            document.getElementById("result").innerHTML =
                "<p>Unable to connect to backend.</p>";
            console.error(error);
        });
}


// ==================== SHOW WARRANTIES ====================

function showWarranties() {
    fetch(API + "/warranties")
        .then(response => response.json())
        .then(data => {
            document.getElementById("sectionTitle").innerText = "Warranties";

            let output = "";

            data.forEach(warranty => {
                output += `
                    <div class="card">
                        <p><strong>ID:</strong> ${warranty.id}</p>
                        <p><strong>Product ID:</strong> ${warranty.productId}</p>
                        <p><strong>Start Date:</strong> ${warranty.startDate}</p>
                        <p><strong>End Date:</strong> ${warranty.endDate}</p>
                        <p><strong>Status:</strong> ${warranty.status}</p>
                    </div>
                `;
            });

            document.getElementById("result").innerHTML =
                output || "<p>No warranties found.</p>";
        })
        .catch(error => {
            document.getElementById("result").innerHTML =
                "<p>Unable to connect to backend.</p>";
            console.error(error);
        });
}


// ==================== SHOW CLAIMS ====================

function showClaims() {
    fetch(API + "/claims")
        .then(response => response.json())
        .then(data => {
            document.getElementById("sectionTitle").innerText = "Claims";

            let output = "";

            data.forEach(claim => {
                output += `
                    <div class="card">
                        <p><strong>ID:</strong> ${claim.id}</p>
                        <p><strong>Product ID:</strong> ${claim.productId}</p>
                        <p><strong>Issue:</strong> ${claim.issue}</p>
                        <p><strong>Status:</strong> ${claim.status}</p>
                    </div>
                `;
            });

            document.getElementById("result").innerHTML =
                output || "<p>No claims found.</p>";
        })
        .catch(error => {
            document.getElementById("result").innerHTML =
                "<p>Unable to connect to backend.</p>";
            console.error(error);
        });
}


// ==================== SHOW CUSTOMERS ====================

function showCustomers() {
    fetch(API + "/customers")
        .then(response => response.json())
        .then(data => {
            document.getElementById("sectionTitle").innerText = "Customers";

            let output = "";

            data.forEach(customer => {
                output += `
                    <div class="card">
                        <p><strong>ID:</strong> ${customer.id}</p>
                        <p><strong>Name:</strong> ${customer.name}</p>
                        <p><strong>Email:</strong> ${customer.email}</p>

                        <button onclick="editCustomer(${customer.id}, '${customer.name}', '${customer.email}')">
                            Edit
                        </button>
                    </div>
                `;
            });

            document.getElementById("result").innerHTML =
                output || "<p>No customers found.</p>";
        })
        .catch(error => {
            document.getElementById("result").innerHTML =
                "<p>Unable to connect to backend.</p>";
            console.error(error);
        });
}


// ==================== EDIT CUSTOMER ====================

function editCustomer(id, name, email) {

    document.getElementById("sectionTitle").innerText = "Edit Customer";

    document.getElementById("result").innerHTML = `
        <div class="card">

            <input type="text"
                   id="editCustomerName"
                   value="${name}"
                   placeholder="Name">

            <br><br>

            <input type="email"
                   id="editCustomerEmail"
                   value="${email}"
                   placeholder="Email">

            <br><br>

            <input type="password"
                   id="editCustomerPassword"
                   placeholder="Password">

            <br><br>

            <button onclick="updateCustomer(${id})">
                Update Customer
            </button>

            <button onclick="showCustomers()">
                Cancel
            </button>

        </div>
    `;
}


// ==================== UPDATE CUSTOMER ====================

function updateCustomer(id) {

    const customer = {
        name: document.getElementById("editCustomerName").value,
        email: document.getElementById("editCustomerEmail").value,
        password: document.getElementById("editCustomerPassword").value
    };

    fetch(API + "/customers/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(customer)
    })
        .then(response => response.json())
        .then(data => {

            alert("Customer updated successfully!");

            showCustomers();
        })
        .catch(error => {

            alert("Unable to update customer.");

            console.error(error);
        });
}


// ==================== ADD PRODUCT ====================

function showAddProduct() {

    document.getElementById("sectionTitle").innerText = "Add Product";

    document.getElementById("result").innerHTML = `
        <div class="card">

            <input type="text"
                   id="productName"
                   placeholder="Product Name">

            <br><br>

            <input type="text"
                   id="productCategory"
                   placeholder="Category">

            <br><br>

            <input type="text"
                   id="serialNumber"
                   placeholder="Serial Number">

            <br><br>

            <button onclick="addProduct()">
                Save Product
            </button>

        </div>
    `;
}


function addProduct() {

    const product = {

        name: document.getElementById("productName").value,

        category: document.getElementById("productCategory").value,

        serialNumber: document.getElementById("serialNumber").value
    };

    fetch(API + "/products", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(product)

    })
        .then(response => response.json())

        .then(data => {

            alert("Product added successfully!");

            showProducts();
        })

        .catch(error => {

            alert("Unable to add product.");

            console.error(error);
        });
}


// ==================== ADD WARRANTY ====================

function showAddWarranty() {

    document.getElementById("sectionTitle").innerText = "Add Warranty";

    document.getElementById("result").innerHTML = `
        <div class="card">

            <input type="number"
                   id="warrantyProductId"
                   placeholder="Product ID">

            <br><br>

            <input type="date"
                   id="warrantyStartDate">

            <br><br>

            <input type="date"
                   id="warrantyEndDate">

            <br><br>

            <input type="text"
                   id="warrantyStatus"
                   placeholder="Status">

            <br><br>

            <button onclick="addWarranty()">
                Save Warranty
            </button>

        </div>
    `;
}


function addWarranty() {

    const warranty = {

        productId: Number(
            document.getElementById("warrantyProductId").value
        ),

        startDate:
            document.getElementById("warrantyStartDate").value,

        endDate:
            document.getElementById("warrantyEndDate").value,

        status:
            document.getElementById("warrantyStatus").value
    };

    fetch(API + "/warranties", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(warranty)

    })
        .then(response => response.json())

        .then(data => {

            alert("Warranty added successfully!");

            showWarranties();
        })

        .catch(error => {

            alert("Unable to add warranty.");

            console.error(error);
        });
}


// ==================== ADD CLAIM ====================

function showAddClaim() {

    document.getElementById("sectionTitle").innerText = "Add Claim";

    document.getElementById("result").innerHTML = `
        <div class="card">

            <input type="number"
                   id="claimProductId"
                   placeholder="Product ID">

            <br><br>

            <input type="text"
                   id="claimIssue"
                   placeholder="Issue">

            <br><br>

            <input type="text"
                   id="claimStatus"
                   placeholder="Status">

            <br><br>

            <button onclick="addClaim()">
                Save Claim
            </button>

        </div>
    `;
}


function addClaim() {

    const claim = {

        productId: Number(
            document.getElementById("claimProductId").value
        ),

        issue:
            document.getElementById("claimIssue").value,

        status:
            document.getElementById("claimStatus").value
    };

    fetch(API + "/claims", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(claim)

    })
        .then(response => response.json())

        .then(data => {

            alert("Claim added successfully!");

            showClaims();
        })

        .catch(error => {

            alert("Unable to add claim.");

            console.error(error);
        });
}


// ==================== ADD CUSTOMER ====================

function showAddCustomer() {

    document.getElementById("sectionTitle").innerText = "Add Customer";

    document.getElementById("result").innerHTML = `
        <div class="card">

            <input type="text"
                   id="customerName"
                   placeholder="Name">

            <br><br>

            <input type="email"
                   id="customerEmail"
                   placeholder="Email">

            <br><br>

            <input type="password"
                   id="customerPassword"
                   placeholder="Password">

            <br><br>

            <button onclick="addCustomer()">
                Save Customer
            </button>

        </div>
    `;
}


function addCustomer() {

    const customer = {

        name:
            document.getElementById("customerName").value,

        email:
            document.getElementById("customerEmail").value,

        password:
            document.getElementById("customerPassword").value
    };

    fetch(API + "/customers", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(customer)

    })
        .then(response => response.json())

        .then(data => {

            alert("Customer added successfully!");

            showCustomers();
        })

        .catch(error => {

            alert("Unable to add customer.");

            console.error(error);
        });
}


// ==================== LOGIN ====================

function login() {

    const email =
        document.getElementById("loginEmail").value;

    const password =
        document.getElementById("loginPassword").value;

    const customer = {

        email: email,

        password: password
    };

    fetch(API + "/customers/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(customer)

    })
        .then(response => {

            if (!response.ok) {

                throw new Error("Login failed");
            }

            return response.json();
        })

        .then(data => {

            if (data && data.email) {

                window.location.href = "index.html";

            } else {

                document.getElementById("loginMessage").innerText =
                    "Invalid email or password";
            }
        })

        .catch(error => {

            document.getElementById("loginMessage").innerText =
                "Unable to connect to backend";

            console.error(error);
        });
}


// ==================== LOGOUT ====================

function logout() {

    window.location.href = "login.html";
}


// ==================== DASHBOARD COUNTS ====================

function loadDashboardCounts() {

    fetch(API + "/products")
        .then(response => response.json())
        .then(data => {

            document.getElementById("productCount").innerText =
                data.length;
        });


    fetch(API + "/warranties")
        .then(response => response.json())
        .then(data => {

            document.getElementById("warrantyCount").innerText =
                data.length;
        });


    fetch(API + "/claims")
        .then(response => response.json())
        .then(data => {

            document.getElementById("claimCount").innerText =
                data.length;
        });


    fetch(API + "/customers")
        .then(response => response.json())
        .then(data => {

            document.getElementById("customerCount").innerText =
                data.length;
        });
}


loadDashboardCounts();