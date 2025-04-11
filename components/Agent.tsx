import { cn } from '@/lib/utils';
import Image from 'next/image'
import React from 'react'

enum CallStatus {
    INACTIVE = 'Inativa',
    CONNECTING = 'Conectando',
    ACTIVE = 'Ativa',
    FINISHED = 'Finalizada',
}

const Agent = ({userName}: AgentProps) => {
  const callStatus = CallStatus.INACTIVE;  
  const isSpeaking = true;
  const messages = [
    'Whats your name?',
    'Duduzeira :)'
  ];

  const lastMessage = messages[messages.length - 1];


  return (
    <>
     <div className='call-view'>
        <div className='card-interviewer'>
            <div className='avatar'>
                <Image src="/ai-avatar.png" alt='vapi' width={65} height={54} className="object-cover" />
                {isSpeaking && <span className='animate-speak' />}
            </div>
            <h3>Entrevistador IA</h3>
        </div>
        <div className='card-border'>
            <div className='card-content'>
                <Image src="/user-avatar.png" alt='user avatar' width={540} height={540} className="rounded-full object-cover size-[120px]"/>
                <h3>{userName}</h3>
            </div>
        </div>
    </div>
    {messages.length > 0 && (
        <div className='transcript-border'>
            <div className='transcript'>
                <p key={lastMessage} className={cn(
                    'transition-opacity duration-500 opacity-0', 'animate-fadeIn opacity-100'
                )}>
                    {lastMessage}
                </p>
            </div>

        </div>
    )}

    <div className='w-full flex justify-center'>
        {callStatus !== 'Ativa' ? (
            <button className='relative btn-call'>
                <span className={cn('absolute animate-ping rounded-full opacity-75', callStatus !== 'Conectando' & 'hidden')} />
                <span>
                    {callStatus === 'Inativa' || callStatus === 'Finalizada' ? 'Chamada' : '. . .'} 
                </span>
            </button>
        ) : (
            <button className='btn-disconnect'>
                Finalizar Entrevista
            </button>
        )}

    </div>
    </>   
  )
}

export default Agent