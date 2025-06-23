export class AdvisoryRating {

    id: number;
    punctuation: number;
    description:string;
    userId: number;
    advisoryId: number;
    createdAt: string;

    constructor(){
        this.id = 0;
        this.punctuation = 0;
        this.description = "";
        this.userId = 0;
        this.advisoryId = 0;
        this.createdAt = "";
    }

}
