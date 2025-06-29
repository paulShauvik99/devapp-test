export interface SocialLink {
    id: string;
    userId: string;
    platform: SocialPlatform;
    url: string;
    name?: string;
}

export const SocialPlatform = {
    GITHUB: 'github',
    LINKEDIN: 'linkedin',
    TWITTER: 'twitter',
    INSTAGRAM: 'instagram',
    YOUTUBE: 'youtube',
    WEBSITE: 'website',
} as const;

export type SocialPlatform = typeof SocialPlatform[keyof typeof SocialPlatform];

export interface CreateSocialLinkInput {
    platform: SocialPlatform;
    url: string;
    name?: string;
}