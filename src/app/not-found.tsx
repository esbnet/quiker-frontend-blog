'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const {  push } = useRouter()
  return (
    <div className='flex flex-col justify-center items-center gap-4 h-screen'>
      <h2 className='text-4xl'>- 404 -</h2>
      <p>Página nao encontrada</p>
      <Button variant={'destructive'} onClick={() => push('/')}>Voltar a pagina inicial</Button>
    </div>
  )
}