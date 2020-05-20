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

// Get channel from API
function getChannel(channel) {
    console.log(channel);
}