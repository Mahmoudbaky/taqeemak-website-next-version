import { KioskRating } from "@taqeemak/ui";

export const Medium = () => (
  <div className="max-w-[340px]"><KioskRating active={4} /></div>
);

export const Small = () => (
  <div className="max-w-[300px]"><KioskRating active={2} size="sm" /></div>
);
