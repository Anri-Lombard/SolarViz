from django.db import models

class UploadedVideo(models.Model):
    video_file = models.FileField(upload_to='videos/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

# Singleton model to store global settings.
# There will only be one instance of this model in the database.
class GlobalSettings(models.Model):
    incomer_power = models.CharField(max_length=20, default='#183d33')
    solar_power = models.CharField(max_length=20, default='#b9544f')
    secondary_storey_kitchen = models.CharField(max_length=20, default='#00FF00')
    second_storey_toilet = models.CharField(max_length=20, default='#0000FF')
    second_storey_ablution = models.CharField(max_length=20, default='#009099')
    ground_storey_toilet = models.CharField(max_length=20, default='#FF00FF')
    ground_storey_hot_ablution = models.CharField(max_length=20, default='#00FFFF')
    ground_storey_geyser = models.CharField(max_length=20, default='#800000')
    ground_storey_cold_ablution = models.CharField(max_length=20, default='#008000')
    first_storey_toilet = models.CharField(max_length=20, default='#000080')
    first_storey_ablution = models.CharField(max_length=20, default='#808000')
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
