type Project = {
  createdAt: string;
  updatedAt: string;
  id: string;
  name: string;
  port: number;
  tag: string[];
};

type Article = {
  id: string;
  title: string;
  slug: string;
  category?: string;
  project?: string;
  contents: string;
  authorName: string;
  datePublished: string;
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
