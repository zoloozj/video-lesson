import CourseDetailPage from 'src/sections/one/course-detail-page';

interface Props {
  params: { id: string };
}

export default function CourseDetail({ params: { id } }: Props) {
  return <CourseDetailPage id={id} />;
}
