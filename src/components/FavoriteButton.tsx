"use client";

import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../redux/slices/favorites";
import { Product } from "../app/api/type";
import { RootState } from "../redux/store";

interface FavoriteButtonProps {
  product: Product;
}

const FavoriteButton = ({ product }: FavoriteButtonProps) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites);

  const isFavorite = favorites.some((item) => item.id === product.id);

  const handleAddFavorite = () => {
    dispatch(addFavorite(product));
  };

  const handleRemoveFavorite = () => {
    dispatch(removeFavorite(product.id));
  };

  return (
    <div className="flex justify-between">
      {!isFavorite ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAddFavorite();
          }}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-600 focus:outline-none"
        >
          Add to favorite
        </button>
      ) : (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveFavorite();
          }}
          className="bg-red-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-red-600 focus:outline-none"
        >
          remove from favorite
        </button>
      )}
    </div>
  );
};

export default FavoriteButton;
