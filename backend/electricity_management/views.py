from django.views import generic
from django.urls import reverse_lazy
from . import models
from . import forms

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Electricity
from .serializers import ElectricitySerializer

# Generic views for django UI
class ElectricityListView(generic.ListView):
    model = models.Electricity
    form_class = forms.ElectricityForm


class ElectricityCreateView(generic.CreateView):
    model = models.Electricity
    form_class = forms.ElectricityForm


class ElectricityDetailView(generic.DetailView):
    model = models.Electricity
    form_class = forms.ElectricityForm


class ElectricityUpdateView(generic.UpdateView):
    model = models.Electricity
    form_class = forms.ElectricityForm
    pk_url_kwarg = "pk"


class ElectricityDeleteView(generic.DeleteView):
    model = models.Electricity
    success_url = reverse_lazy("electricity_management_Electricity_list")
