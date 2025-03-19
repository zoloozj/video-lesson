'use client';

import axios from 'axios';
import * as Yup from 'yup';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Stack, Button } from '@mui/material';

import { endpoints, getBaseUrl, BaseUrlTypes } from 'src/utils/axios';

import { useSnackbar } from 'src/components/snackbar';
import { RHFSwitch, RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';

import { Lesson } from '../type';
import { useAuthContext } from 'src/auth/hooks';

interface Props {
  editD?: Lesson;
  getList: () => Promise<void>;
  onClose: () => void;
  courseId: number;
}

export default function CreateEditLessonForm({ editD, getList, onClose, courseId }: Props) {
  const { object, string, number, boolean } = Yup;
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuthContext();

  const formSchema = object({
    name: string().required('Талбарыг бөглөнө үү!'),
    videoUrl: string().required('Талбарыг бөглөнө үү!'),
    lessonOrder: number().required('Талбарыг бөглөнө үү!'),
    isFree: boolean().required('Заавал бөглөх талбар!'),
  });

  const defaultValues = useMemo(
    () => ({
      name: editD?.name || '',
      videoUrl: editD?.videoUrl || '',
      lessonOrder: editD?.lessonOrder || 0,
      isFree: editD?.isFree || false,
    }),
    [editD]
  );

  const form = useForm({ resolver: yupResolver(formSchema), defaultValues });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSumbit = handleSubmit(async (data) => {
    try {
      const finalValue = {
        ...data,
        courseId,
        userEmail: user?.email,
      };
      //   CREATE
      if (!editD) {
        const res = await axios.post('/api/post', {
          serviceUrl: `${getBaseUrl(BaseUrlTypes.ENUM_HOST_BASE_URI)}${
            endpoints.lesson.create_lesson
          }`,
          ...finalValue,
        });
        if (res.status === 200) {
          enqueueSnackbar('Амжилттай хадгаллаа!', { variant: 'success' });
          getList();
          onClose();
        }
      } else {
        const res = await axios.put('/api/post', {
          serviceUrl: `${getBaseUrl(BaseUrlTypes.ENUM_HOST_BASE_URI)}${endpoints.lesson.edit_lesson(
            editD.id
          )}`,
          ...finalValue,
        });
        if (res.status === 200) {
          enqueueSnackbar('Амжилттай хадгаллаа!', { variant: 'success' });
          getList();
          onClose();
        }
      }
    } catch (error) {
      enqueueSnackbar('Алдаа гарлаа та дахин оролдоно уу!', { variant: 'error' });
    }
  });
  return (
    <Box sx={{ p: 2 }}>
      <FormProvider methods={form} onSubmit={onSumbit}>
        <Box gap={2} display="flex" flexDirection="column" sx={{ mb: 2 }}>
          <RHFTextField label="Хичээлийн нэр" name="name" />
          <RHFTextField label="Видео URL" name="videoUrl" />
          <RHFTextField label="Хичээлийн дугаар" name="lessonOrder" type="number" />
          <RHFSwitch label="Үнэгүй эсэх?" name="isFree" />
        </Box>
        <Stack direction="row" width={1} justifyContent="end" gap={2}>
          <LoadingButton
            loading={isSubmitting}
            variant="outlined"
            size="large"
            type="submit"
            sx={{ color: '#3B68B2', border: '1px solid var(--Primary-600, #3B68B2)' }}
          >
            Хадгалах
          </LoadingButton>
          <Button onClick={onClose} variant="outlined" size="large">
            Гарах
          </Button>
        </Stack>
      </FormProvider>
    </Box>
  );
}
