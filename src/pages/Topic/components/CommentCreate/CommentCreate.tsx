import { FC, useCallback, useState } from 'react';
import { TextArea } from '@/components/TextArea';
import styles from './CommentCreate.module.scss';
import { Button } from '@/components/Button';

type answerForComment = {
  commentId: number,
  author: {
    id: number,
    name: string,
  },
};

type OwnProps = {
  replyTo?: answerForComment,
}

type Props = FC<OwnProps>;

export const CommentCreate: Props = ({
  replyTo,
}) => {
  const [value, setValue] = useState();

  const handleTextAreaChange = useCallback((value) => {
    setValue(value);
  }, [setValue]);

  const handleFormSubmit = useCallback((e) => {
    e.preventDefault();
  }, [setValue]);

  return (
    <form
      className={styles.commentCreate}
      onSubmit={handleFormSubmit}
    >
      {replyTo && (
        <div
          className={styles.replyTo}
        >
          <div
            className={styles.replyTo_title}
          >
            Ответ на комментарий от
          </div>
          <Button
            view="text"
            className={styles.replyTo_author}
          >
            {replyTo.author.name}
          </Button>
        </div>
      )}
      <TextArea
        value={value}
        className={styles.textarea}
        onChange={handleTextAreaChange}
      />
      <div className={styles.footer}>
        <Button
          type="submit"
        >
          Отправить
        </Button>
      </div>
    </form>
  );
};