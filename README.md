# Electricity Usage Tracker

For more details on the architectural decisions, see the [Architecture Decision Document](./Architecture_Decision.md).

## Overview

This application serves as a full-stack solution for tracking electricity usage. It utilizes Django as the backend to handle data management and React (with Vite) as the frontend for interactive user experiences. This project supports creating, viewing, and normalizing electricity usage records.

## Features

- **Operations**: Users can create, list electricity usage instances.
- **Data Normalization**: Convert and normalize electricity amounts to kWh when listing.
- **Interactive Charting**: Utilizes React Chart.js to display and update electricity usage data graphically.

## Technologies

- **Backend**: Django
- **Frontend**: React with Vite
- **Charting**: Chart.js
- **Database**: SQLite (default for Django)

## Getting Started

### Prerequisites

- Python 3.8 or later
- Node.js and pnpm

### Installation

#### Backend Setup

1. Clone the repository:

2. Install Python dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Migrate the database:

   ```bash
   python manage.py migrate
   ```

4. Run the Django development server:

   ```bash
   python manage.py runserver
   ```

#### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install pnpm packages:

   ```bash
   pnpm install
   ```

3. Start the Vite development server:

   ```bash
   pnpm run dev
   ```

### Usage

1. Open your web browser and navigate to `http://localhost:3000` to access the frontend.
2. Add a new electricity usage data through the provided form.

## Future Enhancements

- Implement user authentication.
- Add more detailed error handling and validation on the frontend.
- Optimize data storage by implementing a more robust database solution like PostgreSQL.
- Real-time Updates Using WebSockets
