import { siteConfig } from "@/config/site";
import { getDictionary } from "@/i18n/dictionaries";
import { LocaleLink } from "@/components/shared/locale-link";
import { LogoChip } from "@/components/shared/logo";

export async function Footer() {
  const { nav, common } = await getDictionary();
  const links = [
    { href: "/", label: nav.home },
    { href: "/about-us", label: nav.about },
    { href: "/contact-us", label: nav.contact },
    { href: "/support", label: nav.support },
    { href: "/privacy-policy", label: nav.privacy },
  ];

  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 pt-14 pb-7 sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-10">
          <div className="flex max-w-[340px] flex-col gap-3.5">
            <LogoChip />
            <p className="text-[15px] leading-[1.7] text-navy-muted">{common.tagline}</p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-[15px] font-semibold">
            {links.map((link) => (
              <LocaleLink key={link.href} href={link.href} className="text-white hover:text-white/80">
                {link.label}
              </LocaleLink>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-4 border-t border-white/12 pt-5 text-sm text-navy-muted">
          <span>{common.rights}</span>
          <div className="flex flex-wrap gap-5">
            <a href={`mailto:${siteConfig.email}`} className="text-navy-muted hover:text-white">
              {siteConfig.email}
            </a>
            {siteConfig.social.map((s) => (
              <a key={s.label} href={s.href} className="text-navy-muted hover:text-white">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
