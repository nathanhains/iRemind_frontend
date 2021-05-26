class ListForm{
    addCreateListForm(){
        const listFormContainer = document.querySelector(".list-form-container")
        const form = document.createElement('form')
        form.innerHTML = `
                <h3>Create a new list</h3>
    
                <input id="list-name" type="text" name="name" placeholder="Name">
                <br><br>
                <select id="list-color" name="list-color"></select>
                <br><br>
                <input id="create-list-button" type="submit" name="submit" value="Create new list" class="submit">
        `
        colors.forEach(c => {
            form.querySelector('select').innerHTML += `<option value="${c}">${c}</option>`
        })
        listFormContainer.append(form)
        form.addEventListener("submit", (e) => this.createFormHandler(e))
    }

    createFormHandler = (e) => {
        e.preventDefault()
        //e.target to get form
            const nameInput = document.querySelector("#list-name").value
            const colorInput = document.querySelector("#list-color").value
            this.postFetch(nameInput, colorInput)
    }

    postFetch = (name, color) => {
        const bodyData = {name, color}
    
        if(editModeList){
            listAdapter.editList(editModeList, bodyData)
        }else {
            listAdapter.addList(bodyData)
        }
    }

    listenEditDelete(){
        document.querySelector("#list-container").addEventListener("click", this.handleEditDelete)
    }
    
    handleEditDelete = (e) => {
        const div = e.target.parentElement
        const action = e.target.dataset.action 
        if (action === "delete"){
            listAdapter.deleteList(div)
        }else if(action === "edit") {
            if(editModeList === div){
                this.handleHideListForm()
                editModeList = false
            }else{
                editModeList = div

                document.querySelector('#create-list-button').value = "Update"
                document.querySelector('#list-name').value = div.children[0].innerText
                document.querySelector('#list-color').value = div.children[1].innerText
                
                this.handleDisplayListForm(e)
            }   
        }else if(action === "details"){
            if (currentReminders) {
                currentReminders.remove()
                currentReminders = false
            }else{
            console.log("displaying reminders", div.dataset.id)
            const l = List.all.find(l => l.id === div.dataset.id)
            l.renderReminders()
            }
        }
    }
    
    addListEventListener(){
        document.querySelector("#display-list-form").addEventListener("click", (e) => this.handleDisplayListForm(e))
    }

    handleDisplayListForm = (e) => {
        document.querySelector("#display-list-form").style.display = "none"
        document.querySelector("#display-reminder-form").style.display = "none"
        document.querySelector(".list-form-container").style.display = ""
        document.querySelector(".reminder-form-container").style.display = "none"
        editModeReminder = false
    }

    handleHideListForm() {
        document.querySelector("#display-list-form").style.display = ""
        document.querySelector("#display-reminder-form").style.display = ""
        document.querySelector(".list-form-container").style.display = "none"
    }

    displayReminderFromForm(reminder){
        const l = List.all.find(l => parseInt(l.id) === reminder.list_id)
        l.reminders.push(reminder)
        l.renderReminders()
    }

}