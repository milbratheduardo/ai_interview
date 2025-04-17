import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

const page = async () => {
  return (
    <>
      <section className='card-cta'>
        <div className='flex flex-col gap-6 max-w-lg'>
          <h2>Fique preparado para entrevistas com treinamento e feedback feito por IA</h2>
          <p className='text-lg'>
            Pratique com perguntas reais e receba feedback instantâneo.
          </p>

          <Button asChild className='btn-primary max-sm:w-full'>
            <Link href="/sign-in">
              Entrar
            </Link>
          </Button>        
        </div>

        <Image src="/robot.png" alt='robo-dude' width={400} height={400} className='max-sm:hidden' />

      </section>

     
    </>
  )
}

export default page