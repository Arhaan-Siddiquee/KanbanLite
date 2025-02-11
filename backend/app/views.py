from django.shortcuts import render, redirect
from dj_rest_auth.registration.views import RegisterView
from .serializers import MyRegisterSerializer
# Create your views here.
def index(request):
    return render(request, 'index.html')
class RegisterView(RegisterView):
    serializer_class = MyRegisterSerializer


def email_confirmation(request, key):
    return redirect(f"http://localhost:3000/dj-rest-auth/registration/account-confirm-email/{key}")

def reset_password_confirm(request, uid, token):
    return redirect(f"http://localhost:3000/reset/password/confirm/{uid}/{token}")