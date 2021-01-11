import { ListFragment } from "../graphql/generated";

export const listIsNotDeleted = (list: ListFragment): boolean => !list.deleted;
