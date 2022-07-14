const panels = document.getElementsByClassName('panel')
const navbar = document.getElementById('navigation')
const faq_questions = document.getElementsByClassName('faq-question')


function addPanelEventListeners() {
    for(let i=0; i < panels.length; i++) {
        panels[i].addEventListener('click', panelClickHandler)
    }
}

function addNavBarEventListeners() {
    navbar.addEventListener('click', navbarClickHandler)
}

function addFaqEventListeners() {
    for(let i=0; i < faq_questions.length; i++) {
        faq_questions[i].addEventListener('click', faqClickHandler)
    }
}

function faqClickHandler(target) {
    // gets the element of the clicked item
    const clickedItem = target.srcElement;

    // checks to see if the element has a specific class in it's classlist
    const elementHasClass = (element, className) => {
        const classes = element.className ? element.className.split(' '):[];
        return (classes.indexOf(className) !== -1 )
    }

    // gets the element for the faq
    const elFaqQuestion = () => {
        let parent = clickedItem;

        // finds the top element of the faq box
        do {
            if(elementHasClass(parent, 'faq-box')) break;
            parent = parent.parentNode ? parent.parentNode : null
        } while(parent)

        // if the panel is not found or the panel does not have child emements returns false
        if(!parent.hasChildNodes()) return false;

        // goes through the child elements to get the faq-answer
        for(let i=0; i < parent.childNodes.length -1; i++) {
            if(elementHasClass(parent.childNodes[i], 'faq-answer')) return parent.childNodes[i];
        }
    }

    // handles action if the faq-toggle was clicked
    if(elementHasClass(clickedItem, 'faq-toggle')) {

        // ensure the faq-question is present
        const faqQuestion = elFaqQuestion();
        if (!faqQuestion) return false

        switch(elementHasClass(faqQuestion, 'isHidden')) {
            case true: // shows answer
                faqQuestion.classList.remove('isHidden')
                clickedItem.src = '/assets/images/minus.png'
                break;
            case false: // hides answer answer
                faqQuestion.classList.add('isHidden')
                clickedItem.src = '/assets/images/plus.png'
                break;
        }
}
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
addFaqEventListeners()