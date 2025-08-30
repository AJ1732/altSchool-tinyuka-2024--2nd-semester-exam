import { useEffect } from "react";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  query: z.string(),
});

export function SearchTodoForm({
  onSearch,
}: {
  onSearch: (term: string) => void;
}) {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: { query: "" },
  });

  const searchValue = form.watch("query");

  // Debounce Search Query
  useEffect(() => {
    const trimmed = searchValue.trim();
    const handle = setTimeout(() => {
      if (typeof onSearch === "function") {
        onSearch(trimmed);
      }
    }, 500);

    return () => clearTimeout(handle);
  }, [searchValue, onSearch]);

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
                  className="h-11 w-full rounded-full border pr-10 shadow-2xs data-[placeholder]:text-base"
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
