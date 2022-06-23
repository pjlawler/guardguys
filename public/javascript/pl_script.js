const panels = document.getElementsByClassName('panel')
const navbar = document.getElementById('navigation')
function addPanelEventListeners() {
    for(let i=0; i < panels.length; i++) {
        panels[i].addEventListener('click', panelClickHandler)
    }
}

function addNavBarEventListeners() {
    navbar.addEventListener('click', navbarClickHandler)
}

function panelClickHandler(target) {
    
    // gets the element of the clicked item
    const clickedItem = target.srcElement;

    // checks to see if the element has a specfic class in it's classlist
    const elementHasClass = (element, className) => {
        const classes = element.className ? element.className.split(' '):[];
        return (classes.indexOf(className) !== -1 )
    }

    // gets the element for the panel
    const elPanelBody = () => {
        let parent = clickedItem;

        // finds the top element of the panel
        do {
            if (elementHasClass(parent, 'panel')) break; 
            parent = parent.parentNode ? parent.parentNode : null
        } while(parent)

        // if the panel is not found or the panel does not have child elements returns false
        if(!parent.hasChildNodes()) return false;


        // goes through the child elements to get the panel-body
        for(let i=0; i < parent.childNodes.length -1; i++) {
            if(elementHasClass(parent.childNodes[i], 'panel-body')) return parent.childNodes[i];
        }
    }
    
    // handles the action if the panel toggle button was clicked
    if(elementHasClass(clickedItem, 'panel-toggle')){
        
        // ensures the panelBody is present
        const panelBody = elPanelBody();
        if(!panelBody) return false;

        // determines which actions to take depending if the panel is already collapsded or not
        switch(elementHasClass(panelBody,'collapsed')) {
            case true: // expands the panel if it's currently collapsed
                clickedItem.innerHTML = 'expand_less';
                panelBody.classList.remove('collapsed')
                break;
            case false: // collapses the panel if it's currently expanded
                clickedItem.innerHTML = "expand_more";
                panelBody.classList.add('collapsed')
                break;
        }
    }  
}

function navbarClickHandler(target) {
    const clickedItem = target.srcElement

    switch(clickedItem.innerHTML.toLowerCase()) {
        case 'menu':
            document.getElementById('vert_menu').classList.toggle('isHidden')
            break;
    }
    
}


addPanelEventListeners();
addNavBarEventListeners();