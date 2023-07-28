interface UserMetadata {
    creationTime?: String,
    lastSignInTime?: String,
    lastRefreshTime?: String | null
};

export interface UserRecord {
    disabled?: Boolean,
    displayName?: string;
    email?: string;
    emailVerified?: Boolean,
    metadata?: UserMetadata,
    phoneNumber?: String;
    photoUrl?: String;
    uid: string;
};