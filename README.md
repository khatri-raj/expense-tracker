# 💰 Personal Expense Tracker

Managing personal finances can be challenging. To simplify this, I built the **Personal Expense Tracker** using Django. It helps users easily **add, track, filter, and manage income and expenses** all in one place. Users can also update their profile, change passwords, and maintain full control over their financial data.

---

## 🌐 Live Demo

🔗 [View Live Application](https://expensetracker-frontend-08uj.onrender.com/)  
🔗 [View Live Application Backend ](https://expense-tracker-backend-u02t.onrender.com/)

---

## 📸 Screenshots

### 🏠 Home  
![Home](Screenshots/Home.png)

### 🔐 Login 
![Login](Screenshots/Login.png)

### 📝 Signup
![Dashboard](Screenshots/Signup.png)

### 🏠 Dashboard  
![Dashboard](Screenshots/Dashboard.png)
![Dashboard](Screenshots/Dashboard2.png)

### ➕ Add Income  
![Add Income](Screenshots/Add_Income.png)

### ➕ Add Expense  
![Add Expense](Screenshots/Add_expense.png)

### ✏️ Edit Transaction  
![Edit Transaction](Screenshots/Edit_Transactions.png)

### 🗂️ Manage Categories
![Delete Transaction](Screenshots/Delete_Transactions.png)

### 📅 Filter Transactions  
![Filter Transactions](Screenshots/Dashboard3.png)

### 👤 Update Profile  
![Update Profile](Screenshots/Update_Profile.png)

### 🔐 Change Password  
![Change Password](Screenshots/Change_Password.png)

### 🗂️ Category  
![Category](Screenshots/Category_Add.png)

### 📁 Transaction History
![Transaction History](Screenshots/Transactions_History.png)
---

## 🔍 Features

- ➕ **Add Income & Expense Transactions**
- 🔄 **Edit or Delete Existing Transactions**
- 🔎 **Filter by Date, Income, or Expense**
- 📅 **View All Transactions with Date, Category, and Description**
- 👤 **Update User Profile**
- 🔐 **Secure Password Change**
- 🧾 *(Upcoming)* CSV Export & Chart Visualization

---

## 🛠️ Tech Stack

- **Frontend:** React.js, HTML5, CSS3, Bootstrap
- **Backend:** Python, Django, Django REST Framework
- **Database:** PostgreSQL
- **Others:** JWT Authentication, Axios, Django Templates (for admin only), Framer Motion (optional for UI)

---

## 📁 Project Structure

Expense-Tracker/
├── backend/
│   ├── tracker/
│   │   ├── migrations/
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   ├── forms.py
│   │   └── ...
│   ├── ExpenseTracker/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── manage.py
│   ├── requirements.txt
│   └── ...
├── expense-tracker-frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── ...
│   ├── package.json
│   └── ...


---

## 🚀 Getting Started

### 🔧 Prerequisites
- Python 3.7+
- Node.js and npm
- PostgreSQL

---

### 💻 Backend Setup (Django + PostgreSQL)
```bash
git clone https://github.com/khatri-raj/Expense-Tracker.git
cd Expense-Tracker/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate      # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Setup .env and configure DB
# Run migrations
python manage.py migrate

# Create superuser and start server
python manage.py createsuperuser
python manage.py runserver

💻 Frontend Setup (React)
cd ../frontend
npm install
npm start
Frontend will st

📦 Sample requirements.txt
Django>=4.0,<5.0
pytz
sqlparse
asgiref
🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change or improve.

📫 Contact
Name: Raj Khatri
Email: rajkhatri8060@gmail.com
GitHub: @khatri-raj
