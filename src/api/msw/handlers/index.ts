import { authHandlers } from './auth';
import { blogHandlers } from './blogs';
import { commentsHandlers } from './comments';
import { skillHandlers } from './skills';
import { socialLinksHandlers } from './socialLinks';
import { userHandlers } from './users';

export const handlers = [
    ...authHandlers,
    ...userHandlers,
    ...blogHandlers,
    ...commentsHandlers,
    ...skillHandlers,
    ...socialLinksHandlers
];