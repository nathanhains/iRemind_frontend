class ListForm{
    addCreateListForm(){
        const formContainer = document.querySelector(".form-container")
        const form = document.createElement('form')
        form.innerHTML = `
                <h3>Create a new reminder</h3>
    
                <input id="input-name" type="text" name="name" placeholder="Name">
                <br><br>
                <input id="input-color" type="text" name="color" placeholder="Color"></input>
                <br><br>
                <input id="create-list-button" type="submit" name="submit" value="Create new list" class="submit">
        `
        formContainer.append(form)
        form.addEventListener("submit", (e) => this.createFormHandler(e))
    }

    createFormHandler = (e) => {
        e.preventDefault()
        //e.target to get form
            const nameInput = document.querySelector("#input-name").value
            const colorInput = document.querySelector("#input-color").value
            this.postFetch(nameInput, colorInput)
    }

    postFetch = (name, color) => {
        const bodyData = {name, color}
    
        if(editMode){
            listAdapter.editList(editMode, bodyData)
        }else {
            listAdapter.addList(bodyData)
        }
    }

    listenEditDelete(){
        document.querySelector("#list-container").addEventListener("click", this.handleEditDelete)
    }
    
    handleEditDelete = (e) => {
        const div = e.target.parentElement
        if (e.target.dataset.action === "delete"){
            listAdapter.deleteList(div)
        }else if(e.target.dataset.action === "edit") {
            editMode = div
    
            document.querySelector('#create-list-button').value = "Update"
            document.querySelector('#input-name').value = div.children[0].innerText
            document.querySelector('#input-color').value = div.children[1].innerText
        }
    }

}