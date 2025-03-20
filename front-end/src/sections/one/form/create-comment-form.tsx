'use client';

import axios from 'axios';
import * as Yup from 'yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Stack, Button } from '@mui/material';

import { endpoints, getBaseUrl, BaseUrlTypes } from 'src/utils/axios';

import { useAuthContext } from 'src/auth/hooks';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

interface Props {
  courseId: number;
  getComments: () => Promise<void>;
}

export default function CommentForm({ courseId, getComments }: Props) {
  const { object, string } = Yup;
  const { user } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();

  const formSchema = object().shape({
    comment: string().required(),
  });

  const defaultValues = useMemo(
    () => ({
      comment: '',
    }),
    []
  );

  const method = useForm({
    resolver: yupResolver(formSchema),
    defaultValues,
  });

  const { handleSubmit } = method;

  const onSumbit = handleSubmit(async (data) => {
    const finalValue = {
      ...data,
      courseId,
      userEmail: user?.email,
    };
    try {
      const res = await axios.post('/api/post', {
        ...finalValue,
        serviceUrl: `${getBaseUrl(BaseUrlTypes.ENUM_HOST_BASE_URI)}${
          endpoints.comment.create_comment
        }`,
      });
      if (res.status === 200) {
        getComments();
        method.reset();
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  });

  return (
    <FormProvider methods={method} onSubmit={onSumbit}>
      <RHFTextField rows={2} multiline name="comment" placeholder="Сэтгэгдэл..." />
      <Stack width={1} direction="row" justifyContent="end">
        <Button type="submit" variant="soft" sx={{ mt: 1 }}>
          Хадгалах
        </Button>
      </Stack>
    </FormProvider>
  );
}
