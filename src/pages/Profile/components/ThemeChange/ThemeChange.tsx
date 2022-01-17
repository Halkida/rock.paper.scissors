import { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserTheme } from '@/store/user/selectors';
import { postTheme } from '@/store/user/actions';
import { THEMES, THEMES_TITLES } from '@/constants/themes';
import SliderCheckbox from '@/components/SliderCheckbox';

export const ThemeChange: FC = () => {
  const theme = useSelector(selectUserTheme);
  const dispatch = useDispatch();
  const handleSliderCheckboxChange = useCallback((value: boolean) => {
    const theme = value ? THEMES.dark : THEMES.light;
    dispatch(postTheme(theme));
  }, []);

  return (
    <div>
      Цветовая тема:
      {' '}
      {THEMES_TITLES[theme]}
      {' '}
      <SliderCheckbox
        value="theme"
        checked={theme === THEMES.dark}
        onChange={handleSliderCheckboxChange}
      />
    </div>
  );
};
