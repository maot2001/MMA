from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('init/', views.init, name='init'),
    path('positions/', views.positions, name='positions'),
    path('receive_matrix/', views.receive_matrix, name='receive_matrix')
]
