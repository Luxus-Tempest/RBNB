"use client"

import { 
    FieldErrors, 
    FieldValues, 
    UseFormRegister 
} from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface inputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    formatPrice?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>
    errors: FieldErrors
    long?: boolean;  
}

const Input: React.FC<inputProps> = ({
    id,
    label,
    type,
    disabled,
    formatPrice,
    required,
    register,
    errors,
    long
}) => {
  return (
    <div className=" w-full relative " >
        {formatPrice && (
            <BiDollar size={24} 
            className="
            absolute 
            top-5 
            left-2 
            text-gray-700
            " 
            />
        )}
            
        {long? (
            <textarea 
                //cols="30" rows="10"
                id={id}
                disabled={disabled}
                {...register(id, { required })}
                placeholder=" "
                //type={type}
                className={`
                    peer
                    w-full
                    p-3
                    pt-5
                    font-light
                    bg-white
                    rounded-md
                    border-2
                    outline-none
                    transition
                    disabled:opacity-70
                    disabled:cursor-not-allowed
                    ${formatPrice ? 'pl-9' : 'pl-4'}
                    ${errors[id] ? 'border-red-600' : 'border-neutral-300'}
                    ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
                    ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
                `}
                
            ></textarea>
        ) : (
            <input 
            id={id}
            disabled={disabled}
            {...register(id, { required })}
            placeholder=" "
            type={type}
            className={`
                peer
                w-full
                p-3
                pt-5
                font-light
                bg-white
                rounded-md
                border-2
                outline-none
                transition
                disabled:opacity-70
                disabled:cursor-not-allowed
                ${formatPrice ? 'pl-9' : 'pl-4'}
                ${errors[id] ? 'border-red-600' : 'border-neutral-300'}
                ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
                ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
            `}
        />
        )}
        <label
        className={`
            absolute
            top-5
            text-md
            duration-150
            tranform
            -translate-y-3
            z-10
            origin[0]
            ${formatPrice ? 'left-9' : 'left-4'}
            peer-placeholder-shown:scale-100
            peer-placeholder-shown:translate-y-0
            peer-focus:scale-75
            peer-focus:-translate-y-4
            ${errors[id] ? 'text-red-600' : 'text-zinc-400'}

        `}
        >
            {label}
        </label>
    </div>
  )
}

export default Input