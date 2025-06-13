import { Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateTodo } from "@/config/queries";

const TitleSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
});

export default function TodoIDTitle({ id, title }) {
  const [titleState, setTitleState] = useState(title);
  const [isEditable, setIsEditable] = useState(false);

  const { mutate: updateTodo, isPending } = useUpdateTodo();

  const form = useForm({
    resolver: zodResolver(TitleSchema),
    defaultValues: {
      title: titleState,
    },
  });

  useEffect(() => {
    if (isEditable) {
      form.reset({ title: titleState });
    }
  }, [isEditable, form, titleState]);

  // TITLE UPDATE
  const onSubmit = (data) => {
    const newTitle = data.title.trim();
    updateTodo(
      { id, title: newTitle },
      {
        onSuccess: (updatedTodo) => {
          setTitleState(updatedTodo.title);
          setIsEditable(false);
          form.reset({ title: updatedTodo.title });
        },
      },
    );
  };

  return (
    <>
      {isEditable ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-center space-x-2"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="sr-only">Todo Title</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="h-fit text-3xl text-pretty first-letter:capitalize md:text-5xl lg:text-6xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2">
              <Button size="icon" type="submit" disabled={isPending}>
                <Save />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                disabled={isPending}
                onClick={() => {
                  setIsEditable(false);
                  form.reset({ title: titleState });
                }}
              >
                <X />
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <h1
          title="Click to edit"
          onClick={() => setIsEditable(true)}
          className="max-w-2xl pr-12 text-3xl text-pretty first-letter:capitalize md:text-5xl lg:text-6xl"
        >
          {titleState}
        </h1>
      )}
    </>
  );
}
