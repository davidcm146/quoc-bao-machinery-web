"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { SendIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { quoteFormSchema, type QuoteFormInput } from "@/features/leads/schema"

/**
 * Quick quote form (proposal §2.8). Validation rules live in features/leads/schema.ts
 * so the future server handler reuses exactly the same schema.
 * TODO(backend): POST to a Route Handler / Server Action that stores the lead
 * and emails the person in charge; add anti-spam and the `submit_quote` event.
 */
export function QuoteForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormInput>({ resolver: zodResolver(quoteFormSchema) })

  const onSubmit = handleSubmit(async () => {
    toast.info("Biểu mẫu chưa được kết nối máy chủ", {
      description: "Giao diện demo – chức năng gửi sẽ được bổ sung ở giai đoạn backend.",
    })
    reset()
  })

  return (
    <form onSubmit={onSubmit} noValidate aria-label="Yêu cầu báo giá nhanh">
      <FieldGroup className="gap-4">
        <Field data-invalid={!!errors.name || undefined}>
          <FieldLabel htmlFor="quote-name">
            Họ tên <span className="text-destructive">*</span>
          </FieldLabel>
          <Input id="quote-name" autoComplete="name" aria-invalid={!!errors.name} {...register("name")} />
          <FieldError errors={[errors.name]} />
        </Field>

        <Field data-invalid={!!errors.phone || undefined}>
          <FieldLabel htmlFor="quote-phone">
            Số điện thoại <span className="text-destructive">*</span>
          </FieldLabel>
          <Input
            id="quote-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
          <FieldError errors={[errors.phone]} />
        </Field>

        <Field>
          <FieldLabel htmlFor="quote-need">Nhu cầu</FieldLabel>
          <Textarea id="quote-need" rows={3} placeholder="Loại máy, lưu lượng bùn…" {...register("need")} />
        </Field>

        <Button type="submit" size="lg" className="h-11 text-base" disabled={isSubmitting}>
          <SendIcon data-icon="inline-start" />
          Gửi yêu cầu
        </Button>
      </FieldGroup>
    </form>
  )
}
