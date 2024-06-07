export interface Reactions {
    likes: number;
    dislikes: number;
  }

export interface Post {
    id: number;
    title: string;
    body: string;
    tags: string[];
    views: number;
    reactions: Reactions;
  }
  