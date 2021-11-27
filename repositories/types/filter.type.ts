import BaseModel from "../../models/base.model";

export type FilterType<TEntity extends BaseModel> = {
  key: keyof TEntity;
  criteria: string;
};
