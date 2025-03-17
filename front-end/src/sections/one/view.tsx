'use client';

import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useSettingsContext } from 'src/components/settings';
import { useCallback, useEffect } from 'react';
import axios from 'axios';
import { BaseUrlTypes, endpoints, getBaseUrl } from 'src/utils/axios';

// ----------------------------------------------------------------------

export default function OneView() {
  const settings = useSettingsContext();

  const getList = useCallback(async () => {
    const token = sessionStorage.getItem('accessToken');
    try {
      const res = await axios.get(
        `/api/post?url=${getBaseUrl(BaseUrlTypes.ENUM_HOST_BASE_URI)}${
          endpoints.auth.get_all_users
        }`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (res.status === 200) {
        console.log(res.data);
      }
    } catch (error) {
      // console.error(error);
    }
  }, []);

  useEffect(() => {
    getList();
  }, [getList]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> Бүх сургалтууд </Typography>

      <Box
        sx={{
          mt: 5,
          width: 1,
          height: 320,
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      />
    </Container>
  );
}
