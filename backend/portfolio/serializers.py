from rest_framework import serializers
from .models import Investment, ContactMessage, SiteStat


class InvestmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Investment
        fields = ['id', 'company_name', 'sector', 'year_acquired', 'status',
                  'description', 'headline_metric', 'logo_url', 'featured', 'order']


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'message', 'submitted', 'read']
        read_only_fields = ['submitted', 'id']


class SiteStatSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteStat
        fields = ['id', 'label', 'value', 'suffix', 'order']
