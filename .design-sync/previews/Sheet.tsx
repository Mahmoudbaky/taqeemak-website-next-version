import { Button, Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@taqeemak/ui";

const links = ["الرئيسية", "نبذة عنا", "تواصل معنا", "الدعم الفني"];

export const MobileMenu = () => (
  <Sheet defaultOpen modal={false}>
    <SheetContent side="right" className="w-[300px]">
      <SheetHeader>
        <SheetTitle className="text-lg font-extrabold">القائمة</SheetTitle>
        <SheetDescription>تنقل بين صفحات تقييمك</SheetDescription>
      </SheetHeader>
      <nav className="flex flex-col gap-1 px-4">
        {links.map((l, i) => (
          <a
            key={l}
            href="#"
            className={i === 0 ? "rounded-lg bg-soft px-3 py-2.5 font-bold text-link" : "rounded-lg px-3 py-2.5 font-semibold hover:bg-soft"}
          >
            {l}
          </a>
        ))}
      </nav>
      <SheetFooter>
        <Button size="xl">سجل الان</Button>
        <Button variant="outline" size="xl">تسجيل الدخول</Button>
      </SheetFooter>
    </SheetContent>
  </Sheet>
);
