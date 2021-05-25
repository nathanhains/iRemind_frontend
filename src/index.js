let editMode = false
const reminderListAdapter = new ReminderListAdapter("http://localhost:3000")
const reminderForm = new ReminderForm
// event listener, fetch, modify dom

document.addEventListener('DOMContentLoaded', () =>{
    reminderForm.addCreateReminderForm()
    reminderForm.listenEditDelete()
    reminderListAdapter.getReminders()
})

