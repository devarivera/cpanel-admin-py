from django.conf.urls import url
from . import views

urlpatterns = [
	url(r'^list/', views.listProduct, name='listProduct'),
	url(r'^api_new/', views.generateProject, name='generateProject'),
    url(r'^api_update/', views.generateupdate, name='generateupdate')
]