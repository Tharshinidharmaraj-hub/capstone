
const API = "https://capstone-production-5690.up.railway.app";
// ==================== SHOW PRODUCTS ====================

function showProducts() {
    const gallery = document.getElementById("productGallery");
    fetch(API + "/products")
        .then(response => {
            if (!response.ok) throw new Error("Products failed");
            return response.json();
        })
        .then(data => {
            document.getElementById("sectionTitle").innerText = "Products";
            const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, character => ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            })[character]);
            const imageForProduct = product => {
                const details = `${product.name || ""} ${product.category || ""}`.toLowerCase();
                if (/\bsony\b/.test(details)) return "https://cdn.simpleicons.org/sony/000000";
                if (/\bsamsung\b/.test(details)) return "https://cdn.simpleicons.org/samsung/1428A0";
                if (/tv|television/.test(details)) return "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=900&q=80";
                if (/washing|appliance|refrigerator|fridge/.test(details)) return "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=900&q=80";
                if (/phone|mobile/.test(details)) return "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80";
                if (/laptop|computer/.test(details)) return "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80";
                if (/camera/.test(details)) return "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80";
                return "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=900&q=80";
            };

            gallery.innerHTML = data.map(product => `
                <article class="product-card">
                    <img src="${imageForProduct(product)}" alt="${escapeHtml(product.name || "Product")}" loading="lazy">
                    <h3>${escapeHtml(product.name || "Unnamed product")}</h3>
                    <p><strong>ID:</strong> ${escapeHtml(product.id)}</p>
                    <p><strong>Category:</strong> ${escapeHtml(product.category || "Uncategorized")}</p>
                    <p><strong>Serial Number:</strong> ${escapeHtml(product.serialNumber || "N/A")}</p>
                </article>`).join("") || "<p>No products found.</p>";
            gallery.hidden = false;
        })
        .catch(error => {
            document.getElementById("sectionTitle").innerText = "Products";
            gallery.innerHTML = "<p>Unable to connect to backend.</p>";
            gallery.hidden = false;
            console.error(error);
        });
}

// ==================== SHOW WARRANTIES ====================

