let list = document.getElementById("list")

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/v1', 
});

axiosInstance.interceptors.request.use(
    function (config) {
        const token = '9735ed51-c1a6-4a2e-bf73-911e95fe3a8d';
        config.headers.Authorization = `${token}`;
        return config;
    }
);

function handleDelete(appId) {
    axiosInstance.delete(`/app/${appId}/`)
        .then(response => {
            console.log('Delete successful:', response.data);
            // document.querySelector(`[data-id="${appId}"]`).remove();
        })
        .catch(error => {
            console.error('Error deleting:', error);
        });
}

function handleResize(appId) {
    // Implement resize logic here
    // console.log('Resize functionality for app ID:', appId);
    // // For example, you could send a PATCH request to resize the app
    // axiosInstance.patch(`/apps/${appId}/`, { /* resize data */ })
    // .then(response => {
    //     console.log('Resize successful:', response.data);
    // })
    // .catch(error => {
    //     console.error('Error resizing:', error);
    // });
}

function createCard(app) {
    let colDiv = document.createElement('div');
    colDiv.classList.add('col-12', 'col-md-3', 'mb-4');

    let userCardDiv = document.createElement('div');
    userCardDiv.classList.add('user-card');

    let userInfoDiv = document.createElement('div');
    userInfoDiv.classList.add('user-info');

    let userDetailsDiv = document.createElement('div');
    userDetailsDiv.classList.add('user-details');

    
    let userNameH4 = document.createElement('h4');
    userNameH4.classList.add('user-name');
    userNameH4.textContent = app.name;  

    let idP = document.createElement('p');
    idP.classList.add('app-size');
    idP.textContent = 'id: ' + app.id;

    let appSizeP = document.createElement('p');
    appSizeP.classList.add('app-size');
    appSizeP.textContent = 'app size: ' + app.size;

    let appStatusP = document.createElement('p');
    appStatusP.classList.add('app-size');
    appStatusP .textContent = 'app status: ' + app.state;

    userDetailsDiv.appendChild(userNameH4);
    userDetailsDiv.appendChild(idP);
    userDetailsDiv.appendChild(appSizeP);
    userDetailsDiv.appendChild(appStatusP);

    userInfoDiv.appendChild(userDetailsDiv);

    let userActionsDiv = document.createElement('div');
    userActionsDiv.classList.add('user-actions');

    let deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
        handleDelete(app.id);
    });

    let resizeButton = document.createElement('button');
    resizeButton.classList.add('btn', 'btn-secondary');
    resizeButton.textContent = 'Resize';
    resizeButton.addEventListener('click', function() {
        handleResize(app.id);
    });

    userActionsDiv.appendChild(deleteButton);
    userActionsDiv.appendChild(resizeButton);

    userCardDiv.appendChild(userInfoDiv);
    userCardDiv.appendChild(userActionsDiv);

    colDiv.appendChild(userCardDiv);

    return colDiv;
}

axiosInstance.get('/apps/')
    .then(response => {
        var results = response.data.results
        console.log('Data:',results);
        results.forEach(app => {
            let card = createCard(app);
            list.appendChild(card);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });


    