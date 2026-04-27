export type CommentItem = {
  id: string;
  linkedinName: string;
  linkedinEmail?: string | null;
  linkedinAvatar?: string | null;
  linkedinTitle?: string | null;
  linkedinUrl?: string | null;
  message: string;
  status: string;
  createdAt: string;
};

export type LinkedinUser = {
  sub: string;
  name: string;
  email?: string;
  picture?: string;
  profile?: string;
  title?: string;
};
