import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { Search } from "lucide-react";

const FormSchema = z.object({
  query: z.string(),
});

export function SearchTodoForm() {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: { query: "" },
  });

  const searchValue = form.watch("query");

  // Debounce Search Query
  useEffect(() => {
    if (searchValue.trim() === "") return;

    const handle = setTimeout(() => {
      toast(`Search value: ${searchValue}`);
    }, 500);

    return () => clearTimeout(handle);
  }, [searchValue]);

  return (
    <Form {...form}>
      <form className="relative flex w-full items-center">
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className={"sr-only"}>Seach Todos</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Search Todos..."
                  className="border-avocado-500 w-full rounded-full border pr-10 shadow-2xs data-[placeholder]:text-base"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Search className="pointer-events-none absolute right-3.5 h-5 w-5 text-neutral-500" />
      </form>
    </Form>
  );
}
