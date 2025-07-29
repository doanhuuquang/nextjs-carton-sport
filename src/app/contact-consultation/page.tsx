import ContactForm from "@/components/shared/contact-form";
import { getBlogOwnerInfo } from "@/lib/sanity-utils";
import { Mail, MapPin, PhoneCall } from "lucide-react";

export default async function ContactConsultationPage() {
  const blogOwnerInfo = await getBlogOwnerInfo();

  return (
    <main className="w-full h-full my-5">
      <div className="w-full bg-background rounded-md max-w-7xl h-full m-auto grid lg:grid-cols-7 grid-cols-1 gap-10 overflow-hidden p-3">
        <div className="col-span-3 w-full h-full flex flex-col justify-between gap-10">
          <div className="space-y-3">
            <p className="text-3xl font-black">Thông tin liên hệ</p>
            <p className="opacity-75">
              Nói gì đó để bắt đầu cuộc trò chuyện nhé!
            </p>
          </div>

          <div className="space-y-5">
            <div className="flex gap-5">
              <PhoneCall size={20} />
              <p>{blogOwnerInfo.phone}</p>
            </div>
            <div className="flex gap-5">
              <Mail size={20} />
              <p>{blogOwnerInfo.email}</p>
            </div>
            <div className="flex gap-5">
              <MapPin size={20} />
              <p>{blogOwnerInfo.address}</p>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </main>
  );
}
