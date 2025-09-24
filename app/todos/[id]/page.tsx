import { TodoDisplay } from "@/features/todos/components";

export default async function TodoIdPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  return <TodoDisplay {...{ id }} />;
}
