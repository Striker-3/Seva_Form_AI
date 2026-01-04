# Seva Form AI - Project Setup Guide

This project consists of a React frontend and a FastAPI (Python) backend. Follow these instructions to set up and run the project on a new machine.

## Prerequisites
- [Node.js](https://nodejs.org/) (Latest LTS version recommended)
- [Python 3.8+](https://www.python.org/downloads/)

## 1. Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```

2.  Create a virtual environment (recommended to keep dependencies isolated):
    ```bash
    # Windows
    python -m venv .venv
    
    # macOS/Linux
    python3 -m venv .venv
    ```

3.  Activate the virtual environment:
    ```bash
    # Windows
    .venv\Scripts\activate
    
    # macOS/Linux
    source .venv/bin/activate
    ```

4.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

5.  Run the backend server:
    ```bash
    python -m uvicorn app.main:app --reload --port 8000
    ```
    The backend will be available at `http://localhost:8000`.

## 2. Frontend Setup

1.  Open a new terminal and navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```
    The frontend will be available at `http://localhost:5173` (or the port shown in the terminal).

## Sharing the Project
**IMPORTANT:** When sharing this project (e.g., via ZIP), **delete** following folders first. They are large and system-specific. The recipient will regenerate them using the steps above.

- `frontend/node_modules`
- `backend/.venv`
- `backend/__pycache__`
