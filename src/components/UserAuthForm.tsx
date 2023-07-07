'use client'

import { cn } from '@/lib/utils'
import { Button } from './ui/Button'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { Icons } from './Icons'
import { useToast } from '@/hooks/use-toast'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function UserAuthForm(props: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast()

  async function loginWithGoogle() {
    setIsLoading(true)
    try {
      await signIn('google')
    } catch (err) {
      toast({
        title: 'There was an error',
        description: 'There was an error loggin in with Google',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('flex justify-center', props.className)} {...props}>
      <Button onClick={loginWithGoogle} size="sm" isLoading={isLoading} className="w-full">
        {isLoading ? null : <Icons.google className="h-4 w-4 mr-2" />}
        Google
      </Button>
    </div>
  )
}
