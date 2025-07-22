export type StartupCardType = {
  _id: string;
  _createdAt: Date;
  title: string;
  description: string;
  image: string;
  category: string;
  views: number;
  author?: {
    _id: string;
    name: string;
  };
};
