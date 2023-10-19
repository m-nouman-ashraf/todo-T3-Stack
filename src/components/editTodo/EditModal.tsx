import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
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
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { EditTodo } from "./EditTdo";

interface Props {
  id: number;
}

export function EditModal({ id }: Props) {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Edit</Button>
        </DialogTrigger>
        <DialogContent>
          <EditTodo id={id} />
        </DialogContent>
      </Dialog>
    </>
  );
}
