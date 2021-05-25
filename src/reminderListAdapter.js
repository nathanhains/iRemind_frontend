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

    editReminder(editMode){
        
    }

    // function getReminders(){
    //     //fetch
    //     fetch(endPoint)
    //     .then(response => response.json())
    //     //modify dom
    //     .then(reminders => {
    //         // backend serializer sets data into data key 
    //         reminders.data.forEach(reminder => {
    //             let newReminder = new Reminder(reminder, reminder.attributes)
    //             // calling the instance method
    //             document.querySelector("#reminder-container").innerHTML += newReminder.renderReminder()
    //         })
    
    //     })
    // }
}