function yelpApi(query, position, callback){
    const yelp_url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${query}&latitude=${position.lat}&longitude=${position.lng}`; //localdevelopment URL
    const options = {
        headers: {
            'Authorization': 'Bearer 3_4IEeMaWql2PPtGHMd9Bgfsn2VfWtCsl5OKfsWd_Byh0gMorW5Tl_s2RJ268NpvJakR5NK9gi49ZNnn_1Ek-MmRtOYs0HSQYx7vNectsYf3EQL0d4Lj2fwaFxrTWnYx'
        }
    };

    fetch(yelp_url, options)
    .then(response => 
        response.json()
    )
    .then((data) => {
        console.log(data.businesses)
        callback(null, data.businesses);
    })
    .catch((err) => {
        // callback(err);
    })
}

export default yelpApi;