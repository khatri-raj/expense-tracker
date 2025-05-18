from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('',views.home, name='home'),
    path('login_view/', views.login_view, name='login_view'),
    path('logout_view/', views.logout_view, name='logout_view'),
    path('signup_view/', views.signup_view, name='signup_view'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('add_income/', views.add_income, name='add_income'),
    path('add_expense/', views.add_expense, name='add_expense'),
    path('transaction/edit/<int:pk>/', views.edit_transaction, name='edit_transaction'),
    path('transaction/delete/<int:pk>/', views.delete_transaction, name='delete_transaction'),
    path('profile/', views.profile_update, name='profile_update'),
    path('change-password/', views.change_password, name='change_password'),
]
