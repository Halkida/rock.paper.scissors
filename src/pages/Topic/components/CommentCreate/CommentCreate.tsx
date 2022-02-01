import { FC, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import IconTimesSolid from '@/icons/TimesSolid';
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
  onResetReply: () => void,
  onRepliedAuthorClick: () => void,
}

type Props = FC<OwnProps>;

export const CommentCreate: Props = ({
  replyTo,
  onResetReply,
  onRepliedAuthorClick,
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

  const handleResetReplyClick = useCallback(() => {
    onResetReply();
  }, [onResetReply]);

  const handleRepliedAuthorClick = useCallback(() => {
    onRepliedAuthorClick();
  }, [onRepliedAuthorClick]);

  return (
    <form
      className={styles.commentCreate}
      onSubmit={handleFormSubmit}
    >
      {replyTo && (
        <div
          className={styles.replyTo}
        >
          Ответ на комментарий от
          {' '}
          <Button
            view="text"
            className={styles.replyTo_author}
            onClick={handleRepliedAuthorClick}
          >
            {replyTo.author.name}
          </Button>
          <Button
            view="text"
            className={styles.replyTo_reset}
            onClick={handleResetReplyClick}
          >
            <IconTimesSolid className={styles.replyTo_resetIcon} />
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