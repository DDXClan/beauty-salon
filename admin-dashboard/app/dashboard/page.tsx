'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import axios from 'axios';
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { set, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import apiAxios from "@/axios/axios"
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { BadgeX } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface Category {
  id: number;
  name: string;
  description?: string;
}

interface Service {
  id: number;
  name: string;
  category: Category;
  start_price: number;
  end_price: number;
  description: string;
  image: string;
}

const Dashboard = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const form = useForm();
  const [deleteService, setDeleteService] = useState<Service | null>(null);
  const [deleteCategory, setDeleteCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true)
  const { toast } = useToast();
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 89) {
          clearInterval(interval); 
          return 89;
        }
        return Math.min(prev + 1, 89); 
      });
    }, 75); 
  
    const fetchData = async () => {
      try {
        const [categoriesResponse, servicesResponse] = await Promise.all([
          axios.get('http://localhost:8000/api/services/categories'),
          axios.get('http://localhost:8000/api/services/'),
        ]);
  
        setCategories(categoriesResponse.data);
        setServices(servicesResponse.data);
        setProgress(99);
        setTimeout(() => {
          setLoading(false);
        }, 1000)
      } catch (err) {
        setError('Ошибка при получении данных');
      } finally {
        setProgress(100);
      }
    };
  
    fetchData();
  
    return () => clearInterval(interval);
  }, []);

  const handleDeleteService = async () => {
    if (!deleteService) return;
    try {
      const response = await apiAxios({method: 'DELETE', url: `/services/${deleteService.id}`});
      if(response.status === 200) {
        setServices(services.filter(service => service.id !== deleteService.id));
        setSelectedService(null)
        setDeleteService(null);
        toast({
          title: 'Услуга удалена',
          variant: 'destructive',
          description: 'Услуга успешно удалена',
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка при удалении услуги',
        variant: 'destructive',
        description: 'Произошла ошибка при удалении услуги',
        action: (
          <ToastAction altText="Удалить" onClick={handleDeleteService}>
              Try Again
          </ToastAction>
        ),
      });
      }
  } 

  const handleDeleteCategory = async () => {
    if (!deleteCategory) return;
    try {
      const response = await apiAxios({method: 'DELETE', url: `/services/categories/${deleteCategory.id}`});
      if(response.status === 200) {
        setCategories(categories.filter(category => category.id !== deleteCategory.id));
        setDeleteCategory(null);
        toast({
          title: 'Категория удалена',
          variant: 'destructive',
          description: 'Категория успешно удалена',
        });
      }
    } catch (error) {
      toast({
          title: 'Ошибка при удалении категории',
          variant: 'destructive',
          description: 'Произошла ошибка при удалении категории',
          action: (
            <ToastAction altText="Удалить" onClick={handleDeleteCategory}>
                Try Again
            </ToastAction>
          ),
        });
  } }

  const { reset, setValue } = form;

  const handleUpdateService = async () => {
    if (!selectedService) return;
  
    const data = form.getValues();
  
    try {
      if (data.image && data.image != 'placeholder.png') {
        const formData = new FormData();
        formData.append('image', data.image);
        await apiAxios({
          method: 'PATCH',
          url: `/services/${selectedService.id}`,
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      delete data.image;
      const response = await apiAxios({
        method: 'PUT',
        url: `/services/${selectedService.id}`,
        data,
      });
  
      if (response.status === 200) {
        setServices(services.map(service => service.id === selectedService.id ? { ...service, ...data } : service));
        setSelectedService(null);
        reset();
        toast({
          title: "Услуга успешно обновлена!",
          description: "Данные услуги были успешно обновлены.",
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: "Ошибка при обновлении услуги",
        description: "Не удалось обновить услугу. Попробуйте еще раз.",
        action: <ToastAction altText="Try again" onClick={handleUpdateService}>Try again</ToastAction>,
      });
    }
  };

  const openEditDialog = (service: Service) => {
    setSelectedService(service);
    reset(service);
  };

  if (progress != 100 && loading) return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
       <Progress value={progress} className="w-[60%]" />
    </div>
  )
  if (error) return <p>{error}</p>;

  return (
    <div style={{ width: '90%', margin: '2rem' }}>
      <Accordion type="single" collapsible>
        {categories.map(category => (
          <AccordionItem key={category.id} value={`item-${category.id}`}>
            <AccordionTrigger style={{ fontSize: '1.4rem', margin: '0rem 1rem'}}>
              <div style={{
                alignItems: 'center', display: 'flex', width: '100%', gap: 10
              }}>
                <Button variant={'ghost'} onClick={() => setDeleteCategory(category)}><BadgeX/></Button>
                {category.name}
                
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Carousel style={{ width: '90%', marginLeft: '3rem' }}>
                <CarouselContent>
                  {services
                    .filter(service => service.category.id === category.id)
                    .map(service => (
                      <div className="p-1 m-3" key={service.id}>
                        <Dialog>
                          <CarouselItem>
                            <Card style={{ width: '300px' }}>
                              <CardHeader>
                                <CardTitle style={{ fontSize: '1.2rem' }}>{service.name}</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <img
                                  src={`http://localhost:8000/${service.image}`}
                                  alt={service.name}
                                  style={{ width: '100%', height: "250px", objectFit: 'cover' }} 
                                />
                              </CardContent>
                              <CardFooter>
                                <div style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  width: '100%',
                                }}>
                                  <DialogTrigger asChild>
                                    <Button onClick={() => openEditDialog(service)}>Изменить</Button>
                                  </DialogTrigger>
                                  <p style={{ fontSize: '1rem' }}>
                                    Price: {service.start_price} - {service.end_price}
                                  </p>
                                </div>
                              </CardFooter>
                            </Card>
                          </CarouselItem>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>Изменение услуги</DialogTitle>
                              <DialogDescription>
                                Измените данные услуги ниже.
                              </DialogDescription>
                            </DialogHeader>
                            <Form {...form}>
                              <form onSubmit={form.handleSubmit(handleUpdateService)} className="space-y-8">
                                <FormField
                                  control={form.control}
                                  name="name"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel htmlFor="name">Название</FormLabel>
                                      <FormControl>
                                        <Input id="name" {...field} />
                                      </FormControl>
                                      <FormDescription>
                                        Введите название услуги.
                                      </FormDescription>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name="start_price"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel htmlFor="start_price">Начальная цена</FormLabel>
                                      <FormControl>
                                        <Input id="start_price" type="number" {...field} />
                                      </FormControl>
                                      <FormDescription>
                                        Введите начальную цену.
                                      </FormDescription>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name="end_price"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel htmlFor="end_price">Конечная цена</FormLabel>
                                      <FormControl>
                                        <Input id="end_price" type="number" {...field} />
                                      </FormControl>
                                      <FormDescription>
                                        Введите конечную цену.
                                      </FormDescription>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name="description"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel htmlFor="description">Описание</FormLabel>
                                      <FormControl>
                                        <Input id="description" {...field} />
                                      </FormControl>
                                      <FormDescription>
                                        Введите описание услуги.
                                      </FormDescription>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name="picture"
                                  render={({ field }) => (
                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                      <Label htmlFor="picture">Изображение</Label>
                                      <FormControl>
                                        <Input
                                          id="picture"
                                          type="file"
                                          accept="image/*"
                                          onChange={(e) => {
                                            const files = e.target.files;
                                            if (files && files.length > 0) {
                                              setValue("image", files[0]);
                                            }
                                          }}
                                        />
                                      </FormControl>
                                      <FormDescription>
                                        Выберите изображение для услуги.
                                      </FormDescription>
                                      <FormMessage />
                                    </div>
                                  )}
                                />
                                <DialogFooter style={{
                                  justifyContent: 'space-between'
                                }}>
                                <Button type="submit">Сохранить изменения</Button>
                                <Button variant="destructive" type="button" onClick={() => setDeleteService(selectedService)}>Удалить</Button>
                                </DialogFooter>
                                
                              </form>
                            </Form>
                            
                          </DialogContent>
                        </Dialog>
                      </div>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Dialog open={!!deleteService} onOpenChange={() => setDeleteService(null)}>
        <DialogContent>
          <p>Удалить услугу? {deleteService?.name}?</p>
          <DialogFooter>
          <Button variant="destructive" type="button" onClick={handleDeleteService}>Удалить</Button>
          <Button type="button" onClick={() => setDeleteService(null)}>Отмена</Button>
        </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={!!deleteCategory} onOpenChange={() => setDeleteCategory(null)}>
        <DialogContent>
          <p>Удалить категорию? {deleteCategory?.name}?</p>
          <DialogFooter>
            <Button variant="destructive" type="button" onClick={handleDeleteCategory}>Удалить</Button>
            <Button type="button" onClick={() => setDeleteCategory(null)}>Отмена</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Dashboard;
