let accessToken = "";
const clientID = "b996a6f370c14e4c923c4adb16de1f3a";
const redirectURI = "http://localhost:8080/";
const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
        window.location.href.match(/access_token=([^&]*)/);
        window.location.href.match(/expires_in=([^&]*)/)
    }
};

export { Spotify };