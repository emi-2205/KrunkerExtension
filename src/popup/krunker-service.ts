function fetchKrunkerGames() {
    return fetch('https://matchmaker.krunker.io/game-list?hostname=krunker.io', {});
}

export { fetchKrunkerGames };