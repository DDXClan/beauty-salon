'use client';
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import apiAxios from "@/axios/axios";

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
}

const CreateServiceAndCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { toast } = useToast();
  const serviceForm = useForm();
  const categoryForm = useForm();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiAxios({
          method: 'GET',
          url: '/services/categories',
        });
        const categoriesData = response.data as Category[];
        setCategories(categoriesData);
      } catch (error) {
        toast({
          title: "Ошибка",
          description: "Не удалось загрузить категории.",
        });
      }
    };

    fetchCategories();
  }, []);

  const handleCreateCategory = async (data: any) => {
    try {
      const response = await apiAxios({
        method: 'POST',
        url: '/services/categories',
        data,
      });
      if (response.status === 201) {
        const newCategory = response.data  as { status: string; category: Category }
        setCategories([...categories, newCategory.category]);
        categoryForm.reset();
        toast({
          title: "Категория успешно создана!",
          description: "Новая категория была успешно создана.",
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        variant: 'destructive',
        description: "Не удалось создать категорию.",
      });
    }
  };

  const handleCreateService = async (data: any) => {
    try {
      const response = await apiAxios({
        method: 'POST',
        url: '/services/',
        data
      });
      if (response.status === 201) {
        toast({
          title: "Услуга успешно создана!",
          description: "Новая услуга была успешно создана.",
        });
        serviceForm.reset();
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        variant: 'destructive',
        description: "Не удалось создать услугу.",
      });
    }
  };

  return (
    <div style={{ width: '90%', margin: '2rem'}}>
      <Accordion type="single" collapsible>
        <AccordionItem value="create-category">
          <AccordionTrigger style={{
            fontSize: '1.2rem',
        }}>Создание категории</AccordionTrigger>
          <AccordionContent>
            <Form {...categoryForm}>
              <form onSubmit={categoryForm.handleSubmit(handleCreateCategory)} className="space-y-4" style={{padding: '0.1rem'}}>
                <FormField
                  control={categoryForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="name">Название категории</FormLabel>
                      <FormControl>
                        <Input id="name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Создать категорию</Button>
                </DialogFooter>
              </form>
            </Form>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="create-service">
          <AccordionTrigger style={{
            fontSize: '1.2rem',
        }}>Создание услуги</AccordionTrigger>
          <AccordionContent>
            <Form {...serviceForm}>
              <form onSubmit={serviceForm.handleSubmit(handleCreateService)} className="space-y-4" style={{padding: '0.1rem'}}>
                <FormField
                  control={serviceForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="name">Название услуги</FormLabel>
                      <FormControl>
                        <Input id="name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={serviceForm.control}
                  name="start_price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="start_price">Начальная цена</FormLabel>
                      <FormControl>
                        <Input id="start_price" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={serviceForm.control}
                  name="end_price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="end_price">Конечная цена</FormLabel>
                      <FormControl>
                        <Input id="end_price" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={serviceForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="description">Описание</FormLabel>
                      <FormControl>
                        <Input id="description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                control={serviceForm.control}
                name="category_id" 
                render={({ field }) => (
                    <FormItem>
                    <FormLabel htmlFor="category">Категория</FormLabel>
                    <FormControl>
                        <Select {...field} onValueChange={field.onChange} defaultValue="">
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                            <SelectLabel>Категории</SelectLabel>
                            {categories.map(category => (
                                <SelectItem key={category.id} value={category.id.toString()}>
                                {category.name}
                                </SelectItem>
                            ))}
                            </SelectGroup>
                        </SelectContent>
                        </Select>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <DialogFooter>
                  <Button type="submit">Создать услугу</Button>
                </DialogFooter>
              </form>
            </Form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default CreateServiceAndCategory;
