import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { services } from "@/api/service"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"

const CardService = () => {
    const [date, setDate] = React.useState<Date>()

    return ( 
        <ul className="card__ul">
            {services.map(service => (
                <Sheet key={service.id}>
                    <SheetTrigger>
                <li className="card__li" key={service.id}> 
                    <Card className='card__service'>
                        <CardContent className="card__content">
                            <Image width={200} height={200} src={service.img || "/logo.png"} alt={service.name} />
                        </CardContent>
                        <CardHeader>
                            <CardTitle>{service.name}</CardTitle> 
                        </CardHeader>
                    </Card>
                </li>
                </SheetTrigger>
                <SheetContent position="right" size="xl">
                    <SheetHeader>
                        <Image className="card__img" width={300} height={300} src={service.img || "/logo.png"} alt={service.name} />
                        <SheetTitle>{service.name}</SheetTitle>
                        <SheetDescription>{service.description}</SheetDescription>
                        <p>Категория: {service.categoryName}</p>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline">Выбрать дату и время</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                <DialogTitle>Выберите дату и время</DialogTitle>
                                </DialogHeader>
                                 <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[374px] justify-start text-left font-normal",
                                                !date && "text-muted-foreground"
                                            )}
                                            >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar 
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover> 
                                <DialogFooter>
                                <Button style={{justifyContent: "center", width: "100%"}} type="submit">Записаться</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        <SheetClose />
                    </SheetHeader>
                </SheetContent>
                </Sheet>
            ))}
        </ul>
    );
}

export default CardService;

