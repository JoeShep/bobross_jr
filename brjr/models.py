from django.db import models

# Create your models here.

# TODO: Make a Birthday model
# date:
# name:
# greeting:

# makemigrations
# migrate
# in DB Browser add three Birthday instances

# Make a url conf
# make a view for sending back birthday data

class Birthday(models.Model):
  date = models.CharField(max_length=50)
  name = models.CharField(max_length=50)
  greeting = models.CharField(max_length=200)

  def __str__(self):
    return self.name
