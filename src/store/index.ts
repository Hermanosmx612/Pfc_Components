import { useEffect, useState } from 'react';

export enum ActionType {
  CHANGE_THEME,
}

export interface Theme {
  LeadingColor: string;
  TextColor: string;
  IconOn: string;
  IconOff: string;
  BackgroundButton: string;
  TextButtons: string;
  BackgroundField: string;
  IconOverFields: string;
  iconSize: string;
  fontSize: string;
  RejectBackgroundButton: string;
  FontFamily: string;
}
interface State {
  theme: Theme;
}

let initialState: State = {
  theme: {
    LeadingColor: '#e0e0e0',         // Gris claro
    TextColor: '#333333',            // Gris oscuro
    IconOn: '#9e9e9e',               // Verde suave
    IconOff: '#bdbdbd',              // Gris suave
    BackgroundButton: '#ffffff',     // Blanco
    TextButtons: '#333333',          // Gris oscuro
    BackgroundField: '#f5f5f5',      // Gris claro
    IconOverFields: '#4caf50',       // Verde suave
    iconSize: '35px',
    fontSize: '15px',
    RejectBackgroundButton: '#ef5350', // Rojo suave
    FontFamily: '"Helvetica", sans-serif',
  },
};


type Action = {
  type: ActionType.CHANGE_THEME;
  payload: {
    LeadingColor?: string;
    TextColor?: string;
    IconOn?: string;
    IconOff?: string;
    BackgroundButton?: string;
    TextButtons?: string;
    BackgroundField?: string;
    IconOverFields?: string;
    iconSize?: string;
    fontSize?: string;
    RejectBackgroundButton?: string;
    FontFamily?: string;
  };
};

const listeners: Array<(state: State) => void> = [];

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.CHANGE_THEME:
      return {
        ...state,
        theme: {
          ...initialState.theme,
          ...action.payload,
        },
      };
  }
};

export const dispatch = (action: Action) => {
  initialState = reducer(initialState, action);
  listeners.forEach((listener) => {
    listener(initialState);
  });
};

export const useStore = () => {
  const [theme, setTheme] = useState<State>(initialState);

  useEffect(() => {
    listeners.push(setTheme);
    return () => {
      const index = listeners.indexOf(setTheme);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [theme]);

  return {
    ...theme,
  };
};
