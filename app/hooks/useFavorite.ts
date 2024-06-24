import { useRouter } from "next/navigation";
import { SafeUser } from "../types";
import React, { useCallback, useMemo } from "react";
import useLoginModal from "./useLoginModal";
import axios from "axios";
import toast from "react-hot-toast";

interface IUserFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUserFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteId || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        loginModal.onOpen();
      }

      try {
        let request;

        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
          toast.success("Successfully deleted from your favorites");
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
          toast.success("Successfully added to your favorites");
        }

        await request();
        router.refresh();
      } catch (error) {
        toast.error("Something went wrong");
      }
    },
    [currentUser, hasFavorited, loginModal, listingId, router]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
