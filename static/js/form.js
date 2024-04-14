var form = document.getElementById('form_energy_pleasure')
var names = JSON.parse(form.dataset.name.replace(/'/g, '"'))
var positions = JSON.parse(form.dataset.position.replace(/'/g, '"'))
var e_p_b = document.getElementById('energy_pleasureButton');
e_p_b.innerHTML = "Desactivar";

for (let i = 0; i < names.length; i++) {
    form.innerHTML += '<div class="two_form"><div class="myform"><h2 style="font-size: 2vw; margin-bottom: 3%;">¿' + names[i] + ' qué tanta energía tienes?</h2><input type="number" min="0" step="1" name="' + names[i] + '_energy" class="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"><div class="relative inline-flex w-64"><select class="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" name="' + names[i] + '_energy_select"><option value="mucho">Soy un toro</option><option value="normal">Normalito</option><option value="poco">Ando flojo</option></select><div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"><svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 12l-5-5 1.5-1.5L10 9l3.5-3.5L15 7z"/></svg></div></div></div>' + '<div class="myform"><h2 style="font-size: 2vw; margin-bottom: 3%;">¿' + names[i] + ' qué tan dificil de complacer eres?</h2><input type="number" min="0" step="1" name="' + names[i] + '_pleasure" class="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"><div class="relative inline-flex w-64"><select class="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" name="' + names[i] + '_pleasure_select"><option value="poco">Soy el Rayo McQueen</option><option value="normal">Normalito</option><option value="mucho">El tantra me dicen</option></select><div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"><svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 12l-5-5 1.5-1.5L10 9l3.5-3.5L15 7z"/></svg></div></div></div></div>'
    for (let j = 0; j < positions.length; j++) {
        form.innerHTML += '<div class="two_form"><div class="myform"><h2 style="font-size: 2vw; margin-bottom: 3%;">¿' + names[i] + ' qué tanto te cansa ' + positions[j] + '?</h2><input type="number" min="0" step="1" name="' + names[i] + '_energy_' + positions[j] + '" class="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"><div class="relative inline-flex w-64"><select class="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" name="' + names[i] + '_energy_select_' + positions[j] + '"><option value="poco">Toy duro</option><option value="normal">Normalito</option><option value="mucho">Me liquida</option></select><div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"><svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 12l-5-5 1.5-1.5L10 9l3.5-3.5L15 7z"/></svg></div></div></div>' + '<div class="myform"><h2 style="font-size: 2vw; margin-bottom: 3%;">¿' + names[i] + ' cuánto disfrutas ' + positions[j] + '?</h2><input type="number" min="0" step="1" name="' + names[i] + '_pleasure_' + positions[j] + '" class="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"><div class="relative inline-flex w-64"><select class="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" name="' + names[i] + '_pleasure_select_' + positions[j] + '"><option value="mucho">Ño q rico</option><option value="normal">Normalito</option><option value="poco">Ni fu, ni fa</option></select><div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"><svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 12l-5-5 1.5-1.5L10 9l3.5-3.5L15 7z"/></svg></div></div></div>'
    }
}

e_p_b.addEventListener('click', function() {
    var e_p = document.getElementById('form_energy_pleasure');
    if (e_p.style.display == "block") {
        e_p_b.innerHTML = "Activar";
        e_p.style.display = "none";
    } else {
        e_p_b.innerHTML = "Desactivar";
        e_p.style.display = "block";
    }
});

document.getElementById('submitBtn').addEventListener('click', function() {
    const e_p_act = document.getElementById('e_p_act');
    val = true
    var e_p = document.getElementById('form_energy_pleasure');
    if (e_p.style.display == "none") {
        val = false
    }
    e_p_act.value = JSON.stringify(val);
});