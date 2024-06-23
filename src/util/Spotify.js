let accessToken = "";
const clientID = "b996a6f370c14e4c923c4adb16de1f3a";
const redirectUrl = "http://localhost:3000/";

const Spotify = {
    getAccessToken() {
        if (accessToken) return accessToken;

        const tokenInURL = window.location.href.match(/access_token=([^&]*)/);
        const expiryTime = window.location.href.match(/expires_in=([^&]*)/);

        if (tokenInURL && expiryTime) {
            accessToken = tokenInURL[1];
            const expiresIn = Number(expiryTime[1]);

            window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
            window.history.pushState("Access Token", null, "/");
            return accessToken;
        }
        
        const redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUrl}`
        window.location = redirect;
    },

    search(term) {
        accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${accessToken}` },
        })
            .then(response => response.json())
            .then(jsonResponse => {
                if (!jsonResponse.tracks) {
                    return [];
                }
                return jsonResponse.tracks.items.map(t => ({
                    id: t.id,
                    name: t.name,
                    artist: t.artist[0].name,
                    album: t.album.name,
                    uri: t.uri
                }));
            })
            .catch(error => {
                console.error("Spotify search error:", error);
                return[];
            });        
    },

    savePlaylist(name, trackUris) {
        if (!name || !trackUris) return;

        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        let userId;

        return fetch("https://api.spotify.com/v1/me", { headers: headers })
            .then(response => response.json())
            .then(jsonResponse => {
                userId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                    headers: headers,
                    method: "POST",
                    body: JSON.stringify({ name: name }),
                });
            })
            .then(response => response.json())
            .then(jsonResponse => {
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                    headers: headers,
                    method: "POST",
                    body: JSON.stringify({ uris: trackUris }),
                });
            })
            .catch(error => {
                console.error("Spotify savePlaylist error:", error);
            });
    },
};

export { Spotify };