from django.db import models

SECTOR_CHOICES = [
    ('tech', 'Technology'),
    ('real_estate', 'Real Estate'),
    ('finance', 'Finance'),
]

STATUS_CHOICES = [
    ('active', 'Active'),
    ('exited', 'Exited'),
    ('pending', 'Pending'),
]


class Investment(models.Model):
    company_name = models.CharField(max_length=200)
    sector = models.CharField(max_length=30, choices=SECTOR_CHOICES)
    year_acquired = models.PositiveIntegerField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    description = models.TextField()
    headline_metric = models.CharField(max_length=200, help_text="E.g. '3× return', '$12M ARR'")
    logo_url = models.URLField(blank=True, null=True)
    featured = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0, help_text="Display order")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', '-year_acquired']

    def __str__(self):
        return f"{self.company_name} ({self.get_sector_display()})"


class ContactMessage(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    message = models.TextField()
    submitted = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-submitted']

    def __str__(self):
        return f"{self.name} — {self.submitted:%Y-%m-%d}"


class SiteStat(models.Model):
    label = models.CharField(max_length=100, help_text="E.g. 'Assets Under Management'")
    value = models.CharField(max_length=50, help_text="E.g. '$240M'")
    suffix = models.CharField(max_length=20, blank=True, help_text="E.g. 'M+' appended to counter")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.label}: {self.value}"
