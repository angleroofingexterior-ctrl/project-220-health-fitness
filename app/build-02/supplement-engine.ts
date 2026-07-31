export type SupplementInput={grams:number;servingGrams:number;caloriesPerServing:number;proteinPerServing:number;creatinePerServing:number;caffeinePerServing?:number};
export type SupplementTotals={calories:number;protein:number;creatine:number;caffeine:number};
const round=(n:number,p=2)=>Math.round((n+Number.EPSILON)*10**p)/10**p;
export function calculateSupplement(input:SupplementInput):SupplementTotals{
 if(!Number.isFinite(input.grams)||input.grams<0)throw new Error("Grams must be a non-negative number.");
 if(!Number.isFinite(input.servingGrams)||input.servingGrams<=0)throw new Error("Serving grams must be greater than zero.");
 const ratio=input.grams/input.servingGrams;
 return{calories:round(input.caloriesPerServing*ratio,1),protein:round(input.proteinPerServing*ratio,1),creatine:round(input.creatinePerServing*ratio,2),caffeine:round((input.caffeinePerServing??0)*ratio,1)};
}
export function addSupplementTotals(a:SupplementTotals,b:SupplementTotals):SupplementTotals{return{calories:round(a.calories+b.calories,1),protein:round(a.protein+b.protein,1),creatine:round(a.creatine+b.creatine,2),caffeine:round(a.caffeine+b.caffeine,1)}}
