class ListAdapter{
    constructor(baseURL){
        this.baseListURL = `${baseURL}/api/v1/lists`
    }

    getLists(){
        fetch(this.baseListURL)
        .then(response => response.json())
        //modify dom
        .then(lists => {
            // backend serializer sets data into data key 
            lists.data.forEach(list => {
                let newList = new List(list, list.attributes)
                // calling the instance method
                document.querySelector("#list-container").innerHTML += newList.renderList()
            })
            reminderForm.addCreateReminderForm()
        })
    }

    addList(bodyData){
        fetch(this.baseListURL, {
            method: "POST",
            // json
            headers: {"Content-Type": "application/json"},
            // how to send back the data to the api
            body: JSON.stringify(bodyData)
        })
        .then(response => response.json())
        .then(list => {
            if(!list.status){
                const listData = list.data
                //render json response
                let newList = new List(listData, listData.attributes)
                // calling the instance method
                document.querySelector("#list-container").innerHTML += newList.renderList()
                document.querySelector('form').reset()
                location.reload()
                listForm.handleHideListForm()
            }else{
                alert(list.errors)
            }
        })
        .catch(err=> console.log(err))
    }

    editList(editMode, bodyData){
        fetch(this.baseListURL+`/${editMode.dataset.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(bodyData)
        })
        .then(response => response.json())
        .then(list => {
            if(!list.status){
                document.querySelector('#list-form-title').innerText = "Create a new list"
                document.querySelector('form').reset()
                editMode.children[0].children[0].children[0].children[1].children[0].innerText = list.name
                editMode.children[0].style.border= `2px solid ${list.color}`
                editMode = false
                location.reload()
                listForm.handleHideListForm()
            }else{
                alert(list.errors)
            }
        })
        .catch(err => console.log(err))
    }

    deleteList(div){
        fetch(this.baseListURL+`/${div.dataset.id}`, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === "Successfully deleted"){
                div.remove()
            }else {
                alert(data.message)
            }
        })
        .catch(err => console.log(err))
    }

}