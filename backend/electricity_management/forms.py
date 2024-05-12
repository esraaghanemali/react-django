from django import forms
from . import models


class ElectricityForm(forms.ModelForm):
    class Meta:
        model = models.Electricity
        fields = [
            "date",
            "amount",
            "unit",
        ]
