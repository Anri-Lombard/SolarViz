from django.test import TestCase
from django.urls import reverse

class ViewTests(TestCase):
    def test_hello_view(self):
        response = self.client.get(reverse('hello'))
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Hello, World!', response.content)

    def test_power_data_view(self):
        response = self.client.get(reverse('power_data'))
        self.assertEqual(response.status_code, 200)
        # Add more assertions to check the content of the response

    def test_water_data_view(self):
        response = self.client.get(reverse('water_data'))
        self.assertEqual(response.status_code, 200)
        # Add more assertions to check the content of the response

    def test_csv_data_view(self):
        response = self.client.get(reverse('csv_data'))
        self.assertEqual(response.status_code, 200)
        # Add more assertions to check the content of the response

    def test_index_view(self):
        response = self.client.get(reverse('index'))
        self.assertEqual(response.status_code, 200)
        # Add more assertions to check the content of the response
