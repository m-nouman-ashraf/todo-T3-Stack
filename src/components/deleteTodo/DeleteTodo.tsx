import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";
interface props {
  id: number;
}
export function DeleteTodo({ id }: props) {
  console.log("id >>>", id);
  const deleteTaskMutation = api.todo.deleteTodoById.useMutation();
  const ctx = api.useContext();
  const handleDeleteTask = () => {
    deleteTaskMutation.mutate(
      { id: id },
      {
        onSuccess: () => {
          toast.success("Task Deleted Sucessfully");
          void ctx.invalidate();
        },
        onError: () => {
          toast.error("Something went wrong");
        },
      },
    );
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={deleteTaskMutation.isLoading} variant="outline">
          {deleteTaskMutation.isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Delete"
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your data
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              disabled={deleteTaskMutation.isLoading}
              type="submit"
              onClick={handleDeleteTask}
            >
              {deleteTaskMutation.isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Continue"
              )}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
