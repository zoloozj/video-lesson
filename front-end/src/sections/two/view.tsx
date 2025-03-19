'use client';

import axios from 'axios';
import Container from '@mui/material/Container';

import { useAuthContext } from 'src/auth/hooks';
import { useSnackbar } from 'src/components/snackbar';
import { useCallback, useEffect, useState } from 'react';
import { useSettingsContext } from 'src/components/settings';
import { BaseUrlTypes, endpoints, getBaseUrl } from 'src/utils/axios';
import { Course } from '../one/type';
import SingleCourse from '../one/_components/course';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs.tsx';
import { Button, Dialog, DialogContent, DialogProps, DialogTitle } from '@mui/material';
import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import CreateEditCourseForm from './form/create-edit-course';

// ----------------------------------------------------------------------

export default function TwoView() {
  const settings = useSettingsContext();
  const { user } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const [courses, setCourse] = useState<Course[]>([]);

  const getList = useCallback(async () => {
    try {
      const res = await axios.post('/api/post', {
        serviceUrl: getBaseUrl(BaseUrlTypes.ENUM_HOST_BASE_URI) + endpoints.course.get_by_userEmail,
        userEmail: user?.email,
      });
      if (res.status === 200 && res.data) {
        setCourse(res.data);
      }
    } catch (error) {
      enqueueSnackbar(error.response.data.error.message, { variant: 'error' });
    }
  }, [user, enqueueSnackbar]);

  useEffect(() => {
    getList();
  }, [getList]);

  const show = useBoolean(false);

  const handleClose: DialogProps['onClose'] = (event, reason) => {
    if (reason && reason === 'backdropClick') return;

    show.onFalse();
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="Миний сургалтууд"
        links={[{ name: '' }]}
        action={
          <Button
            variant="outlined"
            size="large"
            endIcon={<Iconify icon="solar:add-circle-linear" />}
            onClick={show.onTrue}
          >
            Сургалт нэмэх
          </Button>
        }
      />
      <div className="cards-container">
        {courses.length > 0 &&
          courses.map((course) => <SingleCourse key={course.id} course={course} />)}
      </div>
      <Dialog fullWidth open={show.value} onClose={handleClose}>
        <DialogTitle>Сургалт нэмэх</DialogTitle>
        <DialogContent>
          <CreateEditCourseForm getList={getList} onClose={show.onFalse} />
        </DialogContent>
      </Dialog>
    </Container>
  );
}
