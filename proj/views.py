from django.shortcuts import render
import os
import json
from random import choice
from .generate_matrix import resolve

aux = ["Juan", "María", "Pedro", "Laura", "Carlos", "Ana", "Luis", "Sofía", "Diego", "Elena", "Miguel", "Lucía", "Pablo", "Valeria", "Javier", "Isabel", "Fernando", "Carmen", "Ricardo", "Lorena"]
sex = 0
persons = 0
name = 0
names = []
img = []
pos = {}
pos_names = []
data_url = os.path.join(os.getcwd(), 'data', 'data.json')
matrix_e = []
matrix_p = []
order_send = []
mode = 1

def initialize_init():
    global name, sex, persons, names
    sex = 0
    persons = 0
    name = 0
    names = []

def initialize_positions():
    global pos, pos_names
    pos = {}
    pos_names = []

def initialize_rec_mat():
    global matrix_e, mode, matrix_p, order_send
    matrix_e = []
    matrix_p = []
    order_send = []
    mode = 1

def load_img():
    global img
    url = os.path.join(os.getcwd(), 'static', 'img')
    img = os.listdir(url)

    try:
        with open (data_url, 'r', encoding='utf-8') as f:
            data = json.load(f)
        data['img'] = img
        with open(data_url, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False)
    except:
        with open(data_url, 'w', encoding='utf-8') as f:
            data = {}
            data['img'] = img
            json.dump(data, f, ensure_ascii=False)

def load_init_data():
    global name, sex, persons, names

    with open (data_url, 'r', encoding='utf-8') as f:
        data = json.load(f)
    name = data['name']
    sex = data['sex']
    persons = data['persons']
    names = data['names']
    
def load_positions_data():
    global pos, pos_names

    with open (data_url, 'r', encoding='utf-8') as f:
        data = json.load(f)
    pos = data['pos']
    pos_names = data['pos_names']

def load_matrix_data():
    global matrix_e, mode, matrix_p, order_send

    with open (data_url, 'r', encoding='utf-8') as f:
        data = json.load(f)
    matrix_e = data['matrix_e']
    mode = data['mode']
    matrix_p = data['matrix_p'] 
    order_send = data['order_send']




def index(request):
    if os.path.exists(data_url):
        os.remove(data_url)
    return render(request, 'index.html')

def init(request):
    if request.POST:
        global name, sex, persons, names
        initialize_init()
        name = request.POST.get('name')
        names.append(name)
        persons = int(request.POST.get('persons'))

        for i in range(1, persons+1):
            person = request.POST.get(f'person_{i}')
            if person:
                names.append(person)
            else:
                names.append(choice(aux))

        sex = request.POST.get('type')

        if len(img) == 0 or not os.path.exists(data_url):
            load_img()

        if os.path.exists(data_url):
            with open (data_url, 'r', encoding='utf-8') as f:
                data = json.load(f)
            data['name'] = name
            data['sex'] = sex
            data['persons'] = persons
            data['names'] = names
            with open(data_url, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False)
    else:
        if len(img) == 0 or not os.path.exists(data_url):
            load_img()

        try:
            load_init_data()
        except:
            return render(request, 'error.html', { 'page': 'http://127.0.0.1:8000/' })
    
    images = [{ 'name': f[:len(f)-4] } for f in img if f.endswith('.jpg') or f.endswith('.png')]
    for i in range(len(images)):
        images[i]['id'] = i

    return render(request, 'select.html', { 'images': images, 'name': name, 'numbers': [ i+1 for i in range(persons-1)] })

def positions(request):
    if request.POST:
        global pos, pos_names
        initialize_positions()
        pos = json.loads(request.POST.get('data'))

        if len(img) == 0 or not os.path.exists(data_url):
            load_img()

        for i in pos:
            f = img[int(i)]
            pos_names.append(f[:len(f)-4])

        if os.path.exists(data_url):
            with open (data_url, 'r', encoding='utf-8') as f:
                data = json.load(f)
            data['pos'] = pos
            data['pos_names'] = pos_names
            with open(data_url, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False)
        
        if len(names) == 0:
            load_init_data()
    
    else:
        try:
            load_init_data()
        except:
            return render(request, 'error.html', { 'page': 'http://127.0.0.1:8000/' })
        
        try:
            load_positions_data()
        except:
            return render(request, 'error.html', { 'page': 'http://127.0.0.1:8000/init/' })

    return render(request, 'forms.html', { 'positions': pos_names, 'persons': names })

def receive_matrix(request):
    if request.POST:
        global matrix_e, mode, matrix_p, order_send
        initialize_rec_mat()
        if len(img) == 0 or not os.path.exists(data_url):
            load_img()

        if len(names) == 0:
            load_init_data()

        if len(pos_names) == 0:
            load_positions_data()

        matrix_e = json.loads(request.POST.get('matrix_e'))
        matrix_p = json.loads(request.POST.get('matrix_p'))
        order_send = json.loads(request.POST.get('order_send'))
        order = []
        for i in order_send:
                order.append(pos_names[i])

        mode = int(request.POST.get('mode'))
        if os.path.exists(data_url):
            with open (data_url, 'r', encoding='utf-8') as f:
                data = json.load(f)
            data['matrix_e'] = matrix_e
            data['matrix_p'] = matrix_p
            data['order_send'] = order_send
            data['mode'] = mode
            with open(data_url, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False)

    else:
        if len(img) == 0 or not os.path.exists(data_url):
            load_img()

        try:
            load_init_data()
        except:
            return render(request, 'error.html', { 'page': 'http://127.0.0.1:8000/' })
        
        try:
            load_positions_data()
        except:
            return render(request, 'error.html', { 'page': 'http://127.0.0.1:8000/init/' })
        
        try:
            load_matrix_data()
        except:
            return render(request, 'error.html', { 'page': 'http://127.0.0.1:8000/positions/' })
        
        order = []
        for i in order_send:
                order.append(pos_names[i])

    result = resolve(matrix_e, matrix_p, mode)
    new_result = []
    for i in order_send:
        new_result.append(result[i])
    return render(request, 'result.html', { 'result': new_result, 'images': order })