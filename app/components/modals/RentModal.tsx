"use client";

import React, { useMemo, useState } from "react";
import Modal from "./Modal";
import useRentModal from "@/app/hooks/useRentModal";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import { Country, State, City } from "country-state-city";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import PlaceLocation from "../MapBox";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  const rentModal = useRentModal();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      imageSrc: "",
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      price: 1,
      title: "",
      description: "",
      town: "",
    },
  });

  //Cibler le champs category du formulaire en temps réel
  const category = watch("category");
  const location = watch("location");
  const town = watch("town");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  //importer Map d'une manière spécifique pour que ca marche
  //Effectuer un rendu dynamique

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  //Mettre à jour la valeur de la constante 'category'
  const setCustomValues = (id: string, value: any) => {
    setValue(id, value),
      {
        shoulDirty: true,
        shouldTouch: true,
        shouldValidate: true, //the most important
      };
  };

  const goBack = () => {
    setStep((prev) => prev - 1);
  };

  const goNext = () => {
    setStep((prev) => prev + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return goNext();
    }

    //console.log(data);
    setIsLoading(true);
    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing created successfully !");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch((error) => {
        toast.error("Something went wrong during the process");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className=" flex flex-col gap-8 ">
      <Heading
        title="Which of these best describe your place ?"
        subtitle="Pick a category"
      />
      <div
        className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-3
                max-h-[50vh]
                overflow-y-auto
              "
      >
        {categories.map((item) => (
          <div key={item.label} className=" col-span-1 ">
            <CategoryInput
              //la fonction onclick peut peut prendre n'importe quoi enn parametre.
              //Spn paremetre principal est deja defini dans CategoryIput : label
              onClick={(thisLabel) => setCustomValues("category", thisLabel)}
              selected={category == item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step == STEPS.LOCATION) {
    bodyContent = (
      <div className=" flex flex-col gap-8  max-h-[50vh] overflow-y-auto">
        <Heading
          title="Where is your property located ?"
          subtitle="Pick a location !"
        />

        <CountrySelect
          value={location}
          onChange={(value) => setCustomValues("location", value)}
        />

        {/*<PlaceLocation />*/}

        {/* City Select */}
        <div className="w-full flex flex-col pb-3">
          <div className="w-full">
            <label className="block pb-2">City</label>
            <select
              className="w-[100%]  h-[70px] rounded-[5px] p-3 border-2"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                setCustomValues("town", e.target.value);
              }}
            >
              <option className="block pb-2" value="">
                Choose your City
              </option>
              {City &&
                City.getCitiesOfCountry(location?.value || "")?.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step == STEPS.INFO) {
    bodyContent = (
      <div className=" flex flex-col gap-8 ">
        <Heading
          title="Share some basics about your property"
          subtitle="What amenaties do you have?"
        />

        <Counter
          title="Number of guest"
          subtitle="How many guest ?"
          value={guestCount}
          onChange={(value) => setCustomValues("guestCount", value)}
        />

        <Counter
          title="Rooms"
          subtitle="How many rooms do you have ?"
          value={roomCount}
          onChange={(value) => setCustomValues("roomCount", value)}
        />
        <Counter
          title="Bathooms"
          subtitle="How many bathrooms do you have ?"
          value={bathroomCount}
          onChange={(value) => setCustomValues("bathroomCount", value)}
        />
      </div>
    );
  }

  if (step == STEPS.IMAGES) {
    bodyContent = (
      <div className=" flex flex-col gap-8 ">
        <Heading
          title="Share some images about your property"
          subtitle="What describe well your have?"
        />

        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValues("imageSrc", value)}
        />
      </div>
    );
  }

  if (step == STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best!"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          long
        />
      </div>
    );
  }

  if (step == STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
        />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  //console.log(category)
  //console.log(location? location.label : 'no location')
  //console.log(town)
  //console.log(guestCount)

  return (
    <Modal
      //disabled
      isOpen={rentModal.isOpen}
      title="Airbnb your home"
      actionLabel={actionLabel}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step == STEPS.CATEGORY ? undefined : goBack}
    />
  );
};

export default RentModal;
