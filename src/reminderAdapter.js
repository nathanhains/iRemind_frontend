class ReminderAdapter{
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
                listForm.displayReminderFromForm(newReminder)
                document.querySelector('#reminder-form').reset()
                reminderForm.handleHideReminderForm()
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
                if(parseInt(editMode.parentElement.parentElement.dataset.id) != reminder.list_id){
                    let list = List.all.find(l => l.id  === editMode.parentElement.parentElement.dataset.id)
                    let list_reminder = list.reminders.find(r => r.id === parseInt(editMode.dataset.id))
                    let index = list.reminders.indexOf(list_reminder)
                    list.reminders.splice(index, 1)

                    editMode.remove()


                    
                    let added_list = List.all.find(l => l.id  === reminder.list_id.toString())
                    let added_reminder = new Reminder(reminder, reminder)
                    added_list.reminders.push(added_reminder)
                    added_list.renderReminders()

                }else{
                    document.querySelector('#reminder-form-title').innerText = "Create a new reminder"
                    document.querySelector('#create-reminder-button').value = "Done"
                    document.querySelector('#reminder-form').reset()
                    editMode.children[0].innerText = reminder.name
                    editMode.children[1].innerText = reminder.description
                    editMode.children[2].innerText = reminder.date
                    editMode.children[2].innerHTML += `<span>, ${reminder.time}</span>`
                }
                editMode = false
                reminderForm.handleHideReminderForm()
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
                let list = List.all.find(l => l.id  === div.parentElement.parentElement.dataset.id)
                let reminder = list.reminders.find(r => r.id === parseInt(div.dataset.id))
                let index = list.reminders.indexOf(reminder)
                list.reminders.splice(index, 1)
             
                div.remove()
            }else {
                alert(data.message)
            }
        })
        .catch(err => console.log(err))
    }
}