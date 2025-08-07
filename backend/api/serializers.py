from rest_framework import serializers

class AdminLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

class StudentLoginSerializer(serializers.Serializer):
    grade = serializers.CharField()
    student_id = serializers.CharField()

class GuestSessionSerializer(serializers.Serializer):
    session_id = serializers.CharField()
