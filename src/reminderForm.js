class ReminderForm{
    addCreateReminderForm(){
        const reminderFormContainer = document.querySelector(".reminder-form-container")
        const form = document.createElement('form')
        form.innerHTML = `
                <h3 id="reminder-form-title" style="margin: auto;">Create a new reminder</h3>
    
                <input class="mb-2" id="reminder-name" type="text" name="name" placeholder="Name">
                <br>
                <textarea id="reminder-description" type="text" name="description" placeholder="Description"></textarea>
                <br>
                <input id="reminder-date" type="date" name="date" placeholder="Date">
                <input class="mb-2" id="reminder-time" type="time" name="time" placeholder="Time">
                <br>
                <select class="mb-2" id="lists" name="lists">
                </select>
                <br>
    
                <input id="create-reminder-button" type="submit" name="submit" value="Done" class="submit btn btn-sm btn-dark mb-1">
        `
        List.all.forEach(l => {
            form.querySelector('select').innerHTML += `<option id="num-${l.id}" value="${l.id}">${l.name}</option>`
        })
        form.setAttribute('id', 'reminder-form')
        reminderFormContainer.append(form)
        form.addEventListener("submit", (e) => this.createFormHandler(e))
    }
    // if an event listener use arrow function to prevent constructor syntax
    createFormHandler = (e) => {
        e.preventDefault()
        //e.target to get form
            const nameInput = document.querySelector("#reminder-name").value
            const descriptionInput = document.querySelector("#reminder-description").value
            let dateInput = document.querySelector("#reminder-date").value
            const timeInput = this.tConv24(document.querySelector("#reminder-time").value)
            const listInput = parseInt(document.querySelector("#lists").value)
            if (dateInput === ""){dateInput = "Today"}
            this.postFetch(nameInput, descriptionInput, dateInput, timeInput, listInput)
    }

    tConv24(time24) {
        var ts = time24;
        var H = +ts.substr(0, 2);
        var h = (H % 12) || 12;
        h = (h < 10)?("0"+h):h;  // leading 0 at the left for 1 digit hours
        var ampm = H < 12 ? " AM" : " PM";
        ts = h + ts.substr(2, 3) + ampm;
        return ts;
    };

    postFetch = (name, description, date, time, list_id) => {
        const bodyData = {name, description, date, time, list_id}
        
        if(editModeReminder){
            reminderAdapter.editReminder(editModeReminder, bodyData)
        }else {
            reminderAdapter.addReminder(bodyData)
            
        }
    }

    listenEditDelete(){
        document.querySelector("#reminder-container").addEventListener("click", this.handleEditDelete)
    }
    
    handleEditDelete = (e) => {
        debugger
        const div = e.target.parentElement
        if (e.target.dataset.action === "deleteReminder"){
            reminderAdapter.deleteReminder(div)
        }else if(e.target.dataset.action === "editReminder") {
            if(editModeReminder === div){
                this.handleHideReminderForm()
                editModeReminder = false
            }else{
                editModeReminder = div
                this.handleDisplayReminderForm(e)
                
                document.querySelector('#reminder-form-title').innerText = "Update Reminder"
                document.querySelector('#create-reminder-button').value = "Update"
                document.querySelector('#reminder-name').value = div.children[0].innerText
                document.querySelector('#reminder-description').value = div.children[1].innerText
                document.querySelector('#reminder-date').value = div.children[2].innerText.split(", ")[0]
                document.querySelector('#reminder-time').value = div.children[2].firstElementChild.innerText
            }
        }
    }

    newReminderEventListener(){
        document.querySelector("#display-reminder-form").addEventListener("click", (e) => this.handleDisplayReminderForm(e))
    }

    handleDisplayReminderForm = (e) => {
        document.querySelector("#display-list-form").style ="visibility: hidden"
        document.querySelector("#display-reminder-form").style ="visibility: hidden"
        document.querySelector(".reminder-form-container").style.display = ""
        document.querySelector(".list-form-container").style.display = "none"
        document.querySelector("#list-container").style = "display: none"
        editModeList = false
    }

    handleHideReminderForm() {
        document.querySelector("#display-list-form").style ="visibility: visible"
        document.querySelector("#display-reminder-form").style ="visibility: visible"
        document.querySelector(".reminder-form-container").style.display = "none"
        document.querySelector("#list-container").style = "display: "
    }
}