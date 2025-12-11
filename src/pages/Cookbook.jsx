import { RecipeList } from "../components/RecipeList.jsx";
import { CreateRecipe } from "../components/CreateRecipe.jsx";
import { RecipeFilter } from "../components/RecipeFilter.jsx";
import { RecipeSorting } from "../components/RecipeSorting.jsx";
import { Header } from '../components/Header.jsx'
import { Helmet } from 'react-helmet-async'
//import { useQuery } from "@tanstack/react-query";
//import { getRecipes } from "../api/recipes.js";
import { useQuery as useGraphQLQuery } from '@apollo/client/react/index.js'
import { GET_RECIPES, GET_RECIPES_BY_AUTHOR } from '../api/graphql/recipes.js'
import { useState, useEffect } from "react";

export function Cookbook() {
  const [author, setAuthor] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("descending");
  
 /* const recipesQuery = useQuery({
    queryKey: ["recipes", { author, sortBy, sortOrder }],
    queryFn: () => getRecipes({ author, sortBy, sortOrder }), 
  });
  
  const recipes = recipesQuery.data ?? []; */
   
  const recipesQuery = useGraphQLQuery(author ? GET_RECIPES_BY_AUTHOR : GET_RECIPES, {
    variables: author ? { author, options: { sortBy, sortOrder } } : { options: { sortBy, sortOrder } },
  })

  // Refetch recipes when the page mounts or when filter/sort changes
  useEffect(() => {
    recipesQuery.refetch()
  }, [author, sortBy, sortOrder, recipesQuery])

  const recipes = recipesQuery.data?.recipesByAuthor ?? recipesQuery.data?.recipes ?? []
  return (
    <div style={{ padding: 8 }}>
      <Helmet>
        <title>Full-Stack React Cookbook</title>
        <meta
          name='description'
          content='A cookbook full of recipes.'
        />
      </Helmet>
      <Header />
      <hr />
      <CreateRecipe />
      <br />
      <hr />
      Filter by:
      <RecipeFilter
        field="author"
        value={author}
        onChange={(value) => setAuthor(value)}
      />
      <br />
      <RecipeSorting
        fields={["createdAt", "updatedAt", "likesCount"]}
        value={sortBy}
        onChange={(value) => setSortBy(value)}
        orderValue={sortOrder}
        onOrderChange={(orderValue) => setSortOrder(orderValue)}
      />
      <hr />
      <RecipeList recipes={recipes} />
    </div>
  );
}