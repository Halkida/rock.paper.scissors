import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '@/components/Modal';
import { Form, useForm, FieldError } from '@/components/Form';
import { Input } from '@/components/Input';
import { TextArea } from '@/components/TextArea';
import { selectUser } from '@/store/user/selectors';
import topicService, { PostTopic } from '@/services/topic';
import { IUser } from '@/types';
import { TopicListItem } from '../Forum';
import styles from './CreateTopicModal.module.scss';

type CreateTopicModalProps = {
  isShown: boolean;
  toggle: () => void;
  addNewTopic: (topic: TopicListItem) => void;
}

type CreateTopicForm = {
  title: string;
  content: string;
}

const validationConfig = {
  title: {
    custom: {
      isValid: (value: string) => {
        return value.length > 0;
      },
      message: 'Введите текст'
    }
  },
  content: {
    custom: {
      isValid: (value: string) => {
        return value.length > 0;
      },
      message: 'Введите текст'
    }
  }
};

type SubmitTopic = {
  title: string,
  content: string
}

export const CreateTopicModal: FC<CreateTopicModalProps> = ({ isShown, toggle, addNewTopic }) => {
  const user = useSelector(selectUser) as IUser;

  const onSubmit = async (data: SubmitTopic) => {
    const { title, content } = data;
    const topicData: PostTopic = {
      authorId: user.id,
      title,
      content
    };
    try {
      const { data } = await topicService.postTopic(topicData);
      const { topic } = data;
      const normilizedTopic = {
        id: topic.id,
        title: topic.title,
        content: topic.content,
        commentsCount: 0,
        authorInfo: {
          avatar: user.avatar as (string | null),
          login: user.login
        }
      };

      addNewTopic(normilizedTopic);
      toggle();
    } catch(e) {
      console.log(e);
    }
  };

  const { handleChange, handleSubmit, errors} = useForm<CreateTopicForm>({validationConfig, onSubmit});
  const { title: titleError, content: contentError } = errors as FieldError;

  const content = (
    <Form
      onSubmit={handleSubmit}
      submitText='Создать топик'
      renderFields={() => (
      <>
        <Input
          onChange={handleChange('title')}
          name='title'
          placeholder='Название топика'
          isValid={!titleError}
          errorText={titleError}
        />
        <TextArea
          onChange={handleChange('content')}
          name='content'
          placeholder='Контент топика'
          isValid={!contentError}
          errorText={contentError}
        />
      </>)}
    />
  );

  return (
    <Modal isShown={ isShown } hide={ toggle } className={styles.topicModal}>
      { content }
    </Modal>
  );
};