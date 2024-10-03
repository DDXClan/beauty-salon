export type Service = {
    id: number;
    name: string;
    img?: string;
};

export const services: Service[] = [
    { id: 0, name: 'Покраска ногтей', img :'nail.png' },
    { id: 1, name: 'Покраска волос', img: 'color.png'},
    { id: 2, name: 'Стрижка' , img: 'hair.png'},
    { id: 3, name: 'Педикюр', img: 'pedicure.png'},
    { id: 4, name: 'Маникюр', img: 'manicur.png'},
    { id: 5, name: 'Укладка волос', img: 'waxing.png'},
    { id: 6, name: 'Массаж', img: 'massage.png'},
    { id: 7, name: 'Депиляция', img: 'epilation.png'},
    { id: 8, name: 'Косметические процедуры' },
    { id: 9, name: 'Макияж' },
];