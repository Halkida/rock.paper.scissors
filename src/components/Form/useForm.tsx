import { useState, FormEvent } from 'react';

type Validation = {
  pattern?: {
    value: RegExp;
    message: string;
  };
  custom?: {
    isValid: (value: string, data: Record<string, unknown>) => boolean;
    message: string;
  };
}

type Options<T> = {
  validationConfig?: Partial<Record<keyof T, Validation>>;
  initialValues?: Partial<T> | null;
  onSubmit?: (data: Record<string, unknown>) => void;
}

export type FieldError = Record<string, string>

export const useForm = <T extends Record<keyof T, any> = Record<string, unknown>>(options: Options<T>) => {
  const [data, setData] = useState((options?.initialValues || {}) as Record<keyof T, string>);
  const [errors, setErrors] = useState<FieldError>({});

  const handleChange = (key: string) => (value: string) => {
    setData((prevData: Record<keyof T, string>) => {
      return { ...prevData, [key]: value };
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationConfig = options?.validationConfig;
    let isValid = true;
    if (validationConfig) {
      const fieldErrors: FieldError = {};
      for (const key in validationConfig) {
        const value = typeof data[key] === 'undefined' ? '' : data[key];
        const validation = validationConfig[key];

        const pattern = validation?.pattern;
        if (pattern?.value && !value.match(pattern.value)) {
          isValid = false;
          fieldErrors[key] = pattern.message;
        }

        const custom = validation?.custom;
        if (custom?.isValid && !custom.isValid(value, data)) {
          isValid = false;
          fieldErrors[key] = custom.message;
        }
      }

      setErrors(fieldErrors);
    }

    if (isValid && options?.onSubmit) {
      options.onSubmit(data);
    }
  };

  const clearErrors = () => {
    setErrors({});
  }

  return {
    data,
    handleChange,
    handleSubmit,
    errors,
    clearErrors,
  };
};