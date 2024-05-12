from rest_framework import viewsets, permissions

from . import serializers
from . import models
from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Electricity
from .serializers import ElectricitySerializer


class ElectricityApiView(APIView):
    # TODO: Should allow only authenticated users
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        from_date = request.query_params.get('fromDate')
        to_date = request.query_params.get('toDate')
        queryset = Electricity.objects.all()

        if from_date and to_date:
            queryset = queryset.filter(date__range=[from_date, to_date])

        serializer = ElectricitySerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = ElectricitySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)