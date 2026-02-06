import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const ProfileAvatar = ({
  photo,
  name,
  className,
}: {
  photo: string;
  name: string;
  className?: string;
}) => {
  return (
    <Avatar className={cn("h-8 w-8 rounded-lg", className)}>
      <AvatarImage src={photo} className="rounded-lg" />
      <AvatarFallback className="rounded-lg">{name.charAt(0)}</AvatarFallback>
    </Avatar>
  );
};

export default ProfileAvatar;
