"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import toast from "react-hot-toast";
import RentModal from "../modals/RentModal";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const RentModal = useRentModal();

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    // Open Rent modal
    RentModal.onOpen();
    //toast.success('Modal opened')
  }, [currentUser, loginModal, RentModal]);

  const ActionAndClose = useCallback((modalName: any) => {
    modalName.onOpen();
    setIsOpen(false);
  }, []);

  return (
    <div
      className="
        relative
    "
    >
      <div className=" flex flex-row items-center gap-3 ">
        <div
          onClick={onRent}
          className="
                hidden
                md:block
                text-sm
                font-semibold
                py-3
                px-4
                rounded-full
                hover:bg-neutral-100
                transition
                cursor-pointer
                "
        >
          Publish your enterprise
        </div>

        <div
          onClick={toggleOpen}
          className="
                p-4
                md:py-1
                md:px-2
                border-[1px]
                rounded-full
                border-neutral-100
                flex
                flex-row
                items-center
                gap-3
                cursor-pointer
                transition
                hover:shadow-md

            "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
            absolute
            rounded-xl
            shadow-md
            w-[40vw]
            md:w-3/4
            bg-white
            overflow-hidden
            right-0
            top-12
            text-sm
            "
        >
          <div
            className="
                flex
                flex-col
                cursor-pointer
                "
          >
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => router.push("/trips")}
                  label="My trips"
                />
                <MenuItem onClick={() => router.push("/favorites")} label="My favorites" />
                <MenuItem onClick={() => router.push("/reservations")} label="My reservations" />
                <MenuItem onClick={() => router.push("/properties")} label="My properties" />
                <MenuItem
                  onClick={() => ActionAndClose(RentModal)}
                  label="Airbnb my home"
                />
                <hr />
                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem
                  onClick={() => ActionAndClose(loginModal)}
                  label="Login"
                />

                <MenuItem
                  onClick={() => ActionAndClose(registerModal)}
                  label="Sign Up"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
