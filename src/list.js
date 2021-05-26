class List {

    static all = []
    
    constructor(list, listAttributes) {
        this.id = list.id
        this.name = listAttributes.name
        this.color = listAttributes.color
        this.reminders =listAttributes.reminders.map(r => new Reminder(r, r))
        List.all.push(this)
    }

    // do not need function inside of classes
    renderList(){
        // we set attributes keyword in our constructor
        return `
            <div id="list-${this.id}" data-id=${this.id}>
                <h1>${this.name}</h1>
                <h3>${this.color}</h1>
                <button data-action="details">Details</button>
                <button data-action='edit' data-id=${this.id}>Edit</button> <button data-action='delete' data-id=${this.id}>X</button>
            </div>
            <br><br>
        `
    }

    renderReminders(){
        const div = document.getElementById(`list-${this.id}`)
        const ul = document.createElement('ul')
        ul.setAttribute('id', 'reminder-container')
        this.reminders.forEach(r => ul.innerHTML += r.renderReminder())
        div.append(ul)
        currentReminders = ul
        if (ul.innerHTML!=""){
            reminderForm.listenEditDelete()
        }
    }
}