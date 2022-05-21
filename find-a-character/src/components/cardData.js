import {nanoid} from 'nanoid'

const cardData = [
    {
        id: nanoid(),
        title: 'Discussing the Divine Comedy with Dante',
        author: 'Dai Dudu',
        src: 'images/discussing-the-divine-comedy-with-dante.jpg',
        character: {BruceLee: {x1: 680, x2: 755, y1: 150, y2: 270}},
    },
    {
        id: nanoid(),
        title: 'The Dutch Proverbs',
        author: 'Pieter Bruegel the Elder',
        src: 'images/the-dutch-proverbs.jpg'
    },
    {
        id: nanoid(),
        title: 'Robo city',
        author: 'Egor Klyuchnyk',
        src: 'images/robo-city.jpg'
    },
    {
        id: nanoid(),
        title: 'Universe 113',
        author: 'Egor Klyuchnyk',
        src: 'images/universe113.jpg'
    },
]

export default cardData;