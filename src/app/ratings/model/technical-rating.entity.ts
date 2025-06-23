export class TechnicalRating {

    id: number;
    punctuation: number;
    description:string;
    userId: number;
    technicalId: number;
    createdAt: string;

    constructor(){
        this.id = 0;
        this.punctuation = 0;
        this.description = "";
        this.userId = 0;
        this.technicalId = 0;
        this.createdAt = "";
    }

}
