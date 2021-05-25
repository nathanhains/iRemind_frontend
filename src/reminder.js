class Reminder {
    constructor(reminder, reminderAttributes) {
        this.id = reminder.id
        this.name = reminderAttributes.name
        this.description = reminderAttributes.description
        this.date = reminderAttributes.date
        this.time = reminderAttributes.time
        this.list = reminderAttributes.list
        Reminder.all.push(this)
    }

    // do not need function inside of classes
    renderReminder(){
        // we set attributes keyword in our constructor
        return `
            <div data-id=${this.id}>
                <h1>${this.name}</h1>
                <h3>${this.description}</h1>
                <h3>${this.date}</h3>
                <h3>${this.time}</h3>
                <h3>list: ${this.list.name}</h3>
                <button data-action='edit' data-id=${this.id}>Edit</button> <button data-action='delete' data-id=${this.id}>X</button>
            </div>
            <br><br>
        `
    }
}

Reminder.all = []