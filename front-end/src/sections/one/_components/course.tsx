'use client';

import { Course } from '../type';

interface Props {
  course: Course;
}

export default function SingleCourse({ course }: Props) {
  return (
    <div className="cards-container">
      <div className="card-container">
        <a href={`course/${course.id}`}>
          <img src={course.imgUrl} alt={'Course'} className="card-image" />
          <h2 className="card-title">{course.name}</h2>
          <small className="card-teacher">{course.userEmail}</small>
          <div className="card-rating-container">
            <span>&#11088; 4.5</span>
            <span>(12,072)</span>
          </div>
          <div className="card-price">
            <span>₮{course.realPrice.toLocaleString()}</span>
            <small>₮{course.price.toLocaleString()}</small>
          </div>
          <small className="card-best">Best seller</small>
        </a>
      </div>
    </div>
  );
}
