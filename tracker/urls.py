from django.urls import path
from .views import (
    home, signup_view, login_view, logout_view, add_income, add_expense, dashboard,
    edit_transaction, delete_transaction, profile_update, change_password,
    CategoryListCreateAPIView, TransactionListCreateAPIView, TransactionDetailAPIView,
    DashboardAPIView, SignupAPIView, ProfileUpdateAPIView, ChangePasswordAPIView, CategoryListCreateAPIView  # Add this import
)

urlpatterns = [
    # Existing views
    path('', home, name='home'),
    path('login_view/', login_view, name='login_view'),
    path('logout_view/', logout_view, name='logout_view'),
    path('signup_view/', signup_view, name='signup_view'),
    path('dashboard/', dashboard, name='dashboard'),
    path('add_income/', add_income, name='add_income'),
    path('add_expense/', add_expense, name='add_expense'),
    path('transaction/edit/<int:pk>', edit_transaction, name='edit_transaction'),
    path('transaction/delete/<int:pk>/', delete_transaction, name='delete_transaction'),
    path('profile/', profile_update, name='profile_update'),
    path('change_password/', change_password, name='change_password'),
    
    # API endpoints
    path('api/categories/', CategoryListCreateAPIView.as_view(), name='category_api'),
    path('api/transactions/', TransactionListCreateAPIView.as_view(), name='transaction_list_create'),
    path('api/transactions/<int:pk>/', TransactionDetailAPIView.as_view(), name='transaction_detail'),
    path('api/dashboard/', DashboardAPIView.as_view(), name='dashboard_api'),
    path('api/signup/', SignupAPIView.as_view(), name='signup_api'),
    path('api/profile/', ProfileUpdateAPIView.as_view(), name='profile_api'),
    path('api/change_password/', ChangePasswordAPIView.as_view(), name='change_password_api'),
]