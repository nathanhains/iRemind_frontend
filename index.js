const endPoint = "http://localhost:3000/api/v1/reminders"

// event listener, fetch, modify dom

document.addEventListener('DOMContentLoaded', () =>{
    getReminders()
    const createReminderForm = document.querySelector("#create-reminder-form")
    // when an event happens
    createReminderForm.addEventListener("submit", (e) => createFormHandler(e))
})

function getReminders(){
    //fetch
    fetch(endPoint)
    .then(response => response.json())
    //modify dom
    .then(reminders => {
        // backend serializer sets data into data key 
        reminders.data.forEach(reminder => {
            const reminderMarkup =`
                <div data-id=${reminder.id}>
                    <h1>reminder: ${reminder.attributes.name}</h1>
                    <h3>list: ${reminder.attributes.list.name}</h3>
                    <button data-id=${reminder.id}>edit</button>
                </div>
                <br><br>
            `
            document.querySelector('#reminder-container').innerHTML += reminderMarkup
        })

    })
}

function createFormHandler(e){
    e.preventDefault()
    //e.target to get form
    const nameInput = document.querySelector("#input-name").value
    const descriptionInput = document.querySelector("#input-description").value
    const dateInput = document.querySelector("#input-date").value
    const timeInput = document.querySelector("#input-time").value
    const listInput = parseInt(document.querySelector("#lists").value)
    postFetch(nameInput, descriptionInput, dateInput, timeInput, listInput)
}

function postFetch(name, description, date, time, list_id){
    // you only need to establish key names once if they are the same
    const bodyData = {name, description, date, time, list_id}
    fetch(endPoint, {
        method: "POST",
        // json
        headers: {"Content-Type": "application/json"},
        // how to send back the data to the api
        body: JSON.stringify(bodyData)
    })
    .then(response => response.json())
    .then(reminder => {
        const reminderData = reminder.data
        //render json response
        const reminderMarkup =`
            <div data-id=${reminder.id}>
                <h1>reminder: ${reminderData.attributes.name}</h1>
                <h3>list: ${reminderData.attributes.list.name}</h3>
                <button data-id=${reminderData.id}>edit</button>
            </div>
            <br><br>
            `
        document.querySelector('#reminder-container').innerHTML += reminderMarkup
    })
}

