import { SectionHeading } from "@/components/shared/section-heading"
import { revealDelay } from "@/lib/reveal"

const steps = [
  { title: "Khảo sát", text: "Kỹ sư khảo sát hiện trạng, lấy mẫu và đo lưu lượng bùn." },
  { title: "Tư vấn & báo giá", text: "Đề xuất dòng máy, công suất phù hợp và báo giá trong ngày." },
  { title: "Lắp đặt & chạy thử", text: "Lắp đặt, căn chỉnh hóa chất, chạy thử và đào tạo vận hành." },
  { title: "Bảo hành & bảo trì", text: "Bảo hành, bảo trì định kỳ và cung cấp phụ tùng thay thế." },
]

export function ProcessSteps() {
  return (
    <section aria-labelledby="process-title" className="container-page py-14 md:py-20">
      <SectionHeading
        id="process-title"
        align="center"
        eyebrow="Quy trình làm việc"
        title="Từ khảo sát đến vận hành chỉ trong 4 bước"
      />
      <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li
            key={step.title}
            data-reveal
            style={revealDelay(index, 120)}
            className="relative flex flex-col gap-3"
          >
            {/* connector line between steps on desktop */}
            {index < steps.length - 1 && (
              <span
                aria-hidden
                className="absolute top-6 left-14 hidden h-0.5 w-[calc(100%-3.5rem)] bg-border lg:block"
              />
            )}
            <span className="relative flex size-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground ring-4 ring-accent">
              {index + 1}
            </span>
            <h3 className="text-lg font-bold">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
