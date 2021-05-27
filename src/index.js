const reminderAdapter = new ReminderAdapter("http://localhost:3000")
const reminderForm = new ReminderForm
// event listener, fetch, modify dom
let editModeReminder = false
let editModeList = false
let currentReminders = false
const listAdapter = new ListAdapter("http://localhost:3000")
const listForm = new ListForm
const colors = ['Red', 'Blue', 'Yellow', 'Green', 'Blue', 'Purple', 'Black', 'White']

document.addEventListener('DOMContentLoaded', () =>{
    // take create reminder form out due to async, we need list objects before form renders
    reminderForm.newReminderEventListener()
    listForm.addCreateListForm()
    listForm.listenEditDelete()
    listForm.addListEventListener()
    listAdapter.getLists()
    addLogoListener()
})


function addLogoListener(){
    const logo = document.querySelector(".refresh")
    logo.addEventListener('click', location.reload.bind(location))
}

