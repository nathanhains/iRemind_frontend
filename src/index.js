// let editMode = false
// const reminderAdapter = new ReminderAdapter("http://localhost:3000")
// const reminderForm = new ReminderForm
// event listener, fetch, modify dom
let editMode = false
const listAdapter = new ListAdapter("http://localhost:3000")
const listForm = new ListForm

document.addEventListener('DOMContentLoaded', () =>{
    // reminderForm.addCreateReminderForm()
    // reminderForm.listenEditDelete()
    // reminderAdapter.getReminders()
    listForm.addCreateListForm()
    listForm.listenEditDelete()
    listAdapter.getLists()
})

