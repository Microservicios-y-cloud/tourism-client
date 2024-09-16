// food-type-response.ts
export class FoodTypeResponse {
    public FoodTypeId: number;
    public name: string;

    constructor(FoodTypeId: number, name: string) {
        this.FoodTypeId = FoodTypeId;
        this.name = name;
    }
}
