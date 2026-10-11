import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@taqeemak/ui";

export const UserMenu = () => (
  <div className="flex h-[300px] justify-end">
    <DropdownMenu defaultOpen modal={false}>
      <DropdownMenuTrigger className="flex h-fit items-center gap-2.5 rounded-full border py-1 ps-1 pe-2.5 text-sm font-semibold outline-none hover:bg-soft">
        <span className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">م</span>
        <span className="max-w-32 truncate">محمد</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 rounded-xl p-1.5">
        <DropdownMenuLabel className="font-normal">
          <div className="text-xs text-muted-foreground">مسجل الدخول باسم</div>
          <div className="truncate font-semibold" dir="ltr">mohammed@company.sa</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="py-2.5">إعداداتي</DropdownMenuItem>
        <DropdownMenuItem className="py-2.5">الدعم الفني</DropdownMenuItem>
        <DropdownMenuItem variant="destructive" className="py-2.5">تسجيل الخروج</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);
