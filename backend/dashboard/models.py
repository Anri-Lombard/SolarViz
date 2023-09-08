from django.db import models

# Singleton model to store global settings.
# There will only be one instance of this model in the database.
class GlobalSettings(models.Model):
    incomerPower = models.CharField(max_length=20, default='#183d33')
    solarPower = models.CharField(max_length=20, default='#b9544f')
    water = models.CharField(max_length=20, default='#2779a7')
    pieChart_sequence = models.IntegerField(default=1)
    pieChart_duration = models.IntegerField(default=10)
    pieChart_display = models.BooleanField(default=True)
    areaChart_sequence = models.IntegerField(default=2)
    areaChart_duration = models.IntegerField(default=10)
    areaChart_display = models.BooleanField(default=True)
    lineChart_sequence = models.IntegerField(default=3)
    lineChart_duration = models.IntegerField(default=10)
    lineChart_display = models.BooleanField(default=True)
    media_sequence = models.IntegerField(default=4)
    media_display = models.BooleanField(default=True)
    media_audio = models.BooleanField(default=True)



    def save(self, *args, **kwargs):
        self.pk = 1
        super(GlobalSettings, self).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        pass

    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj
