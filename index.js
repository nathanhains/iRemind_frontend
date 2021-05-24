const endPoint = "http://localhost:3000/api/v1/reminders"

// event listener, fetch, modify dom

document.addEventListener('DOMContentLoaded', () =>{
    getReminders()
})

function getReminders(){
    //fetch
    fetch(endPoint)
    .then(response => response.json())
    //modify dom
    .then(reminders => {
        // backend serializer sets data into data key 
        reminders.data.forEach(reminder => {
            const reminderMarkup =`
            <div data-id=${reminder.id}>
                <h1>reminder: ${reminder.attributes.name}</h1>
                <h3>list: ${reminder.attributes.list.name}</h3>
                <button data-id=${reminder.id}>edit</button>
            </div>
            <br><br>
            `

            document.querySelector('#reminder-container').innerHTML += reminderMarkup
        })

    })
}

