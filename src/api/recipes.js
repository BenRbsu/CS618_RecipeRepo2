export const getRecipes = async (queryParams) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/recipes?` +
      new URLSearchParams(queryParams)
  );
  return await res.json();
};

export const getRecipeById = async (recipeId) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/recipes/${recipeId}`)
  return await res.json()
}

export const createRecipe = async (token, recipe) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/recipes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(recipe),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `Create recipe failed: ${res.status} ${res.statusText} - ${text}`
    );
  }
  return await res.json();
};
