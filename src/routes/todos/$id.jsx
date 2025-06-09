import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/todos/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  return <div>Hello "{id}"!</div>;
}
