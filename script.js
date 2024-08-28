let list = document.getElementById("list")
let searchInput = document.getElementById("search");


const axiosInstance = axios.create({
    baseURL: 'http://shamim.umrc.ir/api/v1', 
});

axiosInstance.interceptors.request.use(
    function (config) {
        const token = '83151fd5-54b3-4785-aef2-aa34fff720c0';
        config.headers.Authorization = `${token}`;
        return config;
    }
);

fetchApps();
const interval = setInterval(function() {
    let query = searchInput.value;
    if (query) {
        filterApps(query);
    } else {
        fetchApps();
    }
  }, 5000);
  
function handleDelete(appId) {
    if (confirm('Are you sure you want to delete this item?')) {
        axiosInstance.delete(`/app/${appId}/`)
            .then(response => {
                console.log('Delete successful:', response.data);
                const cardToRemove = document.querySelector(`[data-id="${appId}"]`);
                if (cardToRemove) {
                    cardToRemove.remove();
                }
                showToast('App deleted successfully.', 'success');
            })
            .catch(error => {
                console.error('Error deleting:', error);
                showToast('Error deleting the item.', 'error');
            });
    }
}

function handleResize(appId, appPrevSize) {
    const resizeModal = new bootstrap.Modal(document.getElementById('resizeModal'));
    resizeModal.show();
    document.getElementById('resizeAppButton').addEventListener('click', function () {
        const appSize = parseInt(document.getElementById('newSize').value, 10);
        if (appSize) {
            if (appSize <= appPrevSize) {
                showToast('App size can not be less than previous value.', 'error');
                resizeModal.hide();
            }
            else {
                axiosInstance.put(`/app/${appId}/`, { size: appSize })
                    .then(response => {
                        showToast('App resized successfully.', 'success');
                        resizeModal.hide();
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        showToast('Failed to create app.', 'error');
                    });
            }
        } else {
            showToast('Please fill in all fields.', 'error');
        }
    });
}

document.getElementById('addAppButton').addEventListener('click', function () {
    const addAppModal = new bootstrap.Modal(document.getElementById('addAppModal'));
    addAppModal.show();
});


document.getElementById('saveAppButton').addEventListener('click', function () {
    const appName = document.getElementById('appName').value;
    const appSize = parseInt(document.getElementById('appSize').value, 10);

    if (appName && appSize) {
        axiosInstance.post('/app/', { name: appName, size: appSize })
            .then(response => {
                const newApp = response.data;
                console.log(newApp)
                const card = createCard(newApp);
                list.appendChild(card);
                showToast('App created successfully!', 'success');

                const addAppModal = bootstrap.Modal.getInstance(document.getElementById('addAppModal'));
                addAppModal.hide();
            })
            .catch(error => {
                console.error('Error:', error);
                showToast('Failed to create app.', 'error');
            });
    } else {
        showToast('Please fill in all fields.', 'error');
    }
});

function createCard(app) {
    let colDiv = document.createElement('div');
    colDiv.classList.add('col-12', 'col-md-3', 'mb-4');
    colDiv.setAttribute('data-id', app.id);

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
    idP.classList.add('app-id');
    idP.textContent = 'id: ' + app.id;

    let appSizeP = document.createElement('p');
    appSizeP.classList.add('app-size');
    appSizeP.textContent = 'app size: ' + app.size + ' GB';

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
        handleResize(app.id, app.size);
    });
    

    userActionsDiv.appendChild(deleteButton);
    userActionsDiv.appendChild(resizeButton);

    userCardDiv.appendChild(userInfoDiv);
    userCardDiv.appendChild(userActionsDiv);

    colDiv.appendChild(userCardDiv);

    return colDiv;
}



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
            showToast('Error fetching the list.', 'error');
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
            showToast('Error fetching the list.', 'error');
        });
}

function showToast(message, type) {
    const toastElement = document.getElementById('dynamic-toast');
    const toastTitle = document.getElementById('toast-title');
    const toastBody = document.getElementById('toast-body');
    const toastHeader = toastElement.querySelector('.toast-header');

    toastHeader.classList.remove('custom-header-success', 'custom-header-error');

    if (type === 'success') {
        toastTitle.textContent = 'Success';
        toastHeader.classList.add('custom-header-success');
    } else if (type === 'error') {
        toastTitle.textContent = 'Error';
        toastHeader.classList.add('custom-header-error');
    }

    toastBody.textContent = message;

    const toast = new bootstrap.Toast(toastElement);
    toast.show();
}