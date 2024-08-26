let list = document.getElementById("list")
let searchInput = document.getElementById("search");


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

fetchApps()


searchInput.addEventListener('input', function() {
    let query = searchInput.value;
    if (query) {
        filterApps(query);
    } else {
        fetchApps();
    }
});

function fetchApps() {
    axiosInstance.get('/apps/')
        .then(response => {
            var results = response.data.results;
            console.log('Data:', results);
            displayApps(results);
        })
        .catch(error => {
            console.error('Error:', error);
            showToast('Error fetching the list.');
        });
}

function displayApps(apps) {
    list.innerHTML = ''; 
    apps.forEach(app => {
        let card = createCard(app);
        list.appendChild(card);
    });
}

function filterApps(query) {
    axiosInstance.get('/apps/')
        .then(response => {
            var results = response.data.results;
            console.log('Data:', results);
            let filteredApps = results.filter(app =>
                app.name.toLowerCase().includes(query.toLowerCase())
            );
            displayApps(filteredApps);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function showToast(message) {
    const toast = new bootstrap.Toast(document.getElementById('error-toast'));
    // document.querySelector('#error-toast .toast-body').textContent = message;
    toast.show();
}