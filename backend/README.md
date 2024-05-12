
# Backend Setup

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

## API Endpoints

- `POST /api/electricity`: Create a new electricity usage record.
- `GET /api/electricity`: Retrieve all electricity usage records.
