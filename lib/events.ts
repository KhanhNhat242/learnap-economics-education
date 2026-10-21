import type { CourseId } from '@/data/courses'

/** Sự kiện trình duyệt: thẻ khóa học → form tư vấn chọn sẵn khóa học tương ứng */
export const SELECT_COURSE_EVENT = 'learnap:select-course'

export function selectCourse(courseId: CourseId) {
  window.dispatchEvent(new CustomEvent<CourseId>(SELECT_COURSE_EVENT, { detail: courseId }))
}
