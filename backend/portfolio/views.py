from django.core.mail import send_mail
from django.conf import settings
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated

from .models import Investment, ContactMessage, SiteStat
from .serializers import InvestmentSerializer, ContactMessageSerializer, SiteStatSerializer


class InvestmentListCreateView(generics.ListCreateAPIView):
    queryset = Investment.objects.all()
    serializer_class = InvestmentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        qs = Investment.objects.all()
        sector = self.request.query_params.get('sector')
        if sector:
            qs = qs.filter(sector=sector)
        return qs


class InvestmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Investment.objects.all()
    serializer_class = InvestmentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class SiteStatListView(generics.ListCreateAPIView):
    queryset = SiteStat.objects.all()
    serializer_class = SiteStatSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class SiteStatDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SiteStat.objects.all()
    serializer_class = SiteStatSerializer
    permission_classes = [IsAuthenticated]


class ContactCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = []

    def perform_create(self, serializer):
        instance = serializer.save()
        send_mail(
            subject=f"New contact form submission from {instance.name}",
            message=f"Name: {instance.name}\nEmail: {instance.email}\n\nMessage:\n{instance.message}",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.CONTACT_RECIPIENT],
            fail_silently=False,
        )


class ContactListView(generics.ListAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [IsAuthenticated]


class ContactDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [IsAuthenticated]
