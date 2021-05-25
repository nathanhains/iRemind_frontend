class List {

    static all = []
    
    constructor(list, listAttributes) {
        this.id = list.id
        this.name = listAttributes.name
        this.color = listAttributes.color
        List.all.push(this)
    }

    // do not need function inside of classes
    renderList(){
        // we set attributes keyword in our constructor
        return `
            <div data-id=${this.id}>
                <h1>${this.name}</h1>
                <h3>${this.color}</h1>
                <button data-action='edit' data-id=${this.id}>Edit</button> <button data-action='delete' data-id=${this.id}>X</button>
            </div>
            <br><br>
        `
    }
}