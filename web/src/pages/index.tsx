import Image from "next/image"
import { FormEvent, useState } from "react"

import appPreviewImg from "../assets/app-nlw-copa-preview.png"
import iconCheckImg from "../assets/icon-circle.svg"
import logoImg from "../assets/logo.svg"
import usersAvatar from "../assets/users-avatares.png"

import { api } from "../lib/axios"

interface HomeProps {
  poolCount: number
  guessCount: number
  userCount: number
}

export default function Home(props: HomeProps) {
  const [poolTitle, setPoolTitle] = useState("")

  async function createPool(event: FormEvent) {
    event.preventDefault()

    try {
      const response = await api.post("/pools", {
        title: poolTitle,
      })

      const { code } = response.data

      await navigator.clipboard.writeText(code)
      alert(
        "Pool created successfully! The code has been transferred to the clipboard!"
      )

      setPoolTitle("")
    } catch (err) {
      console.log(err)
      alert("Failed to create pool, please try again!")
    }
  }

  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 items-center gap-28">
      <main className="w-[489px] gap-7 flex flex-col items-flex-start">
        <Image src={logoImg} alt="NLW Copa 2022 logo" />

        <h1 className="mt-14 text-white text-5xl leading-tight font-bold">
          Create your own cup pool and share it with friends!
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image src={usersAvatar} alt="" className="w-36 h-12" />

          <strong className="text-gray-100 text-xl">
            <span className="text-green-500 pr-2">+{props.userCount}</span>
            people are already using
          </strong>
        </div>

        <form onSubmit={createPool} className="mt-10 flex gap-2">
          <input
            type="text"
            name=""
            required
            placeholder="What is the name of your pool?"
            className="flex-1 text-gray-100 bg-gray-800 py-4 px-6 w-full gap-8 border-2 border-gray-600 rounded placeholder:text-gray-100"
            onChange={(event) => setPoolTitle(event.target.value)}
            value={poolTitle}
          />

          <button
            type="submit"
            className="uppercase bg-yellow-500 text-gray-900 py-4 px-6 rounded gap-2 font-bold text-sm hover:bg-yellow-700 "
          >
            create my pool
          </button>
        </form>

        <p className="text-gray-300 text-sm leading-relaxed w-[400px]">
          After creating your pool, you will receive a unique code that you can
          use to invite others 🚀
        </p>

        <div className="mt-10 pt-10 border-t border-gray-600 flex justify-center items-center text-gray-100">
          <div className="flex items-center justify-center gap-6">
            <Image src={iconCheckImg} alt="" />

            <div className="flex flex-col">
              <span className="text-2xl font-bold">+{props.poolCount}</span>
              <p className="">pools created</p>
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
  const [poolCountResponse, guessCountResponse, userCountResponse] =
    await Promise.all([
      api.get("pools/count"),
      api.get("guesses/count"),
      api.get("users/count"),
    ])

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count,
    },
  }
}
