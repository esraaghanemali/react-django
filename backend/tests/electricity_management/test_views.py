import pytest
import test_helpers

from django.urls import reverse


pytestmark = [pytest.mark.django_db]


def tests_Electricity_list_view(client):
    instance1 = test_helpers.create_electricity_management_Electricity()
    instance2 = test_helpers.create_electricity_management_Electricity()
    url = reverse("electricity_management_Electricity_list")
    response = client.get(url)
    assert response.status_code == 200
    assert str(instance1) in response.content.decode("utf-8")
    assert str(instance2) in response.content.decode("utf-8")


def tests_Electricity_create_view(client):
    url = reverse("electricity_management_Electricity_create")
    data = {
        "date": datetime.now(),
        "amount": 1.0,
        "unit": "text",
    }
    response = client.post(url, data)
    assert response.status_code == 302


def tests_Electricity_detail_view(client):
    instance = test_helpers.create_electricity_management_Electricity()
    url = reverse("electricity_management_Electricity_detail", args=[instance.pk, ])
    response = client.get(url)
    assert response.status_code == 200
    assert str(instance) in response.content.decode("utf-8")


def tests_Electricity_update_view(client):
    instance = test_helpers.create_electricity_management_Electricity()
    url = reverse("electricity_management_Electricity_update", args=[instance.pk, ])
    data = {
        "date": datetime.now(),
        "amount": 1.0,
        "unit": "text",
    }
    response = client.post(url, data)
    assert response.status_code == 302
