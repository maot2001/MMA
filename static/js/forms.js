var form = document.getElementById('data')
var names = JSON.parse(form.dataset.name.replace(/'/g, '"'))
var pos = JSON.parse(form.dataset.position.replace(/'/g, '"'))
var positions = {}
var central = document.getElementById('central-form')
var act = ''
var matrix_e = []
var matrix_p = []

for (let i = 0; i < pos.length; i++) {
    positions[pos[i]] = [];
    for (let j = 0; j < pos.length; j++) {
        positions[pos[i]][j] = 'normal';
        if (i == j) {
            positions[pos[i]][j] = 'none';
        }
    }
}
loadPersons()

function initImages() {
    const images = document.querySelectorAll('img');
    images.forEach(image => {
        let tooltip = image.dataset.name;
        if (image.hasAttribute("title")) {
          image.removeAttribute("title");
        }
        image.setAttribute("title", tooltip);
    
        image.addEventListener('click', function() {
            normalize(tooltip);
        })
    });
}
    
function toggleSubOptions(optionId) {
    var subOptions = document.getElementById(optionId);
    if (subOptions.style.display === 'none' || subOptions.style.display === '') {
        subOptions.style.display = 'block';
    } else {
        subOptions.style.display = 'none';
    }
}

function drop(event, num) {
    event.preventDefault();
    var info = event.dataTransfer.getData("text");

        let ind = info.slice(2);
        if (num == 0) {
            positions[act][ind] = 'before';
        }
        else {
            positions[act][ind] = 'after';
        }
        loadPosition(act);
}

function drag(event, info) {
    event.dataTransfer.setData("text", info);
}

function allowDrop(event) {
    event.preventDefault();
}

function normalize(toNormalize) {
        for (let i = 0; i < pos.length; i++) {
            if (pos[i] == toNormalize) {
                    positions[act][i] = 'normal';
                    loadPosition(act);
            }
        }
}

function loadPersons() {
    act = 'persons'
    var str = '<div><h2 style="font-size: 2vw; margin-bottom: 3%;">Energia</h2><table style="margin-bottom: 10%;">'

    for (let i = -1; i < names.length; i++) {
        str += '<tr style="gap: 3%;">'
        for (let j = -2; j < pos.length; j++) {

            if (i == -1) {
                if (j == -2) {
                    str += '<th></th>'
                }
                else if (j == -1) {
                    str += '<th style="text-align: center;"><img src="/static/bx-home-heart.svg" alt="Energia Inicial" class="rounded-lg shadow-md" style="width: 70px;"></th>'
                }
                else {
                    str += '<th style="text-align: center;"><img src="/static/img/' + pos[j] + '.jpg" alt="' + pos[j]  + '" class="rounded-lg shadow-md" style="max-width: 70px; max-height: 10%;" required></th>'
                }
            }
            else {
                if (j == -2) {
                    str += '<th style="text-align: center;">' + names[i] + '</th>'
                }
                else {
                    var value = ''
                    if (matrix_e[i] != undefined && matrix_e[i][(j+1)] != undefined) {
                        value = 'value="' + matrix_e[i][(j+1)] + '" '
                    }
                    str += '<td class="border"><input type="number" min="1" ' + value + 'step="1" inputmode="numeric" id="cell_e_' + i + '_' + j + '" class"p-2" style="width: 70px; -moz-appearance: textfield; text-align: center;"></td>'
                }
            }         
        }
        str += '</tr>'
    }

    str += '</table><h2 style="font-size: 2vw; margin-bottom: 3%;">Placer</h2><table>'

    for (let i = -1; i < names.length; i++) {
        str += '<tr style="gap: 3%;">'
        for (let j = -1; j <= pos.length; j++) {
            if (i == -1) {
                if (j == -1) {
                    str += '<th></th>'
                }
                else if (j == pos.length) {
                    str += '<th style="text-align: center;"><img src="/static/bx-party.svg" alt="Placer final" class="rounded-lg shadow-md" style="width: 70px;"></th>'
                }
                else {
                    str += '<th style="text-align: center;"><img src="/static/img/' + pos[j] + '.jpg" alt="' + pos[j]  + '" class="rounded-lg shadow-md" style="max-width: 70px; max-height: 10%;"></th>'
                }
            }
            else {
                if (j == -1) {
                    str += '<th style="text-align: center;">' + names[i] + '</th>'
                }
                else {
                    var value = ''
                    if (matrix_p[i] != undefined && matrix_p[i][j]  != undefined) {
                        value = 'value="' + matrix_p[i][j] + '" '
                    }
                    str += '<td class="border"><input type="number" min="1" ' + value + 'step="1" inputmode="numeric" id="cell_p_' + i + '_' + j + '" class"p-2" style="width: 70px; -moz-appearance: textfield; text-align: center;"></td>'
                }
            }         
        }
        str += '</tr>'
    }

    str += '</table></div>'
    central.innerHTML = str
}

function loadPosition(position) {
    if (act == 'persons') {
        matrix()
    }
    act = position;
    var before = '<div style="font-size: 2vw;" class="flex items-center mb-10" ondrop="drop(event, 0)" ondragover="allowDrop(event)"><p>Antes</p><div class="flex items-center ml-4 space-x-4">'
    var normal = '<div class="flex flex-col items-center space-y-4">'
    var after = '<div style="font-size: 2vw;" class="flex items-center mb-10" ondrop="drop(event, 1)" ondragover="allowDrop(event)"><p>Después</p><div class="flex items-center ml-4 space-x-4">'
    const str1 = '<img data-toggle="tooltip" draggable="true" ondragstart="drag(event, \''
    const str2 = '" class="rounded-lg shadow-md" style="max-width: 40%; max-height: 30%;">'
    const str3 = '" class="rounded-lg shadow-md" style="max-width: 10%; max-height: 5%;">'

    for (let i = 0; i < positions[position].length; i++) {
        const str4 = str1 + '1_' + i + '\')" data-place="2" data-name="' + pos[i] + '" src="/static/img/' + pos[i] + '.jpg" alt="' + pos[i] + str3;
        switch (positions[position][i]) {
            case 'none':
                break;
            case 'normal':
                normal += str1 + '1_' + i + '\')" data-place="2" data-name="' + pos[i] + '" src="/static/img/' + pos[i] + '.jpg" alt="' + pos[i] + str2;
                break;
            case 'before':
                before += str4
                break;
            default:
                after += str4
                break;
        }
    }

    before += '</div></div>'
    normal += '</div>'
    after += '</div></div>'
    central.innerHTML = '<div style="display: grid; grid-template-columns: 60% 20%; margin-bottom: 10%;"><div>' + before + after + '</div>' + normal + '</div>'
    initImages();
}

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

function verify_aux(result, before, after) {
    var accum = [];
    var lapse = result.slice();
    for (let i = 0; i < pos.length; i++) {
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

function verify() {
    var before = {};
    var after = {};
    for (let i = 0; i < pos.length; i++) {
        var vals_b = [];
        var vals_a = [];
        for (let j = 0; j < positions[pos[i]].length; j++) {
            if (j == i) {
                continue;
            }
            if (positions[pos[i]][j] == 'before') {
                vals_b.push(j);
            }
            if (positions[pos[i]][j] == 'after') {
                vals_a.push(j); 
            }
        }
        before[i] = vals_b;
        after[i] = vals_a;
    }

    for (let i = 0; i < pos.length; i++) {
        for (let j = 0; j < before[i].length; j++) {
            if (i > before[i][j]) {
                continue;
            }
            ind = before[i][j]
            if (before[ind].includes(i)) {
                document.getElementById('errorMessage').innerHTML = "Las posturas " + pos[i] + " y " + pos[ind] + " forman un ciclo en la sección \"Antes\"";
                return;
            }
        }
        for (let j = 0; j < after[i].length; j++) {
            if (i > after[i][j]) {
                continue;
            }
            ind = after[i][j]
            if (after[ind].includes(i)) {
                document.getElementById('errorMessage').innerHTML = "Las posturas " + pos[i] + " y " + pos[ind] + " forman un ciclo en la sección \"Después\"";
                return;
            }
        }
    }

    var possibles = [];
    
    for (let i = 0; i < pos.length; i++) {
        possibles.push(i);
    }

    var permutations = generatePermutations(possibles);
    const len = permutations.length;

    for (let i = 0; i < len; i++) {
        const indexRandom = Math.floor(Math.random() * permutations.length);
        const elementRandom = permutations[indexRandom];
        permutations.splice(indexRandom, 1);
        if (verify_aux(elementRandom, before, after)) {
            if (act != 'persons') {
                loadPersons()
            }
            if (matrix()) {
                document.getElementById('errorMessage').innerHTML = "Verificado";
                const order_send = document.getElementById('order_send');
                order_send.value = JSON.stringify(elementRandom);
                const matrix_e2 = document.getElementById('matrix_e');
                matrix_e2.value = JSON.stringify(matrix_e);
                const matrix_p2 = document.getElementById('matrix_p');
                matrix_p2.value = JSON.stringify(matrix_p);
                document.getElementById('form').submit();
                return;
            }
            else {
                document.getElementById('errorMessage').innerHTML = "No se insertaron los datos correctamente en la sección de \"Usuarios\"";
                return;
            }
        }
    }

    document.getElementById('errorMessage').innerHTML = "No se encontró un orden correcto";
}

function matrix() {
    var good = true
    for (let i = 0; i < names.length; i++) {
        var temp_e = []
        var temp_p = []
        for (let j = 0; j <= pos.length; j++) {
            if (document.getElementById('cell_e_' + i + '_' + (j-1)).value == '' || !Number.isInteger(parseFloat(document.getElementById('cell_e_' + i + '_' + (j-1)).value))) {
                good = false
                continue
            }
            else {
                console.log('cell_e_' + i + '_' + (j-1))
                console.log(document.getElementById('cell_e_' + i + '_' + (j-1)).value)
                temp_e[j] = document.getElementById('cell_e_' + i + '_' + (j-1)).value
            }

            if (document.getElementById('cell_p_' + i + '_' + j).value == '' || !Number.isInteger(parseFloat(document.getElementById('cell_p_' + i + '_' + j).value))) {
                good = false
                continue
            }
            else {
                console.log('cell_p_' + i + '_' + j)
                console.log(document.getElementById('cell_p_' + i + '_' + j).value)
                temp_p[j] = document.getElementById('cell_p_' + i + '_' + j).value
            }
        }
        matrix_e[i] = temp_e
        matrix_p[i] = temp_p
    }
    console.log(matrix_e)
    console.log(matrix_p)
    return good
}