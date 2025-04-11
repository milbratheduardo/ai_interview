import Agent from '@/components/Agent'
import React from 'react'

const page = () => {
  return (
    <>
        <h3>Criação da Entrevista</h3>

        <Agent userName="Você" userId="user1" type="generate" />
    </>
  )
}

export default page