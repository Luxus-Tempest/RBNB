"use client";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import axios from "axios";
import { useCallback, useState } from "react";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import useLoginModal from "@/app/hooks/useLoginModal";
import { sign } from "crypto";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/auth/register", data)
      .then((res) => {
        toast.success("Successfully registered !");
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((err) => {
        //console.log(err); we gonna use Toast effect
        toast.error("Something went wrong !");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome to Airbnb"
        subtitle="Create your account"
        center={false}
      />

      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("github")}
      />

      <Button
        outline
        label="Continue with GitHub"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div
        className="
                    text-neutral-500
                    text-center
                    mt-4
                    font-light
                "
      >
        <div
          className="
                flex flex-row items-center justify-center gap-2"
        >
          <div>Already have an account?</div>
          <div
            onClick={toggle}
            className="text-neutral-800 cursor-pointer hover:underline "
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
