from django.urls import path, include
from rest_framework import routers

from . import api
from . import views

router = routers.DefaultRouter()

urlpatterns = (
    path('api/electricity/', api.ElectricityApiView.as_view()),
    path("electricity_management/Electricity/", views.ElectricityListView.as_view(), name="electricity_management_Electricity_list"),
    path("electricity_management/Electricity/create/", views.ElectricityCreateView.as_view(), name="electricity_management_Electricity_create"),
    path("electricity_management/Electricity/detail/<int:pk>/", views.ElectricityDetailView.as_view(), name="electricity_management_Electricity_detail"),
    path("electricity_management/Electricity/update/<int:pk>/", views.ElectricityUpdateView.as_view(), name="electricity_management_Electricity_update"),
    path("electricity_management/Electricity/delete/<int:pk>/", views.ElectricityDeleteView.as_view(), name="electricity_management_Electricity_delete"),

)
