
# Developer
- 👨‍💻 Developed by: Shajib Ahmeed Sadh
- 🌐 Project: CityCare – Public Infrastructure Issue Reporting System
- 🌸 programming-hero: 12 batch



## Submission Information

- Admin Email: sajib99design@gmail.com
- Admin Password: Sajib@1234

- Live Site Link (Client): https://citysmart1.netlify.app/
- Client GitHub Repository: https://github.com/sojibSadh/client-cityguard.git
- Server GitHub Repository: https://github.com/sojibSadh/cityguard-server.git

- One Staff Email: staff@staff.com
- One Staff Password : Sajib@1234

- One Citizen Email : citizen@citizen.com
- One Citizen Password: Sajib@1234




**CityCare** is a modern, full-stack Public Infrastructure Issue Reporting System. It allows citizens to report real-life city problems (broken roads, street lights, water leakage, garbage overflow, damaged sidewalks, etc.), while Admins and Staff manage, track, assign, and resolve those issues efficiently.The main goal of this platform is to increase transparency, reduce response time, and simplify city service management.


#  Lives Preview 🌸
- Client:  https://super-client-nu.vercel.app
- Server:  https://super-server-mu.vercel.app




# Clone Repository
git clone  https://github.com/Sajib99design/supertalent-client.git




##  Project Purpose

CityCare is designed to create a smooth workflow between **Citizens**, **Staff**, and **City Administrators**. The platform enables users to:
Report public infrastructure issues with images and location

- Track issue status in real time
- Assign issues to staff members
- Update progress and resolve problems
- Maintain a complete, read-only issue timeline (audit trail)
- Provide priority support for premium users





# Apps Features
**Modern UI/UX:**
Built with Tailwind CSS and DaisyUI for a professional, fully responsive design.

 **👤 Citizen Features**
- Submit public issues with title, description, image, category, and location
- Edit or delete own issues (only if status is Pending)
- Boost issue priority with payment
- Premium users can submit unlimited issues

**👷 Staff Features**
- View only assigned issues
- Update issue status (In-Progress, Resolved, Closed)
- Add progress notes
- View boosted issues with higher priority

**👨‍💼 Admin Features**
- View all issues in tabular format
- Assign staff to issues (one-time assignment)
- Reject pending issues
- Manage citizens and staff (block / unblock)
- Manage staff accounts

**Issue Lifecycle**
`Pending → In-Progress → Resolved → Closed`

Each important action automatically creates a timeline entry, including:

- Issue creation
- Staff assignment
- Status updates
- Priority boost payments
- Issue closure or rejection


**Dashboards**
**Citizen Dashboard**

- Overview stats (total issues, pending, resolved, payments)
- My Issues (filter, edit, delete, view details)
- Report Issue form
- Profile page with subscription management
- Blocked users can log in but cannot perform actions




**Staff Dashboard**

- Assigned issues overview
- Status update actions
- Boosted issues shown at the top
- Profile management




**Admin Dashboard**

- System overview (total issues, resolved, rejected, payments)
- All Issues management with staff assignment
- User management (citizen & staff)
- Payment history and downloadable invoices


## 🔐 Authentication & Authorization
- Firebase Authentication (Email/Password + Google Sign-in)
- JWT token verification on server
- Role-based access control (Admin / Staff / Citizen)
- Private routes with persistent login on refresh




## 💳 Payments & Subscription
- Issue priority boost: 100 BDT per issue
- Premium subscription: 1000 BDT
- Successful payments update UI instantly
- Downloadable invoice PDF available




## 🔐 Protected Routes
Some routes require the user to be **logged in** before access:

| Route | Description | Access |
|-------|--------------|--------|
| `/dashboard` | Dashboard pages | 🔒 Protected |
| `/issue/:id` | Issue details | 🔒 Protected |
| `/report-issue` | Submit issue | 🔒 Protected |
| `/profile` | User profile | 🔒 Protected |

Public routes such as `/`, `/all-issues`, and `/login` are open to all users.



# Additional Features
- Fully Responsive (Mobile, Tablet, Desktop)
- Minimalist UI with Tailwind CSS + DaisyUI
- Toast notifications for success/error messages
- Dedicated Error Page for invalid routes
- Navbar & Footer remain visible on all routes


## 🛠️ Tech Stack

Frontend: React, Tailwind CSS, DaisyUI Backend: Node.js, Express.js, MongoDB Authentication: Firebase Authentication State & Data Fetching: TanStack Query HTTP Client: Axios (with interceptors) Payments: Integrated Payment Gateway UI & UX: SweetAlert2, React Hot Toast Animations: Framer Motion / AOS




## 📦 Key Dependencies

- React & React Router
- TanStack Query
- Firebase
- Axios
- SweetAlert2
- React Hot Toast
- Tailwind CSS & DaisyUI
- Framer Motion




## Getting Started

1. Install dependencies
   ```bash
   npm install
   ```stall



2. Start dev server
   ```bash
   npm run dev
   ```


3. Build
   ```bash
   npm run build
   ```


## 📦 Dependencies

```json
{
  "@tailwindcss/vite": "^4.1.17",
  "axios": "^1.13.2",
  "daisyui": "^5.4.5",
  "firebase": "^12.5.0",
  "framer-motion": "^12.23.24",
  "lucide-react": "^0.552.0",
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-hot-toast": "^2.6.0",
  "react-icons": "^5.5.0",
  "react-loader-spinner": "^8.0.0",
  "react-router": "^7.9.5",
  "react-toastify": "^11.0.5",
  "sweetalert2": "^11.26.3",
  "tailwindcss": "^4.1.17",
  "toastify-js": "^1.12.0"
}
   ```
