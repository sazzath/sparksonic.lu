#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for Sparksonic.lu
Tests all backend endpoints with realistic data and proper error handling.
"""

import requests
import json
import uuid
from datetime import datetime
import sys
import os

# Base URL from frontend environment
BASE_URL = "https://spark-services-2.preview.emergentagent.com/api"

# Global variables for test data
jwt_token = None
test_user_email = "demo@sparksonic.lu"
test_user_password = "Demo123456"

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'

def print_test_header(test_name):
    print(f"\n{Colors.BLUE}{Colors.BOLD}{'='*60}{Colors.ENDC}")
    print(f"{Colors.BLUE}{Colors.BOLD}Testing: {test_name}{Colors.ENDC}")
    print(f"{Colors.BLUE}{Colors.BOLD}{'='*60}{Colors.ENDC}")

def print_success(message):
    print(f"{Colors.GREEN}✅ {message}{Colors.ENDC}")

def print_error(message):
    print(f"{Colors.RED}❌ {message}{Colors.ENDC}")

def print_warning(message):
    print(f"{Colors.YELLOW}⚠️  {message}{Colors.ENDC}")

def print_info(message):
    print(f"{Colors.BLUE}ℹ️  {message}{Colors.ENDC}")

def test_health_check():
    """Test the health check endpoint"""
    print_test_header("Health Check")
    
    try:
        response = requests.get(f"{BASE_URL}/health", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            expected_response = {"status": "healthy", "service": "Sparksonic API"}
            
            if data == expected_response:
                print_success("Health check passed - correct response format")
                return True
            else:
                print_error(f"Health check failed - unexpected response: {data}")
                return False
        else:
            print_error(f"Health check failed - status code: {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print_error(f"Health check failed - connection error: {str(e)}")
        return False

def test_user_registration():
    """Test user registration with a new test user"""
    print_test_header("User Registration")
    
    # Generate unique test user
    unique_id = str(uuid.uuid4())[:8]
    test_email = f"testuser_{unique_id}@sparksonic.lu"
    
    registration_data = {
        "email": test_email,
        "password": "TestPassword123",
        "full_name": "Jean-Claude Testeur",
        "phone": "+352 661 123 456"
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/auth/register",
            json=registration_data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            if "customer_id" in data and "message" in data:
                print_success(f"User registration successful - Customer ID: {data['customer_id']}")
                return True, test_email
            else:
                print_error(f"Registration response missing required fields: {data}")
                return False, None
        else:
            print_error(f"Registration failed - status code: {response.status_code}, response: {response.text}")
            return False, None
            
    except requests.exceptions.RequestException as e:
        print_error(f"Registration failed - connection error: {str(e)}")
        return False, None

def test_user_login():
    """Test user login with demo credentials"""
    print_test_header("User Login")
    global jwt_token
    
    login_data = {
        "email": test_user_email,
        "password": test_user_password
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/auth/login",
            json=login_data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            required_fields = ["access_token", "token_type", "customer_id", "full_name"]
            
            if all(field in data for field in required_fields):
                jwt_token = data["access_token"]
                print_success(f"Login successful - Customer ID: {data['customer_id']}, Name: {data['full_name']}")
                print_info(f"JWT Token received (first 20 chars): {jwt_token[:20]}...")
                return True
            else:
                print_error(f"Login response missing required fields: {data}")
                return False
        else:
            print_error(f"Login failed - status code: {response.status_code}, response: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print_error(f"Login failed - connection error: {str(e)}")
        return False

def test_get_current_user():
    """Test getting current user profile with JWT token"""
    print_test_header("Get Current User Profile")
    
    if not jwt_token:
        print_error("No JWT token available - login test must pass first")
        return False
    
    headers = {
        "Authorization": f"Bearer {jwt_token}",
        "Content-Type": "application/json"
    }
    
    try:
        response = requests.get(
            f"{BASE_URL}/auth/me",
            headers=headers,
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            required_fields = ["email", "full_name", "customer_id", "created_at"]
            
            if all(field in data for field in required_fields):
                print_success(f"User profile retrieved - Email: {data['email']}, Name: {data['full_name']}")
                return True
            else:
                print_error(f"User profile response missing required fields: {data}")
                return False
        else:
            print_error(f"Get user profile failed - status code: {response.status_code}, response: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print_error(f"Get user profile failed - connection error: {str(e)}")
        return False

def test_contact_form():
    """Test contact form submission"""
    print_test_header("Contact Form Submission")
    
    contact_data = {
        "name": "Marie Dubois",
        "email": "marie.dubois@example.lu",
        "phone": "+352 661 987 654",
        "message": "Bonjour, je suis intéressée par l'installation de panneaux solaires pour ma maison à Luxembourg. Pourriez-vous me fournir un devis?",
        "service": "solar-panels"
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/contact",
            json=contact_data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            if "message" in data:
                print_success("Contact form submitted successfully")
                return True
            else:
                print_error(f"Contact form response missing message field: {data}")
                return False
        else:
            print_error(f"Contact form submission failed - status code: {response.status_code}, response: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print_error(f"Contact form submission failed - connection error: {str(e)}")
        return False

def test_create_quote():
    """Test quote request creation"""
    print_test_header("Quote Request Creation")
    
    quote_data = {
        "service": "ev-chargers",
        "description": "Installation d'une borne de recharge pour véhicule électrique dans un garage privé. Besoin d'une borne 11kW avec câble intégré.",
        "location": "Esch-sur-Alzette, Luxembourg",
        "preferred_date": "2024-02-15",
        "phone": "+352 661 456 789",
        "email": "pierre.mueller@example.lu"
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/quotes",
            json=quote_data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            if "quote_id" in data and "message" in data:
                print_success(f"Quote request created successfully - Quote ID: {data['quote_id']}")
                return True
            else:
                print_error(f"Quote response missing required fields: {data}")
                return False
        else:
            print_error(f"Quote creation failed - status code: {response.status_code}, response: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print_error(f"Quote creation failed - connection error: {str(e)}")
        return False

def test_get_user_quotes():
    """Test getting user's quotes (requires authentication)"""
    print_test_header("Get User Quotes")
    
    if not jwt_token:
        print_error("No JWT token available - login test must pass first")
        return False
    
    headers = {
        "Authorization": f"Bearer {jwt_token}",
        "Content-Type": "application/json"
    }
    
    try:
        response = requests.get(
            f"{BASE_URL}/quotes/user",
            headers=headers,
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list):
                print_success(f"User quotes retrieved successfully - Found {len(data)} quotes")
                if data:
                    print_info(f"Sample quote: {data[0].get('quote_id', 'No ID')} - {data[0].get('service', 'No service')}")
                return True
            else:
                print_error(f"User quotes response should be a list: {data}")
                return False
        else:
            print_error(f"Get user quotes failed - status code: {response.status_code}, response: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print_error(f"Get user quotes failed - connection error: {str(e)}")
        return False

def test_create_ticket():
    """Test support ticket creation (requires authentication)"""
    print_test_header("Support Ticket Creation")
    
    if not jwt_token:
        print_error("No JWT token available - login test must pass first")
        return False
    
    ticket_data = {
        "subject": "Problème avec l'installation de panneaux solaires",
        "description": "Bonjour, j'ai un problème avec mon installation de panneaux solaires. La production semble plus faible que prévu. Pourriez-vous vérifier le système?",
        "priority": "high"
    }
    
    headers = {
        "Authorization": f"Bearer {jwt_token}",
        "Content-Type": "application/json"
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/tickets",
            json=ticket_data,
            headers=headers,
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            if "ticket_id" in data and "message" in data:
                print_success(f"Support ticket created successfully - Ticket ID: {data['ticket_id']}")
                return True
            else:
                print_error(f"Ticket response missing required fields: {data}")
                return False
        else:
            print_error(f"Ticket creation failed - status code: {response.status_code}, response: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print_error(f"Ticket creation failed - connection error: {str(e)}")
        return False

def test_get_user_tickets():
    """Test getting user's tickets (requires authentication)"""
    print_test_header("Get User Tickets")
    
    if not jwt_token:
        print_error("No JWT token available - login test must pass first")
        return False
    
    headers = {
        "Authorization": f"Bearer {jwt_token}",
        "Content-Type": "application/json"
    }
    
    try:
        response = requests.get(
            f"{BASE_URL}/tickets/user",
            headers=headers,
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list):
                print_success(f"User tickets retrieved successfully - Found {len(data)} tickets")
                if data:
                    print_info(f"Sample ticket: {data[0].get('ticket_id', 'No ID')} - {data[0].get('subject', 'No subject')}")
                return True
            else:
                print_error(f"User tickets response should be a list: {data}")
                return False
        else:
            print_error(f"Get user tickets failed - status code: {response.status_code}, response: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print_error(f"Get user tickets failed - connection error: {str(e)}")
        return False

def test_get_reviews():
    """Test getting Google reviews"""
    print_test_header("Google Reviews")
    
    try:
        response = requests.get(f"{BASE_URL}/reviews", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            required_fields = ["rating", "total_reviews", "reviews"]
            
            if all(field in data for field in required_fields):
                print_success(f"Reviews retrieved successfully - Rating: {data['rating']}, Total: {data['total_reviews']}")
                print_info(f"Number of reviews returned: {len(data['reviews'])}")
                return True
            else:
                print_error(f"Reviews response missing required fields: {data}")
                return False
        else:
            print_error(f"Get reviews failed - status code: {response.status_code}, response: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print_error(f"Get reviews failed - connection error: {str(e)}")
        return False

def run_all_tests():
    """Run all backend API tests"""
    print(f"{Colors.BOLD}{Colors.BLUE}Starting Comprehensive Backend API Testing for Sparksonic.lu{Colors.ENDC}")
    print(f"{Colors.BLUE}Base URL: {BASE_URL}{Colors.ENDC}")
    print(f"{Colors.BLUE}Test Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}{Colors.ENDC}")
    
    test_results = {}
    
    # Test 1: Health Check
    test_results['health_check'] = test_health_check()
    
    # Test 2: User Registration (optional - creates new user)
    registration_success, new_user_email = test_user_registration()
    test_results['user_registration'] = registration_success
    
    # Test 3: User Login (with demo credentials)
    test_results['user_login'] = test_user_login()
    
    # Test 4: Get Current User Profile (requires login)
    test_results['get_current_user'] = test_get_current_user()
    
    # Test 5: Contact Form
    test_results['contact_form'] = test_contact_form()
    
    # Test 6: Create Quote
    test_results['create_quote'] = test_create_quote()
    
    # Test 7: Get User Quotes (requires authentication)
    test_results['get_user_quotes'] = test_get_user_quotes()
    
    # Test 8: Create Support Ticket (requires authentication)
    test_results['create_ticket'] = test_create_ticket()
    
    # Test 9: Get User Tickets (requires authentication)
    test_results['get_user_tickets'] = test_get_user_tickets()
    
    # Test 10: Get Google Reviews
    test_results['get_reviews'] = test_get_reviews()
    
    # Summary
    print_test_header("TEST SUMMARY")
    
    passed_tests = sum(1 for result in test_results.values() if result)
    total_tests = len(test_results)
    
    for test_name, result in test_results.items():
        status = "PASSED" if result else "FAILED"
        color = Colors.GREEN if result else Colors.RED
        print(f"{color}{test_name.replace('_', ' ').title()}: {status}{Colors.ENDC}")
    
    print(f"\n{Colors.BOLD}Overall Result: {passed_tests}/{total_tests} tests passed{Colors.ENDC}")
    
    if passed_tests == total_tests:
        print(f"{Colors.GREEN}{Colors.BOLD}🎉 All tests passed! Backend API is working correctly.{Colors.ENDC}")
        return True
    else:
        print(f"{Colors.RED}{Colors.BOLD}❌ Some tests failed. Please check the errors above.{Colors.ENDC}")
        return False

if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)