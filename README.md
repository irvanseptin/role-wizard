# Employee Wizard

A modern, role-based employee management system built with **Next.js 16**, **TypeScript**, and **Atomic Design** principles. Features a 2-step wizard form with admin/ops access control, auto-save functionality, and complete CRUD operations.

## 🌐 Live Demo

**Frontend:** [https://role-wizard.vercel.app/](https://role-wizard.vercel.app/)

> ⚠️ **Note:** The backend API runs locally via json-server. To test the full functionality, you need to run the project locally.

---

## ✨ Features

- ✅ **Role-Based Access Control** (Admin & Ops)
- ✅ **2-Step Wizard Form** with role selection
- ✅ **Async Autocomplete** for departments and locations
- ✅ **File Upload** with image preview and Base64 conversion
- ✅ **Auto-Generated Employee ID** (e.g., ENG-001, LEN-003)
- ✅ **Draft Auto-Save** every 2 seconds (debounced)
- ✅ **Sequential Async Submit** with progress tracking
- ✅ **Employee List** with pagination and search
- ✅ **Responsive Design** (360px - 1440px)
- ✅ **Atomic Design Architecture**
- ✅ **TypeScript** for type safety
- ✅ **SCSS** with variables and mixins
- ✅ **Jest & React Testing Library** for testing

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.0 or higher ([Download](https://nodejs.org/))
- **npm** 9.0 or higher (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

Check your versions:

```bash
node --version   # Should be v18.0.0 or higher
npm --version    # Should be 9.0.0 or higher
git --version    # Any recent version
```

---

## 🚀 Installation

### 1. Clone the Repository

```bash
# Clone the repository
git clone https://github.com/irvanseptin/role-wizard.git

# Navigate to project directory
cd role-wizard
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required dependencies including:

- Next.js 16
- React 19
- TypeScript
- json-server
- SCSS
- Testing libraries (Jest, React Testing Library)

---

## 🗄️ Database Setup

### 1. Create Mock Database Files

Create these two files in the project root:

#### **db-step1.json**

```json
{
  "departments": [
    { "id": 1, "name": "Lending" },
    { "id": 2, "name": "Funding" },
    { "id": 3, "name": "Operations" },
    { "id": 4, "name": "Engineering" },
    { "id": 5, "name": "Marketing" },
    { "id": 6, "name": "Sales" },
    { "id": 7, "name": "Human Resources" },
    { "id": 8, "name": "Finance" }
  ],
  "basicInfo": []
}
```

#### **db-step2.json**

```json
{
  "locations": [
    { "id": 1, "name": "Jakarta" },
    { "id": 2, "name": "Depok" },
    { "id": 3, "name": "Surabaya" },
    { "id": 4, "name": "Bandung" },
    { "id": 5, "name": "Semarang" },
    { "id": 6, "name": "Yogyakarta" },
    { "id": 7, "name": "Bali" }
  ],
  "details": []
}
```

### 2. Verify File Structure

Your project should look like this:

```
role-wizard/
├── db-step1.json          ✅ Create this file
├── db-step2.json          ✅ Create this file
├── package.json
├── next.config.ts
├── tsconfig.json
├── app/
├── components/
├── lib/
├── types/
├── hooks/
└── styles/
```

---

## 🏃 Running the Project Locally

### Option 1: Run Everything at Once (Recommended)

```bash
npm run dev
```

This command will:

1. Start json-server on port 4001 (basicInfo & departments)
2. Start json-server on port 4002 (details & locations)
3. Start Next.js dev server on port 3000

**Access the application:**

- Frontend: [http://localhost:3000](http://localhost:3000)
- API 1: [http://localhost:4001](http://localhost:4001)
- API 2: [http://localhost:4002](http://localhost:4002)

### Option 2: Run Servers Separately

Open **3 terminal windows**:

```bash
# Terminal 1: Start API server 1
npm run api1

# Terminal 2: Start API server 2
npm run api2

# Terminal 3: Start Next.js dev server
npm start
```

---

## 🧪 Running Tests

### Run All Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Run Tests with Coverage

```bash
npm test -- --coverage
```

## 🔍 Verifying the Setup

### 1. Check if json-server is running:

```bash
# Test API endpoint 1
curl http://localhost:4001/departments

# Test API endpoint 2
curl http://localhost:4002/locations
```

Expected response:

```json
[
  { "id": 1, "name": "Lending" },
  { "id": 2, "name": "Funding" },
  ...
]
```

### 2. Check if Next.js is running:

Open your browser and navigate to:

- [http://localhost:3000](http://localhost:3000)

You should see the Employee Directory page.

### 3. Test the Complete Flow:

1. Click "Add Employee" button
2. Select a role (Admin or Ops)
3. Fill out the form
4. Submit the form
5. See the new employee in the list

---

## 📁 Project Structure

```
role-wizard/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Employee List (Read)
│   ├── wizard/
│   │   ├── page.tsx
│   └── role-selection/
│   │   ├── page.tsx
│
├── components/                   # Atomic Design Components
│   ├── atoms/                   # Basic UI elements
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Select/
│   │   └── ...
│   ├── molecules/               # Simple combinations
│   │   ├── FormField/
│   │   ├── Autocomplete/
│   │   ├── FileUpload/
│   │   └── ...
│   ├── organisms/               # Complex components
│   │   ├── Stepper/
│   │   ├── ProgressModal/
│   │   ├── EmployeeTable/
│   │   └── WizardForm/
│   └── templates/               # Page layouts
│       ├── WizardLayout/
│       └── PageLayout/
│
├── lib/                         # Utilities & Services
│   ├── api.ts                   # API functions
│   └── storage.ts               # localStorage management
│
├── hooks/                       # Custom React Hooks
│   ├── useAutoSave.ts
│   ├── useDebounce.ts
│   └── useClickOutside.ts
│
├── types/                       # TypeScript definitions
│   └── index.ts
│
├── styles/                      # Global styles
│   ├── _variables.scss
│
├── db-step1.json               # Mock database 1
├── db-step2.json               # Mock database 2
├── package.json
├── tsconfig.json
├── next.config.ts
└── jest.config.js
```

---

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Run all servers (API + Next.js)
npm run api1             # Run json-server on port 4001
npm run api2             # Run json-server on port 4002
npm run run-api          # Run both API servers

# Production
npm run build            # Build for production
npm start                # Start production server

# Testing
npm test                 # Run all tests
npm run test:watch       # Run tests in watch mode

# Utilities
npm run lint             # Run ESLint
npm run api:reset        # Reset database to initial state
```
