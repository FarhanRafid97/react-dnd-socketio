export interface ITaskBase {
  id: string;
  content: string;
}

export interface IColumnBase {
  id: string;
  title: string;
  taskIds: string[];
}

export interface InitialDataInf {
  tasks: Record<string, ITaskBase>;
  columns: Record<string, IColumnBase>;
  columnOrder: string[];
}
