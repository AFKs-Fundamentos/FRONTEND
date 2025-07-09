export interface BaseRating {
    id: number;
    punctuation: number;
    description: string;
    userId: number;
    createdAt: string;
}

export interface ProductRating extends BaseRating{
    productId: number;
}

export interface AdvisoryRating extends BaseRating{
    advisoryId: number;
}

export interface UserRating extends BaseRating{
    technicalId: number;
}
