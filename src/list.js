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
        <div id="list-${this.id}" data-id=${this.id} class="row">
        <div class="card mt-1 mb-1 box-shadow"  style="border: 2px solid ${this.color};">
          <div class="card-body">
            <div class="d-flex data-id=${this.id} justify-content-between align-items-center">
            <button type="button" data-action='delete' data-id=${this.id} class="btn btn-sm fas fa-times"></button>
              <div class="btn-group" data-id=${this.id}>
                <h3>${this.name} </h3> <button type="button" data-action='edit' data-id=${this.id} class="btn btn-sm fas fa-edit"></button>
              </div>
              <button type="button" data-action="details" class="btn btn-sm fas fa-angle-right fa-lg"></button>
            </div>
          </div>
        </div>
        </div>
        `


        
    }

    renderReminders(){
        const div = document.getElementById(`list-${this.id}`)
        if(div.querySelector('#reminder-container') != null){
          debugger
          let elem = div.querySelector('#reminder-container');
          elem.parentNode.removeChild(elem)
        }
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