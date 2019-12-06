import json,pickle
import base64, hashlib
from django.http import JsonResponse
from django.db import connection
from django.db import connections
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

def homepage(request):
    list_item={}
    list_item['user_status']= False
    list_item['user_status'] = True
    return render(request, 'setting/list.html',list_item)

@csrf_exempt
def listProduct(request):
	list_item={}
	list_item['status'] = False
	list_item['data'] = {}
	mycursor = connection.cursor()
	mycursor.execute("SELECT id,first_name,username,last_name,wordpress_install_url,registration_key,has_trial_coupon,mkting_client,ismarket_listing,user_show_quizz FROM flex_idx_users order by first_name,last_name;")
	list_item['data'] = dictfetchall(mycursor)
	mycursor.close()
	connection.close()
	return JsonResponse(list_item, safe=False) 

@csrf_exempt
def generateProject(request):
	list_item={}
	list_item['status'] = False
	if request.method == "POST":
		vid = request.POST['id']
		has_trial_coupon = request.POST['has_trial_coupon']
		mkting_client = request.POST['mkting_client']
		ismarket_listing = request.POST['ismarket_listing']
		user_show_quizz = request.POST['user_show_quizz']

		mycursor = connection.cursor()
		mycursor.execute("UPDATE flex_idx_users set has_trial_coupon=%s,mkting_client=%s,ismarket_listing=%s,user_show_quizz=%s where id=%s",[has_trial_coupon,mkting_client,ismarket_listing,user_show_quizz,vid])
		mycursor.close()
		connection.close()
		list_item['status'] = True

	return JsonResponse(list_item, safe=False) 

def generateupdate(request):
	list_item={}
	list_item['status'] = False
	list_item['data'] = {}
	return JsonResponse(list_item)  


def dictfetchall(cursor):
    "Return all rows from a cursor as a dict"
    columns = [col[0] for col in cursor.description]
    return [
        dict(zip(columns, row))
        for row in cursor.fetchall()
    ]
