'use client'

import { Button, Callout, Spinner, Text, TextField } from '@radix-ui/themes'
import 'easymde/dist/easymde.min.css'
import { Controller, useForm } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { createIssueSchema } from '@/app/validationSchemas'
import { z } from 'zod'
import ErrorMessage from '@/components/ErrorMessage'

// Dynamically import SimpleMDE to ensure it only runs on the client
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })


// interface IssueForm { // --> 1:17:29 -- https://youtu.be/J9sfR6HN6BY?t=4649
//   title: string
//   description: string
// }

type IssueForm = z.infer<typeof createIssueSchema> // Generating interface from zod schema - Neat !!!

const NewIssuePage = () => {
  const router = useRouter()
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  })
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle form submission
  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true)
      await axios.post('/api/issues', data)
      router.push('/issues')
    } catch (error) {
      setIsSubmitting(false)
      setError('An unexpected error occurred')
    }
  })


  return (
    <div className='max-w-xl'>

      {/* Error message */}
      {error && <Callout.Root color='red' className='mb-5'>
        <Callout.Text>
          {error}
        </Callout.Text>
      </Callout.Root>}

      {/* Form */}
      <form className='space-y-4' onSubmit={onSubmit}>

        <TextField.Root placeholder="Title" {...register('title')}>
          <TextField.Slot />
        </TextField.Root>

        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        {/* {errors.title && <div className='text-red-500'>{errors.title.message}</div>} */}

        <Controller
          name="description"
          control={control}
          render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        {/* {errors.description && <div className='text-red-500'>{errors.description.message}</div>} */}

        <Button disabled={isSubmitting}>Submit New Issue {isSubmitting && <Spinner />}</Button>

      </form>

    </div>
  )
}

export default NewIssuePage
