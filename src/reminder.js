class Reminder {

    static all = []
    
    constructor(reminder, reminderAttributes) {
        this.id = reminder.id
        this.name = reminderAttributes.name
        this.description = reminderAttributes.description
        this.date = reminderAttributes.date
        this.time = reminderAttributes.time
        this.list_id = reminderAttributes.list_id
        Reminder.all.push(this)
    }

    // do not need function inside of classes
    renderReminder(){
        // we set attributes keyword in our constructor
        return `
            <li data-id=${this.id}>
                <h1>${this.name}</h1>
                <h3>${this.description}</h1>
                <h3>${this.date}</h3> <h3>${this.time}</h3>
                <button data-action='editReminder' data-id=${this.id}>Edit</button> <button data-action='deleteReminder' data-id=${this.id}>X</button>
            </li>
            <br><br>
        `
    }
}