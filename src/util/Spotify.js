const accessToken = "";
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