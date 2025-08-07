from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.contrib.auth import authenticate
from .models import AdminUser, Student, GuestSession
from .serializers import *
import uuid


@api_view(['GET'])
def hello_world(request):
    return Response({"message": "Hello from the backend!"})


# Admin login endpoint
@api_view(['POST'])
def admin_login(request):
    serializer = AdminLoginSerializer(data=request.data)
    if serializer.is_valid():
        user = authenticate(
            request,
            email=serializer.validated_data['email'],
            password=serializer.validated_data['password']
        )
        if user:
            request.session['user_id'] = user.id
            request.session['role'] = 'admin'
            
            # Directly create user data dictionary without serializer
            user_data = {
                'id': user.id,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'is_superuser': user.is_superuser,
                'is_staff': user.is_staff,
                'username': user.username,
            }
            
            return Response({
                'message': 'Admin login successful',
                'user': user_data
            }, status=200)
        
        return Response({'error': 'Invalid credentials'}, status=401)
    return Response(serializer.errors, status=400)


# Student login endpoint
@api_view(['POST'])
def student_login(request):
    serializer = StudentLoginSerializer(data=request.data)
    if serializer.is_valid():
        try:
            student = Student.objects.get(
                grade=serializer.validated_data['grade'],
                student_id=serializer.validated_data['student_id']
            )
            request.session['user_id'] = student.id
            request.session['role'] = 'student'

            # Directly create user data dictionary without serializer
            user_data = {
                'id': student.id,
                'full_name': student.full_name,
                'grade': student.grade,
                'student_id': student.student_id,
                'created_at': student.created_at,
            }
            
            return Response({
                'message': 'Student login successful',
                'user': user_data
            }, status=200)
        except Student.DoesNotExist:
            return Response({'error': 'Student not found'}, status=404)
    return Response(serializer.errors, status=400)

# Guest session endpoint
@api_view(['POST'])
def guest_login(request):
    session_id = str(uuid.uuid4())
    GuestSession.objects.create(session_id=session_id)
    request.session['guest_session'] = session_id
    request.session['role'] = 'guest'
    return Response({'message': 'Guest session started', 'session_id': session_id}, status=200)

@api_view(['POST'])
def logout_user(request):
    if request.session.exists(request.session.session_key):
        request.session.flush()  # Clear all session data
        return Response({'message': 'Successfully logged out'}, status=200)
    return Response({'error': 'No active session found'}, status=400)