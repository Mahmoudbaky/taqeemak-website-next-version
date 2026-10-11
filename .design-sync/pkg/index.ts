// Design-sync entry: the presentational subset of the website's components.
// Data-bound pieces (auth/checkout/settings views, navbar) are deliberately
// left out - they need the API, react-query, and the Next router.
export * from "../../components/ui/avatar";
export * from "../../components/ui/badge";
export * from "../../components/ui/button";
export * from "../../components/ui/calendar";
export * from "../../components/ui/card";
export * from "../../components/ui/dialog";
export * from "../../components/ui/direction";
export * from "../../components/ui/dropdown-menu";
export * from "../../components/ui/field";
export * from "../../components/ui/input-otp";
export * from "../../components/ui/input";
export * from "../../components/ui/label";
export * from "../../components/ui/popover";
export * from "../../components/ui/separator";
export * from "../../components/ui/sheet";
export * from "../../components/ui/skeleton";
export * from "../../components/ui/sonner";
export { toast } from "sonner";
export * from "../../components/ui/spinner";
export * from "../../components/ui/table";
export * from "../../components/ui/tabs";
export * from "../../components/ui/textarea";
export * from "../../components/ui/toggle-group";
export * from "../../components/ui/toggle";

export { CheckBadge } from "../../components/shared/check-badge";
export { KioskRating } from "../../components/shared/kiosk-rating";
export { Logo, LogoChip } from "../../components/shared/logo";
export { Reveal } from "../../components/shared/reveal";
export { PasswordInput } from "../../components/forms/password-input";
export { PhoneInput } from "../../components/forms/phone-input";
export { StatusBadge } from "../../components/settings/status-badge";
export { DataTable } from "../../components/settings/data-table";
export { HeroKiosk } from "../../components/home/hero-kiosk";
export { AuthShell } from "../../components/auth/auth-shell";
export { DatePicker } from "../../components/checkout/date-picker";
export { ThemeToggle } from "../../components/layout/theme-toggle";

export { TaqeemakProvider } from "./layout/provider";
