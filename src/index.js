const reminderAdapter = new ReminderAdapter("http://localhost:3000")
const reminderForm = new ReminderForm
// event listener, fetch, modify dom
let editMode = false
let currentReminders = false
const listAdapter = new ListAdapter("http://localhost:3000")
const listForm = new ListForm

document.addEventListener('DOMContentLoaded', () =>{
    reminderForm.addCreateReminderForm()
    reminderForm.newReminderEventListener()
    listForm.addCreateListForm()
    listForm.listenEditDelete()
    listForm.addListEventListener()
    listAdapter.getLists()
})

