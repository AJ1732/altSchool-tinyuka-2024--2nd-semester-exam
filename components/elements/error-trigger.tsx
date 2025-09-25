"use client";

import { Button } from "@/components/ui/button";

export default function ErrorTrigger() {
  return (
    <Button
      size={"lg"}
      variant={"outline"}
      onClick={() => {
        throw new Error("This is a test error 🚨");
      }}
    >
      Test Error Page
    </Button>
  );
}
