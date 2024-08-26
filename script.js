let list = document.getElementById("list")

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/v1', 
});

axiosInstance.interceptors.request.use(
    function (config) {
        const token = 'b2c477ee-6b9e-44bb-b5ed-9455419f5ddc';
        config.headers.Authorization = `${token}`;
        return config;
    }
);

function createCard(app) {
    let colDiv = document.createElement('div');
    colDiv.classList.add('col-12', 'col-md-6', 'mb-4');

    let userCardDiv = document.createElement('div');
    userCardDiv.classList.add('user-card');

    let userInfoDiv = document.createElement('div');
    userInfoDiv.classList.add('user-info');

    let img = document.createElement('img');
    img.src = './image.jpg'; 
    img.alt = 'User';
    img.classList.add('user-img');

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

    userInfoDiv.appendChild(img);
    userInfoDiv.appendChild(userDetailsDiv);

    let userActionsDiv = document.createElement('div');
    userActionsDiv.classList.add('user-actions');

    let callButton = document.createElement('a');
    callButton.href = 'tel:+989120435199';
    callButton.classList.add('btn', 'btn-primary');
    callButton.textContent = 'Call';

    let emailButton = document.createElement('a');
    emailButton.href = `mailto:${app.user}@example.com`;
    emailButton.classList.add('btn', 'btn-secondary');
    emailButton.textContent = 'Email';

    userActionsDiv.appendChild(callButton);
    userActionsDiv.appendChild(emailButton);

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


    