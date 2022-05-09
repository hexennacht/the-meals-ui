export type Category = {
	idCategory: string,
	strCategory: string,
	strCategoryThumb: string,
	strCategoryDescription?: string | null,
}

export type Meals = {
	idMeal: string,
	strMeal: string,
	strDrinkAlternate?: string | null,
	strCategory?: string | null,
	strArea?: string | null,
	strInstructions?: string,
	strMealThumb: string,
	strTags?: string | null,
	strYoutube?: string | null,
	strIngredients?: string[] | null,
	strMeasurements?: string[] | null,
}

export type Area = {
	strArea: string | "Unknown",
}