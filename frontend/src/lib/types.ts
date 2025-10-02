
//Api response types
export interface Idea {
    id: number;
    title: string;
    votesCount: number;
    enableVote: boolean;
}

export interface IdeasResponse {
  data: Idea[];
  limitExceeded: boolean;
}

export interface VoteError {
  canVote?: boolean
  error?: string
  limit?: number
}