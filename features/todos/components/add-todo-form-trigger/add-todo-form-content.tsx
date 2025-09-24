"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/supabase/client";
import { cn } from "@/lib/utils";

import { useAddTodo } from "../../queries";

const FormSchema = z.object({
  title: z.string().min(3, {
    message: "Todo title must be at least 3 characters.",
  }),
  description: z.string().min(12, {
    message: "Description title must be at least 12 characters.",
  }),
});
type FormValues = z.infer<typeof FormSchema>;

export function AddTodoFormContent({ onClose }: { onClose: () => void }) {
  const { mutateAsync: addTodo, isPending } = useAddTodo();
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { title: "", description: "" },
  });

  async function onSubmit(values: FormValues) {
    const response = await addTodo(values);
    if (response === 201) {
      form.reset();
      onClose();
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-6", "[&_label]:px-1")}
      >
        {/* TODO TITLE */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Todo Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Complete Assignment" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* TODO DESCRIPTION */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Todo Description</FormLabel>
              <FormControl>
                <Textarea placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="!mt-6 grid grid-cols-2 gap-2 pt-6">
          <Button type="button" variant={"outline"} onClick={onClose}>
            Close
          </Button>
          <Button type="submit" disabled={isPending}>
            Add Todo
          </Button>
        </div>
      </form>
    </Form>
  );
}
