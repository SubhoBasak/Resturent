# Generated by Django 3.1.2 on 2020-11-16 08:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='table',
            name='cur_ord',
            field=models.IntegerField(default=0),
        ),
    ]