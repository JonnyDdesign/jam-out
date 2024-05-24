let accessToken = "";
const clientID = "b996a6f370c14e4c923c4adb16de1f3a";
const redirectURI = "http://localhost:8080/";
const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
        const urlAcessToken = window.location.href.match(/access_token=([^&]*)/);
        const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
        if (urlAcessToken && urlExpiresIn) {
            accessToken = urlAcessToken;
            const expiresIn = Number(urlExpiresIn[1]);
            window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
            window.history.pushState("Access Token", null, "/");
        }
    }
};

export { Spotify };