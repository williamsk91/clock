import { Color } from "../styles/colors";

export interface ITask {
  id: string;
  done: boolean;
  title: string;
  start?: Date;
  end?: Date;
  color?: Color;
}
