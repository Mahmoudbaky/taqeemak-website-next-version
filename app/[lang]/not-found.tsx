import { Button } from "@/components/ui/button";
import { LocaleLink } from "@/components/shared/locale-link";
import { StatusPage } from "@/components/shared/status-page";
import { getDictionary } from "@/i18n/dictionaries";
import notFoundImage from "@/public/images/not-found.webp";

export default async function NotFound() {
  const { status } = await getDictionary();
  return (
    <StatusPage image={notFoundImage} title={status.nfTitle} description={status.nfDesc}>
      <Button asChild size="xl" className="rounded-full px-6.5">
        <LocaleLink href="/">{status.goHome}</LocaleLink>
      </Button>
    </StatusPage>
  );
}
