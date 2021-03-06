// Options
const CLIENT_ID = '412621787842-v8nk40ldbras2ekrljvih4ssbpunlf4j.apps.googleusercontent.com';
// Array of API discovery doc URLs for APIs
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'];
// Authorization scopes required by the API. If multiple seperate with spaces
const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

const authorizeButton = document.querySelector('#authorize-button');
const signoutButton = document.querySelector('#signout-button');
const content = document.querySelector('#content');
const channelForm = document.querySelector('#channel-form');
const channelInput = document.querySelector('#channel-input');
const videoContainer = document.querySelector('#video-container');

const defaultChannel = 'techguyweb';

// Form submit and change channel
channelForm.addEventListener('submit', e => {
    e.preventDefault();

    const channel = channelInput.value;
    getChannel(channel);
})

// Load auth2 library
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

// Init API client library and set up sign in listeners
function initClient() {
    gapi.client.init({
        discoveryDocs: DISCOVERY_DOCS,
        clientId: CLIENT_ID,
        scope: SCOPES
    }).then(() => {
        // Listen for sign in state changes
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        // Handle initial sign in state
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    });
}

// Updates UI on sign in state changes
function updateSigninStatus(isSignedIn) {
    if(isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        content.style.display = 'block';
        videoContainer.style.display = 'block';
        getChannel(defaultChannel);
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
        content.style.display = 'none';
        videoContainer.style.display = 'none';
    }
}

// Handle Login
function handleAuthClick() {
    gapi.auth2.getAuthInstance().signIn();
}
// Handle Logout
function handleSignoutClick() {
    gapi.auth2.getAuthInstance().signOut();
}

// Display Channel Data
function showChannelData(data) {
    const channelData = document.querySelector('#channel-data');
    channelData.innerHTML = data;
}

// Get channel from API
function getChannel(channel) {
    gapi.client.youtube.channels.list({
        part: 'snippet,contentDetails,statistics',
        forUsername: channel
    })
    .then(response => {
        const channel = response.result.items[0];

        const output = `
            <ul class="collection">
                <li class="collection-item">Title: ${channel.snippet.title}</li>
                <li class="collection-item">ID: ${channel.id}</li>
                <li class="collection-item">Subs: ${numWithSpaces(channel.statistics.subscriberCount)}</li>
                <li class="collection-item">Total Views: ${numWithSpaces(channel.statistics.viewCount)}</li>
                <li class="collection-item">Number of Videos: ${numWithSpaces(channel.statistics.videoCount)}</li>
            </ul>
            <p>${channel.snippet.description}</p>
            <hr>
            <a href="https://youtube.com/${channel.snippet.customUrl}" target="_blank" class="btn grey darken-2">Visit Channel</a>
        `;
        showChannelData(output);

        const playlistId = channel.contentDetails.relatedPlaylists.uploads;
        requestVideoPlaylist(playlistId);
    })
    .catch(err => console.log(err));
}

function numWithSpaces(num) {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function requestVideoPlaylist(playlistId) {
    const requestOptions = {
        playlistId: playlistId,
        part: 'snippet',
        maxResults: 10
    };

    const request = gapi.client.youtube.playlistItems.list(requestOptions);

    request.execute(res => {
        const playListItems = res.result.items;
        if(playListItems) {
            let output = '<h4 class="align-center">Latest Videos</h4>';

            // Loop through videos and append output
            playListItems.forEach(item => {
                const videoId = item.snippet.resourceId.videoId;

                output += `
                    <div class="col s3">
                        <iframe width="100%" height="auto" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                    </div>
                `;
            });

            videoContainer.innerHTML = output;
        } else {
            videoContainer.innerHTML = 'No Uploaded Videos';
        }
    });
}