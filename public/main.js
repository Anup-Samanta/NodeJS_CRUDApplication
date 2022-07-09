const updateBtn = document.querySelector('#UpdateStd');
const deleteBtn = document.querySelector('#DeleteBtn');
const messageDiv = document.querySelector('#message');

updateBtn.addEventListener('click', _ =>{
	fetch('/view', {
		method : 'PUT',
		headers: {'content-type': 'application/json'},
		body: JSON.stringify({
			name: 'sandip',
			email: 'sandip1@gmail.com'
		})
	})
	.then(res => {
		if(res.ok) return res.json()
	})
	.then(response => {
		window.location.reload(true)
		console.log("Updated")
	})
});

deleteBtn.addEventListener('click', _ => {
	fetch('/view', {
		method: 'delete', //method we use for deleting
		headers: {'content-type':'application/JSON'},
		body: JSON.stringify({
			name: 'sandip'
		})
	})
	.then(res => { //if success, returning the JSON
		if(res.ok) return res.json()
	})
	.then(res => { // then reloading the window
		if (res === 'No Student to delete') {
        messageDiv.textContent = 'No Student to delete'
      } else {
        window.location.reload(true)
      }
	})
	.catch(error => {
		console.error(error)
	})
});