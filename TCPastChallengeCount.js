(function() {
    let tracks = [{
            type: 'develop',
            categories: ["Cd", "As", "F2F", "Pr"]
        },
        {
            type: 'design',
            categories: ["Wb", "Wf", "Wg", "FE", "PP", "DF2F"]
        },
        {
            type: 'data_science',
            categories: ["Cd", "F2F"]
        }
    ]

    tracks.forEach(function(track) {
        let divs = $("." + track.type);
        let cats = track.categories;
        console.log("For " + track.type)
        cats.forEach(function(c) {
            let i = 0;
            divs.each(function(ind, d) {
                if (c == d.textContent) {
                    i++;
                }
            })
            console.log(c, i);
        });
    });
})();
