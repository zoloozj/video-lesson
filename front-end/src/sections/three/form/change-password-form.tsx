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
  onClose: () => void;
}

export default function ChangePasswordForm({ onClose }: Props) {
  const { object, string } = Yup;
  const { enqueueSnackbar } = useSnackbar();

  const formSchema = object().shape({
    oldPassword: string().required(),
    newPassword: string().required(),
    newConfirm: string().required(),
  });

  const defaultValues = useMemo(
    () => ({
      oldPassword: '',
      newPassword: '',
      newConfirm: '',
    }),
    []
  );

  const method = useForm({
    resolver: yupResolver(formSchema),
    defaultValues,
  });

  const { handleSubmit, setError } = method;

  const onSumbit = handleSubmit(async (data) => {
    if (data.newPassword !== data.newConfirm) {
      setError('newConfirm', { message: 'Нууц үг таарахгүй байна!' });
      return;
    }
    const { newConfirm, ...finalValue } = data;
    try {
      const res = await axios.post('/api/post', {
        ...finalValue,
        serviceUrl: `${getBaseUrl(BaseUrlTypes.ENUM_HOST_BASE_URI)}${
          endpoints.auth.change__password
        }`,
      });
      if (res.status === 200) {
        method.reset();
        onClose();
        enqueueSnackbar('Амжилттай солигдлоо!', { variant: 'success' });
      }
    } catch (error) {
      enqueueSnackbar(error.response.data.error.detail, { variant: 'error' });
    }
  });
  return (
    <FormProvider methods={method} onSubmit={onSumbit}>
      <RHFTextField name="oldPassword" placeholder="Хуучин нүүг үг" type="password" />
      <RHFTextField name="newPassword" placeholder="Шинэ нууц үг" sx={{ mt: 2 }} type="password" />
      <RHFTextField
        name="newConfirm"
        placeholder="Шинэ нууц үг /Давт/"
        sx={{ mt: 2 }}
        type="password"
      />
      <Stack width={1} direction="row" justifyContent="end">
        <Button type="submit" variant="outlined" sx={{ m: 2 }}>
          Хадгалах
        </Button>
      </Stack>
    </FormProvider>
  );
}
