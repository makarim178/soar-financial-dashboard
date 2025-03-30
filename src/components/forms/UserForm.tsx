'use client';
import Image from "next/image";
import { FormFieldType } from "@/src/types";
import TextInput from "./textInput/TextInput";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { DatePicker, Space } from 'antd';
import dayjs from "dayjs";
import ProfileImage from "../profileImage/ProfileImage";
import { useState } from "react";

const UserForm = () => {
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<FormFieldType>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{
      success: boolean;
      message: string;
    } | null>(null);

    const onSubmit: SubmitHandler<FormFieldType> = async (data) => {
      try {
        setIsSubmitting(true);
        setSubmitStatus(null);
        
        // Create FormData object to handle file upload
        const formData = new FormData();
        
        // Add all form fields to FormData
        Object.entries(data).forEach(([key, value]) => {
          if (key === 'profileImage' && value instanceof FileList && value.length > 0) {
            formData.append(key, value[0]);
          } else if (value !== undefined && value !== null) {
            formData.append(key, value.toString());
          }
        });
        
        // Submit form data to API
        const response = await fetch('/api/user', {
          method: 'POST',
          body: formData,
        });
        
        const result = await response.json();
        
        if (!response.ok) {
          throw new Error(result.error || 'Failed to save user data');
        }
        
        // Show success message
        setSubmitStatus({
          success: true,
          message: 'User profile saved successfully!'
        });
        
        // Reset form
        reset();
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmitStatus({
          success: false,
          message: error instanceof Error ? error.message : 'An error occurred while saving user data'
        });
      } finally {
        setIsSubmitting(false);
      }
    };

    const dateFormat = 'DD MMMM YYYY';

  return (
    <form 
        className="flex flex-col items-center md:items-start md:flex-row justify-center w-full"
        onSubmit={handleSubmit(onSubmit)}
    >
        <div className="flex flex-col items-center">
            <div className="relative flex justify-center p-6 cursor-pointer">
                <div className="w-[90px] h-[90px] rounded-full bg-soar-light-gray flex justify-center align-middle items-center cursor-pointer">
                    <ProfileImage size={120} />
                </div>
                <div className="absolute bottom-6 right-6 flex w-[30px] h-[30px] rounded-full bg-soar-dark justify-center items-center cursor-pointer">
                    <Image src="/icons/edit-icon.svg" width={15} height={15} alt="edit-icon" />
                </div>
                <div className="absolute bottom-6 cursor-pointer right-0 opacity-0 text-black w-[90px] h-[30px] flex justify-center items-center">
                    <label htmlFor="profileImage" className="text-soar-light cursor-pointer" >Select Image</label>
                    <input {...register('profileImage')} type="file" name="profileImage" id="profileImage" style={{display: 'none'}}/> 
                </div>
            </div>
      </div>

      <div className="w-full flex flex-col md:grid md:gap-6 md-grid-cols-2 p-4">
        <TextInput
            name="name"
            label="Your Name"
            placeholder="Please enter your name"
            register={register}
            options={{ required: "Please enter your name" }}
            errors={errors}
        />
        <TextInput 
            name="userName"
            label="Username"
            placeholder="Please enter your username"
            register={register} 
            options={{ required: "Please enter your username"}}
            errors={errors}
            />
        <TextInput 
            name="email"
            label="Email"
            placeholder="Please enter your email"
            register={register}
            options={{
                required: "Please enter your email",
                pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address"
                }
            }}
            errors={errors}
            />
        <TextInput 
            name="password"
            label="Password"
            placeholder="Please enter your password"
            type="password"
            register={register}
            options={{
                required: "Please enter your password",
                minLength: {
                    value: 12,
                    message: "Password must be at least 12 characters"
                },
                maxLength: {
                    value: 20,
                    message: "Password must be at most 20 characters"
                },
                pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,20}$/,
                    message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                }
            }}
            errors={errors}
            />
            <div className="w-full mb-4">
            <label 
                htmlFor="dob"
                className="block mb-2 text-base font-medium text-soar-dark"
            >
                Date of Birth
            </label>
            <Controller
                control={control}
                name="dob"
                rules={{
                    required: "Please select your date of birth",
                    validate: (value) => {
                        if (value) {
                            const currentDate = dayjs();
                            const minAgeDate = currentDate.subtract(18, 'year');
                            if (dayjs(value).isAfter(minAgeDate)) {
                                return "You must be at least 18 years old";
                            }
                        }
                    }
                }}
                render={({field, fieldState }) => {
                    return (
                        <>
                            <Space direction="vertical" style={{width: '100%'}}>
                                <DatePicker
                                    status={fieldState.error ? 'error': undefined}
                                    ref={field.ref}
                                    name={field.name}
                                    onBlur={field.onBlur}
                                    style={{
                                        width: '100%', 
                                        height: '45px', 
                                        borderRadius: '16px', 
                                        border: `1px solid var(--soar-border-gray)`, 
                                        padding: '12px', 
                                        color: 'var(--trans-date)',
                                    }} 
                                    format={dateFormat}
                                    value={field.value ? dayjs(field.value) : null} 
                                    onChange={(date) => {
                                        field.onChange(date ? date.valueOf() : null);
                                    }}
                                />
                            </Space>

                            { fieldState.error && (
                            <div className="flex items-center space-x-2">
                                <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse"></div>
                                <span className="text-red-500 text-sm mt-1 capitalize">
                                    {fieldState.error ? fieldState.error?.message : ''}
                                    {/* {typeof errors[name]?.message === 'string' ? errors[name]?.message : ''} */}
                                </span>
                            </div>
                        )}
                        </>
                    )
                }}
            >
            </Controller>
        </div>

        <TextInput 
            name="presentAddress"
            label="Present Address"
            placeholder="e.g. San Jose, California, CA"
            register={register}
            options={{ required: "Please enter your present address"}}
            errors={errors}
            />
        <TextInput 
            name="permanentAddress"
            label="Permanent Address"
            placeholder="e.g. San Jose, California, CA"
            register={register}
            errors={errors}
            />
        <TextInput 
            name="city"
            label="city"
            placeholder="e.g. San Jose"
            register={register}
            options={{required: "Please enter your city"}}
            errors={errors}
            />
        <TextInput 
            name="postalCode"
            label="Postal Code"
            placeholder="e.g. 45962"
            register={register}
            options={{
                required: "Please enter your postal code",
                pattern: {
                    value: /^\d{5}$/,
                    message: "Please enter a valid postal code"
                }
            }}
            errors={errors}
            />
        <TextInput 
            name="country"
            label="Country"
            placeholder="e.g. USA"
            register={register}
            options={{required: "Please enter your country"}}
            errors={errors}
        />
        <div className="col-span-2 flex flex-col items-end">
          {submitStatus && (
            <div className={`mb-4 p-3 rounded-lg w-full ${submitStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {submitStatus.message}
            </div>
          )}
          <button 
              className={`w-[190px] bg-soar-dark p-3 rounded-2xl text-white font-medium text-lg ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              type="submit"
              disabled={isSubmitting}
          >
              {isSubmitting ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

    </form>
  )
}

export default UserForm
