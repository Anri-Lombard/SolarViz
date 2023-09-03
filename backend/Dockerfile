# Use Python image
FROM python:3.11

# Set environment variables
ENV PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /backend

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code
COPY . .

# Run the server
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
