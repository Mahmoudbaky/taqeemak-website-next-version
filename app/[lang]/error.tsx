"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LocaleLink } from "@/components/shared/locale-link";
import { StatusPage } from "@/components/shared/status-page";
import { useI18n } from "@/i18n/dictionary-provider";
import errorImage from "@/public/images/error.webp";

export default function ErrorBoundary({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  const { dict } = useI18n();
  const { status } = dict;

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <StatusPage image={errorImage} title={status.errTitle} description={status.errDesc}>
      <Button asChild size="xl" className="rounded-full px-6.5">
        <LocaleLink href="/">{status.goHome}</LocaleLink>
      </Button>
      <Button variant="outline" size="xl" className="rounded-full px-6.5" onClick={retry}>
        {status.refresh}
      </Button>
    </StatusPage>
  );
}
