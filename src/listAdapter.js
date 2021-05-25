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
        })
    }

}