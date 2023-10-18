import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
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
import CreateTodo from "~/components/addTodo/CreateTodo";
import AllTodos from "~/components/allTodo/AllToDo";

const Dashboard = () => {
  return (
    <div className="container mt-20 flex flex-col items-center justify-center ">
      <CreateTodo />
      <AllTodos />
    </div>
  );
};

export default Dashboard;
