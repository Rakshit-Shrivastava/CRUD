function updateFunction(id) {
    let existingData = JSON.parse(localStorage.getItem(id));
    document.getElementById('updateid').value = existingData.id;
    document.getElementById('updatename').value = existingData.name;
    document.getElementById('updateage').value = existingData.age;
    document.getElementById('updatecity').value = existingData.city;
    document.getElementById('userid').setAttribute('data-id', id);
}

function deleteFunction(id) {
    if (confirm("Are you sure you want to delete this data?")) {
        localStorage.removeItem(id);
        getFunction();
    }
}

function getFunction() {
    let payload = Object.keys(localStorage);
    const body = document.querySelector('tbody');
    let htmlString = '';
    if (payload.length === 0) {
        // Display a message or UI when no data is available
        htmlString = `<tr>
                        <td colspan="5" style="text-align: center;">No data available</td>
                      </tr>`;
    } else {
    payload.map((m => {
        let parsedData = JSON.parse(window.localStorage.getItem(m));
        htmlString += `<tr>
                      <td>${parsedData.id}</td>
                      <td>${parsedData.name}</td>
                      <td>${parsedData.age}</td>
                      <td>${parsedData.city}</td>
                      <td>
                      <button onclick="updateFunction('${parsedData.id}')">Update</button>
                      <button onclick="deleteFunction('${parsedData.id}')">Delete</button>
                     </td>
                  </tr>`
    }))
}
    body.innerHTML = htmlString
}



function createFunction(event) {
    event.preventDefault();
    let object = {
        id: document.getElementById('userid').value,
        name: document.getElementById('username').value,
        age: document.getElementById('userage').value,
        city: document.getElementById('usercity').value,
    };
    let key = document.getElementById('userid').value;
    let value = JSON.stringify(object);
    window.localStorage.setItem(key, value);
    getFunction();
}

function updateForm(event) {
    event.preventDefault();
    let userId = document.getElementById('userid').getAttribute('data-id'); // Use the saved ID
    let updatedName = document.getElementById('updatename').value;
    let updatedAge = document.getElementById('updateage').value;
    let updatedCity = document.getElementById('updatecity').value;
    let existingData = JSON.parse(localStorage.getItem(userId));
    existingData.name = updatedName;
    existingData.age = updatedAge;
    existingData.city = updatedCity;
    localStorage.setItem(userId, JSON.stringify(existingData));
    getFunction();
}

getFunction();