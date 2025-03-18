export type Course = {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  imgUrl: string;
  userEmail: string;
  price: number;
  realPrice: number;
};

export type Lesson = {
  id: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  name: string;
  videoUrl: string;
  userEmail: string;
  lessonOrder: number;
  isFree: boolean;
  courseId: number;
  courseName: string;
};
