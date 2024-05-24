import { dispatch, useStore, ActionType, Theme } from '.';

export const useTheme = () => {
  const { theme } = useStore();

  const changeColor = (e: Theme) => {
    dispatch({ type: ActionType.CHANGE_THEME, payload: e });
  };

  return {
    theme,
    changeColor,
  };
};
