'use client';

import Container from '@mui/material/Container';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

import { useSettingsContext } from 'src/components/settings';
import { BaseUrlTypes, endpoints, getBaseUrl } from 'src/utils/axios';
import { Lesson } from './type';

interface Props {
  id: string;
}

export default function CourseDetailPage({ id }: Props) {
  const settings = useSettingsContext();
  const [lesson, setLesson] = useState<Lesson[]>([]);
  const [videoIndex, setIndex] = useState(0);

  const getLessonList = useCallback(async () => {
    try {
      const res = await axios.get(
        `/api/post?url=${getBaseUrl(
          BaseUrlTypes.ENUM_HOST_BASE_URI
        )}${endpoints.lesson.get_lesson_by_courseID(id)}`
      );
      if (res.status === 200 && res.data) {
        setLesson(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    getLessonList();
  }, []);

  function getEmbedUrl(url: string) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);

    const videoId = match && match[2].length === 11 ? match[2] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  }

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <main>
        <h1>{lesson[0]?.courseName}</h1>
        <div className="main-bottom">
          <div className="video-container">
            <iframe
              width={800}
              height={400}
              className="video"
              title="Youtube player"
              sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
              src={getEmbedUrl(lesson[videoIndex]?.videoUrl) || ''}
            ></iframe>
          </div>
          <section className="content-container">
            <h2 className="content-title">Хичээлүүд</h2>
            {lesson &&
              lesson.map((x, index) => (
                <div
                  onClick={() => setIndex(index)}
                  key={index}
                  className={`content-list-btn ${index === videoIndex && 'content-active'}`}
                >
                  <i className="far fa-play-circle"></i>
                  <p className="lesson-title">{x.name}</p>
                  <p className="lesson-time">{}</p>
                </div>
              ))}
          </section>
        </div>
      </main>
    </Container>
  );
}
