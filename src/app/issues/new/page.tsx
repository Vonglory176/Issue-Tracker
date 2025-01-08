'use client'

import { Button, TextField } from '@radix-ui/themes'
import 'easymde/dist/easymde.min.css'
import { Controller, useForm } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

// Dynamically import SimpleMDE to ensure it only runs on the client
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })


interface IssueForm {
  title: string
  description: string
}

const NewIssuePage = () => {
  const router = useRouter()
  const { register, control, handleSubmit } = useForm<IssueForm>()

  return (
    <form className='max-w-xl space-y-4' onSubmit={handleSubmit(async (data) => {
      await axios.post('/api/issues', data)
      router.push('/issues')
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
  )
}

export default NewIssuePage
