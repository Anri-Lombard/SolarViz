# Generated by Django 4.2.3 on 2023-09-23 07:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0007_uploadedvideo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='uploadedvideo',
            name='video',
            field=models.FileField(upload_to=''),
        ),
    ]