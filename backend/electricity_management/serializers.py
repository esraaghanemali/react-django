from rest_framework import serializers

from . import models


class ElectricitySerializer(serializers.ModelSerializer):
    amount = serializers.DecimalField(
        max_digits=10,
        decimal_places=2,
        coerce_to_string=False  # Configures the output as a numeric type
    )

    class Meta:
        model = models.Electricity
        fields = [
            "date",
            "amount",
            "last_updated",
            "created",
            "unit",
        ]
