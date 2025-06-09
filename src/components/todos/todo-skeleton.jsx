import { Skeleton } from "../ui/skeleton";

export default function TodoSkeleton() {
  return (
    <ul className="mx-auto flex size-full max-w-lg flex-col justify-center divide-y overflow-y-auto">
      {[1, 2, 3, 4, 5, 6, 7].map((item) => (
        <li
          key={item}
          className="grid grid-cols-[1.25rem_minmax(10rem,_1fr)_1.125rem] items-center gap-x-4 gap-y-2 px-2 py-5 lg:grid-cols-[1.25rem_minmax(15rem,_1fr)_minmax(8rem,_12rem)_2rem]"
        >
          <Skeleton className={"size-5 bg-neutral-200 max-lg:-mb-1"} />
          <Skeleton className={"h-[1.125rem] bg-neutral-200"} />
          <Skeleton
            className={
              "h-4 bg-neutral-200 max-lg:col-start-2 max-lg:row-start-2"
            }
          />
          <Skeleton className={"h-4 bg-neutral-200"} />
          <Skeleton
            className={
              "ml-px size-4 bg-neutral-200 max-lg:col-start-3 lg:hidden"
            }
          />
        </li>
      ))}
    </ul>
  );
}
