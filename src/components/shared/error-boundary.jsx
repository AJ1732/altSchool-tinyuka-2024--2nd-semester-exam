import { Button } from "../ui/button";

export default function ErrorBoundary({ error, reset }) {
  return (
    <div role="alert" className="content-grid mt-4 min-h-[calc(100dvh-4rem)]">
      <section className="flex size-full flex-col justify-between rounded-lg bg-red-50 p-4">
        <h2 className="text-xl leading-[150%] md:text-2xl lg:text-3xl">
          Something went wrong
        </h2>
        <h1 className="mx-auto bg-red-500 px-4 py-1 text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
          {error?.message || "Unknown error"}
        </h1>
        <Button
          onClick={reset}
          className={"ml-auto h-14 w-fit px-8 text-xl"}
          size={"lg"}
        >
          Retry Request
        </Button>
      </section>
    </div>
  );
}
