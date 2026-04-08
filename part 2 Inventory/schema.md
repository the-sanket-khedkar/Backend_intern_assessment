# Part 2: Database Design

## Overview
The goal is to design a database schema for an inventory management system that supports multiple companies, warehouses, products, and suppliers. The system must also handle inventory tracking, supplier relationships, and product bundles.

---

## Core Entities Identified

- Company
- Warehouse
- Product
- Inventory
- Supplier
- Product-Supplier Relationship
- Product Bundles
- Inventory Logs

 ---

 ## Schema Design

 ### Companies

 ```sql
 id (PK)
 name
 created_at
 ```

 ## Warehouses 

 ```sql
 id (PK)
company_id (FK → companies.id)
name
location
created_at
```

**Relationships:**
One company can have multiple warehouses (1-to-Many).

## Products
```sql
id (PK)
name
sku (UNIQUE)
price (DECIMAL)
product_type (e.g., simple, bundle)
created_at
```
- SKU is enforced as unique to ensure consistent product IDs.

## Inventory

```sql
id (PK)
product_id (FK → products.id)
warehouse_id (FK → warehouses.id)
quantity
updated_at
```
- This is a junction table between products and warehouses.
- Enables storing the same product in multiple warehouses with different quantities.

## Suppliers

```sql
id (PK)
name
contact_email
created_at
```

## Product_Suppliers

```sql
id (PK)
product_id (FK → products.id)
supplier_id (FK → suppliers.id)
```
- Represents a many-to-many relationship between products and suppliers.
- Allows flexibility in sourcing products.

## Product_Bundles

```sql
id (PK)
bundle_product_id (FK → products.id)
component_product_id (FK → products.id)
quantity
```

- Models bundle products made up of other products.
- Self-referencing relationship on the products table.

## Inventory_Logs

```sql 
id (PK)
product_id (FK → products.id)
warehouse_id (FK → warehouses.id)
change_quantity
change_type (e.g., sale, restock)
created_at
```
- Tracks changes in inventory levels over time.
- Useful for auditing and analytics.

## Relationships

- Company → Warehouses (1-to-Many)
- Product → Inventory → Warehouse (Many-to-Many via Inventory)
- Product ↔ Supplier (Many-to-Many)
- Product ↔ Product (Bundle relationship via Product_Bundles)

## Missing Requirements / Questions

- Can a product have multiple suppliers or only one primary supplier?
- What defines "recent sales activity"? (e.g., last 7 days, 30 days)
- Should inventory changes be tracked in real-time or batched?
- Can warehouses transfer inventory between each other?
- How are bundle prices determined (fixed or derived from components)?
- Are negative inventory values allowed (e.g., backorders)?

## Design Decisions

- Used a separate Inventory table to support multi-warehouse storage.
- Enforced SKU uniqueness for consistent product identification.
- Used a junction table for product-supplier relationships to allow flexibility.
- Added inventory logs to track stock changes and support auditing.
- Modeled bundles using a self-referencing relationship in the products table.