## Submission for Backend Engineering Intern Case Study

This repository contains my submission for the StockFlow backend engineering intern assessment. The solution focuses on building a robust and scalable foundation for an inventory management system while clearly handling incomplete requirements through structured assumptions.

---

## 📌 Overview

The assessment is divided into three parts:

- **Part 1:** Code Review & Debugging  
- **Part 2:** Database Design  
- **Part 3:** API Implementation  

Each section includes both the solution and the reasoning behind design and implementation decisions.

---

## 🛠️ Tech Stack

- Node.js + Express (API Implementation)  
- SQL-based relational database (schema design)  

---

## 🧠 Key Highlights

- Focused on **data consistency** using atomic database transactions  
- Designed schema to support **multi-warehouse inventory management**  
- Handled **incomplete requirements** through clearly stated assumptions  
- Considered **edge cases and failure scenarios**  
- Kept implementation **simple, scalable, and maintainable**  

---

## ⚠️ Assumptions

Some requirements were intentionally incomplete. Assumptions were made to proceed with the design:

- Recent sales activity refers to the last 30 days  
- Each product has one primary supplier  
- Low stock threshold is defined per product  
- Inventory is tracked per warehouse  

Detailed assumptions are also mentioned within individual parts.

---

## 🚀 How to Run (Part 3 API)

```bash
# install dependencies
npm install

# run server
node app.js
