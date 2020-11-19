from rest_framework import serializers
from . import models


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Product
        fields = ['id', 'name', 'price', 'image']


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Customer
        fields = ['name', 'email', 'phone']


class PromoCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PromoCode
        fields = ['code', 'discount']


class OrderItemsSerializer(serializers.ModelSerializer):
    def get_name(self, obj):
        try:
            return obj.product.name
        except Exception as e:
            pass

    def get_total_price(self, obj):
        try:
            return obj.price*obj.quantity
        except Exception as e:
            pass

    name = serializers.SerializerMethodField('get_name')
    total_price = serializers.SerializerMethodField('get_total_price')

    class Meta:
        model = models.OrderItems
        fields = ['name', 'price', 'quantity', 'total_price']
