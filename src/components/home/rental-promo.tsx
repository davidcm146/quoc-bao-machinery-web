import Link from "next/link"
import { CalendarClockIcon, CheckCircle2Icon, WrenchIcon, TruckIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ImagePlaceholder } from "@/components/shared/image-placeholder"

const benefits = [
  { icon: CalendarClockIcon, text: "Thuê ngắn hạn hoặc theo tiến độ công trình" },
  { icon: TruckIcon, text: "Giao nhận, lắp đặt tận nơi" },
  { icon: WrenchIcon, text: "Kỹ thuật hỗ trợ vận hành trong suốt thời gian thuê" },
  { icon: CheckCircle2Icon, text: "Máy được bảo dưỡng, kiểm tra trước khi bàn giao" },
]

export function RentalPromo() {
  return (
    <section aria-labelledby="rental-title" className="container-page py-14 md:py-20">
      <div data-reveal className="grid overflow-hidden rounded-2xl border bg-card lg:grid-cols-2">
        <ImagePlaceholder
          label="Ảnh máy cho thuê tại công trình"
          className="order-last min-h-64 rounded-none lg:order-first lg:min-h-full"
        />
        <div className="flex flex-col gap-5 p-6 md:p-10">
          <p className="text-sm font-semibold tracking-wide text-primary uppercase">Dịch vụ cho thuê máy</p>
          <h2 id="rental-title" className="text-2xl font-bold md:text-3xl">
            Cần máy ép bùn ngay mà chưa muốn đầu tư?
          </h2>
          <p className="text-muted-foreground">
            Thuê máy ép bùn và thiết bị đi kèm cho giai đoạn nạo vét, sự cố hệ thống hoặc công trình ngắn hạn.
            Giá thuê linh hoạt theo thời gian sử dụng.
          </p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {benefits.map(({ icon: Icon, text }) => (
              <li key={text} className="flex gap-3 text-sm">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-accent text-primary">
                  <Icon className="size-4" aria-hidden />
                </span>
                <span className="pt-1.5">{text}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild size="lg" className="h-11 px-5">
              <Link href="/cho-thue-may">Xem máy cho thuê</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-11 px-5">
              <Link href="/cho-thue-may#yeu-cau-thue">Gửi yêu cầu thuê</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
