"use client";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Calendar } from "~/components/ui/calendar";
import React from "react";
import { api } from "~/utils/api";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  discription: z.string().min(2).max(50).optional(),
  due_date: z.date(),
});
const CreateTodo = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const { user } = useUser();
  console.log("user", user);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      discription: "",
      due_date: date,
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    const {} = api.todo.create.useMutation({
      onSuccess: () => {
        console.log("success");
      },
    });
    // const {} = api.todo.addToDo.mutate({
    //   title: values.title,
    //   description: "",
    // });
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div className="container mt-20 flex items-center justify-center ">
      <Card className="flex h-96 w-[600px] flex-col bg-white box-decoration-clone shadow-2xl">
        <CardHeader className="flex w-full flex-row  justify-center">
          <CardTitle className=" text-center text-3xl font-extrabold">
            Add ToDo
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full items-end justify-between gap-5"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input width={"full"} placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="discription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discription</FormLabel>
                    <FormControl>
                      <Input placeholder="Discription" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="due_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <Input type="date" placeholder="Select a date" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <Button size={"lg"} className="w-auto" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* <div className="flex h-96 w-[600px] flex-col items-center justify-center bg-white box-decoration-clone shadow-2xl">
        <h1 className="text-2xl font-bold">Add Todo</h1>
        <div className="flex h-full w-full flex-row items-center justify-center space-y-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" flex  items-center justify-center space-y-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discription</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
        </div>
      </div> */}
    </div>
  );
};

export default CreateTodo;
