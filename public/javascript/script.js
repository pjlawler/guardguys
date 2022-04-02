
const weekView = document.querySelector('.week-view')
const currentWeekEl = document.querySelector('#weekOf');
const event_items = [];
let editing_event;


function init() {
    currentWeekEl.innerText = convertDateTo('medium_date',get_weekOf_for(new Date()));
    generateCalendar()
}

// Helper functions

// Returns the id of the clicked event
const clickedId = (element => {
    // Iterates through the clicked element and up through the parents to see if it can find a data attribute
    while(!element.dataset.id && element.parentElement) {
        element = element.parentElement
    }
    return element.dataset.id;
})
// Converts a date object to a formatted date or time string
const convertDateTo = (format, date) => {
    const date_object = new Date(date);
    const month = date_object.getMonth() + 1;
    const day = date_object.getDate();
    const year = date_object.getFullYear();
    const weekday = date_object.getDay();

    let hours = parseInt(date_object.getHours());
    let minutes = parseInt(date_object.getMinutes());
    const dayname = [{
            long: "Sunday",
            short: "Sun",
            two_letter: "Su"
        },{
            long: "Monday",
            short: "Mon",
            two_letter: "Mo"
        },{
            long: "Tuesday",
            short: "Tue",
            two_letter: "Tu"
        },{
            long: "Wednesday",
            short: "Wed",
            two_letter: "We"
        },{
            long: "Thursday",
            short: "Thu",
            two_letter: "Th"
        },{
            long: "Friday",
            short: "Fri",
            two_letter: "Fr"
        },{
            long: "Saturday",
            short: "Sat",
            two_letter: "Sa"
        }]

    switch (format) {
        case 'medium_date':
            return `${month}/${day}/${year}`;
        case 'short_date':
            return `${month}/${day}`;
        case 'reverse_date':
            const month_string = month < 10 ? `0${month}`:`${month}`;
            const day_string = day < 10 ? `0${day}`:`${day}`;
            return `${year}-${month_string}-${day_string}`;
        case 'time_12hour':
            let hours_string = `${hours}`;
            let minutes_string = `${minutes}`;
            let dayPart = (hours >= 0 && hours < 12)  ? "am":"pm";
            if(hours === 0) { hours_string = '12'};
            if(hours > 12 && hours <= 23 ) { hours_string = `${hours - 12}` };
            if(minutes < 10) { minutes_string = `0${minutes}`};
            return `${hours_string}:${minutes_string}${dayPart}`;
        case 'time_24hour':
            const hrs_string = hours < 10 ? `0${hours}`:`${hours}`;
            const mns_string = minutes < 10 ? `0${minutes}`:`${minutes}`
            return `${hrs_string}:${mns_string}`;
        case 'weekday_name':
            return dayname[weekday].long;
        case 'weekday_name_short':
            return dayname[weekday].short;
    }
}
const addDaysTo = (date, days) => {
    return addDurationTo(date, 86400000 * days)
}
const addDurationTo = (date, duration) => {
    const newDate = new Date(date);
    newDate.setTime(newDate.getTime() + duration)
    return newDate;
}
// returns the date for the monday of the date 
const get_weekOf_for = (date) => {
    const newDate = date;
    const weekday = newDate.getDay() - 1;
    newDate.setDate(newDate.getDate() - weekday);
    return newDate;
}
// returns the sorted event objects for a particular day from the downloaded data
const events = (date => {
    medium_date = convertDateTo('medium_date', date);
    days_events = event_items.filter(e => {
        return convertDateTo('medium_date', e.date) === medium_date; 
    })
    .sort((a,b) => { 
        if(a.date < b.date){return -1}
        else if (a.date > b.date) {return 1}
        return 0
    });
     return days_events
});


// gets the week's data from the database
async function load_events() {
    
    const response = await fetch ("/api/events", {
        method: 'get',
        headers: {'Content-Type':'application/json'}
    })

    if(response.ok) {
        const data = response.json()
        return data;
    }
    
    console.log('error')
};
async function load_event(id) {

    const response = await fetch (`/api/events/${id}`, {
        method: 'get',
        headers: {'Content-Type':'application/json'}
    })

    if(response.ok) {
        const data = response.json()
        return data;
    }
    else {
        console.log('error')
        return false;
    }
    
}
async function update_event(id, event_data) {
    const response = await fetch (`/api/events/${id}`, {
        method: 'put',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(event_data)
    })

    if(response.ok) {
        const data = response.json()
        return data;
    }
    else {
        console.log('error')
        return false;
    }
}
async function delete_event(id) {
    const response = await fetch (`/api/events/${id}`, {
        method: 'delete',
        headers: {'Content-Type':'application/json'}
    })

    if(response.ok) {
        const data = response.json()
        return data;
    }
    else {
        console.log('error')
        return false;
    }
}
async function create_event(event_data) {
    console.log(event_data);
    const response = await fetch('/api/events', {
        method: 'post',
        body: JSON.stringify(event_data),
        headers: {'Content-Type':'application/json'}
    })
    if(response.ok) {
        const data = response.json()
        console.log(data);
        return data;
    }
    else {
        console.log('error')
        return false;
    }
}
async function load_users() {
    
    const response = await fetch ("/api/users", {
        method: 'get',
        headers: {'Content-Type':'application/json'}
    })

    if(response.ok) {
        const data = response.json()
        return data;
    }
    
    console.log('error')
};


