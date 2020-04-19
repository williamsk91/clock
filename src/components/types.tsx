export interface ITask {
  id: string;
  done: boolean;
  title: string;
  start?: Date;
  end?: Date;
}
