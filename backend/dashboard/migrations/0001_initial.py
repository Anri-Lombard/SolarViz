# Generated by Django 4.2.3 on 2023-09-06 15:31

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='GlobalSettings',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('incomerPower', models.CharField(default='#183d33', max_length=20)),
                ('solarPower', models.CharField(default='#b9544f', max_length=20)),
                ('water', models.CharField(default='#2779a7', max_length=20)),
                ('pieChart_sequence', models.IntegerField(default=1)),
                ('pieChart_duration', models.IntegerField(default=10)),
                ('pieChart_display', models.BooleanField(default=True)),
                ('areaChart_sequence', models.IntegerField(default=2)),
                ('areaChart_duration', models.IntegerField(default=10)),
                ('areaChart_display', models.BooleanField(default=True)),
                ('lineChart_sequence', models.IntegerField(default=3)),
                ('lineChart_duration', models.IntegerField(default=10)),
                ('lineChart_display', models.BooleanField(default=True)),
            ],
        ),
    ]