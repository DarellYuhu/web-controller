type Project = {
  createdAt: string;
  updatedAt: string;
  id: string;
  name: string;
  port: number;
  projectTag: string[];
  projectAuthor: string[];
  description: string;
  status?: string;
};

type Cursor = {
  id: string;
  createdAt: string;
};
type Article = {
  id: string;
  title: string;
  slug: string;
  categoryId?: string;
  category?: string;
  project?: string;
  contents: string;
  authorId?: string;
  author?: string;
  datePublished?: string;
  imageUrl: string;
  tagId: string;
  tag: string;
  createdAt: string;
  updatedAt: string;
};

type Category = BaseMetadata & {
  slug: string;
};

type BaseMetadata = {
  id: string;
  name: string;
  updatedAt: string;
  createdAt: string;
};

interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
    name: string;
    role: string;
  };
}

type Prompt = {
  id: stirng;
  text: stirng;
  createdAt: stirng;
  updatedAt: stirng;
  score: number;
};
