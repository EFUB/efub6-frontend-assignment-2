import { useQuery } from "@tanstack/react-query";
import { getProduct, productKeys } from "../api/products";

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => getProduct(id),
    enabled: Boolean(id),
  });
};
