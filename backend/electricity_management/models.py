from django.db import models
from django.urls import reverse


class Electricity(models.Model):
    UNIT_CHOICES = (
        ('kWh', 'Kilowatt Hour'),
        ('MWh', 'Megawatt Hour'),  # Represents 1,000 kWh
        ('GJ', 'Gigajoule'),       # Represents 277.777778 kWh
    )

    # Fields
    date = models.DateTimeField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    last_updated = models.DateTimeField(auto_now=True, editable=False)
    created = models.DateTimeField(auto_now_add=True, editable=False)
    unit = models.CharField(max_length=3, choices=UNIT_CHOICES)

    class Meta:
        pass

    def __str__(self):
        return str(self.pk)

    def get_absolute_url(self):
        return reverse("electricity_management_Electricity_detail", args=(self.pk,))

    def get_update_url(self):
        return reverse("electricity_management_Electricity_update", args=(self.pk,))

