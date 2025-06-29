import type { SocialLink, SocialPlatform } from "../../../models";

export const mockSocialLinks: SocialLink[] = [
    {
        id: 'sl1',
        userId: 'u1',
        platform: 'github' as SocialPlatform,
        url: 'https://github.com/alicejohnson',
        name: 'GitHub',
    },
    {
        id: 'sl2',
        userId: 'u1',
        platform: 'linkedin' as SocialPlatform,
        url: 'https://linkedin.com/in/alicejohnson',
        name: 'LinkedIn',
    },
    {
        id: 'sl3',
        userId: 'u1',
        platform: 'twitter' as SocialPlatform,
        url: 'https://twitter.com/alice_js',
        name: 'Twitter',
    },

    {
        id: 'sl4',
        userId: 'u2',
        platform: 'github' as SocialPlatform,
        url: 'https://github.com/bobsmith',
        name: 'GitHub',
    },
    {
        id: 'sl5',
        userId: 'u2',
        platform: 'linkedin' as SocialPlatform,
        url: 'https://linkedin.com/in/bobsmith',
        name: 'LinkedIn',
    },
    {
        id: 'sl6',
        userId: 'u2',
        platform: 'twitter' as SocialPlatform,
        url: 'https://twitter.com/bobcodes',
        name: 'Twitter',
    },

    {
        id: 'sl7',
        userId: 'u3',
        platform: 'github' as SocialPlatform,
        url: 'https://github.com/carlamendes',
        name: 'GitHub',
    },
    {
        id: 'sl8',
        userId: 'u3',
        platform: 'linkedin' as SocialPlatform,
        url: 'https://linkedin.com/in/carlamendes',
        name: 'LinkedIn',
    },
    {
        id: 'sl9',
        userId: 'u3',
        platform: 'twitter' as SocialPlatform,
        url: 'https://twitter.com/carla_dev',
        name: 'Twitter',
    },

    {
        id: 'sl10',
        userId: 'u4',
        platform: 'github' as SocialPlatform,
        url: 'https://github.com/danchen',
        name: 'GitHub',
    },
    {
        id: 'sl11',
        userId: 'u4',
        platform: 'linkedin' as SocialPlatform,
        url: 'https://linkedin.com/in/danchen',
        name: 'LinkedIn',
    },
    {
        id: 'sl12',
        userId: 'u4',
        platform: 'twitter' as SocialPlatform,
        url: 'https://twitter.com/dan_codes',
        name: 'Twitter',
    },
];