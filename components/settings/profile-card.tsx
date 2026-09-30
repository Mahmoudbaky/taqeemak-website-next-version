"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { PlusIcon } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { displayName } from "@/components/layout/user-menu";
import { queryKeys } from "@/hooks/query-keys";
import { useUpload } from "@/hooks/use-support";
import { useI18n } from "@/i18n/dictionary-provider";
import { MediaType } from "@/services/upload.service";
import type { Customer } from "@/types/api";
import { EditProfileDialog, VerifyDialog, type VerifyTarget } from "./profile-dialogs";

const ACCEPTED_IMAGES = "image/jpeg,image/png,image/webp";

function InfoRow({ label, value, badge, ltr }: { label: string; value: string; badge?: React.ReactNode; ltr?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-muted-foreground">{label}</span>
      <span dir={ltr ? "ltr" : undefined} className="truncate font-semibold">
        {value || "—"}
      </span>
      {badge ?? <span />}
    </div>
  );
}

function VerifyBadge({ verified, onVerify }: { verified: boolean; onVerify: () => void }) {
  const { dict } = useI18n();
  if (verified) {
    return (
      <span className="rounded-full bg-success-soft px-2.5 py-0.5 text-xs font-bold text-success">
        {dict.account.verified}
      </span>
    );
  }
  return (
    <button
      type="button"
      onClick={onVerify}
      className="rounded-full border border-primary px-2.5 py-0.5 text-xs font-bold whitespace-nowrap text-link hover:bg-soft"
    >
      {dict.account.verify}
    </button>
  );
}

export function ProfileCard({ user }: { user: Customer }) {
  const { dict, locale } = useI18n();
  const { account } = dict;
  const queryClient = useQueryClient();
  const fileInput = useRef<HTMLInputElement>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [verifyTarget, setVerifyTarget] = useState<VerifyTarget | null>(null);
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const upload = useUpload({ customerId: user.Cu_ID, mediaType: MediaType.USER_PROFILE_IMAGE });

  const photo = uploadedPhoto ?? user.Cu_ProfilePhoto;
  const name = displayName(user, locale);

  const onPhotoSelected = (file?: File) => {
    if (!file) return;
    upload.mutate(file, {
      onSuccess: (data) => {
        setUploadedPhoto(data.secureUrl);
        queryClient.invalidateQueries({ queryKey: queryKeys.currentUser() });
        toast.success(account.photoUpdated);
      },
      onError: (error) => toast.error(error.message),
    });
  };

  const sectionHeader = (title: string) => (
    <div className="flex items-center justify-between">
      <span className="text-sm font-bold text-muted-foreground">{title}</span>
      <button type="button" onClick={() => setEditOpen(true)} className="text-sm font-bold text-link hover:text-deep">
        {account.edit}
      </button>
    </div>
  );

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-8 rounded-3xl border bg-card p-6 sm:p-8">
      <div className="flex items-center gap-4.5">
        <div className="relative flex-none">
          <span className="relative flex size-[84px] items-center justify-center overflow-hidden rounded-full bg-primary text-[32px] font-extrabold text-white">
            {photo ? <Image src={photo} alt="" fill sizes="84px" className="object-cover" /> : name.charAt(0).toUpperCase()}
            {upload.isPending && (
              <span className="absolute inset-0 flex items-center justify-center bg-black/40">
                <Spinner className="size-6 text-white" />
              </span>
            )}
          </span>
          <button
            type="button"
            aria-label={account.uploadPhoto}
            title={account.uploadPhoto}
            disabled={upload.isPending}
            onClick={() => fileInput.current?.click()}
            className="absolute end-0 bottom-0 flex size-7 items-center justify-center rounded-full border bg-card hover:bg-soft"
          >
            <PlusIcon className="size-4" />
          </button>
          <input
            ref={fileInput}
            type="file"
            accept={ACCEPTED_IMAGES}
            className="hidden"
            onChange={(e) => {
              onPhotoSelected(e.target.files?.[0]);
              e.target.value = "";
            }}
          />
        </div>
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="truncate text-[22px] font-extrabold">{name}</span>
          <span className="truncate text-muted-foreground">{user.Cu_EMail}</span>
        </div>
      </div>

      <div className="flex flex-col gap-3.5">
        {sectionHeader(account.personal)}
        <InfoRow
          label={account.phone}
          value={user.Cu_Mobile}
          ltr
          badge={<VerifyBadge verified={user.Cu_MobileConfirm} onVerify={() => setVerifyTarget("mobile")} />}
        />
        <InfoRow label={account.record} value={user.Cu_Record} />
      </div>

      <div className="flex flex-col gap-3.5">
        {sectionHeader(account.loginInfo)}
        <InfoRow
          label={account.email}
          value={user.Cu_EMail}
          badge={<VerifyBadge verified={user.Cu_EMailConfirm} onVerify={() => setVerifyTarget("email")} />}
        />
        <InfoRow label={account.password} value="••••••••" />
      </div>

      <EditProfileDialog open={editOpen} onOpenChange={setEditOpen} user={user} />
      <VerifyDialog target={verifyTarget} onClose={() => setVerifyTarget(null)} user={user} />
    </div>
  );
}

