Table Customer {
  customer_id int [pk, increment]
  name varchar(100)
  email varchar(100) [unique]
  phone varchar(15)
  password varchar(255)
}

Table Admin {
  admin_id int [pk, increment]
  name varchar(100)
  email varchar(100) [unique]
  password varchar(255)
}

Table Product {
  product_id int [pk, increment]
  customer_id int
  product_name varchar(100)
  brand varchar(100)
  model_number varchar(100)
  purchase_date date
}

Table Warranty {
  warranty_id int [pk, increment]
  product_id int
  warranty_start_date date
  warranty_end_date date
  warranty_status varchar(30)
}

Table Claim {
  claim_id int [pk, increment]
  customer_id int
  product_id int
  warranty_id int
  admin_id int
  claim_date date
  claim_description varchar(500)
  claim_status varchar(30)
}

Ref: Customer.customer_id < Product.customer_id

Ref: Product.product_id - Warranty.product_id

Ref: Customer.customer_id < Claim.customer_id

Ref: Product.product_id < Claim.product_id

Ref: Warranty.warranty_id < Claim.warranty_id

Ref: Admin.admin_id < Claim.admin_id