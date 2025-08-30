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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAddTodo, useUsers } from "@/config/queries";

const FormSchema = z.object({
  title: z.string().min(3, {
    message: "Todo title must be at least 3 characters.",
  }),
  userId: z.coerce.number().min(1, {
    message: "Please select a user.",
  }),
});
type FormValues = z.infer<typeof FormSchema>;

export function AddTodoFormContent({ onClose }: { onClose: () => void }) {
  const { mutate: addTodo, isPending } = useAddTodo();
  const { data: users } = useUsers();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { title: "", userId: undefined },
    // mode: "onTouched",
    // reValidateMode: "onChange",
  });

  function onSubmit(values: FormValues) {
    addTodo(
      { ...values },
      {
        onSuccess: () => {
          onClose();
          form.reset();
        },
      },
    );
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
                <Input placeholder="e.g. Complete Assignment" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* TODO OWNER */}
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assign To</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value?.toString()}
                disabled={isPending}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a user" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {users?.map((user) => (
                    <SelectItem key={user.id} value={user.id.toString()}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="!mt-6 grid grid-cols-2 gap-2 border-t pt-6">
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
