import { FC, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useService } from '@/hooks';
import { selectUser } from '@/store/user/selectors';
import { TextArea } from '@/components/TextArea';
import { Button } from '@/components/Button';
import Spinner from '@/components/Spinner';
import commentService from '@/services/comment';
import styles from './CommentCreate.module.scss';

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
  const { id: topicId } = useParams();
  const user = useSelector(selectUser);
  const [value, setValue] = useState();
  const {
    isFetching,
    fetch,
  } = useService({
    service: commentService.create,
  });

  const handleTextAreaChange = useCallback((value) => {
    setValue(value);
  }, [setValue]);

  const handleFormSubmit = useCallback((e) => {
    e.preventDefault();
    fetch({
      content: value,
      authorId: user?.id,
      replyTo: replyTo?.commentId,
      topicId: Number(topicId),
    });
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
          disabled={isFetching}
        >
          {isFetching ? (
            <Spinner
              type="inline"
              isRevert
            />
          ) : ('Отправить')}
        </Button>
      </div>
    </form>
  );
};