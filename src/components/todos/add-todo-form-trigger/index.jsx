import { useIsDesktop } from "@/hooks/use-isdesktop";

import { AddTodoFormDialog } from "./add-todo-form-dialog";
import { AddTodoFormDrawer } from "./add-todo-form-drawer";

export default function AddTodoFormTrigger({ children }) {
  const isDesktop = useIsDesktop(768);

  return isDesktop ? (
    <AddTodoFormDialog>{children}</AddTodoFormDialog>
  ) : (
    <AddTodoFormDrawer>{children}</AddTodoFormDrawer>
  );
}
