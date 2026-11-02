import snapshot from '../generated/content.json';
import type { ContentSnapshot } from './types';

export type { Article, Project, SeoPage } from './types';

const content = snapshot as unknown as ContentSnapshot;

export const projects = content.projects;
export const articles = content.articles;
export const seoPages = content.pages;

export const findProject = (id: string | undefined) => projects.find((project) => String(project.id) === id);
export const findArticle = (slug: string | undefined) => articles.find((article) => article.slug === slug);

const dateFormatter = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' });
export const formatDate = (isoDate: string) => dateFormatter.format(new Date(isoDate));
