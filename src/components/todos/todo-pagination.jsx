import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TodoPagination({
  page,
  totalPages,
  setPage,
  isFetching,
}) {
  return (
    <div className="mx-auto flex w-full max-w-[calc(100%-6rem)] justify-between rounded-full border border-zinc-100 bg-zinc-100/90 p-4 py-2 backdrop-blur-sm lg:absolute lg:bottom-6 lg:left-6 lg:max-w-80">
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 1))}
        disabled={page === 1 || isFetching}
        className=""
      >
        <ChevronLeft className="stroke-1" />
      </button>

      <span>{page}</span>

      <button
        onClick={() => setPage((old) => old + 1)}
        disabled={page === totalPages || isFetching}
        className=""
      >
        <ChevronRight className="stroke-1" />
      </button>
    </div>
  );
}
