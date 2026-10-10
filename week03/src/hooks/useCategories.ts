import { useQuery } from "@tanstack/react-query";
import { getCategories, productKeys } from "../api/products";

export const useCategories = () => {
  return useQuery({
    queryKey: productKeys.categories(),
    queryFn: getCategories,
  });
};
