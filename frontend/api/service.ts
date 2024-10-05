import { Service } from "@/schemas/service";
import { categories } from "./category";

export const services: Service[] = [
    { id: 0, name: 'Стрижка волос (мужская, женская, детская)',
    description:'это искусство, которое позволяет преобразить внешний вид и подчеркнуть индивидуальность каждого клиента. В нашем салоне мы предлагаем профессиональные услуги стрижки, которые подходят для всех. Наши опытные мастера внимательно выслушают ваши пожелания и предложат стиль, который будет гармонично сочетаться с вашей внешностью и образом жизни.', 
    img: '/hair.png', 
    id_category: 0,  
    categoryName:categories[0].name },
    { id: 1, name: 'Покраска ногтей', img: '/nail.png', id_category: 1, categoryName:categories[1].name },
    { id: 2, name: 'Покраска волос', img: '/color.png', id_category: 1, categoryName:categories[1].name },
    { id: 3, name: 'Педикюр', img: '/pedicure.png', id_category: 2, categoryName:categories[2].name },
    { id: 4, name: 'Маникюр', img: '/manicur.png', id_category: 2, categoryName:categories[2].name },
    { id: 5, name: 'Укладка волос', img: '/waxing.png', id_category: 2, categoryName:categories[2].name },
    { id: 6, name: 'Массаж', img: '/massage.png', id_category: 3, categoryName:categories[3].name },
    { id: 7, name: 'Депиляция', img: '/epilation.png', id_category: 3, categoryName:categories[3].name },
];