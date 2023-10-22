"use client";
import { Input } from "~/components/ui/input";
import { useUser } from "@clerk/nextjs";
import * as z from "zod";
import { format } from "date-fns";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import React from "react";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import { CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "~/lib/utils";
import { Calendar } from "../ui/calendar";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().optional(),
  dueDate: z.date(),
});
const CreateTodo = () => {
  const { user } = useUser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      //   dueDate: new Date(),
    },
  });
  const ctx = api.useContext();
  const { mutate, isLoading } = api.todo.create.useMutation({
    onSuccess: () => {
      toast.success("Task Added");
      void ctx.invalidate();
      form.reset();
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);

    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col justify-between gap-2 md:flex-row md:items-end"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="flex w-full lg:w-80"
                  placeholder="Title"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="flex w-full lg:w-80"
                  placeholder="description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-ful pl-3 text-left font-normal md:w-[200px] lg:w-80",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
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
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-2">
          <Button
            disabled={isLoading}
            className="w-full md:w-auto"
            type="submit"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateTodo;
