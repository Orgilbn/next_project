"use client"

import React, { use } from 'react'
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';

import { Input } from './ui/input'
import { Textarea } from './ui/textarea';
import MdEditor from '@uiw/react-md-editor';
import Button  from './ui/button';
import { Send } from 'lucide-react';
import { formSchema } from '@/lib/validation';
import z from 'zod';
import { toast } from 'sonner';

const StartupForm = () => {
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [pitch , setPitch] = React.useState("");
  const router = useRouter();

  const handleSubmit = async (prevState: any, formData: FormData) => {
    const formValues = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      link: formData.get("link") as string,
      pitch
    }
    
    try{
      await formSchema.parseAsync(formValues);
      console.log(formValues);
      
      // Clear errors on successful validation
      setErrors({});
      
      // const result = await createIdea(prevState, formData, pitch);
      // console.log(result)
      // if(result.status === "SUCCESS"){
      //   toast.success("Your startup idea has been submitted successfully!");
      //   router.push(`/startup/${result.id}`);
      // }
      // return result;
      
      return { status: "SUCCESS" };
    }catch(error){
      if(error instanceof z.ZodError){
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);

        toast.error("Please check your input and try again.");

        return { 
          ...prevState,
          title: formValues.title,
          description: formValues.description,
          category: formValues.category,
          link: formValues.link,
          error: "Validation failed", 
          status: "ERROR" 
        };
      }
      toast.error("An unexpected error occurred. Please try again.");

      return { 
        ...prevState,
        error: "An unexpected error occurred", 
        status: "ERROR" 
      };
    }
  }
  
  const [state, formAction, isPending] = useActionState(handleSubmit, { 
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className='startup-form'>
      <div>
        <label htmlFor='title' className='startup-form-label'>Title</label>
        <Input 
          id='title' 
          name='title' 
          className='startup-form-input' 
          required 
          placeholder='Startup Title'
          defaultValue={state?.title || ""}
        />
        {errors.title && <p className='startup-form-error'>{errors.title}</p>}
      </div>
      <div>
        <label htmlFor='description' className='startup-form-label'>Description</label>
        <Textarea 
          id='description' 
          name='description' 
          className='startup-form-textarea' 
          required 
          placeholder='Startup Description'
          defaultValue={state?.description || ""}
        />
        {errors.description && <p className='startup-form-error'>{errors.description}</p>}
      </div>
      <div>
        <label htmlFor='category' className='startup-form-label'>Category</label>
        <Input 
          id='category' 
          name='category' 
          className='startup-form-input' 
          required 
          placeholder='Startup Category (Tech, Health, Education)'
          defaultValue={state?.category || ""}
        />
        {errors.category && <p className='startup-form-error'>{errors.category}</p>}
      </div>
      <div>
        <label htmlFor='link' className='startup-form-label'>Image URL</label>
        <Input 
          id='link' 
          name='link' 
          className='startup-form-input' 
          required 
          placeholder='Startup Image URL'
          defaultValue={state?.link || ""}
        />
        {errors.link && <p className='startup-form-error'>{errors.link}</p>}
      </div>
      <div data-color-mode='light'>
        <label htmlFor='pitch' className='startup-form-label'>Pitch</label>
        <MdEditor 
          value={pitch} 
          onChange={(value) => setPitch(value as string)} 
          id='pitch'
          preview='edit'
          height={300}
          style={{ borderRadius: 20, overflow: 'hidden' }}
          textareaProps={{
            placeholder: 'Briefly describe your idea and what problem it solves',
          }}
          previewOptions={{
            disallowedElements: ["style"]
          }}
          />
        {errors.pitch && <p className='startup-form-error'>{errors.pitch}</p>}
      </div>
      <Button type='submit' className='startup-form-btn text-white' disabled={isPending}>
        {isPending ? "Submitting..." : "Submit Your Pitch"}
        <Send className='size-6 ml-2'></Send>
      </Button>
    </form>
  )
}

export default StartupForm