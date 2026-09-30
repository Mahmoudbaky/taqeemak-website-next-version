import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export type Column<T> = { header: string; cell: (row: T) => React.ReactNode; className?: string };

type Props<T> = {
  columns: Column<T>[];
  rows: T[] | undefined;
  rowKey: (row: T) => React.Key;
  isPending: boolean;
  isError: boolean;
  onRetry: () => void;
  emptyLabel: string;
  errorLabel: string;
  retryLabel: string;
  onRowClick?: (row: T) => void;
};

export function DataTable<T>({ columns, rows, rowKey, isPending, isError, onRetry, emptyLabel, errorLabel, retryLabel, onRowClick }: Props<T>) {
  if (isError || (!isPending && !rows?.length)) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-[20px] border bg-card p-12 text-center text-muted-foreground">
        {isError ? errorLabel : emptyLabel}
        {isError && (
          <Button variant="outline" onClick={onRetry}>
            {retryLabel}
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[20px] border bg-card">
      <Table className="min-w-[760px]">
        <TableHeader>
          <TableRow className="bg-background hover:bg-background">
            {columns.map((col) => (
              <TableHead key={col.header} className="h-auto px-6 py-3.5 text-start text-[13px] font-bold text-muted-foreground">
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending
            ? Array.from({ length: 3 }, (_, i) => (
                <TableRow key={i}>
                  {columns.map((col) => (
                    <TableCell key={col.header} className="px-6 py-4.5">
                      <Skeleton className="h-5 w-24" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : rows!.map((row) => (
                <TableRow
                  key={rowKey(row)}
                  onClick={onRowClick && (() => onRowClick(row))}
                  className={cn("hover:bg-background", onRowClick && "cursor-pointer")}
                >
                  {columns.map((col) => (
                    <TableCell key={col.header} className={cn("px-6 py-4.5 text-[15px]", col.className)}>
                      {col.cell(row)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}
