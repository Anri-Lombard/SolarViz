"""
URL configuration for server project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from dashboard import views
from django.conf import settings
from django.conf.urls.static import static

from dashboard.views import CustomAuthToken

urlpatterns = [
    path('api-token-auth/', CustomAuthToken.as_view(), name='api_token_auth'),
    path('admin/', admin.site.urls),
    path('api/', views.csv_data, name='csv_data'),
    path('api/manage-admins/', views.manage_admins, name='manage_admins'),
    path('hello/', views.hello, name='hello'),
    path('', views.index, name='index'),
    path('api/power_data/', views.power_data, name='power_data'),
    path('api/water_data/', views.water_data, name='water_data'),
    path('api/get_global_settings/', views.get_global_settings, name='get_global_settings'),
    path('api/update_global_settings/', views.update_global_settings, name='update_global_settings'),
    path('api/upload_video/', views.upload_video, name='upload_video'),
    path('api/get_uploaded_video/', views.get_uploaded_video, name='get_uploaded_video'),
    path('api/list_uploaded_videos/', views.list_uploaded_videos, name='list_uploaded_videos'),
    path('api/delete_uploaded_video/<int:video_id>', views.delete_uploaded_video, name='delete_uploaded_video'),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
