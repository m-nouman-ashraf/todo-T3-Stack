import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import { CalendarIcon, Loader2, FileEdit } from "lucide-react";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { cn } from "~/lib/utils";
import { Textarea } from "../ui/textarea";

interface Props {
  id: number;
  status: boolean;
}
const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().optional(),
  dueDate: z.date(),
});
export function EditTodo({ id, status }: Props) {
  const [enabled, setEnabled] = useState(false);
  const { data } = api.todo.getTodoById.useQuery(
    {
      id: Number(id),
    },
    { enabled: enabled },
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    if (data) {
      form.setValue("title", data.title);
      form.setValue("description", data.description ?? "");
      form.setValue("dueDate", data.dueDate ?? new Date());
    } else {
      form.reset();
    }
  }, [data, form]);
  const ctx = api.useContext();
  const { mutate, isLoading } = api.todo.editTodoById.useMutation({
    onSuccess: () => {
      toast.success("Task Edit Sucessfully");
      void ctx.todo.invalidate();
      form.reset();
      setEnabled(false);
    },
    onError: () => {
      toast.error("Something went wrong");
      void ctx.todo.invalidate();
      form.reset();
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    const newValues = { ...values, id: Number(id) };
    mutate(newValues);
  }
  return (
    <Dialog>
      <DialogTrigger
        onClick={() => {
          setEnabled(true);
        }}
        asChild
      >
        <Button
          title="Edit Todo"
          className="md:w-24"
          disabled={status}
          variant="default"
        >
          {/* <FileEdit className="h-4 w-4" /> */}
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Edit Todo"
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className=" sm:max-h-[500px]  sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
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
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-ful pl-3 text-left font-normal md:w-full",
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
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      rows={3}
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none md:w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  disabled={isLoading}
                  size={"lg"}
                  className="w-full"
                  type="submit"
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
