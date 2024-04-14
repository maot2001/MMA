let result_section = document.getElementById('results')
if (result_section.dataset.result == "None") {
    let myTextElement = document.getElementById("0Text");
    myTextElement.innerHTML = 'No se puede cumplir tu sexo ideal <i class=\'bx bx-sad\'></i>'
}
else {
    var result = JSON.parse(result_section.dataset.result.replace(/'/g, '"'))
    var image = JSON.parse(result_section.dataset.images.replace(/'/g, '"'))
    
    for (let i = 0; i < result.length; i++) {
        result_section.innerHTML += '<div><img class="image" data-toggle="tooltip" src="/static/img/' + image[i] + '.jpg" alt="' + image[i] + '" title="' + image[i] + '"><div style="font-size: 3vw; font-weight: 500; text-align: center;">' + result[i] + '</div></div>'
    }

    if (result.includes(0)) {
        let myTextElement = document.getElementById("0Text");
        myTextElement.innerHTML = 'No pudimos darle tiempo a todas las posiciones, creo que deberías probar con menos (no seas complejista y bajate la dificultad)'
    }
}