'use client'

import { Button, Callout, TextField } from '@radix-ui/themes'
import 'easymde/dist/easymde.min.css'
import { Controller, useForm } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { useState } from 'react'

// Dynamically import SimpleMDE to ensure it only runs on the client
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })


interface IssueForm {
  title: string
  description: string
}

const NewIssuePage = () => {
  const router = useRouter()
  const { register, control, handleSubmit } = useForm<IssueForm>()
  const [error, setError] = useState<string | null>(null)

  return (
    <div className='max-w-xl'>

      {/* Error message */}
      {error && <Callout.Root color='red' className='mb-5'>
        <Callout.Text>
          {error}
        </Callout.Text>
      </Callout.Root>}

      {/* Form */}
      <form className='space-y-4' onSubmit={handleSubmit(async (data) => {
        try {

          await axios.post('/api/issues', data)
          router.push('/issues')

        } catch (error) {

          setError('An unexpected error occurred')

        }
      })}>

        <TextField.Root placeholder="Title" {...register('title')}>
          <TextField.Slot />
        </TextField.Root>

        <Controller
          name="description"
          control={control}
          render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
        />
        <Button>Submit New Issue</Button>

      </form>

    </div>
  )
}

export default NewIssuePage
