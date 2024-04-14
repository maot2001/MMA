call();

document.getElementById('persons').addEventListener('change', function() {
    call();
});

function call() {
    const input = document.getElementById('persons').value;
    part_for(input)
}

function part_for(num) {
    section = document.getElementById('participants');
    section.innerHTML = '';
    for (let i = 1; i <= num; i++) {
        section.innerHTML += '<input type="text" name="person_' + i + '" style="margin-bottom: 1%;" class="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500">';
    }
}