'use client'

import { useEffect, useRef, useState } from 'react'
import { Form, Input, Select } from 'antd'
import { CheckCircleFilled } from '@ant-design/icons'
import type { Dictionary } from '@/dictionaries'
import type { CourseId } from '@/data/courses'
import { SELECT_COURSE_EVENT } from '@/lib/events'
import { buttonClass } from '@/components/ui/Button'

interface ConsultValues {
  name: string
  phone: string
  role: string
  course: CourseId
}

interface ConsultFormProps {
  text: Dictionary['consult']['form']
  courseOptions: { value: CourseId; label: string }[]
}

/** Chấp nhận số VN lẫn quốc tế: chỉ chữ số, khoảng trắng, + ( ) . -  và 8–15 chữ số */
const PHONE_PATTERN = /^\+?[\d\s().-]+$/
const isValidPhone = (value: string) => {
  const digits = value.replace(/\D/g, '').length
  return PHONE_PATTERN.test(value.trim()) && digits >= 8 && digits <= 15
}

/**
 * Form đăng ký tư vấn 4 trường. Bản demo (docs/REQUIREMENTS.md mục 7.3): chỉ validate rồi hiện thông báo thành công,
 * KHÔNG gửi dữ liệu đi đâu. Nghe sự kiện SELECT_COURSE_EVENT để chọn sẵn khóa học từ thẻ khóa học.
 */
export default function ConsultForm({ text, courseOptions }: ConsultFormProps) {
  const [form] = Form.useForm<ConsultValues>()
  const [submitted, setSubmitted] = useState(false)
  const successRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onSelect = (event: Event) => {
      const courseId = (event as CustomEvent<CourseId>).detail
      setSubmitted(false)
      form.setFieldValue('course', courseId)
    }
    window.addEventListener(SELECT_COURSE_EVENT, onSelect)
    return () => window.removeEventListener(SELECT_COURSE_EVENT, onSelect)
  }, [form])

  // Đưa focus tới thông báo thành công để trình đọc màn hình đọc ngay
  useEffect(() => {
    if (submitted) successRef.current?.focus()
  }, [submitted])

  const reset = () => {
    form.resetFields()
    setSubmitted(false)
  }

  return (
    <div className="rounded-3xl bg-white p-6 text-navy-900 shadow-2xl shadow-black/30 sm:p-8">
      {submitted && (
        <div ref={successRef} tabIndex={-1} role="status" className="py-6 text-center outline-none">
          <CheckCircleFilled aria-hidden className="text-5xl text-brand-teal-dark" />
          <p className="mt-5 font-serif text-2xl font-semibold">{text.successTitle}</p>
          <p className="mt-3 leading-relaxed text-navy-600">{text.successText}</p>
          <p className="mt-4 inline-block rounded-full bg-gold-50 px-3 py-1 text-xs font-medium text-navy-700 ring-1 ring-gold-300">
            {text.demoNote}
          </p>
          <div className="mt-8">
            <button type="button" onClick={reset} className={buttonClass('outline-dark', 'md')}>
              {text.again}
            </button>
          </div>
        </div>
      )}

      {/* Form luôn mount (chỉ ẩn) để sự kiện chọn khóa học vẫn set được giá trị khi đang ở màn thành công */}
      <div hidden={submitted}>
        <p className="font-serif text-2xl font-semibold">{text.title}</p>
        <Form<ConsultValues>
          form={form}
          layout="vertical"
          requiredMark={false}
          onFinish={() => setSubmitted(true)}
          className="mt-6"
        >
          <Form.Item
            name="name"
            label={text.nameLabel}
            rules={[{ required: true, whitespace: true, message: text.nameRequired }]}
          >
            <Input placeholder={text.namePlaceholder} autoComplete="name" maxLength={80} />
          </Form.Item>

          <Form.Item
            name="phone"
            label={text.phoneLabel}
            rules={[
              { required: true, whitespace: true, message: text.phoneRequired },
              {
                validator: (_, value?: string) =>
                  !value || !value.trim() || isValidPhone(value)
                    ? Promise.resolve()
                    : Promise.reject(new Error(text.phoneInvalid)),
              },
            ]}
          >
            <Input placeholder={text.phonePlaceholder} autoComplete="tel" inputMode="tel" maxLength={24} />
          </Form.Item>

          <Form.Item name="course" label={text.courseLabel} rules={[{ required: true, message: text.courseRequired }]}>
            <Select placeholder={text.coursePlaceholder} options={courseOptions} />
          </Form.Item>

          <button type="submit" className={buttonClass('gold', 'lg', 'mt-2 w-full whitespace-normal text-center')}>
            {text.submit}
          </button>
        </Form>
      </div>
    </div>
  )
}
