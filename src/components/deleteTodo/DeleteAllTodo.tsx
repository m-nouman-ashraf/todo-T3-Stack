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

export function DeleteALLTodo() {
  const ctx = api.useContext();
  const { mutate, isLoading } = api.todo.deleteAllTodos.useMutation({
    onSuccess: () => {
      toast.success("All todos deleted successfully.");
      void ctx.invalidate();
    },
    onError: () => {
      toast.error("Something went wrong while deleting todos.");
    },
  });
  const handleDeleteAllTodos = () => {
    mutate();
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"default"} disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Delete All"
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete All your
            data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              disabled={isLoading}
              type="submit"
              onClick={handleDeleteAllTodos}
            >
              {isLoading ? (
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
