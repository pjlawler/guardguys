
const weekView = document.querySelector('.week-view')
const currentWeekEl = document.querySelector('#weekOf');
const event_items = [];
let editing_event;

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
// gets the week's events from the database
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
    const response = await fetch ('/api/events/', {
        method: 'post',
        headers: { 'Content-Type':'application/json'},
        body: JSON.stringify({
            date: event_data.date,
            start_time: event_data.start_time,
            event: event_data.event,
            onsite: event_data.onsite,
            notes: event_data.notes,
            duration: event_data.duration,
            user_id: event_data.user_id
        })
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


function init() {
    load_events()
    .then((data) => {
        event_items.length = 0;
        event_items.splice(0, events.length, ...data);
        generateCalendar(get_weekOf_for(new Date()));
        return;
    })
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
// Returns the day column with the events inserted
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
                eventEl.classList.add('onsite')
            }
             
            titleEl.classList.add('event-title');
            timeEl.classList.add('event-time');
            assignedEl.classList.add('event-assigned');
            eventHeaderEl.classList.add('event-header')
          
            // adds the to the displaye event
            timeEl.innerText = convertDateTo('time_12hour', event.date);
            titleEl.innerText = event.event;
            assignedEl.innerText = event.user.username;
            notesEl.innerHTML = event.notes ? '&#9998;' : null;
            
            eventHeaderEl.append(timeEl, notesEl, assignedEl)
            eventEl.append(eventHeaderEl, titleEl);    
            dayEl.append(eventEl);
        });
    
        return dayEl;
}
// Creates the overall weekView with 7 day columns
function generateCalendar(start) {

    while(weekView.firstChild) {
        weekView.removeChild(weekView.firstChild);
    }

    currentWeekEl.innerText = convertDateTo('medium_date', start);
    const calendarEl = document.createElement('div');
    calendarEl.classList.add('calendar');

    for(let i = 0; i < 7; i++) {
        day_date = addDaysTo(start, i);
        calendarEl.append(create_dayEl(day_date));
    }

    weekView.append(calendarEl);
};
// listens for a change of the week
document.querySelector('.week-selector').addEventListener('click', event => {
    console.log('week','click');

    let currentWeek = new Date(currentWeekEl.innerText);

    if(event.target.id === "left-arrow") {
        currentWeek = addDaysTo(currentWeek, -7);
    }
    else if(event.target.id === 'right-arrow') {
        currentWeek = addDaysTo(currentWeek, 7);
    }
    else if(event.target.id === 'current-week') {
        currentWeek = get_weekOf_for(new Date());
    }
    else {
        return;
    }
    load_events()
    .then((data) => {
        event_items.length = 0;
        event_items.splice(0, events.length, ...data);
        generateCalendar(currentWeek);
        return;
    });
});

// listens for an event element being clicked, then displays the modal with the event data populated to it
document.querySelector('.week-view').addEventListener('click', e => {
        e.preventDefault();
        editing_event = clickedId(e.target);
        if(editing_event) {
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

            load_event(editing_event).then(e => {
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
        }
});
// listens for the submit form button
document.querySelector('#submit').addEventListener('click', (e) => {
    e.preventDefault();
    
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
        user_id: user_selector.value
    }

    if(editing_event) {
        // updates the event
        const currentWeek = new Date(currentWeekEl.innerText);
        update_event(editing_event, event_data).then(() => {
            document.querySelector('#event-input').style.display = "none";
            editing_event = null;
        })
        .then(() => {
            load_events().then((data) => {
            event_items.length = 0;
            event_items.splice(0, events.length, ...data);
            generateCalendar(currentWeek);
            return;});
        });
    }
    else {
        // creates a new event
        const currentWeek = new Date(get_weekOf_for(event_start));
        create_event(event_data).then(() => {
            document.querySelector('#event-input').style.display = "none"
        })
        .then(() => {
            load_event().then((data) => {
                event_items.length = 0;
                event_items.splice(0, events.length, ...data);
                generateCalendar(currentWeek);
                return;});
        });
    }
});
// listens for the submit form button
document.querySelector('#cancel').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#event-input').style.display = "none";
    editing_event = null;
    console.log('cancel','click');

    return;
})
// listens for the delete form button
document.querySelector('#delete').addEventListener('click', (e) => {
    e.preventDefault();
    const currentWeek = new Date(currentWeekEl.innerText);
    
    document.querySelector('#event-input').style.display = "none";
    
    delete_event(editing_event).then(data => {
            console.log('success')
            editing_event = null;
        })
        .then(() => {
        load_events().then((data) => {
        event_items.length = 0;
        event_items.splice(0, events.length, ...data);
        generateCalendar(currentWeek);
        return; })
        });
});
// listens for the add event button
document.querySelector('#add-event').addEventListener('click', (e)=> {
    e.preventDefault();
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

    user_selector.value = null;
    const tempDate = new Date()
    const tempDur = (60 - tempDate.getMinutes()) * 60000;
    const defaultDate = addDurationTo(tempDate, tempDur);


    labelEl.innerText = "Add Event";
    start_date.value = convertDateTo('reverse_date', defaultDate);
    start_time.value = convertDateTo('time_24hour', defaultDate);
    end_date.value = convertDateTo('reverse_date', addDurationTo(defaultDate, 900000));
    end_time.value = convertDateTo('time_24hour', addDurationTo(defaultDate, 900000));
    submit_button.innerText = "Add";
    cancel_button.innerText = "Close";
    delete_button.style.display = "none";
    titleEl.focus();
});

init();