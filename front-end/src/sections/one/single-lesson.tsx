'use client';

import { Stack, Dialog, IconButton, DialogTitle } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import Iconify from 'src/components/iconify';

import { Lesson } from './type';
import CreateEditLessonForm from './form/create-edit-lesson';

interface Props {
  isMine: boolean;
  index: number;
  videoIndex: number;
  setIndex: (n: number) => void;
  getList: () => Promise<void>;
  courseId: number;
  lesson: Lesson;
}

export default function SingleLessonPage({
  index,
  setIndex,
  videoIndex,
  isMine,
  getList,
  courseId,
  lesson,
}: Props) {
  const showEdit = useBoolean(false);
  return (
    <Stack key={index} direction="row" gap={2} width="100%">
      <button
        onClick={() => setIndex(index)}
        className={`content-list-btn ${index === videoIndex && 'content-active'}`}
        style={{ width: '100%', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
        type="button"
      >
        <i className="far fa-play-circle">{index + 1}</i>
        <p className="lesson-title">{lesson.name}</p>
      </button>
      {isMine && (
        <IconButton onClick={showEdit.onTrue}>
          <Iconify icon="solar:pen-2-bold" />
        </IconButton>
      )}
      <Dialog fullWidth maxWidth="sm" open={showEdit.value} onClose={showEdit.onFalse}>
        <DialogTitle>Хичээл засварлах</DialogTitle>
        <CreateEditLessonForm
          onClose={showEdit.onFalse}
          getList={getList}
          courseId={courseId}
          editD={lesson}
        />
      </Dialog>
    </Stack>
  );
}
