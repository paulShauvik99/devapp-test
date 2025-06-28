import type { SocialLink, SocialPlatform } from "../../../models";

export const mockSocialLinks: SocialLink[] = [
    {
        id: '1',
        userId: '1',
        platform: 'github' as SocialPlatform,
        url: 'https://github.com/johndoe',
        username: 'johndoe',
        isVerified: true,
        createdAt: new Date('2023-01-15'),
        updatedAt: new Date('2023-01-15')
    },
    {
        id: '2',
        userId: '1',
        platform: 'linkedin' as SocialPlatform,
        url: 'https://linkedin.com/in/john-doe',
        username: 'john-doe',
        isVerified: false,
        createdAt: new Date('2023-01-15'),
        updatedAt: new Date('2023-01-15')
    }
];