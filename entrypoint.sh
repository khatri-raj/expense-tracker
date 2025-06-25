#!/bin/bash

# Run database migrations
python manage.py migrate --noinput

# Create a default superuser if it doesn't exist
echo "from django.contrib.auth import get_user_model; \
User = get_user_model(); \
User.objects.filter(username='admin').exists() or \
User.objects.create_superuser('RajKhatri', 'rajkhatri@gmail.com', 'Khatri@25')" \
| python manage.py shell

# Start the server
gunicorn expense_tracker.wsgi:application --bind 0.0.0.0:$PORT