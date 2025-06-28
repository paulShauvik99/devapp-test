export interface SocialLink {
    id: string;
    userId: string;
    platform: SocialPlatform;
    url: string;
    username?: string;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export const SocialPlatform = {
    GITHUB: 'github',
    LINKEDIN: 'linkedin',
    TWITTER: 'twitter',
    INSTAGRAM: 'instagram',
    YOUTUBE: 'youtube',
    BEHANCE: 'behance',
    DRIBBBLE: 'dribbble',
    STACKOVERFLOW: 'stackoverflow',
    WEBSITE: 'website',
    PORTFOLIO: 'portfolio'
} as const;

export type SocialPlatform = typeof SocialPlatform[keyof typeof SocialPlatform];

export interface CreateSocialLinkInput {
    platform: SocialPlatform;
    url: string;
    username?: string;
}

export interface UpdateSocialLinkInput {
    url?: string;
    username?: string;
}