
//Api response types
export interface Idea {
    id: number;
    title: string;
    votes?: number;
    votesCount?: number;
}


export type ApiRequestParams = {
  id?: number | null;
  include?: string[] | number[] | null;
};