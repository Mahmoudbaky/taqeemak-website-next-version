import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from "@taqeemak/ui";

export const Sizes = () => (
  <div className="flex items-center gap-3">
    <Avatar size="sm"><AvatarFallback>م</AvatarFallback></Avatar>
    <Avatar><AvatarFallback>سع</AvatarFallback></Avatar>
    <Avatar size="lg"><AvatarFallback className="bg-primary font-bold text-white">م</AvatarFallback></Avatar>
  </div>
);

export const Group = () => (
  <AvatarGroup>
    <Avatar><AvatarFallback>م</AvatarFallback></Avatar>
    <Avatar><AvatarFallback>ع</AvatarFallback></Avatar>
    <Avatar><AvatarFallback>ر</AvatarFallback></Avatar>
    <AvatarGroupCount>+4</AvatarGroupCount>
  </AvatarGroup>
);
