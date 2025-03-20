'use client';

import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';

import Container from '@mui/material/Container';
import {
  Stack,
  Button,
  Dialog,
  Typography,
  DialogProps,
  DialogTitle,
  DialogContent,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { endpoints, getBaseUrl, BaseUrlTypes } from 'src/utils/axios';

import { useAuthContext } from 'src/auth/hooks';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';

import { Course } from './type';
import LessonsPage from './lessons-page';
import CommentPage from './_components/comment';
import CreateEditCourseForm from '../two/form/create-edit-course';

interface Props {
  id: string;
}

export default function CourseDetailPage({ id }: Props) {
  const settings = useSettingsContext();
  const { user } = useAuthContext();
  const [course, setCourse] = useState<Course>();

  const getCourse = useCallback(async () => {
    try {
      const res = await axios.get(
        `/api/post?url=${getBaseUrl(
          BaseUrlTypes.ENUM_HOST_BASE_URI
        )}${endpoints.course.get_course_by_id(id)}`
      );
      if (res.status === 200) {
        setCourse(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    getCourse();
  }, [getCourse]);

  const show = useBoolean(false);

  const handleClose: DialogProps['onClose'] = (event, reason) => {
    if (reason && reason === 'backdropClick') return;

    show.onFalse();
  };

  const showEdit = useBoolean(false);

  const handleCloseEdit: DialogProps['onClose'] = (event, reason) => {
    if (reason && reason === 'backdropClick') return;

    showEdit.onFalse();
  };

  const isMine = course?.userEmail === user?.email;

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <main>
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography variant="subtitle1" fontSize={24}>
            {course?.name}
          </Typography>
          {isMine && (
            <Stack direction="row" gap={2}>
              <Button
                variant="outlined"
                size="large"
                endIcon={<Iconify icon="solar:add-circle-linear" />}
                onClick={showEdit.onTrue}
              >
                Сургалт засварлах
              </Button>
              <Button
                variant="outlined"
                size="large"
                endIcon={<Iconify icon="solar:add-circle-linear" />}
                onClick={show.onTrue}
              >
                Хичээл нэмэх
              </Button>
            </Stack>
          )}
        </Stack>
        <LessonsPage id={id} show={show} handleClose={handleClose} isMine={isMine} />
        <Typography variant="subtitle1">Сэтгэгдэл</Typography>
        {course && <CommentPage courseId={course.id} />}
      </main>
      <Dialog fullWidth open={showEdit.value} onClose={handleCloseEdit}>
        <DialogTitle>Сургалт Засварлах</DialogTitle>
        <DialogContent>
          <CreateEditCourseForm editD={course} getList={getCourse} onClose={showEdit.onFalse} />
        </DialogContent>
      </Dialog>
    </Container>
  );
}
