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
    renderReminder() {
        // we set attributes keyword in our constructor
        return `
            <div data-id=${this.id}>
                <h1>${this.name}</h1>
                <h4>${this.description}</h4>
                <h4>${this.date}, <span>${this.time}</span></h4>
                <button data-action='editReminder' class="btn btn-sm btn-dark far fa-edit" data-id=${this.id}></button> <button data-action='deleteReminder' class="btn btn-sm btn-dark fas fa-trash" data-id=${this.id}></button>
            </div>
        `
    }
}