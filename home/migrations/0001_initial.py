# Generated by Django 3.1.2 on 2020-11-16 08:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('phone', models.CharField(max_length=12)),
                ('email', models.EmailField(max_length=254)),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('total', models.FloatField(default=0.0)),
                ('peoples', models.IntegerField(default=1)),
                ('payment_method', models.CharField(blank=True, choices=[('0', 'Cash'), ('1', 'Card'), ('2', 'UPI')], default='0', max_length=1, null=True)),
                ('date_time', models.DateTimeField(auto_now_add=True)),
                ('customer', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='home.customer')),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='product_image/')),
                ('name', models.CharField(max_length=50)),
                ('type', models.CharField(choices=[('0', 'Veg'), ('1', 'Non-veg')], max_length=1)),
                ('category', models.CharField(choices=[('0', 'Breakfast'), ('1', 'Lunch'), ('2', 'Snacks'), ('3', 'Dinner')], max_length=1)),
                ('price', models.FloatField(default=0.0)),
            ],
        ),
        migrations.CreateModel(
            name='PromoCode',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(default='', max_length=8)),
                ('discount', models.IntegerField(default=0, verbose_name='Discount (%)')),
            ],
        ),
        migrations.CreateModel(
            name='Table',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('table_no', models.IntegerField(default=0, unique=True, verbose_name='Table number')),
                ('seat', models.IntegerField(default=4, verbose_name='Number of seats')),
                ('fill', models.IntegerField(default=0, verbose_name='Fill')),
            ],
            options={
                'ordering': ['table_no'],
            },
        ),
        migrations.CreateModel(
            name='Waiter',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='', max_length=200)),
            ],
            options={
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='OrderItems',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.FloatField(default=0.0)),
                ('quantity', models.IntegerField(default=1)),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='home.order')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='home.product')),
            ],
        ),
        migrations.AddField(
            model_name='order',
            name='table_no',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='home.table'),
        ),
        migrations.AddField(
            model_name='order',
            name='waiter',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='home.waiter'),
        ),
    ]
