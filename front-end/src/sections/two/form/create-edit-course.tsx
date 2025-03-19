'use client';

import axios from 'axios';
import * as Yup from 'yup';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Stack, Button } from '@mui/material';

import { endpoints, getBaseUrl, BaseUrlTypes } from 'src/utils/axios';

import { useAuthContext } from 'src/auth/hooks';

import { useSnackbar } from 'src/components/snackbar';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';

import { Course } from 'src/sections/one/type';

interface Props {
  editD?: Course;
  getList: () => Promise<void>;
  onClose: () => void;
}

export default function CreateEditCourseForm({ editD, getList, onClose }: Props) {
  const { object, string, number } = Yup;
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuthContext();

  const formSchema = object({
    name: string().required('Талбарыг бөглөнө үү!'),
    imgUrl: string().required('Талбарыг бөглөнө үү!'),
    price: number().required('Талбарыг бөглөнө үү!'),
    realPrice: number().required('Талбарыг бөглөнө үү!'),
  });

  const defaultValues = useMemo(
    () => ({
      name: editD?.name || '',
      imgUrl: editD?.imgUrl || '',
      price: editD?.price || 0,
      realPrice: editD?.realPrice || 0,
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
        userEmail: user?.email,
      };
      //   CREATE
      if (!editD) {
        const res = await axios.post('/api/post', {
          serviceUrl: `${getBaseUrl(BaseUrlTypes.ENUM_HOST_BASE_URI)}${
            endpoints.course.create_course
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
          serviceUrl: `${getBaseUrl(BaseUrlTypes.ENUM_HOST_BASE_URI)}${endpoints.course.edit_course(
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
          <RHFTextField label="Сургалтын нэр" name="name" />
          <RHFTextField label="Зураг URL" name="imgUrl" />
          <RHFTextField label="Төлбөр" name="price" type="number" />
          <RHFTextField label="Хямдарсан үнэ" name="realPrice" type="number" />
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