// returns the day column with the events
function create_dayEl(date) {
    
    // Creates the needed elements
    const dayEl = document.createElement('div');
    const dayHeader = document.createElement('div');
    const weekdayEl = document.createElement('h2');
    const dateLabelEl = document.createElement('h3');
    
    // Adds the weekday and date
    weekdayEl.innerText = convertDateTo('weekday_name_short', date);
    dateLabelEl.innerText = `(${convertDateTo('short_date', date)})`;
    dayHeader.append(weekdayEl, dateLabelEl)
    
    const days_date = convertDateTo('medium_date', date);
    const todays_date = convertDateTo('medium_date', new Date()); 
    if(days_date === todays_date) { dayEl.classList.add('this_day')}
    else if (new Date() > date) { dayEl.classList.add('past_day')}
    else { dayEl.classList.add('future_day')}

 
    dayEl.classList.add('day-column')
    dayHeader.classList.add('day-header')

    // Adds the header to the day element
    dayEl.append(dayHeader);
        events(date).forEach(event => {  
            const eventEl = document.createElement('div');
            const eventHeaderEl = document.createElement('div')
            const titleEl = document.createElement('p');
            const timeEl = document.createElement('p');
            const assignedEl = document.createElement('p');
            const notesEl = document.createElement('p');
            
            eventEl.setAttribute("data-id", event.id);
    
            eventEl.classList.add('event');
            if (event.onsite) {
                eventEl.classList.add('onsite');
            } else {
                eventEl.classList.add('inclinic');
            }
             
            titleEl.classList.add('event-title');
            timeEl.classList.add('event-time');
            assignedEl.classList.add('event-assigned');
            eventHeaderEl.classList.add('event-header')
          
            // adds the to the displaye event
            timeEl.innerText = convertDateTo('time_12hour', event.date);
            titleEl.innerText = event.event;
            assignedEl.innerText = event.user ? event.user.username : '????'
            notesEl.innerHTML = event.notes ? '&#9835;' : null;
        

            eventHeaderEl.append(timeEl, notesEl, assignedEl)
            eventEl.append(eventHeaderEl, titleEl);    
            dayEl.append(eventEl);
        });
    
        return dayEl;
}
// creates the overall weekView with 7 day columns
function generateCalendar() {

    // gets the current weekof date from the window
    const currentWeek = new Date(currentWeekEl.innerText);

    // fetches the lastest events from the database
    load_events()
    .then((data) => {
        // puts the events into the array
        event_items.length = 0;
        event_items.splice(0, events.length, ...data);
        
        // clears out anything in the weekview div
        while(weekView.firstChild) { weekView.removeChild(weekView.firstChild);}
        
        // creates the calendar dom element
        const calendarEl = document.createElement('div');
        calendarEl.classList.add('calendar');
    
        // adds each day of the week to the calendar
        for(let i = 0; i < 7; i++) {
            day_date = addDaysTo(currentWeek, i);
            calendarEl.append(create_dayEl(day_date));
        }
        
        // adds the calendar to the weekview div
        weekView.append(calendarEl);
    })
};

