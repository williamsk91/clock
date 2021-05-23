import { eventColors } from "../Calendar/styles";

export interface ITheme {
  name: Theme;
  text: {
    action: string;
    title: string;
    main: string;
    disabled: string;
  };
  color: {
    primary: string;
  };
}

export enum Theme {
  light,
}

/** light theme is also the dafault theme */
const lightTheme: ITheme = {
  name: Theme.light,
  text: {
    action: "rgba(55, 53, 47, 0.95)",
    title: "rgba(55, 53, 47, 0.85)",
    main: "rgba(55, 53, 47, 0.75)",
    disabled: "rgba(55, 53, 47, 0.50)",
  },
  color: {
    primary: eventColors.red,
  },
};

export const theme = lightTheme;
