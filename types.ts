import React from 'react';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string; // Inline Markdown content (optional if contentPath is provided)
  contentPath?: string; // Path to external Markdown file (e.g., /articles/post-1.md)
  author: string;
  authorBio?: string;
  authorAvatar?: string;
  date: string;
  category: string;
  imageUrl: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  features: string[];
  imageUrl: string;
  tags: string[];
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
}

export interface ForumReply {
  id: string;
  author: string;
  content: string;
  date: string;
}

export interface ForumTopic {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
  replies: ForumReply[];
  views: number;
}

export enum PageRoute {
  HOME = '/',
  BLOG = '/blog',
  SHOP = '/shop',
  ASSISTANT = '/assistant',
  FORUM = '/forum',
  ARTICLE = '/blog/:id',
  TOPIC = '/forum/:id'
}

export interface NavItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
}