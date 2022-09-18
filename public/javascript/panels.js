
let collapse_buttons = document.getElementsByClassName('plCollapseButton')

function addEventListeners() {  
    for(let i=0; i < collapse_buttons.length; i++) {
        collapse_buttons[i].addEventListener('click', togglePanel);
    };
};

function togglePanel(target){
    console.log(target)
};

addEventListeners();