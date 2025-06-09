import { Link } from "@tanstack/react-router";

import { Button } from "../ui/button";

export default function NotFound() {
  return (
    <section className="flex size-full flex-col justify-between">
      <hgroup className="text-xl leading-[150%] md:text-2xl lg:text-3xl">
        <h3>Opps!</h3>
        <h2>You sure you&apos;re meant to be here?</h2>
      </hgroup>

      <h1 className="bg-avocado-500 mx-auto px-4 py-1 text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
        This page doesn&apos;t exist!
      </h1>

      <div className="ml-auto flex flex-col items-end space-y-2 lg:mb-10 lg:space-y-4">
        <p className="text-lg md:text-xl lg:text-2xl">
          Don&apos;t worry, We all get lost sometimes
        </p>

        <Button asChild className={"px-6"}>
          <Link to={"/"}>Let&apos;s go Home</Link>
        </Button>
      </div>
    </section>
  );
}
