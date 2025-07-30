import ContactForm from "@/components/shared/contact-form";
import { getShopInfo } from "@/lib/sanity-utils";
import { Mail, MapPin, PhoneCall } from "lucide-react";

export default async function ContactConsultationPage() {
  const shopInfo = await getShopInfo();

  return (
    <main className="w-full h-full my-5">
      <div className="w-full bg-background rounded-md max-w-7xl h-full m-auto grid lg:grid-cols-7 grid-cols-1 gap-10 overflow-hidden p-3">
        <div className="col-span-3 w-full h-full flex flex-col justify-between gap-10">
          <div className="space-y-3">
            <p className="text-3xl font-black">Thông tin liên hệ</p>
            <p className="opacity-75">Chúng tôi luôn sẵn sàng lắng nghe bạn!</p>
          </div>

          <div className="space-y-5">
            <div className="flex gap-5">
              <PhoneCall size={20} />
              <p>{shopInfo.phone}</p>
            </div>
            <div className="flex gap-5">
              <Mail size={20} />
              <p>{shopInfo.email}</p>
            </div>
            <div className="flex gap-5">
              <MapPin size={20} />
              <p>{shopInfo.address}</p>
            </div>
          </div>
        </div>

        <ContactForm shopEmail={shopInfo.email} />
      </div>
    </main>
  );
}
