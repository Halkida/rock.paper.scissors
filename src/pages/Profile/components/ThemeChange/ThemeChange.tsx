import { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { postTheme } from '@/store/user/actions';
import { Themes } from '@/constants/themes';
import SliderCheckbox from '@/components/SliderCheckbox';

export const ThemeChange: FC = () => {
  const theme = 'dark';
  const dispatch = useDispatch();
  const handleSliderCheckboxChange = useCallback((value: boolean) => {
    const theme = value ? Themes.dark : Themes.light;
    dispatch(postTheme(theme));
  }, []);

  return (
    <div>
      Цветовая тема: светлая
      {' '}
      <SliderCheckbox
        value="theme"
        checked={theme === Themes.dark}
        onChange={handleSliderCheckboxChange}
      />
    </div>
  );
};