// displays pop up event edit form
function display_modal() {
    
    document.querySelector('#event-input').style.display = "flex";    
    
    const labelEl = document.querySelector('#form-label');
    const titleEl = document.querySelector('#event-title');
    const start_date = document.querySelector('#start-date');
    const start_time = document.querySelector('#start-time');
    const end_date = document.querySelector('#end-date');
    const end_time = document.querySelector('#end-time');
    const onsite = document.querySelector('#onsite-selector');
    const user_selector = document.querySelector('#user-selector');
    const event_notes = document.querySelector('#event-notes');
    const submit_button = document.querySelector('#submit');
    const cancel_button = document.querySelector('#cancel');
    const delete_button = document.querySelector('#delete');

    // need to load users into the dropdown
    load_users().then(users => {

        const user_selectorEl = document.querySelector('#user-selector');

        // removes any previous users
        while(user_selector.firstChild) { user_selector.remove(user_selector.firstChild); }

        // adds a no selection option to users
        const optionEl = document.createElement('option');
        optionEl.setAttribute('value', "");
        optionEl.innerText = "- none -";
        user_selectorEl.append(optionEl);

        // adds each user to the drop down
        users.forEach(user => {
            const optionEl = document.createElement('option');
            optionEl.setAttribute('value', user.id);
            optionEl.innerText = user.username;
            user_selectorEl.append(optionEl);
        });
        
        if(editing_event) {
            // populates the event data being edited into the modal
            load_event(editing_event).then(e => {

                // sets up elements
                labelEl.innerText = "Event Details"
                titleEl.value = e.event;
                start_date.value = convertDateTo('reverse_date', e.date);
                start_time.value = convertDateTo('time_24hour', e.date);
                end_date.value = convertDateTo('reverse_date', addDurationTo(e.date, e.duration));
                end_time.value = convertDateTo('time_24hour', addDurationTo(e.date, e.duration));
                onsite.checked = e.onsite;
                user_selector.value = e.user_id;
                event_notes.value = e.notes;
                submit_button.innerText = "Update"
                cancel_button.innerText = "Close"
                delete_button.style.display = "block"
            });
        } else {
            // sets the to/from time to the next hour & :00 minutes
            user_selector.value = null;
            const tempDate = new Date()
            const tempDur = (60 - tempDate.getMinutes()) * 60000;
            const defaultDate = addDurationTo(tempDate, tempDur);
    
            // sets up elements
            labelEl.innerText = "Add Event";
            start_date.value = convertDateTo('reverse_date', defaultDate);
            start_time.value = convertDateTo('time_24hour', defaultDate);
            end_date.value = convertDateTo('reverse_date', addDurationTo(defaultDate, 900000));
            end_time.value = convertDateTo('time_24hour', addDurationTo(defaultDate, 900000));
            user_selector.value = null;
            event_notes.value = null;
            titleEl.value = null;
            onsite.checked = false;
            submit_button.innerText = "Add";
            cancel_button.innerText = "Close";
            delete_button.style.display = "none";
            titleEl.focus();
        }
    });
}

// Start of event listens

// change of the weekof date
document.querySelector('.week-selector').addEventListener('click', event => {

    let currentWeek = new Date(currentWeekEl.innerText);

    if(event.target.id === "left-arrow") { currentWeek = addDaysTo(currentWeek, -7); }
    else if(event.target.id === 'right-arrow') { currentWeek = addDaysTo(currentWeek, 7); }
    else if(event.target.id === 'current-week') { currentWeek = get_weekOf_for(new Date()); }
    else { return; }

    currentWeekEl.innerText = convertDateTo('medium_date', currentWeek);
    load_events().then(generateCalendar);
});
// edit an event (event clicked)
document.querySelector('.week-view').addEventListener('click', e => {
    e.preventDefault();
    editing_event = clickedId(e.target);
    if(editing_event) { display_modal() };
});
// new event button clicked
document.querySelector('#add-event').addEventListener('click', (e)=> {
    e.preventDefault();
    display_modal();
});
// modal submit button clicked (add or update)
document.querySelector('#submit').addEventListener('click', (e) => {
    e.preventDefault();

    const titleEl = document.querySelector('#event-title');
    const start_date = document.querySelector('#start-date');
    const start_time = document.querySelector('#start-time');
    const end_date = document.querySelector('#end-date');
    const end_time = document.querySelector('#end-time');
    const onsite = document.querySelector('#onsite-selector');
    const user_selector = document.querySelector('#user-selector');
    const event_notes = document.querySelector('#event-notes');

    if(!titleEl.value) {
        alert("You must include a name of for the event!");
        return;
    }
    if(!start_date.value) {
        alert("You must include a start date for the event!");
        return;
    }
    if(!start_time.value) {
        alert("You must include a start time for the event!");
        return;
    }
    if(!end_date.value) {
        alert("You must include an end date for the event!");
        return;
    }
    if(!end_time.value) {
        alert("You must include an end time for the event!");
        return;
    }   
    
    event_start = new Date(`${start_date.value}  ${start_time.value}`);
    event_end = new Date(`${end_date.value}  ${end_time.value}`);

    if (event_end < event_start) {
        alert("End date must be later than the start!");
        return
    }

    const event_duration = event_end - event_start;
 
    const event_data = {
        event: titleEl.value,
        date: event_start,
        duration: event_duration,
        onsite: onsite.checked,
        notes: event_notes.value,
        user_id: user_selector.value ? user_selector.value : null
    }
    const event_date = new Date(event_start)
    currentWeekEl.innerText = convertDateTo('medium_date',get_weekOf_for(event_date));

    if(editing_event) {
        // updates the event
        update_event(editing_event, event_data).then(() => {
            document.querySelector('#event-input').style.display = "none";
            editing_event = null;
        }).then(generateCalendar);
    }
    else {
        // creates a new event   
        create_event(event_data).then(() => {
            document.querySelector('#event-input').style.display = "none"
        }).then(generateCalendar)
    }
});
// modal close button clicked
document.querySelector('#cancel').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#event-input').style.display = "none";
    editing_event = null;
})
// modal delete button clicked
document.querySelector('#delete').addEventListener('click', (e) => {
    e.preventDefault();
    const currentWeek = new Date(currentWeekEl.innerText);
    
    document.querySelector('#event-input').style.display = "none";
    
    delete_event(editing_event).then(data => {
            editing_event = null;
        })
        .then(generateCalendar);
});


setInterval(generateCalendar, 1000)

init();