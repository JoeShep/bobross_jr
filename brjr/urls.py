from django.urls import path
from brjr import views

urlpatterns = [
  path('', views.index, name='home'),
  path('birthdays', views.birthdays, name='birthdays')
]
