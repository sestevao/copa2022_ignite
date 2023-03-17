import Image from "next/image"
import { FormEvent, useState } from "react"

import appPreviewImg from "../assets/app-nlw-copa-preview.png"
import iconCheckImg from "../assets/icon-circle.svg"
import logoImg from "../assets/logo.svg"
import usersAvatarImg from "../assets/users-avatares.png"

import { api } from "../lib/axios"

interface HomeProps {
  pollCount: number
  guessCount: number
  userCount: number
}

export default function Home(props: HomeProps) {
  const [pollTitle, setPollTitle] = useState('')

  async function createPoll(event: FormEvent) {
    event.preventDefault()

    try {
      const response = await api.post("/polls", {
        title: pollTitle,
      })

      const { code } = response.data

      await navigator.clipboard.writeText(code)
      alert(
        "Poll created successfully! The code has been transferred to the clipboard!"
      )

      setPollTitle("")
    } catch (err) {
      console.log(err)
      alert("Failed to create poll, please try again!")
    } 
  } 

  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 items-center gap-28">
      <main className="w-[489px] gap-7 flex flex-col items-flex-start">
        <Image src={logoImg} alt="NLW Copa 2022 logo" />

        <h1 className="mt-14 text-white text-5xl leading-tight font-bold">
          Create your own cup poll and share it with friends!
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image src={usersAvatarImg} alt="" className="w-36 h-12" />

          <strong className="text-gray-100 text-xl">
            <span className="text-green-500 pr-2">+{props.userCount}</span>
            people are already using
          </strong>
        </div>

        <form onSubmit={createPoll} className="mt-10 flex gap-2">
          <input
            type="text"
            name=""
            required
            placeholder="What is the name of your poll?"
            className="flex-1 text-gray-100 bg-gray-800 py-4 px-6 w-full gap-8 border-2 border-gray-600 rounded placeholder:text-gray-100"
            onChange={(event) => setPollTitle(event.target.value)}
            value={pollTitle}
          />

          <button
            type="submit"
            className="uppercase bg-yellow-500 text-gray-900 py-4 px-6 rounded gap-2 font-bold text-sm hover:bg-yellow-700 "
          >
            create my poll
          </button>
        </form>

        <p className="text-gray-300 text-sm leading-relaxed w-[400px]">
          After creating your poll, you will receive a unique code that you can use to invite others 🚀
        </p>

        <div className="mt-10 pt-10 border-t border-gray-600 flex justify-center items-center text-gray-100">
          <div className="flex items-center justify-center gap-6">
            <Image src={iconCheckImg} alt="" />

            <div className="flex flex-col">
              <span className="text-2xl font-bold">+{props.pollCount}</span>
              <p className="">polls created</p>
            </div>
          </div>

          <div className="border border-gray-600 w-16 h-0 rotate-90"></div>

          <div className="flex items-center justify-center gap-6">
            <Image src={iconCheckImg} alt="" />

            <div className="flex flex-col">
              <span className="text-2xl font-bold">+{props.guessCount}</span>
              <p className="">guesses sent</p>
            </div>
          </div>
        </div>
      </main>

      <Image
        src={appPreviewImg}
        alt="2 phones showing a preview of front end page"
        quality={100}
      />
    </div>
  )
}

/* Retrieving the values. */
export const getServerSideProps = async () => {
  const [pollCountResponse, guessCountResponse, userCountResponse] =
    await Promise.all([
      api.get("polls/count"),
      api.get("guesses/count"),
      api.get("users/count"),
    ])
  
  return {
      props: {
          pollCount: pollCountResponse.data.count,
          guessCount: guessCountResponse.data.count,
          userCount: userCountResponse.data.count
        },
      }
      
}
