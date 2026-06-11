from django.db import migrations


def seed_data(apps, schema_editor):
    Investment = apps.get_model('portfolio', 'Investment')
    SiteStat = apps.get_model('portfolio', 'SiteStat')

    Investment.objects.create(
        company_name='Prime Alpha Securities',
        sector='finance',
        year_acquired=2024,
        status='active',
        description='Prime Alpha Securities is a financial services firm operating across multiple verticals within the global financial landscape. As the primary portfolio company of Bib Holdings Limited, it leverages a structure of complementary holding companies to execute on strategic opportunities in securities, capital markets, and financial services.',
        headline_metric='Strategic Financial Services Platform',
        featured=True,
        order=1,
    )

    SiteStat.objects.create(label='Portfolio Companies', value='1', suffix='', order=1)
    SiteStat.objects.create(label='Sectors', value='3', suffix='', order=2)
    SiteStat.objects.create(label='Global Markets', value='3', suffix='+', order=3)


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0002_alter_investment_sector'),
    ]

    operations = [
        migrations.RunPython(seed_data),
    ]
