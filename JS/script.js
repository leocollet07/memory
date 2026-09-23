let dimension = 150;
let imgStart = Math.floor(Math.random() * 100) + 1;

let images = [];
let cards = [];

for (let i = imgStart; i < imgStart + 8; i++) {
    images.push(`https://picsum.photos/seed/${i}/${dimension}/${dimension}`);
}

cards = [...images, ...images];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

console.log(images);
console.log(cards);
shuffle(cards);
console.log(cards);