'use client';

import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';

import { Box, Stack, Typography } from '@mui/material';

import { endpoints, getBaseUrl, BaseUrlTypes } from 'src/utils/axios';

import { useSnackbar } from 'src/components/snackbar';

import { Comment } from '../type';
import CommentForm from '../form/create-comment-form';

interface Props {
  courseId: number;
}

export default function CommentPage({ courseId }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const [comments, setComments] = useState<Comment[]>([]);

  const getComments = useCallback(async () => {
    try {
      const res = await axios.get(
        `/api/post?url=${`${getBaseUrl(
          BaseUrlTypes.ENUM_HOST_BASE_URI
        )}${endpoints.comment.get_comment_by_courseId(courseId)}`}`
      );
      if (res.status === 200) {
        setComments(res.data);
      } else enqueueSnackbar(res.statusText, { variant: 'error' });
    } catch (error) {
      console.error(error);
    }
  }, [courseId, enqueueSnackbar]);

  useEffect(() => {
    getComments();
  }, [getComments]);

  return (
    <Box sx={{ mx: 'auto' }}>
      {comments?.map((comment) => (
        <Box
          width={1}
          key={comment.id}
          sx={{ p: 2, pb: 1, border: '1px solid #d6d3d1', borderRadius: 1, mb: 1 }}
        >
          <Typography variant="body1" color="text.secondary">
            {comment.comment}
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="end">
            <Typography variant="caption" color="text.secondary">
              {comment.userEmail}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {comment.modifiedDate?.split('T')[0]}{' '}
              {comment.modifiedDate?.split('T')[1]?.slice(0, 5)}
            </Typography>
          </Stack>
        </Box>
      ))}
      <CommentForm courseId={courseId} getComments={getComments} />
    </Box>
  );
}
