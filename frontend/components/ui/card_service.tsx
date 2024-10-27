import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { toast, useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { ToastAction } from "@/components/ui/toast"
import { Calendar } from "@/components/ui/calendar"
import axios from "axios"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import '@/styles/card_service.css'
import Image from 'next/image'
import useService from "@/hooks/useService"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Search from "./search"
import SelectCategory from "./select_category"

const FormSchema = z.object({
    appointment_date: z.date({
        required_error: "Обязательно выберите дату",
    }),
    appointment_time: z.string().nonempty("Обязательно выберите время"),
})

const CardService = () => {
    const services = useService()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })
    const { toast } = useToast()
    const [searchTerm, setSearchTerm] = React.useState('')
    const [selectedCategory, setSelectedCategory] = React.useState('')
    
    function onSubmit(data: z.infer<typeof FormSchema>, serviceId: number) {
        const access_token = localStorage.getItem("access_token")

        const [hours, minutes] = data.appointment_time.split(":").map(Number) 
        const appointmentDateTime = new Date(data.appointment_date) 
        appointmentDateTime.setHours(hours, minutes) 

        const payload = {
            service_id: serviceId,
            appointment_time: appointmentDateTime.toISOString(), 
        }

        axios.post('http://127.0.0.1:8000/api/orders/', payload, {
            headers: {
                Authorization: `Bearer ${access_token}`, 
            }
        })
        .then(response => {
            toast({
                title: "Успешно записано!",
                description: `Вы записаны на ${format(appointmentDateTime, "PPP p")}`,
                action: (
                    <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
                ),
            })
        })
        .catch(error => {
            console.error("Ошибка при записи:", error)
            toast({
                title: "Ошибка",
                description: "Не удалось записаться. Попробуйте еще раз.",
            })
        })
    }

    const filteredServices = services.filter(service => {
        const matchesSearchTerm = service.name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory ? service.category.name === selectedCategory : true
        return matchesSearchTerm && matchesCategory
    })

    return ( 
        <div>
            <div className="header__services">
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <SelectCategory selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            </div>
            
            <ul className="card__ul">
            {filteredServices.length > 0 ? (
                filteredServices.map(service => (
                    <Sheet key={service.id}>
                        <SheetTrigger>
                            <li className="card__li"> 
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
                        <SheetContent className="position:right size=xl">
                            <SheetHeader>
                                <Image className="card__img" width={300} height={300} src={service.img || "/logo.png"} alt={service.name} />
                                <SheetTitle>{service.name}</SheetTitle>
                                <SheetDescription>{service.description}</SheetDescription>
                                <p>Категория: {service.category.name}</p>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline">Выбрать дату и время</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <Form {...form}>
                                            <form onSubmit={form.handleSubmit((data) => onSubmit(data, service.id))} className="space-y-4">
                                                <FormField
                                                    control={form.control}
                                                    name="appointment_date"
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-col">
                                                            <FormLabel>Выберите день приема</FormLabel>
                                                            <Popover>
                                                                <PopoverTrigger asChild>
                                                                    <FormControl>
                                                                        <Button
                                                                            variant={"outline"}
                                                                            className={cn(
                                                                                "w-[374px] pl-3 text-left font-normal",
                                                                                !field.value && "text-muted-foreground"
                                                                            )}
                                                                        >
                                                                            {field.value ? (
                                                                                format(field.value, "PPP")
                                                                            ) : (
                                                                                <span>Выберите день</span>
                                                                            )}
                                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                        </Button>
                                                                    </FormControl>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-auto p-0" align="start">
                                                                    <Calendar
                                                                        mode="single"
                                                                        selected={field.value}
                                                                        onSelect={field.onChange}
                                                                        disabled={(date) => {
                                                                            const day = date.getDay()
                                                                            return date < new Date() || day === 0 || day === 6
                                                                        }}
                                                                    />
                                                                </PopoverContent>
                                                            </Popover>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="appointment_time"
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-col">
                                                            <FormLabel>Выберите время приема</FormLabel>
                                                            <FormControl>
                                                                <input
                                                                    type="time"
                                                                    {...field}
                                                                    className="border p-2 rounded w-full"
                                                                    style={{
                                                                        backgroundColor: 'transparent',
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <Button type="submit" style={{ width: '100%' }}>Записаться</Button>
                                            </form>
                                        </Form>
                                    </DialogContent>
                                </Dialog>
                                <SheetClose />
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                ))
            ) : (
                <li style={{ 
                    display: 'flex',
                    height: '75vh',
                    textAlign: 'center', 
                    fontSize: '20px', color: 'white', 
                    fontWeight: 'bold', 
                    alignItems: 'center', 
                    justifyContent: 'center'
                }} 
                    className="no-results">
                        Такой услуги не найдено
                </li> 
                )}
            </ul>
        </div>
    )
}

export default CardService;