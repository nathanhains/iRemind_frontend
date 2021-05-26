class ReminderForm{
    addCreateReminderForm(){
        const reminderFormContainer = document.querySelector(".reminder-form-container")
        const form = document.createElement('form')
        form.innerHTML = `
                <h3>Create a new reminder</h3>
    
                <input id="reminder-name" type="text" name="name" placeholder="Name">
                <br><br>
                <textarea id="reminder-description" type="text" name="description" placeholder="Description"></textarea>
                <br><br>
                <input id="reminder-date" type="text" name="date" placeholder="Date">
                <br><br>
                <input id="reminder-time" type="text" name="time" placeholder="Time">
                <br><br>
                <select id="lists" name="lists">
                    <option value="1">Forgetful List</option>
                </select>
                <br><br>
    
                <input id="create-reminder-button" type="submit" name="submit" value="Create new reminder" class="submit">
        `
        reminderFormContainer.append(form)
        form.addEventListener("submit", (e) => this.createFormHandler(e))
    }
    // if an event listener use arrow function to prevent constructor syntax
    createFormHandler = (e) => {
        e.preventDefault()
        //e.target to get form
            const nameInput = document.querySelector("#reminder-name").value
            const descriptionInput = document.querySelector("#reminder-description").value
            const dateInput = document.querySelector("#reminder-date").value
            const timeInput = document.querySelector("#reminder-time").value
            const listInput = parseInt(document.querySelector("#lists").value)
            this.postFetch(nameInput, descriptionInput, dateInput, timeInput, listInput)
    }

    postFetch = (name, description, date, time, list_id) => {
        const bodyData = {name, description, date, time, list_id}
    
        if(editMode){
            reminderAdapter.editReminder(editMode, bodyData)
        }else {
            reminderAdapter.addReminder(bodyData)
            
        }
    }

    listenEditDelete(){
        document.querySelector("#reminder-container").addEventListener("click", this.handleEditDelete)
    }
    
    handleEditDelete = (e) => {
        const div = e.target.parentElement
        if (e.target.dataset.action === "deleteReminder"){
            reminderAdapter.deleteReminder(div)
        }else if(e.target.dataset.action === "editReminder") {
            editMode = div
    
            document.querySelector('#create-reminder-button').value = "Update"
            document.querySelector('#reminder-name').value = div.children[0].innerText
            document.querySelector('#reminder-description').value = div.children[1].innerText
            document.querySelector('#reminder-date').value = div.children[2].innerText
            document.querySelector('#reminder-time').value = div.children[3].innerText
            
            this.handleDisplayReminderForm(e)
        }
    }

    newReminderEventListener(){
        document.querySelector("#display-reminder-form").addEventListener("click", (e) => this.handleDisplayReminderForm(e))
    }

    handleDisplayReminderForm = (e) => {
        document.querySelector("#display-list-form").style.display = "none"
        document.querySelector("#display-reminder-form").style.display = "none"
        document.querySelector(".reminder-form-container").style.display = ""
    }

    handleHideReminderForm() {
        document.querySelector("#display-list-form").style.display = ""
        document.querySelector("#display-reminder-form").style.display = ""
        document.querySelector(".reminder-form-container").style.display = "none"
    }
}