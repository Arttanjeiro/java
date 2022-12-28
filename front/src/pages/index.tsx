import { GetStaticProps } from 'next';
import Image from 'next/image';
import { FormEvent, useState } from 'react';
import djImage from '../assets/djs-para-festa-de-formatura.jpg';
import iconCheckImg from '../assets/icon.svg';
import { api } from '../lib/axios';

interface Props {
  lisPessoa: number;
}
export default function Home({ lisPessoa }: Props) {
  const [createPessoa, setCreatePessoa] = useState('')

  async function createPessoas(event: FormEvent) {
    event.preventDefault()
    try {
      const response = await api.post('/users/create', {


        name: createPessoa
      })
      const { code } = response.data
      await navigator.clipboard.writeText(code)
      alert('Pessoa criado com sucesso o nome foi copiado para área de tranferênceia!')
    } catch (error) {
      alert('Falha ao cria pessoa , tente novamente!')
    }

  }
  return (


    <div className='max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center'>
      <main>
        <h1 className="mt-14 text-gray-100 text-5xl font-bold leading-tight ">
        Colocando  pessoas na lista da festa</h1>
        <form onSubmit={createPessoas} 
        className='mt-20 flex gap-2'>
          <input
          className='flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600
                     text-sm text-gray-100'
            type="text"
            required
            maxLength={50}
            minLength={10}
           
            placeholder='Qual nome da Pessoa completo'
            onChange={event => setCreatePessoa(event.target.value)}
            value={createPessoa}
          />
          <button
          className='bg-yellow-500 px-4 py-4 rounded text-gray-900 font-bold
                       text-sm uppercase hover:bg-yellow-700'
            type='submit'

          >Colocar na lista

          </button>

        </form>
        <div className='mt-10 pt-10 border-t border-gray-600 flex 
                          items-center justify-between text-gray-100'>
          <div className='flex items-center gap-6'>
            < Image src={iconCheckImg} alt="" />
            <div className='flex flex-col'>
            <span className='font-bold text-2xl'> +{lisPessoa}</span>
            <span className='text-xl'> Pessoa está na lista</span>
            </div>

          </div>
        </div>

      </main>
      <Image
      className=' rounded hover:animate-spin '
      src={djImage}
      alt="Dj tocando"
      quality={100}
      />
    </div>

  )
}

export const getStaticProps: GetStaticProps = async () => {

  const [usersCount] = await Promise.all([
    api.get("/users/conte")

  ])



  return {
    props: {
      lisPessoa: usersCount.data
    },
    revalidate: 60*60*4 //  4 hours
  }
}
