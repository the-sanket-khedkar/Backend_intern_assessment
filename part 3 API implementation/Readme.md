# Part 3: API Implementation

## Overview

This API endpoint returns low-stock alerts for a given company. It considers inventory levels, recent sales activity, and supplier information to generate actionable alerts.

---

## Endpoint

GET /api/companies/{company_id}/alerts/low-stock

---

## Assumptions

- "Recent sales" means sales in the last 30 days  
- Each product has one primary supplier  
- Low stock threshold is stored per product  
- Days until stockout is estimated using average daily sales  
- Inventory is tracked per warehouse  

---

## Approach

1. Fetch all warehouses belonging to the company  
2. Join inventory with products and warehouses  
3. Filter products where stock is below threshold  
4. Filter only products with recent sales activity  
5. Attach supplier information  
6. Calculate estimated days until stockout  

## Edge Cases Handled
- Company has no warehouses
- No products meet low-stock criteria
- Product has no supplier (handled with LEFT JOIN)
- Zero or null inventory values
- Database query failure

## Possible Improvements

- Add pagination for large datasets
- Cache frequently accessed alerts
- Improve stockout prediction using real sales data
- Add alert prioritization based on urgency