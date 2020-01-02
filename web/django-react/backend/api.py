# -- coding: utf-8 --
import urllib.request
from urllib.request import Request, urlopen
from urllib.parse import urlencode, quote_plus, unquote
import json

import os
# Python이 실행될 때 DJANGO_SETTINGS_MODULE이라는 환경 변수에 현재 프로젝트의 settings.py파일 경로를 등록합니다.
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "djangoreactapi.settings")
# 이제 장고를 가져와 장고 프로젝트를 사용할 수 있도록 환경을 만듭니다.
import django
django.setup()

# Data를 import 해옵니다
from post.models import Post

def Find_PM10(city_name):
    API_Key = unquote('N7EI8IngoBbxqqD2P6TC7G9voIeY6dwtKSYUunV%2BVzriu4d9Ttc0I6yGNprKytAmnLwf04vL8jBVMVKfHC%2BYhg%3D%3D')
    url = 'http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty'
    queryParams = '?' + urlencode(
        {
            quote_plus('sidoName'): city_name,
            quote_plus('pageNo'): '1', quote_plus('numOfRows') : '1', quote_plus('serviceKey') : API_Key,
            quote_plus('ver') : '1.3',
            quote_plus('_returnType'):'json'
        }
    )

    response = urllib.request.urlopen(url+queryParams)
    json_data = response.read()
    data = json.loads(json_data.decode('utf-8'))
    return data['list'][0]['pm10Value']

if __name__=='__main__':
    pm10_value = Find_PM10('서울')
    Post(title='pm10', content=pm10_value).save()