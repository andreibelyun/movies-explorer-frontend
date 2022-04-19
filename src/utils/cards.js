import first from '../images/cards/1.png';
import second from '../images/cards/2.png';
import third from '../images/cards/3.png';
import fourth from '../images/cards/4.png';
import fifth from '../images/cards/5.png';
import sixth from '../images/cards/6.png';
import seventh from '../images/cards/7.png';
import eighth from '../images/cards/8.png';
import ninth from '../images/cards/9.png';
import tenth from '../images/cards/10.png';
import eleventh from '../images/cards/11.png';
import twelfth from '../images/cards/12.png';

const cards = [
    {
        image: first,
        status: 'ok'
    },
    {
        image: second,
        status: 'ok'
    },
    {
        image: third,
        status: 'save'
    },
    {
        image: fourth,
        status: 'save'
    },
    {
        image: fifth,
        status: 'save'
    },
    {
        image: sixth,
        status: 'ok'
    },
    {
        image: seventh,
        status: 'ok'
    },
    {
        image: eighth,
        status: 'save'
    },
    {
        image: ninth,
        status: 'save'
    },
    {
        image: tenth,
        status: 'save'
    },
    {
        image: eleventh,
        status: 'ok'
    },
    {
        image: twelfth,
        status: 'save'
    },
];

const savedCards = [
    {
        image: first,
        status: 'remove'
    },
    {
        image: second,
        status: 'remove'
    },
    {
        image: third,
        status: 'remove'
    },
];

export {cards, savedCards};