function showWarranties() {
    fetch(API + "/warranties")
        .then(response => {
            if (!response.ok) throw new Error("Warranties failed");
            return response.json();
        })
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
                    </div>`;
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
        .then(response => {
            if (!response.ok) throw new Error("Claims failed");
            return response.json();
        })
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
                    </div>`;
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
        .then(response => {
            if (!response.ok) throw new Error("Customers failed");
            return response.json();
        })
        .then(data => {
            document.getElementById("sectionTitle").innerText = "Customers";

            let output = "";

            data.forEach(customer => {
                const name = String(customer.name || "")
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/'/g, "&#39;");

                const email = String(customer.email || "")
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/'/g, "&#39;");

                output += `
                    <div class="card">
                        <p><strong>ID:</strong> ${customer.id}</p>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <button onclick="editCustomer(${customer.id})">Edit</button>
                        <button onclick="deleteCustomer(${customer.id})">Delete</button>
                    </div>`;
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

function editCustomer(id) {
    fetch(API + "/customers")
        .then(response => {
            if (!response.ok) throw new Error("Failed to load customers");
            return response.json();
        })
        .then(customers => {
            const customer = customers.find(c => c.id === id);

            if (!customer) throw new Error("Customer not found");

            document.getElementById("sectionTitle").innerText = "Edit Customer";

            document.getElementById("result").innerHTML = `
                <div class="card">
                    <input type="text" id="editCustomerName"
                           placeholder="Name">
                    <br><br>
                    <input type="email" id="editCustomerEmail"
                           placeholder="Email">
                    <br><br>
                    <input type="password" id="editCustomerPassword"
                           placeholder="New password (if required)">
                    <br><br>
                    <button onclick="updateCustomer(${id})">Update Customer</button>
                    <button onclick="showCustomers()">Cancel</button>
                `;

            document.getElementById("editCustomerName").value =
                customer.name || "";
            document.getElementById("editCustomerEmail").value =
                customer.email || "";
        })
        .catch(error => {
            alert("Unable to load customer.");
            console.error(error);
        });
}

// ==================== UPDATE CUSTOMER ====================

function updateCustomer(id) {
    const customer = {
        name: document.getElementById("editCustomerName").value.trim(),
        email: document.getElementById("editCustomerEmail").value.trim(),
        password: document.getElementById("editCustomerPassword").value
    };

    if (!customer.name || !customer.email) {
        alert("Please enter name and email.");
        return;
    }

    fetch(API + "/customers/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer)
    })
        .then(response => {
            if (!response.ok) throw new Error("Update failed");
            return response.json();
        })
        .then(() => {
            alert("Customer updated successfully!");
            showCustomers();
        })
        .catch(error => {
            alert("Unable to update customer.");
            console.error(error);
        });
}

// ==================== DELETE CUSTOMER ====================

function deleteCustomer(id) {
    if (!confirm("Are you sure you want to delete this customer?")) return;

    fetch(API + "/customers/" + id, { method: "DELETE" })
        .then(response => {
            if (!response.ok) throw new Error("Delete failed");
            alert("Customer deleted successfully!");
            showCustomers();
        })
        .catch(error => {
            alert("Unable to delete customer.");
            console.error(error);
        });
}

// ==================== ADD PRODUCT ====================

function showAddProduct() {
    document.getElementById("sectionTitle").innerText = "Add Product";
    document.getElementById("result").innerHTML = `
        <div class="card">
            <input type="text" id="productName" placeholder="Product Name">
            <br><br>
            <input type="text" id="productCategory" placeholder="Category">
            <br><br>
            <input type="text" id="serialNumber" placeholder="Serial Number">
            <br><br>
            <button onclick="addProduct()">Save Product</button>
        </div>`;
}

function addProduct() {
    const product = {
        name: document.getElementById("productName").value.trim(),
        category: document.getElementById("productCategory").value.trim(),
        serialNumber: document.getElementById("serialNumber").value.trim()
    };

    if (!product.name || !product.category || !product.serialNumber) {
        alert("Please fill all product fields.");
        return;
    }

    fetch(API + "/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    })
        .then(response => {
            if (!response.ok) throw new Error("Add product failed");
            return response.json();
        })
        .then(() => {
            alert("Product added successfully!");
            showProducts();
            loadDashboardCounts();
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
            <input type="number" id="warrantyProductId" placeholder="Product ID">
            <br><br>
            <input type="date" id="warrantyStartDate">
            <br><br>
            <input type="date" id="warrantyEndDate">
            <br><br>
            <input type="text" id="warrantyStatus" placeholder="Status">
            <br><br>
            <button onclick="addWarranty()">Save Warranty</button>
        </div>`;
}

function addWarranty() {
    const warranty = {
        productId: Number(document.getElementById("warrantyProductId").value),
        startDate: document.getElementById("warrantyStartDate").value,
        endDate: document.getElementById("warrantyEndDate").value,
        status: document.getElementById("warrantyStatus").value.trim()
    };

    if (!warranty.productId || !warranty.startDate ||
        !warranty.endDate || !warranty.status) {
        alert("Please fill all warranty fields.");
        return;
    }

    fetch(API + "/warranties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(warranty)
    })
        .then(response => {
            if (!response.ok) throw new Error("Add warranty failed");
            return response.json();
        })
        .then(() => {
            alert("Warranty added successfully!");
            showWarranties();
            loadDashboardCounts();
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
            <input type="number" id="claimProductId" placeholder="Product ID">
            <br><br>
            <input type="text" id="claimIssue" placeholder="Issue">
            <br><br>
            <input type="text" id="claimStatus" placeholder="Status">
            <br><br>
            <button onclick="addClaim()">Save Claim</button>
        </div>`;
}

function addClaim() {
    const claim = {
        productId: Number(document.getElementById("claimProductId").value),
        issue: document.getElementById("claimIssue").value.trim(),
        status: document.getElementById("claimStatus").value.trim()
    };

    if (!claim.productId || !claim.issue || !claim.status) {
        alert("Please fill all claim fields.");
        return;
    }

    fetch(API + "/claims", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(claim)
    })
        .then(response => {
            if (!response.ok) throw new Error("Add claim failed");
            return response.json();
        })
        .then(() => {
            alert("Claim added successfully!");
            showClaims();
            loadDashboardCounts();
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
            <input type="text" id="customerName" placeholder="Name">
            <br><br>
            <input type="email" id="customerEmail" placeholder="Email">
            <br><br>
            <input type="password" id="customerPassword" placeholder="Password">
            <br><br>
            <button onclick="addCustomer()">Save Customer</button>
        </div>`;
}

function addCustomer() {
    const customer = {
        name: document.getElementById("customerName").value.trim(),
        email: document.getElementById("customerEmail").value.trim(),
        password: document.getElementById("customerPassword").value
    };

    if (!customer.name || !customer.email || !customer.password) {
        alert("Please fill all customer fields.");
        return;
    }

    fetch(API + "/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer)
    })
        .then(response => {
            if (!response.ok) throw new Error("Add customer failed");
            return response.json();
        })
        .then(() => {
            alert("Customer added successfully!");
            showCustomers();
            loadDashboardCounts();
        })
        .catch(error => {
            alert("Unable to add customer.");
            console.error(error);
        });
}

// ==================== LOGIN ====================

function login() {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    if (!email || !password) {
        document.getElementById("loginMessage").innerText =
            "Enter email and password.";
        return;
    }

    fetch(API + "/customers/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
        .then(async response => {
            const text = await response.text();
            let data = null;

            try {
                data = text ? JSON.parse(text) : null;
            } catch {
                data = null;
            }

            if (!response.ok) {
                throw new Error("Invalid email or password");
            }

            return data;
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
                error.message === "Invalid email or password"
                    ? "Invalid email or password"
                    : "Unable to connect to backend";
            console.error(error);
        });
}

// ==================== LOGOUT ====================

function logout() {
    window.location.href = "login.html";
}

// ==================== DASHBOARD COUNTS ====================

function loadDashboardCounts() {
    const counts = [
        ["/products", "productCount"],
        ["/warranties", "warrantyCount"],
        ["/claims", "claimCount"],
        ["/customers", "customerCount"]
    ];

    counts.forEach(([endpoint, elementId]) => {
        fetch(API + endpoint)
            .then(response => {
                if (!response.ok) throw new Error("Failed to load " + endpoint);
                return response.json();
            })
            .then(data => {
                const element = document.getElementById(elementId);
                if (element) element.innerText = data.length;
            })
            .catch(error => console.error(error));
    });
}

loadDashboardCounts();
