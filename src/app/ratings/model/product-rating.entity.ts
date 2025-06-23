export class ProductRating {

    id: number;
    punctuation: number;
    description:string;
    userId: number;
    productId: number;
    createdAt: string;

    constructor(){
        this.id = 0;
        this.punctuation = 0;
        this.description = "";
        this.userId = 0;
        this.productId = 0;
        this.createdAt = "";
    }
    
}
