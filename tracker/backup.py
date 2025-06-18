from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login, logout, authenticate
from django.contrib import messages
from .forms import CustomUserCreationForm
from django.contrib.auth.decorators import login_required
from django.db.models import Sum
from django.shortcuts import render
from .forms import TransactionForm
from django.db import models
from .models import Category, Transaction
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib.auth import update_session_auth_hash
from .forms import UserUpdateForm
from django.core.paginator import Paginator
from django.db.models import Q


def home(request):
    return render(request,'home.html')

def signup_view(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Registration successful. Please log in.")
            return redirect('login_view')
        else:
            messages.error(request, "Please correct the errors below.")
    else:
        form = CustomUserCreationForm()
    return render(request, 'signup.html', {'form': form})


def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            messages.error(request, "Invalid username or password.")
    return render(request, 'login.html')

def logout_view(request):
    logout(request)
    return redirect('home')

@login_required
def add_income(request):
    if request.method == 'POST':
        form = TransactionForm(request.POST)
        if form.is_valid():
            transaction = form.save(commit=False)
            transaction.user = request.user
            transaction.type = 'Income'
            transaction.save()
            return redirect('dashboard')
    else:
        form = TransactionForm()
        form.fields['category'].queryset = Category.objects.filter(user=request.user)  # user-specific categories if applicable

    return render(request, 'add_income.html', {'form': form})

@login_required
def add_expense(request):
    if request.method == 'POST':
        form = TransactionForm(request.POST)
        if form.is_valid():
            transaction = form.save(commit=False)
            transaction.user = request.user
            transaction.type = 'Expense'
            transaction.save()
            return redirect('dashboard')
    else:
        form = TransactionForm()
    return render(request, 'add_expens.html', {'form': form, 'type': 'Expense'})

@login_required
def dashboard(request):
    user = request.user

    # Get filter parameters from GET request
    start_date = request.GET.get('start_date')
    end_date = request.GET.get('end_date')
    category_id = request.GET.get('category')
    txn_type = request.GET.get('type')

    # Base queryset filtered by user
    transactions = Transaction.objects.filter(user=user).order_by('-date')

    # Apply filters
    if start_date:
        transactions = transactions.filter(date__gte=start_date)
    if end_date:
        transactions = transactions.filter(date__lte=end_date)
    if category_id and category_id != '':
        transactions = transactions.filter(category_id=category_id)
    if txn_type and txn_type != '':
        transactions = transactions.filter(type=txn_type)

    # Pagination
    paginator = Paginator(transactions, 10)  # 10 transactions per page
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    # Calculate totals (only from filtered transactions)
    total_income = transactions.filter(type='Income').aggregate(total=models.Sum('amount'))['total'] or 0
    total_expense = transactions.filter(type='Expense').aggregate(total=models.Sum('amount'))['total'] or 0
    balance = total_income - total_expense

    categories = Category.objects.filter(user=user)  # For filter dropdown

    context = {
        'page_obj': page_obj,
        'total_income': total_income,
        'total_expense': total_expense,
        'balance': balance,
        'categories': categories,
        'filter_values': {
            'start_date': start_date,
            'end_date': end_date,
            'category_id': category_id,
            'txn_type': txn_type,
        }
    }
    return render(request, 'dashboard.html', context)

@login_required
def edit_transaction(request, pk):
    transaction = get_object_or_404(Transaction, pk=pk, user=request.user)

    if request.method == 'POST':
        form = TransactionForm(request.POST, instance=transaction)
        if form.is_valid():
            form.save()
            messages.success(request, 'Transaction updated successfully.')
            return redirect('dashboard')
    else:
        form = TransactionForm(instance=transaction)

    return render(request, 'edit_transaction.html', {'form': form})

@login_required
def delete_transaction(request, pk):
    transaction = get_object_or_404(Transaction, pk=pk, user=request.user)

    if request.method == 'POST':
        transaction.delete()
        messages.success(request, 'Transaction deleted successfully.')
        return redirect('dashboard')

    return render(request, 'delete_transaction.html', {'transaction': transaction})

@login_required
def profile_update(request):
    if request.method == 'POST':
        form = UserUpdateForm(request.POST, instance=request.user)
        if form.is_valid():
            form.save()
            messages.success(request, 'Your profile has been updated.')
            return redirect('profile_update')
    else:
        form = UserUpdateForm(instance=request.user)

    return render(request, 'profile_update.html', {'form': form})

@login_required
def change_password(request):
    if request.method == 'POST':
        form = PasswordChangeForm(user=request.user, data=request.POST)
        if form.is_valid():
            user = form.save()
            update_session_auth_hash(request, user)  # Important to keep the user logged in
            messages.success(request, 'Your password was successfully updated!')
            return redirect('change_password')
        else:
            messages.error(request, 'Please correct the error below.')
    else:
        form = PasswordChangeForm(user=request.user)
    return render(request, 'change_password.html', {'form': form})


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination
from django.db.models import Sum
from .models import Category, Transaction
from django.contrib.auth.models import User
from .serializers import CategorySerializer, TransactionSerializer, UserSerializer

class StandardPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class TransactionDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        transaction = get_object_or_404(Transaction, pk=pk, user=request.user)
        serializer = TransactionSerializer(transaction)
        return Response(serializer.data)

    def put(self, request, pk):
        print(f"Processing PUT for transaction ID: {pk}, user: {request.user}")  # Debug
        print(f"Request data: {request.data}")  # Debug
        transaction = get_object_or_404(Transaction, pk=pk, user=request.user)
        serializer = TransactionSerializer(transaction, data=request.data)
        if serializer.is_valid():
            serializer.save()
            print(f"Updated transaction: {serializer.data}")  # Debug
            return Response(serializer.data)
        print(f"Serializer errors: {serializer.errors}")  # Debug
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        transaction = get_object_or_404(Transaction, pk=pk, user=request.user)
        transaction.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny  # Ensure this is imported
from django.contrib.auth.models import User
from .serializers import UserSerializer

class SignupAPIView(APIView):
    permission_classes = [AllowAny]  # Allow unauthenticated access

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = User.objects.create_user(
                username=serializer.validated_data['username'],
                email=serializer.validated_data['email'],
                password=request.data['password']
            )
            user.save()
            return Response({'message': 'Registration successful'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User

class ProfileUpdateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
from django.contrib.auth.forms import PasswordChangeForm

class ChangePasswordAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        form = PasswordChangeForm(user=request.user, data=request.data)
        if form.is_valid():
            form.save()
            return Response({'message': 'Password changed successfully'}, status=status.HTTP_200_OK)
        return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)
    

from rest_framework import generics, permissions
from rest_framework.exceptions import ValidationError
from django.db.models import ProtectedError
from .models import Category, Transaction
from .serializers import CategorySerializer

class CategoryListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        print(f"Fetching categories for user: {self.request.user}")  # Debug
        return Category.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        print(f"Creating category for user: {self.request.user}")  # Debug
        serializer.save(user=self.request.user)

    def perform_destroy(self, instance):
        try:
            print(f"Attempting to delete category ID: {instance.id} for user: {self.request.user}")  # Debug
            if Transaction.objects.filter(category=instance).exists():
                raise ValidationError("Cannot delete category because it is used in transactions.")
            instance.delete()
        except ProtectedError:
            raise ValidationError("Cannot delete category due to existing transactions.")
        except Exception as e:
            print(f"Delete error: {str(e)}")  # Debug
            raise ValidationError(f"Failed to delete category: {str(e)}")

class CategoryDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        print(f"Fetching category for user: {self.request.user}")  # Debug
        return Category.objects.filter(user=self.request.user)

    def perform_destroy(self, instance):
        try:
            print(f"Attempting to delete category ID: {instance.id} for user: {self.request.user}")  # Debug
            if Transaction.objects.filter(category=instance).exists():
                raise ValidationError("Cannot delete category because it is used in transactions.")
            instance.delete()
        except ProtectedError:
            raise ValidationError("Cannot delete category due to existing transactions.")
        except Exception as e:
            print(f"Delete error: {str(e)}")  # Debug
            raise ValidationError(f"Failed to delete category: {str(e)}")
        
class TransactionListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = PageNumberPagination

    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Transaction, Category
from .serializers import TransactionSerializer, CategorySerializer
from django.db.models import Sum

class DashboardAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        print(f"Fetching dashboard for user: {request.user}")  # Debug
        # Get filters
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')
        category_id = request.query_params.get('category_id')
        type_param = request.query_params.get('type')
        page = int(request.query_params.get('page', 1))
        page_size = 10  # Adjust as needed

        # Filter transactions
        transactions = Transaction.objects.filter(user=request.user)
        if start_date:
            transactions = transactions.filter(date__gte=start_date)
        if end_date:
            transactions = transactions.filter(date__lte=end_date)
        if category_id:
            transactions = transactions.filter(category_id=category_id)
        if type_param:
            transactions = transactions.filter(type=type_param)

        # Pagination
        total_transactions = transactions.count()
        total_pages = (total_transactions + page_size - 1) // page_size
        transactions = transactions[(page - 1) * page_size:page * page_size]

        # Serialize data
        transaction_serializer = TransactionSerializer(transactions, many=True)
        categories = Category.objects.filter(user=request.user)
        category_serializer = CategorySerializer(categories, many=True)

        # Calculate totals
        total_income = Transaction.objects.filter(
            user=request.user, type='Income'
        ).aggregate(total=Sum('amount'))['total'] or 0
        total_expense = Transaction.objects.filter(
            user=request.user, type='Expense'
        ).aggregate(total=Sum('amount'))['total'] or 0
        balance = total_income - total_expense

        return Response({
            'data': {
                'transactions': transaction_serializer.data,
                'total_income': float(total_income),
                'total_expense': float(total_expense),
                'balance': float(balance),
                'categories': category_serializer.data,
            },
            'total_pages': total_pages
        })