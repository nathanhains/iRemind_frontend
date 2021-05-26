class ReminderForm{
    addCreateReminderForm(){
        const reminderFormContainer = document.querySelector(".reminder-form-container")
        const form = document.createElement('form')
        form.innerHTML = `
                <h3>Create a new reminder</h3>
    
                <input id="input-name" type="text" name="name" placeholder="Name">
                <br><br>
                <textarea id="input-description" type="text" name="description" placeholder="Description"></textarea>
                <br><br>
                <input id="input-date" type="text" name="date" placeholder="Date">
                <br><br>
                <input id="input-time" type="text" name="time" placeholder="Time">
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
            const nameInput = document.querySelector("#input-name").value
            const descriptionInput = document.querySelector("#input-description").value
            const dateInput = document.querySelector("#input-date").value
            const timeInput = document.querySelector("#input-time").value
            const listInput = parseInt(document.querySelector("#lists").value)
            this.postFetch(nameInput, descriptionInput, dateInput, timeInput, listInput)
    }

    postFetch = (name, description, date, time, list_id) => {
        const bodyData = {name, description, date, time, list_id}
    
        if(editMode){
            reminderListAdapter.editReminder(editMode, bodyData)
        }else {
            reminderListAdapter.addReminder(bodyData)
            
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
            document.querySelector('#input-name').value = div.children[0].innerText
            document.querySelector('#input-description').value = div.children[1].innerText
            document.querySelector('#input-date').value = div.children[2].innerText
            document.querySelector('#input-time').value = div.children[3].innerText
    
        }
    }
}