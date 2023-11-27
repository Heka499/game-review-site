const mongoose = require('mongoose');
const Game = require('./models/game');

mongoose.connect('mongodb://127.0.0.1:27017/game-review-db');

const gamesData = [
    {
        title: 'The Legend of Zelda: Breath of the Wild',
        publisher: 'Nintendo',
        genre: 'Action-Adventure',
        releaseDate: new Date('2017-03-03'),
    },
    {
        title: 'Red Dead Redemption 2',
        publisher: 'Rockstar Games',
        genre: 'Action-Adventure',
        releaseDate: new Date('2018-10-26'),
    },
    {
        title: 'The Witcher 3: Wild Hunt',
        publisher: 'CD Projekt',
        genre: 'Action RPG',
        releaseDate: new Date('2015-05-19'),
    },
    {
        title: 'Fortnite',
        publisher: 'Epic Games',
        genre: 'Battle Royale',
        releaseDate: new Date('2017-07-25'),
    },
    {
        title: 'Minecraft',
        publisher: 'Mojang',
        genre: 'Sandbox',
        releaseDate: new Date('2011-11-18'),
    },
    {
        title: 'Grand Theft Auto V',
        publisher: 'Rockstar Games',
        genre: 'Action-Adventure',
        releaseDate: new Date('2013-09-17'),
    },
    {
        title: 'Overwatch',
        publisher: 'Blizzard Entertainment',
        genre: 'First-Person Shooter',
        releaseDate: new Date('2016-05-24'),
    },
    {
        title: 'Dark Souls III',
        publisher: 'Bandai Namco Entertainment',
        genre: 'Action RPG',
        releaseDate: new Date('2016-04-12'),
    },
    {
        title: 'Fallout 4',
        publisher: 'Bethesda Softworks',
        genre: 'Action RPG',
        releaseDate: new Date('2015-11-10'),
    },
    {
        title: 'Persona 5',
        publisher: 'Atlus',
        genre: 'Role-Playing',
        releaseDate: new Date('2016-09-15'),
    },

];


// Function to seed the database with games
async function seedDatabase() {
    try {
        // Clear existing games
        await Game.deleteMany({});

        // Insert the new games
        await Game.insertMany(gamesData);

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        // Close the database connection
        mongoose.connection.close();
    }
}

// Call the seed function
seedDatabase();
