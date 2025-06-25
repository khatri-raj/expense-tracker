#!/bin/bash

python manage.py migrate --noinput

echo "
from django.contrib.auth import get_user_model;
User = get_user_model();
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
" | python manage.py shell

gunicorn expense_tracker.wsgi:application --bind 0.0.0.0:$PORT
