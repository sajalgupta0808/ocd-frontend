from django.shortcuts import render
from django.http import JsonResponse, HttpResponseBadRequest
import requests
import json
import xml.etree.ElementTree as ET
from django.views.decorators.csrf import csrf_exempt


# function to convert json to xml
def json_to_xml(json_data, root_tag='root', indent='', newline='\n', output_format='xml'):
    def parse_dict(data, parent):
        for key, value in data.items():
            if isinstance(value, dict):
                element = ET.SubElement(parent, key)
                parse_dict(value, element)
            elif isinstance(value, list):
                for item in value:
                    element = ET.SubElement(parent, key)
                    parse_dict(item, element)
            else:
                element = ET.SubElement(parent, key)
                element.text = str(value)

    if output_format.lower() == 'json':
        return json.dumps(json_data, indent=4)

    else:
        xml_root = ET.Element(root_tag)
        parse_dict(json_data, xml_root)
        xml_string = ET.tostring(xml_root, encoding='utf-8')
        return f'<?xml version="1.0" encoding="UTF-8"?>{newline}{xml_string.decode("utf-8")}'
    

# function to take city and output_flag as input and give desired output
@csrf_exempt
def index(request):

    if request.method == 'POST':
        api_key = request.POST.get('input_key')
        city = request.POST.get('input_city')
        output_flag = request.POST.get('input_flag')

        url = "https://weatherapi-com.p.rapidapi.com/current.json"
        querystring = {"q":city}
   
        headers = {
            "X-RapidAPI-Key": api_key,
            "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com"
        }
        #API_KEY: 31371bc5c3msh34f399b07961d46p192883jsn2ba7562e3194

        response = requests.get(url, headers=headers, params=querystring)

        weather_data = response.json()
    

        location = weather_data['location']
        current_weather = weather_data['current']
        latitude = location['lat']
        longitude = location['lon']
        weather_info = {
            'Temperature': current_weather['temp_c'],
            'Latitude': latitude,
            'Longitude': longitude,
            'City': location['name']
        }


        if output_flag.lower() == 'json':
            output_data = json_to_xml(weather_info, output_format='json')
        else :
            output_data = json_to_xml(weather_info, output_format='xml')

        
        print(output_data)
        return render(request, "weather/output.html", {'json_data': output_data})
    return render(request, "weather/index.html")