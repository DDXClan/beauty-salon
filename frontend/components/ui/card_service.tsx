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
import { services } from "@/api/service"
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

const FormSchema = z.object({
    appointment_time: z.date({
        required_error: "Обязательно выберете дату",
    }),
})
const CardService = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
      })
    const { toast } = useToast()

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "Выбранный день ",
            description: `${data.appointment_time}`,
            action: (
                <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
            ),
            })
    }

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
                            <DialogContent className="sm:max-w-[425px]" >
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    <FormField
                                    control={form.control}
                                    name="appointment_time"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                        <FormLabel>Выберете день приема</FormLabel>
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
                                                    <span>Выберете день</span>
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
                                            disabled={(date) =>
                                            date < new Date()
                                            }
                                        />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                                <Button type="submit" style={{width: '100%'}}>Записаться</Button>
                            </form>
                            </Form>
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

