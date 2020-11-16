from django.shortcuts import render, redirect, reverse, HttpResponse
from django.contrib.auth.views import login_required
from django.contrib.auth import login, logout
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.http import JsonResponse
from django.utils import timezone
from django.core.mail import EmailMultiAlternatives
from rest_framework.generics import ListAPIView, RetrieveAPIView
from . import models
from . import serializers
import json


def handler404(request, *args, **argv):
    return render(request, '404.html', status=404)


def handler500(request, *args, **argv):
    return render(request, '500.html', status=500)


def register_view(request):
    status = 0
    if 'first_name' in request.POST and 'last_name' in request.POST \
            and 'email' in request.POST and 'password' in request.POST:
        try:
            user = User.objects.get(email=request.POST['email'])
            status = 1
        except User.DoesNotExist:
            user = User(first_name=request.POST['first_name'],
                        last_name=request.POST['last_name'],
                        email=request.POST['email'],
                        username=request.POST['email'])
            user.set_password(request.POST['password'])
            user.save()
            login(request, user)
            return redirect(reverse('index'))
    return render(request, 'register.html', {'status': status})


def login_view(request):
    status = 0
    if 'email' in request.POST and 'password' in request.POST:
        email = request.POST['email']
        password = request.POST['password']
        try:
            user = User.objects.get(email=email)
            if user.check_password(password):
                login(request, user)
                return redirect(reverse('index'))
            else:
                status = 1
        except User.DoesNotExist:
            status = 2
    return redirect(reverse('index'))


def logout_view(request):
    logout(request)
    return redirect(reverse('index'))


def forgot_view(request):
    status = 0
    if 'email' in request.POST:
        try:
            user = User.objects.get(email=request.POST['email'])
            send_mail('Reset password',
                      'Reset your password here: http://127.0.0.1:8000/reset/' +
                      str(user.id)+'/',
                      'subhobasak22@gmail.com', [user.email, ])
        except User.DoesNotExist:
            status = 1
    return render(request, 'forgot.html', {'status': status})


def reset_view(request, uid):
    status = 0
    if 'new_pswd' in request.POST and 'cnfrm_pswd' in request.POST:
        if request.POST['new_pswd'] == request.POST['cnfrm_pswd']:
            try:
                user = User.objects.get(id=uid)
                user.set_password(request.POST['new_pswd'])
                user.save()
                login(request, user)
                return redirect(reverse('index'))
            except User.DoesNotExist:
                status = 1
        else:
            status = 2
    return render(request, 'reset.html', {'status': status})


def index_view(request):
    return render(request, 'index.html')


class CustomerDetailsPhone(RetrieveAPIView):
    lookup_field = 'phone'
    queryset = models.Customer.objects.all()
    serializer_class = serializers.CustomerSerializer


class CustomerDetailsEmail(RetrieveAPIView):
    lookup_field = 'email'
    queryset = models.Customer.objects.all()
    serializer_class = serializers.CustomerSerializer


class VegBreakfastItems(ListAPIView):
    queryset = models.Product.objects.filter(type='0', category='0')
    serializer_class = serializers.ItemSerializer


class VegMealItems(ListAPIView):
    queryset = models.Product.objects.filter(type='0', category='1')
    serializer_class = serializers.ItemSerializer


class VegSnacksItems(ListAPIView):
    queryset = models.Product.objects.filter(type='0', category='2')
    serializer_class = serializers.ItemSerializer


class VegDinnerItems(ListAPIView):
    queryset = models.Product.objects.filter(type='0', category='3')
    serializer_class = serializers.ItemSerializer


class NonVegBreakfastItems(ListAPIView):
    queryset = models.Product.objects.filter(type='1', category='0')
    serializer_class = serializers.ItemSerializer


class NonVegMealItems(ListAPIView):
    queryset = models.Product.objects.filter(type='1', category='1')
    serializer_class = serializers.ItemSerializer


class NonVegSnacksItems(ListAPIView):
    queryset = models.Product.objects.filter(type='1', category='2')
    serializer_class = serializers.ItemSerializer


class NonVegDinnerItems(ListAPIView):
    queryset = models.Product.objects.filter(type='1', category='3')
    serializer_class = serializers.ItemSerializer


class PromoCodeView(RetrieveAPIView):
    lookup_field = 'code'
    queryset = models.PromoCode.objects.all()
    serializer_class = serializers.PromoCodeSerializer


