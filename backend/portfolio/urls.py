from django.urls import path
from . import views

urlpatterns = [
    path('investments/', views.InvestmentListCreateView.as_view(), name='investment-list'),
    path('investments/<int:pk>/', views.InvestmentDetailView.as_view(), name='investment-detail'),
    path('stats/', views.SiteStatListView.as_view(), name='stats-list'),
    path('stats/<int:pk>/', views.SiteStatDetailView.as_view(), name='stats-detail'),
    path('contact/', views.ContactCreateView.as_view(), name='contact-create'),
    path('contact-messages/', views.ContactListView.as_view(), name='contact-list'),
    path('contact-messages/<int:pk>/', views.ContactDetailView.as_view(), name='contact-detail'),
]
