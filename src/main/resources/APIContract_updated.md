# Finance Buddy API Contract

## Base URL

```text
http://localhost:8080
```

## Authentication

Most routes are protected and require a JWT token.

Header:

```http
Authorization: Bearer <token>
```

Public routes:

```http
POST /api/auth/register
POST /api/auth/login
```

---

# Auth

## Register

```http
POST /api/auth/register
```

Request:

```json
{
  "firstName": "Chris",
  "lastName": "Dev",
  "email": "chris.auth@example.com",
  "password": "Password123"
}
```

Response:

```json
{
  "userId": 1,
  "email": "chris.auth@example.com",
  "token": "jwt-token-here"
}
```

---

## Login

```http
POST /api/auth/login
```

Request:

```json
{
  "email": "chris.auth@example.com",
  "password": "Password123"
}
```

Response:

```json
{
  "userId": 1,
  "email": "chris.auth@example.com",
  "token": "jwt-token-here"
}
```

---

# Accounts

## Create Account

```http
POST /api/accounts
```

Auth required: Yes

Request:

```json
{
  "name": "Chase Checking",
  "type": "CHECKING",
  "balance": 2500.00
}
```

Response:

```json
{
  "id": 1,
  "name": "Chase Checking",
  "type": "CHECKING",
  "balance": 2500.00,
  "userId": 1
}
```

---

## Get My Accounts

```http
GET /api/accounts/me
```

Auth required: Yes

---

# Categories

## Create Category

```http
POST /api/categories
```

Auth required: Yes

Request:

```json
{
  "name": "Food"
}
```

Response:

```json
{
  "id": 1,
  "name": "Food",
  "userId": 1
}
```

---

## Get My Categories

```http
GET /api/categories/me
```

Auth required: Yes

---

# Transactions

## Create Transaction

```http
POST /api/transactions
```

Auth required: Yes

Request:

```json
{
  "description": "Chipotle",
  "amount": 25.00,
  "type": "EXPENSE",
  "transactionDate": "2026-06-15",
  "accountId": 1,
  "categoryId": 1,
  "notes": "Lunch after work"
}
```

Response:

```json
{
  "id": 1,
  "description": "Chipotle",
  "amount": 25.00,
  "type": "EXPENSE",
  "transactionDate": "2026-06-15",
  "notes": "Lunch after work",
  "accountId": 1,
  "categoryId": 1
}
```

---

## Get Transaction By ID

```http
GET /api/transactions/{transactionId}
```

Auth required: Yes

---

## Update Transaction

```http
PUT /api/transactions/{transactionId}
```

Auth required: Yes

Request:

```json
{
  "description": "Chipotle updated",
  "amount": 30.00,
  "type": "EXPENSE",
  "transactionDate": "2026-06-29",
  "accountId": 1,
  "categoryId": 1,
  "notes": "Updated lunch transaction"
}
```

---

## Delete Transaction

```http
DELETE /api/transactions/{transactionId}
```

Auth required: Yes

Response:

```json
{
  "success": true,
  "message": "Transaction deleted successfully."
}
```

---

## Get My Transactions

```http
GET /api/transactions/me
```

Auth required: Yes

---

## Filter My Transactions By Category

```http
GET /api/transactions/me/category/{categoryId}
```

Auth required: Yes

---

## Filter My Transactions By Month

```http
GET /api/transactions/me/month?month=6&year=2026
```

Auth required: Yes

---

## Filter My Transactions By Type

```http
GET /api/transactions/me/type?type=EXPENSE
```

Auth required: Yes

Allowed values:

```text
INCOME
EXPENSE
TRANSFER
```

---

## Search My Transactions

```http
GET /api/transactions/me/search?keyword=chipotle
```

Auth required: Yes

---

# Budgets

## Create Budget

```http
POST /api/budgets
```

Auth required: Yes

Request:

```json
{
  "monthlyLimit": 500.00,
  "month": 6,
  "year": 2026,
  "categoryId": 1
}
```

Response:

```json
{
  "id": 1,
  "monthlyLimit": 500.00,
  "month": 6,
  "year": 2026,
  "userId": 1,
  "categoryId": 1,
  "categoryName": "Food"
}
```

---

## Get My Budgets

```http
GET /api/budgets/me
```

Auth required: Yes

---

## Get My Budget Summary

```http
GET /api/budgets/me/summary
```

Auth required: Yes

Response example:

```json
[
  {
    "budgetId": 1,
    "categoryName": "Food",
    "monthlyLimit": 500.00,
    "amountSpent": 25.00,
    "remaining": 475.00,
    "month": 6,
    "year": 2026
  }
]
```

---

# Dashboard

## Get My Dashboard Summary

```http
GET /api/dashboard/me
```

Auth required: Yes

Response example:

```json
{
  "totalBalance": 3500.00,
  "totalIncome": 2500.00,
  "totalExpenses": 500.00,
  "netCashFlow": 2000.00
}
```

---

## Get My Monthly Summary

```http
GET /api/dashboard/me/monthly-summary?month=6&year=2026
```

Auth required: Yes

Response example:

```json
{
  "totalIncome": 2500.00,
  "totalExpenses": 500.00,
  "netCashFlow": 2000.00,
  "month": 6,
  "year": 2026
}
```

---

## Get My Spending By Category

```http
GET /api/dashboard/me/spending-by-category?month=6&year=2026
```

Auth required: Yes

Response example:

```json
[
  {
    "categoryName": "Food",
    "totalSpent": 39.75
  }
]
```

---

# Legacy / Testing Routes

These routes were useful during early development but should eventually be removed, locked down, or made admin-only because they expose data by user ID.

```http
GET /api/users
GET /api/users/{id}
POST /api/users
GET /api/accounts/user/{userId}
GET /api/categories/user/{userId}
GET /api/budgets/user/{userId}
GET /api/budgets/user/{userId}/summary
GET /api/transactions/account/{accountId}
GET /api/transactions/user/{userId}
GET /api/transactions/user/{userId}/category/{categoryId}
GET /api/transactions/user/{userId}/month?month=6&year=2026
GET /api/transactions/user/{userId}/type?type=EXPENSE
GET /api/transactions/user/{userId}/search?keyword=chipotle
GET /api/dashboard/user/{userId}
GET /api/dashboard/user/{userId}/monthly-summary?month=6&year=2026
GET /api/dashboard/user/{userId}/spending-by-category?month=6&year=2026
```

---

# Validation Notes

Common validation error response:

```json
{
  "description": "Description is required",
  "amount": "Amount must be greater than zero"
}
```

Common not-found / access error response:

```json
{
  "error": "Transaction not found"
}
```
