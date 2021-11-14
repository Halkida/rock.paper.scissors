import { useState, FormEvent } from 'react';

export const useForm = <T extends Record<keyof T, any> = Record<string, unknown>>(options: any) => {
  const [data, setData] = useState(options?.initialValues || {});
  const [errors, setErrors] = useState({});

  const handleChange = (key: string) => (value: string) => {
    setData((prevData: Record<string, unknown>) => {
      return { ...prevData, [key]: value };
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationConfig = options?.validationConfig;
    let isValid = true;
    if (validationConfig) {
      const errors: Record<string, string> = {};
      for (const key in validationConfig) {
        const value = typeof data[key] === 'undefined' ? '' : data[key];
        const validation = validationConfig[key];

        const pattern = validation?.pattern;
        if (pattern?.value && !value.match(pattern.value)) {
          isValid = false;
          errors[key] = pattern.message;
        }

        const custom = validation?.custom;
        if (custom?.isValid && !custom.isValid(value)) {
          isValid = false;
          errors[key] = custom.message;
        }
      }

      setErrors(errors);
    }

    if (isValid && options?.onSubmit) {
      options.onSubmit(data);
    }
  };

  return {
    data,
    handleChange,
    handleSubmit,
    errors
  };
};