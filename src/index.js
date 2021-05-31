const reminderAdapter = new ReminderAdapter("http://localhost:3000")
const reminderForm = new ReminderForm
// event listener, fetch, modify dom
let editModeReminder = false
let editModeList = false
let currentReminders = false
const listAdapter = new ListAdapter("http://localhost:3000")
const listForm = new ListForm
const colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Black', 'White']

document.addEventListener('DOMContentLoaded', () => {
    // take create reminder form out due to async, we need list objects before form renders
    reminderForm.newReminderEventListener()
    listForm.addCreateListForm()
    listForm.listenEditDelete()
    listForm.addListEventListener()
    listAdapter.getLists()
    addLogoListener()
})


addLogoListener = () => {
    const logo = document.querySelector(".back")
    // logo.addEventListener('click', location.reload.bind(location))
    logo.addEventListener('click', goHome = () => {
        document.querySelector("#display-list-form").style = "visibility: visible"
        document.querySelector("#display-reminder-form").style = "visibility: visible"
        document.querySelector(".reminder-form-container").style.display = "none"
        document.querySelector(".list-form-container").style.display = "none"
        document.querySelector("#list-container").style = "display: "
    })
}

