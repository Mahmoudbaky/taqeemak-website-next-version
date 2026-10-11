import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@taqeemak/ui";

export const VerificationCode = () => (
  <div dir="ltr" className="flex justify-center">
    <InputOTP maxLength={6} defaultValue="4821">
      <InputOTPGroup>
        {Array.from({ length: 6 }, (_, i) => (
          <InputOTPSlot key={i} index={i} className="size-12 text-lg" />
        ))}
      </InputOTPGroup>
    </InputOTP>
  </div>
);

export const Grouped = () => (
  <div dir="ltr" className="flex justify-center">
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  </div>
);
