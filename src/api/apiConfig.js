const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apikey: '4757b2bc92a59ecfeb6e3a2adff100b9',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
}

export default apiConfig;