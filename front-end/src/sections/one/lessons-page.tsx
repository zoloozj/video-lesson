'use client';

import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

import { BaseUrlTypes, endpoints, getBaseUrl } from 'src/utils/axios';
import { Lesson } from './type';
import { Typography, Dialog, DialogTitle, IconButton, Stack, Box } from '@mui/material';
import CreateEditLessonForm from './form/create-edit-lesson';
import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import SingleLessonPage from './single-lesson';

interface Props {
  id: string;
  show: any;
  handleClose: any;
  isMine: boolean;
}

export default function LessonsPage({ id, show, handleClose, isMine }: Props) {
  const [lesson, setLesson] = useState<Lesson[]>([]);
  const [videoIndex, setIndex] = useState(0);

  const getLessonList = useCallback(async () => {
    try {
      const res = await axios.get(
        `/api/post?url=${getBaseUrl(
          BaseUrlTypes.ENUM_HOST_BASE_URI
        )}${endpoints.lesson.get_lesson_by_courseID(id)}`
      );
      if (res.status === 200) {
        if (res.data.status === 200) setLesson(res.data.data);
        else setLesson([]);
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
        {lesson.length > 0 ? (
          lesson.map((x, index) => (
            <SingleLessonPage
              index={index}
              videoIndex={videoIndex}
              setIndex={setIndex}
              isMine={isMine}
              getList={getLessonList}
              courseId={Number(id)}
              lesson={x}
            />
          ))
        ) : (
          <Typography variant="caption" color="text.secondary">
            Энэ курсд хичээл байхгүй байна!
          </Typography>
        )}
      </section>
      <Dialog fullWidth maxWidth="sm" open={show.value} onClose={handleClose}>
        <DialogTitle>Хичээл нэмэх</DialogTitle>
        <CreateEditLessonForm
          onClose={show.onFalse}
          getList={getLessonList}
          courseId={Number(id)}
        />
      </Dialog>
    </div>
  );
}
