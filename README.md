# Anvaya CRM

Anvaya CRM is a full-stack customer relationship management system built to help sales teams manage leads, assign agents, track interactions, and monitor conversions efficiently.

---

## Demo Link

[Live Demo](https://anvaya-frontend-steel.vercel.app)

---

## Quick Start

```
git clone https://github.com/Rupalis-pc/anvaya-frontend.git
cd anvaya-frontend
npm install
npm start
```

## 🔧 Tech Stack

### Frontend:
- **React.js** with Hooks
- **React Router** for navigation
- **Context API** for state management
- **Chart.js** for data visualization
- **CSS / Flex Box**

### Backend:
- **Node.js** with Express.js
- **MongoDB** with Mongoose

---

## ✨ Features

### Dashboard
- Displays leads and their current status
- Shows the number of leads in each status category  
- Sidebar navigation: Leads, Sales, Agents, Reports, Settings
- Quick filters by lead status
- "Add New Lead" button opens form

### Lead Management
- View individual lead information
- Edit lead details
- Comments with author and timestamps
- Add comments to track communication history

### Lead List
- View all leads 
- Filtering / Sorting options
- "Add New Lead" button opens form

### Sales Agent Management
- View all Sales Agents 
- "Add New Agent" button opens form

### Reports
- Leads Closed vs In Pipeline (Pie Chart)
- Leads closed per agent (Pie Chart)
- Leads by status chart (Bar Chart)

### Settings
- Manage List of Leads
- Manage list of sales agents
- Option to Add and Delete 

## Demo Video
Watch a walkthrough (5 minutes) of all major features of this app:
[Loom Video Link](https://www.loom.com/share/0c8f73f652914a409d5b14d40260af94?sid=eeb51af2-94ff-4700-accd-ec38f1e7e623)

---

## 🛠️ API Endpoints

### Leads
- `GET /leads` - Get all leads
- `POST /leads` - Create a lead
- `GET /leads/:id` - Get lead details
- `PUT /leads/:id` - Update lead
- `DELETE /leads/:id` - Delete lead

### Comments
- `GET /leads/:id/comments` - Get comments for a lead
- `POST /leads/:id/comments` - Add comment to a lead

### Sales Agents
- `GET /agents` - List agents
- `POST /agents` - Add new agent

### Reports
- `GET /report/last-week` - Leads closed last week
- `GET /report/pipeline` - All leads except closed

---

## Contact
For bugs or feature requests, please reach out to rupalisethiaa@gmail.com

---

## 👩‍💻 Author
**Rupali Sethia**  
