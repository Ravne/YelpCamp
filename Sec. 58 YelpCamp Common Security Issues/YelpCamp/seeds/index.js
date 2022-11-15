//code to seed the DB
//it seeds the DB with 50 new camps
// - and then it closes the connection

const mongoose = require('mongoose')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6346aba4054227bb3c1f0a71',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: ' :D Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam debitis aliquid molestiae tenetur recusandae eveniet iure? Rerum modi, cum, ipsa quos nobis facere eaque velit quaerat dolorum repudiandae repellat sequi!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dv1gowwh9/image/upload/v1668270601/YelpCamp/kxohupktjw2zpeij6jhy.jpg',
                    filename: 'YelpCamp/kxohupktjw2zpeij6jhy'
                },
                {
                    url: 'https://res.cloudinary.com/dv1gowwh9/image/upload/v1668270601/YelpCamp/d8ve9dcbmz6f8mbjbgys.jpg',
                    filename: 'YelpCamp/d8ve9dcbmz6f8mbjbgys'
                },
                {
                    url: 'https://res.cloudinary.com/dv1gowwh9/image/upload/v1668270601/YelpCamp/amdofgk3m6cnrjypmkyy.jpg',
                    filename: 'YelpCamp/amdofgk3m6cnrjypmkyy'
                }
            ]
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close()
});