export function calculateTotalValidConsruction(areaM2: number, constructionCost: number): number {
    return areaM2 * constructionCost;
}
export function calculateDepreciationByMinutes(totalValueConstruction: number,useFullYears: number = 50 ): number {
    
    const useFullYearsInMinutes = useFullYears * 525600;
    return totalValueConstruction / useFullYearsInMinutes;
}
export function calculateInfrastructureStandardCost(depreciationPerMinute: number, timePerformanceMinutes: number): number {
    return depreciationPerMinute * timePerformanceMinutes;
}