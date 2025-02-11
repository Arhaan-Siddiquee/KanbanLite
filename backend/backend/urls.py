"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
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
from django.urls import path, include
from app.views import RegisterView, email_confirmation, reset_password_confirm


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('app.urls')),
    path("dj-rest-auth/", include("dj_rest_auth.urls")),
     
    path("dj-rest-auth/registration/", RegisterView.as_view(), name="register"),
    path(
        "dj-rest-auth/registration/account-confirm-email/<str:key>/",
        email_confirmation,
        name="account_email_confirmation",
    ),
    path("dj-rest-auth/registration/", include("dj_rest_auth.registration.urls")),
    path(
        "reset/password/confirm/<int:uid>/<str:token>/",
        reset_password_confirm,
        name="password_reset_confirm",
    ),
]
