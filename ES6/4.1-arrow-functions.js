// function StockQuoteGenerator(symbol) {
//     this.symbol = symbol;
//     console.log(this.symbol);

//     setInterval(function() {
//         console.log(`The price of ${this.symbol} is ${(Math.random() * 100).toFixed(2)}`);
//     }, 1000);
// }
// function StockQuoteGenerator(symbol) {
//     const that = this;
//     this.symbol = symbol;
//     console.log(this.symbol);

//     setInterval(function() {
//         console.log(`The price of ${that.symbol} is ${(Math.random() * 100).toFixed(2)}`);
//     }, 1000);
// }
// function StockQuoteGenerator(symbol) {
//     this.symbol = symbol;
//     console.log(this.symbol);

//     setInterval(() => console.log(`The price of ${this.symbol} is ${(Math.random() * 100).toFixed(2)}`), 1000);
// }

// const sqg = new StockQuoteGenerator('IBM');

function printSong() {
    console.log('Ooops - The Global Object');
}

const jukebox = {
    songs: [
        { title: 'Title A', artist: 'Artist A'},
        { title: 'Title B', artist: 'Artist B'}
    ],
    printSong: function(song) {
        console.log(`${song.title} - ${song.artist}`);
    },
    printSongs: function() {
        // this.songs.forEach(function(song) {
        //     this.printSong(song);
        // }.bind(this));
        // this.songs.forEach(this.printSong);
        this.songs.forEach(song => this.printSong(song));
    }
};

console.log(jukebox.printSongs);

jukebox.printSongs();