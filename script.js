const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', (event) => { // функция, обновляет цвет по нажатию на пробел.
    event.preventDefault();
    if(event.code.toLocaleLowerCase() === 'space') {
        setRandomColors();
    }
}); 


document.addEventListener('click', (event) => { // функционал по иконке-замку. по клику закр и откр.
    const type = event.target.dataset.type;
    if(type === 'lock') {
        const node = event.target.tagName.toLowerCase() === 'i'
        ? event.target
        : event.target.children[0];
        node.classList.toggle('fa-lock-open');
        node.classList.toggle('fa-lock');
    } else if (type === 'copy') { // копирование текста с названием цвета.
        copyToClickBoard(event.target.textContent);
    }
});



function generateRandomColor() { // Функция генератор случайного цвета.
    //RGB
    //#FF0000 red
    //#00FF00 gren
    //#0000FF blue

    const hexCodes = '0123456789ABCDEF';
    let color = '';
    for(let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
    }
    return '#' + color;
}


function copyToClickBoard(text) { // функция по копированию названия текста при клике. 
    return navigator.clipboard.writeText(text);
}


function setRandomColors() {
    cols.forEach((col) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock');// блокировка цвета на замок
        if(isLocked) { 
            return;
        }
        const text = col.querySelector('h2'); //работа с текстом каждого цвета
        const button = col.querySelector('button'); //работа с замком каждого цвета
        const color = generateRandomColor(); // передали функцию генератор случайного цвета переменной color.
        text.textContent = color; // текст цвета.
        col.style.background = color; // случайный цвет колонки.

        


        setTextColor(text, color, button); 
    });
}

function setTextColor(text, color, button) { // функция по оттенкам цвета текста и замка.
    const luminance = chroma(color).luminance();
    text.style.color = luminance > 0.5 ? 'black' : 'white';
    button.style.color = luminance > 0.5 ? 'black' : 'white';
}

setRandomColors();