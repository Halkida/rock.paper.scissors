import { FC } from 'react';
import { Modal } from '@/components/Modal';
import { Form, useForm, FieldError } from '@/components/Form';
import { Input } from '@/components/Input';
import { TextArea } from '@/components/TextArea';
import styles from './CreateTopicModal.module.scss';

type CreateTopicModalProps = {
  isShown: boolean;
  toggle: () => void;
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

export const CreateTopicModal: FC<CreateTopicModalProps> = ({ isShown, toggle }) => {
  const onSubmit = (data: Record<string, unknown>) => {
    console.log(data);
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