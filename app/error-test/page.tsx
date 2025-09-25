// export default function ErrorTestPage() {
//   throw new Error("Forced error from /error-test 🚨");
// }

"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ErrorTestPage() {
  const [error, setError] = useState(false);

  if (error) {
    throw new Error("Forced error from /error-test 🚨");
  }

  return (
    <Button size={"lg"} variant={"outline"} onClick={() => setError(true)}>
      Trigger Error
    </Button>
  );
}
