const endPoint = "http://localhost:3000/api/v1/reminders"
const editMode = false

// event listener, fetch, modify dom

document.addEventListener('DOMContentLoaded', () =>{
    addCreateReminderForm()
    getReminders()
    listenEditDelete()
})

function addCreateReminderForm(){
    const formContainer = document.querySelector(".form-container")
    const form = document.createElement('form')
    form.innerHTML = `
            <h3>Create a new reminder</h3>

            <input id="input-name" type="text" name="name" placeholder="Name">
            <br><br>
            <textarea id="input-description" type="text" name="description" placeholder="Description"></textarea>
            <br><br>
            <input id="input-date" type="text" name="date" placeholder="Date">
            <br><br>
            <input id="input-time" type="text" name="time" placeholder="Time">
            <br><br>
            <select id="lists" name="lists">
                <option value="1">Forgetful List</option>
            </select>
            <br><br>

            <input id="create-button" type="submit" name="submit" value="Create new reminder" class="submit">
    `
    formContainer.append(form)
    form.addEventListener("submit", (e) => createFormHandler(e))
}

function getReminders(){
    //fetch
    fetch(endPoint)
    .then(response => response.json())
    //modify dom
    .then(reminders => {
        // backend serializer sets data into data key 
        reminders.data.forEach(reminder => {
            let newReminder = new Reminder(reminder, reminder.attributes)
            // calling the instance method
            document.querySelector("#reminder-container").innerHTML += newReminder.renderReminder()
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
        let newReminder = new Reminder(reminderData, reminderData.attributes)
        // calling the instance method
        document.querySelector("#reminder-container").innerHTML += newReminder.renderReminder()
    })
    // .catch(err=> console.log(err))
}

function listenEditDelete(){
    document.querySelector("#reminder-container").addEventListener("click", handleEditDelete)
}

function handleEditDelete(e){
    const div = e.target.parentElement
    if (e.target.dataset.action === "delete"){
        fetch(endPoint+`/${div.dataset.id}`, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === "Successfully deleted"){
                div.remove()
            }else {
                alert(data.message)
            }
        })
        .catch(err => console.log(err))
    }else if(e.target.dataset.action === "edit") {
        editMode = div

    }
}

