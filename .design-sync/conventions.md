# Taqeemak UI — how to build with it

Taqeemak (تقييمك) is an Arabic-first, RTL marketing + account site for a customer-feedback kiosk product. Components are shadcn/Radix primitives restyled with the brand, plus a few product pieces (KioskRating, HeroKiosk, AuthShell, StatusBadge, DataTable).

## 1. Always wrap in `TaqeemakProvider`

```jsx
const { TaqeemakProvider, Button } = window.Taqeemak;
<TaqeemakProvider>{/* whole screen */}</TaqeemakProvider>
```

- Default is `locale="ar"` → `dir="rtl"`, Arabic copy. Use `locale="en"` for an English/LTR screen. Write UI copy in the matching language.
- It provides the i18n dictionary (PasswordInput, DatePicker, HeroKiosk, ThemeToggle **throw without it**), Radix direction, and sets `<html dir lang>` so portalled Dialog/Sheet/Popover/DropdownMenu content follows RTL.
- `theme="dark"` switches the whole page. For one dark section, put `className="dark"` on a wrapper — the `.dark` tokens apply to its subtree.
- In RTL use logical utilities: `ps-*/pe-*`, `ms-*/me-*`, `start-*/end-*`, `text-start`. Phone numbers, emails and codes go in `dir="ltr"` elements.

## 2. Styling idiom: Tailwind v4 utilities + brand tokens

There are no CSS-module classes. Style layout glue with Tailwind utilities that use these semantic colors (each works with `bg-` / `text-` / `border-`):

| Role | Tokens |
|---|---|
| Surfaces | `background` (page #f6f8fb), `card` (white), `soft` (pale blue tint), `muted`, `navy` (dark hero/footer), `deep` |
| Text | `foreground`, `muted-foreground`, `link`, `navy-muted` (text on navy), `primary-foreground` |
| Brand | `primary` (#0059c4), `highlight` (yellow accent) |
| Status | `success` + `success-soft`, `warn` + `warn-soft`, `destructive` + `danger-soft` |
| Lines | `border`, `input`, `ring` |

Site patterns to copy:
- Content surface: `rounded-[20px] border bg-card p-6`. Hero/auth panels: `rounded-[28px] bg-navy text-white p-12`.
- Page container: `mx-auto max-w-7xl px-4 sm:px-8`.
- Headings are heavy: `text-[22px] font-extrabold`, hero `text-4xl font-extrabold`. Body `text-[15px]`/`text-[17px] text-muted-foreground`.
- Primary actions are `<Button size="xl">` (48px, bold); hero CTAs add `className="rounded-full px-6.5"`. Use `variant="white"` on navy. Variants: `default | outline | secondary | ghost | destructive | link | white`; sizes `xs | sm | default | lg | xl | 2xl | icon | icon-sm | icon-lg`.
- Font is Cairo (`font-sans`), already applied; `font-mono` is IBM Plex Mono.

## 3. Composition

Compound parts are separate exports on `window.Taqeemak`: `Card*`, `Dialog*`, `Sheet*`, `Popover*`, `DropdownMenu*`, `Table*`, `Tabs*`, `Field*` (`FieldGroup`, `FieldLabel`, `FieldDescription`, `FieldError`), `Avatar*`, `InputOTP*`, `ToggleGroupItem`. Forms: `FieldGroup className="gap-5"` > `Field className="gap-2"` > `FieldLabel className="text-sm font-semibold"` + `Input` (46px). Required mark: `<span className="text-destructive">*</span>`. Invalid: `Field data-invalid` + `Input aria-invalid` + `FieldError`. Toasts: render `<Toaster richColors />` once and call `window.Taqeemak.toast.success("…")`. Icons: inline SVG or lucide-style 16px glyphs.

## 4. Where the truth lives

Read `styles.css` (and `_ds_bundle.css`, which holds the compiled site stylesheet with every token under `:root` / `.dark`) before inventing styles, and each component's `<Name>.prompt.md` + `<Name>.d.ts` for API and verified examples.

```jsx
const { TaqeemakProvider, Field, FieldGroup, FieldLabel, Input, Button, StatusBadge } = window.Taqeemak;
<TaqeemakProvider>
  <section className="mx-auto max-w-7xl px-4 py-14 sm:px-8">
    <div className="flex max-w-[560px] flex-col gap-5 rounded-[20px] border bg-card p-6">
      <div className="flex items-center justify-between">
        <span className="text-[22px] font-extrabold">تواصل معنا</span>
        <StatusBadge tone="success">متاح الآن</StatusBadge>
      </div>
      <FieldGroup className="gap-5">
        <Field className="gap-2">
          <FieldLabel htmlFor="name" className="text-sm font-semibold">الاسم</FieldLabel>
          <Input id="name" placeholder="الاسم" />
        </Field>
        <Button size="xl">إرسال</Button>
      </FieldGroup>
    </div>
  </section>
</TaqeemakProvider>
```
