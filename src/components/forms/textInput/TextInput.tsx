import { InputPropType } from "@/src/types"

const TextInput = ({ 
    name,
    label, 
    placeholder, 
    type = 'text', 
    register, 
    options = {}, 
    errors 
}: InputPropType) => {
  return (
        <div className="w-full mb-4">
            <label 
                htmlFor={name} 
                className="block mb-2 text-base font-medium text-soar-dark"
            >
                {label}
            </label>
            <input 
                {...(register ? register(name, options) : {})}
                type={type}
                id={name}
                className="border border-soar-border-gray rounded-2xl text-trans-date block w-full p-2.5 font-[Inter] text-base focus:outline-none focus:ring-0 focus:shadow-sm focus:shadow-(var(--trans-date))"
                placeholder={placeholder} 
            />
            {errors && errors[name] && (
                <div className="flex items-center space-x-2">
                    <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="text-red-500 text-sm mt-1 capitalize">
                        {typeof errors[name]?.message === 'string' ? errors[name]?.message : ''}
                    </span>
                </div>
            )}
        </div>
  )
}

export default TextInput
