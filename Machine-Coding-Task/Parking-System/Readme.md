# Smart Parking Management System 🚗

A scalable Smart Parking Management System built with Node.js, Express, MongoDB, Redis, Socket.io, and BullMQ. This project goes beyond a traditional booking system by introducing real-time communication, caching, background jobs, dynamic pricing, and analytics.

---

## 📌 Project Overview

The Smart Parking Management System allows users to find, reserve, and manage parking slots in real time. The system supports temporary slot holding, waiting queues, dynamic pricing, occupancy tracking, and automated billing.

This project is designed to help developers learn advanced backend concepts commonly used in production-grade applications.

---

## 🚀 Features

### 1. User Authentication & Authorization

* JWT-based authentication
* Role-based access control
* User and Admin roles
* Secure route protection

### 2. Parking Slot Management

* Create parking zones
* Add parking slots
* Update slot availability
* Track occupied and available slots

### 3. Real-Time Slot Updates

Users can instantly see slot availability changes without refreshing the page.

**Tech Used:**

* Socket.io

**Example Event:**

```javascript
io.emit("slot-updated", {
  slotId: "A12",
  status: "occupied"
});
```

### 4. Temporary Slot Reservation

Users can hold a parking slot before payment.

**Features:**

* Slot locked for 5 minutes
* Auto-release if payment is not completed
* Prevents double booking

**Tech Used:**

* Redis
* Redis TTL

**Example:**

```bash
SET slot:A12 user123 EX 300
```

### 5. Waiting Queue System

When all parking slots are occupied:

* Users can join a waiting queue
* Automatically notified when a slot becomes available
* First-in, first-out allocation

**Tech Used:**

* BullMQ
* Redis Queues

### 6. Dynamic Pricing Engine

Parking charges vary based on real-time conditions.

Factors:

* Peak hours
* Weekends
* Occupancy percentage

Example:

```text
Base Price = ₹100

Occupancy > 80% = +20%
Weekend = +15%

Final Price = ₹135
```

### 7. Automatic Fine Calculation

Additional charges are applied for overstaying.

Example:

```text
Booked Duration = 2 Hours
Actual Duration = 3.5 Hours

Extra Time = 1.5 Hours
Fine = 1.5 × ₹50
```

### 8. Payment Management

* Generate payment records
* Track transaction history
* Calculate parking fees
* Fine management

### 9. Analytics Dashboard

Generate parking insights such as:

* Total revenue
* Occupancy rate
* Peak parking hours
* Most-used parking zones
* Reservation trends

**Tech Used:**

* MongoDB Aggregation Pipeline

### 10. Automated Background Jobs

Scheduled tasks for:

* Releasing expired reservations
* Updating occupancy statistics
* Sending reminders
* Processing queue notifications

**Tech Used:**

* Cron Jobs
* BullMQ Workers

---

## 🏗️ System Architecture

```text
Client
   |
   v
Express API
   |
   +---- MongoDB
   |
   +---- Redis
   |
   +---- Socket.io
   |
   +---- BullMQ Workers
```

---

## 📂 Database Collections

### Users

```javascript
{
  name,
  email,
  password,
  role
}
```

### ParkingZones

```javascript
{
  name,
  floor,
  totalSlots
}
```

### Slots

```javascript
{
  slotNumber,
  zoneId,
  status
}
```

### Reservations

```javascript
{
  userId,
  slotId,
  startTime,
  endTime,
  status
}
```

### Transactions

```javascript
{
  reservationId,
  amount,
  paymentStatus
}
```

### WaitingQueue

```javascript
{
  userId,
  joinedAt
}
```

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JWT
* bcrypt

### Real-Time Communication

* Socket.io

### Caching

* Redis

### Background Processing

* BullMQ
* Redis Workers

### Scheduling

* Node Cron

### Development Tools

* Docker
* Postman
* Git

---

## 🎯 Learning Objectives

This project helps developers learn:

* REST API Development
* Authentication & Authorization
* Real-Time Communication
* Redis Caching
* Distributed Locking
* Queue Management
* Background Jobs
* Dynamic Pricing Logic
* MongoDB Aggregation
* System Design Principles
* Production-Level Backend Architecture

---

## 🔮 Future Enhancements

* QR Code Entry & Exit
* RFID Vehicle Tracking
* Push Notifications
* AI-Based Slot Recommendations
* Multi-City Parking Support
* EV Charging Slot Reservations
* Payment Gateway Integration
* Admin Analytics Dashboard
* Vehicle Recognition System

---

## 📈 Project Roadmap

### Phase 1

* Authentication
* Slot Management
* Reservation APIs

### Phase 2

* Real-Time Slot Updates
* Redis Slot Locking

### Phase 3

* Waiting Queue System
* BullMQ Workers

### Phase 4

* Dynamic Pricing
* Fine Calculation

### Phase 5

* Analytics Dashboard
* Cron Jobs

### Phase 6

* Docker Deployment
* Production Optimization

---

## 🎓 Key Concepts Covered

* Node.js Backend Development
* Event-Driven Architecture
* Queue-Based Processing
* Redis Caching
* WebSockets
* Background Workers
* Scalable System Design
* Database Optimization
* Real-Time Applications
* Enterprise Backend Patterns
