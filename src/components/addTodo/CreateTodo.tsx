"use client";
import { Input } from "~/components/ui/input";
import * as z from "zod";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
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
import { Textarea } from "~/components/ui/textarea";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z
    .string()
    .max(100, {
      message: "Description must not be longer than 20 characters.",
    })
    .optional(),
  dueDate: z.date(),
});
const CreateTodo = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const ctx = api.useContext();
  const { mutate, isLoading } = api.todo.create.useMutation({
    onSuccess: () => {
      toast.success("Task Added");
      void ctx.todo.invalidate();

      form.reset();
    },
    onError: () => {
      toast.error("Something went wrong");
      form.reset();
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default" disabled={isLoading} className="lg:w-60">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Create Todo"
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className=" sm:max-h-[500px]  sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Create Todo</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full flex-col justify-between gap-5"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="flex w-full"
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
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-ful pl-3 text-left font-normal md:w-[200px] lg:w-full",
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
                          fromDate={new Date()}
                        />
                      </PopoverContent>
                    </Popover>
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
                      <Textarea
                        rows={3}
                        placeholder="Please Describe your Todo"
                        className="resize-none md:w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-2">
                <DialogClose asChild>
                  <Button disabled={isLoading} className="w-full" type="submit">
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </DialogClose>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateTodo;
