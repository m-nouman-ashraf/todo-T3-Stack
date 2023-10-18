"use client";
import { Input } from "~/components/ui/input";
import { useUser } from "@clerk/nextjs";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import React from "react";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().optional(),
  dueDate: z.date(),
});
const CreateTodo = () => {
  const { user } = useUser();
  console.log("user", user);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: new Date(),
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
        className="flex w-full items-end justify-between gap-2"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="flex w-full "
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
                <Input placeholder="description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dueDate"
          render={() => (
            <FormItem>
              <FormControl>
                <Input type="date" placeholder="Select a date" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <Button
            disabled={isLoading}
            size={"lg"}
            className="w-auto"
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
