import {nanoid} from 'nanoid'

const cardData = [
    {
        id: nanoid(),
        to: '/discussing-the-divine-comedy-with-dante',
        title: 'Discussing the Divine Comedy with Dante',
        author: 'Dai Dudu',
        src: 'images/discussing-the-divine-comedy-with-dante.jpg',
        displayId: 'divine-comedy',
        characters: {
            BruceLee: { x1: 620, x2: 670, y1: 135, y2: 230, found: false},
            MarilynMonroe: { x1: 1520, x2: 1567, y1: 289, y2: 360, found: false },
            AlbertEinstein: { x1: 860, x2: 940, y1: 680, y2: 870, found: false },
        },
    },
    {
        id: nanoid(),
        to: '/the-dutch-proverbs',
        title: 'The Dutch Proverbs',
        author: 'Pieter Bruegel the Elder',
        src: 'images/the-dutch-proverbs.jpg',
        displayId: 'the-dutch-proverbs',
        characters: {
            BruceLee: { x1: 620, x2: 670, y1: 135, y2: 230 },
            MarilynMonroe: { x1: 1520, x2: 1567, y1: 289, y2: 360 },
            AlbertEinstein: { x1: 860, x2: 940, y1: 680, y2: 870 },
        },
    },
    {
        id: nanoid(),
        to: '/robo-city',
        title: 'Robo city',
        author: 'Egor Klyuchnyk',
        src: 'images/robo-city.jpg',
        displayId: 'robo-city',
        characters: 'hi'
    },
    {
        id: nanoid(),
        to: '/universe-113',
        title: 'Universe 113',
        author: 'Egor Klyuchnyk',
        src: 'images/universe113.jpg',
        displayId: 'universe-113',
        characters: 'hi'
    },
]

export default cardData;