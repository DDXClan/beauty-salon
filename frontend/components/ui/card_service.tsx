import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import '@/styles/card_service.css'
  import Image from 'next/image'
import { services } from "@/api/service"

const CardService = () => {
    return ( 
        <ul className="card__ul">
            {services.map(service => (
                <li className="card__li" key={service.id}> {/* Используем уникальный ключ для каждого элемента списка */}
                    <Card className='card__service'>
                        <CardContent className="card__content">
                            <Image width={200} height={200} src={service.img || "/logo.png"} alt={service.name} />
                        </CardContent>
                        <CardHeader>
                            <CardTitle>{service.name}</CardTitle> {/* Отображаем название услуги */}
                        </CardHeader>
                    </Card>
                </li>
            ))}
        </ul>
    );
}

export default CardService;
