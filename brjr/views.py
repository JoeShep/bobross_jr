from django.shortcuts import render
from django.http import JsonResponse
from .models import Birthday

def index(request):
  return render(request, 'brjr/index.html')

def birthdays(request):
  if request.method == "GET":
    # values can take args of the fields you want to send back
    birthdays = Birthday.objects.all().values()
    bday_list = list(birthdays)  # convert the QuerySet to a list object
    print("bday data", bday_list)
    return JsonResponse(bday_list, safe=False) #If safe is set to False, any object can be passed for serialization (otherwise only dict instances are allowed).

  if request.method == "POST":
    print("POST called?", request.POST)
    req = request.POST
    b_day = Birthday(name=req["name"], date=req["date"], greeting=req["greeting"])
    b_day.save()

    return JsonResponse({"item_added": b.day.id})
