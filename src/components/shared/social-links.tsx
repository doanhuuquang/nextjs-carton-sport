import { getSocialMedias } from "@/lib/sanity-utils";
import { cn } from "@/lib/utils";
import { SocialMedia } from "@/types/social-media";
import Image from "next/image";
import Link from "next/link";

export default async function SocialLinks({
  className,
}: {
  className?: string;
}) {
  const socialMedias: SocialMedia[] = await getSocialMedias();

  return (
    <div className={cn("flex gap-3 items-center", className)}>
      {socialMedias.map((socialMedia) => {
        return (
          <Link
            key={socialMedia.url}
            href={socialMedia.url}
            className="w-fit h-fit"
          >
            <Image
              src={socialMedia.icon}
              alt={`${socialMedia.platform} icon`}
              width={25}
              height={25}
            />
          </Link>
        );
      })}
    </div>
  );
}
