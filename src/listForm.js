class ListForm{
    addCreateListForm(){
        const listFormContainer = document.querySelector(".list-form-container")
        const form = document.createElement('form')
        form.innerHTML = `
                <h3 id="list-form-title">Create a new list</h3>
    
                <input class="mb-2" id="list-name" type="text" name="name" placeholder="Name">
                <br>
                <select class="mb-2" id="list-color" name="list-color"></select>
                <br>
                <input id="create-list-button" type="submit" name="submit" value="Done" class="submit btn btn-sm btn-dark mb-1">
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
        const action = e.target.dataset.action 
        if (action === "delete"){
            const div = e.target.parentElement.parentElement.parentElement.parentElement
            listAdapter.deleteList(div)
        }else if(action === "edit") {
            const div = e.target.parentElement.parentElement.parentElement.parentElement.parentElement
            if(editModeList === div){
                this.handleHideListForm()
                editModeList = false
            }else{
                editModeList = div
               
                document.querySelector('#list-form-title').innerText = "Update list"
                document.querySelector('#list-name').value = div.children[0].children[0].children[0].children[0].children[0].innerText
                document.querySelector('#list-color').options.value = div.children[0].style.border.split(" ")[2]
                
                this.handleDisplayListForm(e)
            }   
        }else if(action === "details"){
            const div = e.target.parentElement.parentElement.parentElement.parentElement
            if (currentReminders) {
                currentReminders.remove()
                currentReminders = false
                e.target.className = "btn btn-sm fas fa-angle-right fa-lg"
            }else{
            e.target.className = "btn btn-sm fas fa-angle-down fa-lg"
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