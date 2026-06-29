# Finance Buddy API Contract

## Base URL

```text
http://localhost:8080
```

---

# Users

## Create User

```http
POST /api/users
```

Request:

```json
{
  "firstName": "Chris",
  "lastName": "Devalme",
  "email": "chris@example.com"
}
```

Response:

```json
{
  "id": 1,
  "firstName": "Chris",
  "lastName": "Devalme",
  "email": "chris@example.com"
}
```

---

## Get All Users

```http
GET /api/users
```

---

## Get User By ID

```http
GET /api/users/{id}
```

---

# Accounts

## Create Account

```http
POST /api/accounts
```

Request:

```json
{
  "name": "Chase Checking",
  "type": "CHECKING",
  "balance": 2500.00,
  "userId": 1
}
```

---

## Get Accounts By User

```http
GET /api/accounts/user/{userId}
```

---

# Categories

## Create Category

```http
POST /api/categories
```

Request:

```json
{
  "name": "Food",
  "userId": 1
}
```

---

## Get Categories By User

```http
GET /api/categories/user/{userId}
```

---

# Transactions

## Create Transaction

```http
POST /api/transactions
```

Request:

```json
{
  "description": "Chipotle",
  "amount": 25.00,
  "type": "EXPENSE",
  "transactionDate": "2026-06-15",
  "accountId": 1,
  "categoryId": 1
}
```

---

## Get Transaction By ID

```http
GET /api/transactions/{transactionId}
```

---

## Update Transaction

```http
PUT /api/transactions/{transactionId}
```

---

## Get Transactions By Account

```http
GET /api/transactions/account/{accountId}
```

---

## Get Transactions By User

```http
GET /api/transactions/user/{userId}
```

---

## Filter Transactions By Category

```http
GET /api/transactions/user/{userId}/category/{categoryId}
```

---

## Filter Transactions By Month

```http
GET /api/transactions/user/{userId}/month?month=6&year=2026
```

---

## Filter Transactions By Type

```http
GET /api/transactions/user/{userId}/type?type=EXPENSE
```

---

## Search Transactions

```http
GET /api/transactions/user/{userId}/search?keyword=chipotle
```

---

# Budgets

## Create Budget

```http
POST /api/budgets
```

Request:

```json
{
  "monthlyLimit": 500.00,
  "month": 6,
  "year": 2026,
  "userId": 1,
  "categoryId": 1
}
```

---

## Get Budgets By User

```http
GET /api/budgets/user/{userId}
```

---

## Get Budget Summary

```http
GET /api/budgets/user/{userId}/summary
```

---

# Dashboard

## Get Dashboard Summary

```http
GET /api/dashboard/user/{userId}
```

---

## Get Monthly Summary

```http
GET /api/dashboard/user/{userId}/monthly-summary?month=6&year=2026
```

---

## Get Spending By Category

```http
GET /api/dashboard/user/{userId}/spending-by-category?month=6&year=2026
```
