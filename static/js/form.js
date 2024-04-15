var form = document.getElementById('form_energy_pleasure')
var names = JSON.parse(form.dataset.name.replace(/'/g, '"'))
var positions = JSON.parse(form.dataset.position.replace(/'/g, '"'))
var e_p_b = document.getElementById('energy_pleasureButton');
e_p_b.innerHTML = "Desactivar";

for (let i = 0; i < names.length; i++) {
    form.innerHTML += '<div class="two_form2 p-10 bg-gray-100 rounded-lg shadow-md"><div class="myform"><h2 style="font-size: 2vw;">¿' + names[i] + ' qué tanta energía tienes?</h2><input type="number" min="0" step="1" name="' + names[i] + '_energy" class="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"><div class="relative inline-flex w-64"><select class="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" name="' + names[i] + '_energy_select"><option value="mucho">Soy un toro</option><option value="normal">Normalito</option><option value="poco">Ando flojo</option></select><div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"><svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 12l-5-5 1.5-1.5L10 9l3.5-3.5L15 7z"/></svg></div></div></div>' + '<div class="myform"><h2 style="font-size: 2vw;">¿' + names[i] + ' qué tan dificil de complacer eres?</h2><input type="number" min="0" step="1" name="' + names[i] + '_pleasure" class="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"><div class="relative inline-flex w-64"><select class="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" name="' + names[i] + '_pleasure_select"><option value="poco">Soy el Rayo McQueen</option><option value="normal">Normalito</option><option value="mucho">El tantra me dicen</option></select><div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"><svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 12l-5-5 1.5-1.5L10 9l3.5-3.5L15 7z"/></svg></div></div></div></div>'
    for (let j = 0; j < positions.length; j++) {
        form.innerHTML += '<div class="two_form"><div class="myform p-6 bg-gray-100 rounded-lg shadow-md" style="margin-bottom: 30%"><h2 style="font-size: 2vw;">¿' + names[i] + ' qué tanto te cansa ' + positions[j] + '?</h2><input type="number" min="0" step="1" name="' + names[i] + '_energy_' + positions[j] + '" class="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"><div class="relative inline-flex w-64"><select class="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" name="' + names[i] + '_energy_select_' + positions[j] + '"><option value="poco">Toy duro</option><option value="normal">Normalito</option><option value="mucho">Me liquida</option></select><div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"><svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 12l-5-5 1.5-1.5L10 9l3.5-3.5L15 7z"/></svg></div></div></div>' + '<img src="/static/img/' + positions[j] + '.jpg" alt="' + positions[j] + '" class="image rounded-lg shadow-md">' + '<div class="myform p-6 bg-gray-100 rounded-lg shadow-md" style="margin-bottom: 30%"><h2 style="font-size: 2vw;">¿' + names[i] + ' cuánto disfrutas ' + positions[j] + '?</h2><input type="number" min="0" step="1" name="' + names[i] + '_pleasure_' + positions[j] + '" class="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"><div class="relative inline-flex w-64"><select class="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" name="' + names[i] + '_pleasure_select_' + positions[j] + '"><option value="mucho">Ño q rico</option><option value="normal">Normalito</option><option value="poco">Ni fu, ni fa</option></select><div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"><svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 12l-5-5 1.5-1.5L10 9l3.5-3.5L15 7z"/></svg></div></div></div>'
    }
}

e_p_b.addEventListener('click', function() {
    if (form.style.display == "block") {
        e_p_b.innerHTML = "Activar";
        form.style.display = "none";
    } else {
        e_p_b.innerHTML = "Desactivar";
        form.style.display = "block";
    }
});

var order = document.getElementById('order')
var indirect_order = document.getElementById('indirect_order')
var o_b = document.getElementById('orderButton');
o_b.innerHTML = "Desactivar";

for (let i = 0; i < positions.length; i++) {
    order.innerHTML += '<div class="flex items-center"><span class="text-gray-700 mr-2">' + positions[i] + ':</span><input type="number" min="1"  max="' + positions.length +'" step="1" id="' + positions[i] + '_order" name="' + positions[i] + '_order" class="w-16 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"></div>'
}

for (let i = 0; i < positions.length; i++) {
    var text = ''
    for (let j = 0; j < positions.length; j++) {
        if (j == i) {
            continue
        }
        text += '<label class="flex items-center"><input type="checkbox" id="' + positions[j] + '_b_' + positions[i] + '" class="form-checkbox h-5 w-5 text-blue-500"><span class="ml-2 text-gray-700">' + positions[j] + '</span></label>'
    }
    indirect_order.innerHTML += '<h2 class="text-2xl font-bold mb-4  mt-10">Antes de ' + positions[i] + ' quieres hacer:</h2><div class="grid grid-cols-2 gap-4  mt-10">' + text + '</div>'
}

for (let i = 0; i < positions.length; i++) {
    var text = ''
    for (let j = 0; j < positions.length; j++) {
        if (j == i) {
            continue
        }
        text += '<label class="flex items-center"><input type="checkbox" id="' + positions[j] + '_a_' + positions[i] + '" class="form-checkbox h-5 w-5 text-blue-500"><span class="ml-2 text-gray-700">' + positions[j] + '</span></label>'
    }
    indirect_order.innerHTML += '<h2 class="text-2xl font-bold mb-4  mt-10">Después de ' + positions[i] + ' quieres hacer:</h2><div class="grid grid-cols-2 gap-4  mt-10">' + text + '</div>'
}

o_b.addEventListener('click', function() {
    var order_form = document.getElementById('order_form');
    if (order_form.style.display == "block") {
        o_b.innerHTML = "Activar";
        order_form.style.display = "none";
    } else {
        o_b.innerHTML = "Desactivar";
        order_form.style.display = "block";
    }
});

document.getElementById('submitBtn').addEventListener('click', function() {
    const e_p_act = document.getElementById('e_p_act');
    const order_act = document.getElementById('order_act');
    var order_form = document.getElementById('order_form');
    val_e_p = true
    val_order = true
    if (form.style.display == "none") {
        val_e_p = false
    }
    if (order_form.style.display == "none") {
        val_order = false
    }
    e_p_act.value = JSON.stringify(val_e_p);
    order_act.value = JSON.stringify(val_order);
});

function generatePermutations(elements) {
    var result = [];
    
    function permute(arr, m = []) {
        if (arr.length === 0) {
            result.push(m);
        } 
        else {
            for (let i = 0; i < arr.length; i++) {
                var current = arr.slice();
                var next = current.splice(i, 1);
                permute(current.slice(), m.concat(next));
            }
        }
    }
    
    permute(elements);
    
    return result;
}

function uniqueOrder(elements) {
    const values = Object.values(elements).filter(value => value !== 0);
    const uniquevalues = new Set(values);

    return values.length === uniquevalues.size;
}

function commonOrder(list1, list2) {
    for (let e of list1) {
        if (list2.includes(e)) {
            return true;
        }
    }
    return false;
}

function verify_aux(result, before, after) {
    var accum = [];
    var lapse = result.slice();
    for (let i = 0; i < positions.length; i++) {
        accum.push(result[i]);
        lapse.shift();
        for (let j = 0; j < before[result[i]].length; j++) {
            if (!accum.includes(before[result[i]][j])) {
                return false;
            }       
        }
        for (let j = 0; j < after[result[i]].length; j++) {
            if (!lapse.includes(after[result[i]][j])) {
                return false;
            }       
        }
    }
    return true;
}

function denied() {
    const verified = document.getElementById('verified');
    verified.value = JSON.stringify(false);
}

function verify() {
    var orders = {};
    var before = {};
    var after = {};
    for (let i = 0; i < positions.length; i++) {
        orders[i] = Number(document.getElementById(positions[i] + "_order").value)
        if (orders[i] > positions.length || orders[i] < 0 || orders[i] % 1 !== 0) {
            document.getElementById('errorMessage').innerHTML = "La postura " + positions[i] + " no esta en los valores correctos";
            denied();
            return;
        }
        var vals_b = [];
        var vals_a = [];
        for (let j = 0; j < positions.length; j++) {
            if (j == i) {
                continue;
            }
            if (document.getElementById(positions[j] + "_b_" + positions[i]).checked) {
                vals_b.push(j);
            }
            if (document.getElementById(positions[j] + "_a_" + positions[i]).checked) {
                vals_a.push(j); 
            }
        }
        before[i] = vals_b;
        after[i] = vals_a;
    }

    if (!uniqueOrder(orders)) {
        document.getElementById('errorMessage').innerHTML = "Tienes posturas en el mismo orden";
        denied();
        return;
    }

    for (let i = 0; i < positions.length; i++) {
        if (commonOrder(before[i], after[i])) {
            document.getElementById('errorMessage').innerHTML = "La postura " + positions[i] + " tiene elementos iguales en \"Ante\" y \"Después\"";
            denied();
            return;
        }
        if (orders[i] != 0) {
            if (before[i].length >= orders[i]) {
                document.getElementById('errorMessage').innerHTML = "La postura " + positions[i] + " no puede tener tantas posturas antes";
                denied();
                return;
            }
            if (after[i].length > (positions.length - orders[i])) {
                document.getElementById('errorMessage').innerHTML = "La postura " + positions[i] + " no puede tener tantas posturas después";
                denied();
                return;
            }
        }
        for (let j = 0; j < before[i].length; j++) {
            if (i > before[i][j]) {
                continue;
            }
            ind = before[i][j]
            if (before[ind].includes(i)) {
                document.getElementById('errorMessage').innerHTML = "Las posturas " + positions[i] + " y " + positions[ind] + " forman un ciclo en la sección \"Antes\"";
                denied();
                return;
            }
        }
        for (let j = 0; j < after[i].length; j++) {
            if (i > after[i][j]) {
                continue;
            }
            ind = after[i][j]
            if (after[ind].includes(i)) {
                document.getElementById('errorMessage').innerHTML = "Las posturas " + positions[i] + " y " + positions[ind] + " forman un ciclo en la sección \"Después\"";
                denied();
                return;
            }
        }
    }

    var result = [];
    var possibles = [];
    
    for (let i = 0; i < positions.length; i++) {
        if (orders[i] != 0) {
            result[(orders[i] - 1)] = i;
        }
        else {
            possibles.push(i);
        }
    }

    var permutations = generatePermutations(possibles);
    const len = permutations.length;

    for (let i = 0; i < len; i++) {
        const indexRandom = Math.floor(Math.random() * permutations.length);
        const elementRandom = permutations[indexRandom];
        permutations.splice(indexRandom, 1);
        var aux = result.slice();
        var index = 0;
        for (let j = 0; j < positions.length; j++) {
            if (aux[j] != undefined) {
                continue
            }
            aux[j] = elementRandom[index];
            index++;
        }
        if (verify_aux(aux, before, after)) {
            document.getElementById('errorMessage').innerHTML = "Verificado";
            const verified = document.getElementById('verified');
            const order_send = document.getElementById('order_send');
            verified.value = JSON.stringify(true);
            order_send.value = JSON.stringify(aux);
            return;
        }
    }

    document.getElementById('errorMessage').innerHTML = "No se encontró un orden correcto";
    denied();
}