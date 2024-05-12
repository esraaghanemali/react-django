from django.contrib import admin
from django import forms

from . import models


class ElectricityAdminForm(forms.ModelForm):

    class Meta:
        model = models.Electricity
        fields = "__all__"


class ElectricityAdmin(admin.ModelAdmin):
    form = ElectricityAdminForm
    list_display = [
        "date",
        "amount",
        "last_updated",
        "created",
        "unit",
    ]
    readonly_fields = [
        "date",
        "amount",
        "last_updated",
        "created",
        "unit",
    ]


admin.site.register(models.Electricity, ElectricityAdmin)
