import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Todo title must be at least 2 characters.",
  }),
  owner: z.string().min(2, {
    message: "Todo title must be at least 2 characters.",
  }),
});

export function AddTodoFormContent({ onClose }) {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: { title: "", owner: "" },
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  function onSubmit(data) {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* TODO TITLE */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Todo Title</FormLabel>
              <FormControl>
                <Input placeholder="Complete Assignment" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* TODO OWNER */}
        <FormField
          control={form.control}
          name="owner"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Todo Owner</FormLabel>
              <FormControl>
                <Input placeholder="e.g John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="!mt-6 grid grid-cols-2 gap-2 border-t pt-6">
          <Button type="button" variant={"outline"} onClick={onClose}>
            Close
          </Button>
          <Button type="submit">Add Todo</Button>
        </div>
      </form>
    </Form>
  );
}
