from django.http import HttpResponse

def hello(request):
    return HttpResponse("Hello, World!")

def index(request):
    # Give user options to go to other available urls
    res = HttpResponse("You are at the index page. Here are some options:\n")
    res.write("1. /hello\n")
    res.write("2. /admin\n")
    return res
