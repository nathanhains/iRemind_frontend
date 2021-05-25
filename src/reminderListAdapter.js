class ReminderListAdapter{
    constructor(baseURL){
        this.baseReminderURL = `${baseURL}/api/v1/reminders`
    }

    getReminders(){
        fetch(this.baseReminderURL)
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

    addReminder(bodyData){
        fetch(this.baseReminderURL, {
            method: "POST",
            // json
            headers: {"Content-Type": "application/json"},
            // how to send back the data to the api
            body: JSON.stringify(bodyData)
        })
        .then(response => response.json())
        .then(reminder => {
            if(!reminder.status){
                const reminderData = reminder.data
                //render json response
                let newReminder = new Reminder(reminderData, reminderData.attributes)
                // calling the instance method
                document.querySelector("#reminder-container").innerHTML += newReminder.renderReminder()
                document.querySelector('form').reset()
            }else{
                alert(reminder.errors)
            }
        })
        .catch(err=> console.log(err))
    }

    editReminder(editMode, bodyData){
        fetch(this.baseReminderURL+`/${editMode.dataset.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(bodyData)
        })
        .then(response => response.json())
        .then(reminder => {
            if(!reminder.status){
                document.querySelector('#create-reminder-button').value = "CreateStore"
                document.querySelector('form').reset()
                editMode.children[0].innerText = reminder.name
                editMode.children[1].innerText = reminder.description
                editMode.children[2].innerText = reminder.date
                editMode.children[3].innerText = reminder.time
                editMode = false
            }else{
                alert(reminder.errors)
            }
        })
        .catch(err => console.log(err))
    }

    deleteReminder(div){
        fetch(this.baseReminderURL+`/${div.dataset.id}`, {
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
    }
}