@login_required
def order_view(request, table_id, order_id):
    waiters = models.Waiter.objects.all()
    tables = models.Table.objects.filter(fill=0)
    order = None

    try:
        table = models.Table.objects.get(id=table_id)
        try:
            order = models.Order.objects.get(id=table.cur_ord)
        except models.Order.DoesNotExist:
            pass
    except models.Table.DoesNotExist:
        return reverse(redirect('table'))

    if request.method == 'POST' and 'data' in request.POST:
        data = json.loads(request.POST['data'])
        if 'email' in data and 'phone' in data and 'username' in data:
            try:
                customer = models.Customer.objects.get(phone=data['phone'])
            except models.Customer.DoesNotExist:
                try:
                    customer = models.Customer.objects.get(email=data['email'])
                except models.Customer.DoesNotExist:
                    customer = models.Customer(name=data['username'],
                                               email=data['email'],
                                               phone=data['phone'],)
                    customer.save()
            try:
                waiter = models.Waiter.objects.get(id=data['waiter'])
            except models.Waiter.DoesNotExist:
                return redirect(reverse('table'))
            order = models.Order(customer=customer,
                                 table_no=table,
                                 peoples=int(data['no_of_customer']),
                                 waiter=waiter)
            order.save()
            table.fill = int(data['no_of_customer'])
            table.cur_ord = order.id
            table.save()
            return HttpResponse("Success", status=200)
        elif order != None:
            total = 0
            for item in data:
                try:
                    qty = item['itemQuantity']
                    item = models.Product.objects.get(name=item['itemName'])
                    print(item)
                except models.Product.DoesNotExist:
                    return HttpResponse("One item not found!", status=404)
                order_item = models.OrderItems(order=order,
                                               product=item,
                                               price=item.price,
                                               quantity=qty)
                order_item.save()
                total += order_item.price*order_item.quantity
            subject, from_email, to = 'hello', 'subhobasak22@gmail.com', 'subhobasak51@gmail.com'
            text_content = 'This is an important message.'
            html_content = '''
                <div style="box-shadow: 2px 2px 4px 2px #aaa; border-radius: 5px; display: block;
                            width: 90%; margin: auto;">
                    <img src="https://www.akswaltham.net/files/images/background/banner-1.jpg" style="width: 100%; height: 6rem; object-fit: none;" />
                    <div style="width: 95%; margin: auto;">
                        <table style="border: 1px solid gray; width: 100%;">
                            <tr><th>Item</th><th>Quantity</th><th>Price</th></tr>
                            <tr><td>Pizza</td><td>3</td><td>200</td></tr>
                            <tr><td>Pizza</td><td>3</td><td>200</td></tr>
                            <tr><td>Pizza</td><td>3</td><td>200</td></tr>
                            <tr><td>Pizza</td><td>3</td><td>200</td></tr>
                        </table>
                    </div>
                </div>
            '''
            msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
            msg.attach_alternative(html_content, "text/html")
            msg.send()
            return HttpResponse("Success", status=200)
    if order_id > 0:
        try:
            order = models.Order.objects.get(id=order_id)
        except models.Order.DoesNotExist:
            return redirect(reverse('table'))

    order_items = None
    if order != None:
        order_items = order.get_order_items()
        print(order_items)

    return render(request, 'order.html',
                  {'waiters': waiters, 'tables': tables, 'cur_table': table, 'order': order,
                   'order_items': order_items})


@login_required
def table_view(request):
    tables = models.Table.objects.all()
    models.Order.objects.filter(customer=None).delete()
    if 'table_id' in request.POST:
        if 'new_order' in request.POST:
            return redirect('/order/'+str(request.POST['table_id'])+'/0/')
        elif 'edit' in request.POST and 'order_id' in request.POST:

            return redirect('/order/'+str(request.POST['table_id'])+'/'+str(request.POST['order_id'])+'/')
        elif 'complete' in request.POST and 'order_id' in request.POST:
            try:
                table = models.Table.objects.get(id=request.POST['table_id'])
                table.fill = 0
                table.cur_ord = 0
                table.save()
            except models.Table.DoesNotExist:
                pass
            return redirect(reverse('table'))
    return render(request, 'table.html', {'tables': tables})


def usage_freq_view(request, o, t):
    if t == 0:
        limit = timezone.now()-timezone.timedelta(days=1)
    elif t == 1:
        limit = timezone.now()-timezone.timedelta(days=7)
    elif t == 2:
        limit = timezone.now()-timezone.timedelta(days=30)
    else:
        limit = timezone.now()-timezone.timedelta(days=365)
    orders = models.Order.objects.filter(date_time__gte=limit)
    if o == 0:
        values = orders.values('table_no')
        num_val = []
        for item in values:
            tmp = list(item.values())[0]
            if tmp == None:
                continue
            try:
                tmp = int(tmp)
                tmp = models.Table.objects.get(id=tmp)
            except Exception as e:
                continue
            num_val.append('Table no '+str(tmp.table_no))
    elif o == 1:
        values = orders.values('waiter')
        num_val = []
        for item in values:
            tmp = list(item.values())[0]
            if tmp == None:
                continue
            try:
                tmp = int(tmp)
                tmp = models.Waiter.objects.get(id=tmp)
            except Exception as e:
                continue
            num_val.append(tmp.name)
    elif o == 2:
        values = models.OrderItems.objects.filter(
            order__in=orders).values('product')
        num_val = []
        for item in values:
            tmp = list(item.values())[0]
            if tmp == None:
                continue
            try:
                tmp = int(tmp)
                tmp = models.Product.objects.get(id=tmp)
            except Exception as e:
                continue
            num_val.append(tmp.name)
    values = {}
    for v in num_val:
        if v in values.keys():
            values[v] += 1
        else:
            values[v] = 1
    return JsonResponse(values)


@login_required
def analysis_view(request):
    return render(request, 'analysis.html')


def testView(request):
    print(request.POST)
    return redirect(reverse('index'))
