from django.contrib import admin
from .models import Investment, ContactMessage, SiteStat


@admin.register(Investment)
class InvestmentAdmin(admin.ModelAdmin):
    list_display = ('company_name', 'sector', 'status', 'year_acquired', 'featured', 'order')
    list_editable = ('order', 'featured', 'status')
    list_filter = ('sector', 'status', 'featured')
    search_fields = ('company_name', 'description')
    ordering = ('order', '-year_acquired')


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'submitted', 'read')
    list_filter = ('read',)
    readonly_fields = ('name', 'email', 'message', 'submitted')
    actions = ['mark_read']

    @admin.action(description='Mark selected as read')
    def mark_read(self, request, queryset):
        queryset.update(read=True)


@admin.register(SiteStat)
class SiteStatAdmin(admin.ModelAdmin):
    list_display = ('label', 'value', 'suffix', 'order')
    list_editable = ('value', 'suffix', 'order')


admin.site.site_header = "Bib Holdings — Admin"
admin.site.site_title = "Bib Holdings"
admin.site.index_title = "Portfolio Management"
