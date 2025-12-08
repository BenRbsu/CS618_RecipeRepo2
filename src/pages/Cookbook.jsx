import { RecipeList } from "../components/RecipeList.jsx";
import { CreateRecipe } from "../components/CreateRecipe.jsx";
import { RecipeFilter } from "../components/RecipeFilter.jsx";
import { RecipeSorting } from "../components/RecipeSorting.jsx";
import { Header } from '../components/Header.jsx'
import { Helmet } from 'react-helmet-async'
import { useQuery } from "@tanstack/react-query";
import { getRecipes } from "../api/recipes.js";
import { useState } from "react";

export function Cookbook() {
  const [author, setAuthor] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("descending");
  
  const recipesQuery = useQuery({
    queryKey: ["recipes", { author, sortBy, sortOrder }],
    queryFn: () => getRecipes({ author, sortBy, sortOrder }), 
  });
  
  const recipes = recipesQuery.data ?? [];
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
        fields={["createdAt", "updatedAt"]}
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