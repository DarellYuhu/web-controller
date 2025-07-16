type Project = {
  createdAt: string;
  updatedAt: string;
  id: string;
  name: string;
  port: number;
  projectTag: string[];
  description: string;
};

type Article = {
  id: string;
  title: string;
  slug: string;
  category?: string;
  project?: string;
  contents: string;
  author?: string;
  datePublished?: string;
  imageUrl: string;
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

enum SectionType {
  Highlight,
  TopPick,
  Popular,
}
