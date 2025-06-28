import { authHandlers } from './authHandlers';
import { blogHandlers } from './blogHandlers';
import { developerHandlers } from './developerHandlers';

export const handlers = [
    ...authHandlers,
    ...developerHandlers,
    ...blogHandlers,
];