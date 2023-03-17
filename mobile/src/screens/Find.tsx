import { useState } from "react";
import { Heading, useToast, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { api } from "../services/api";

export function Find() {
  const [isLoading, setIsLoading] = useState(false)
  const [code, setCode] = useState('')

  const toast = useToast()
  const {navigate} = useNavigation()

  async function handleJoinPoll(){
    try{
      setIsLoading(true)

      if(!code.trim()) {
        toast.show({
          title: 'Enter the code',
          placement: 'top',
          bgColor: 'red.500',
        })
      }

      await api.post('/polls/join', {code})

      toast.show({
        title: 'You have successfully joined the poll!',
        placement: 'top',
        bgColor: 'green.500',
      })

      navigate('polls')

    } catch(err){
      console.log(err)
      setIsLoading(false)

      if(err.response?.data?.message === 'Poll not found!') {
        toast.show({
          title: 'Unable to find poll',
          placement: 'top',
          bgColor: 'red.500'
        });

        return
      }

      if(err.response?.data?.message === 'You already joined this poll!') {
        toast.show({
          title: 'You are already in this poll',
          placement: 'top',
          bgColor: 'red.500'
        });

        return
      }
    }
  }

  return(
    <VStack flex={1} bgColor="gray.900">
      <Header title='Search by code' showBackButton />

      <VStack mt={8} mx={5} alignItems="center">        
        <Heading fontFamily="heading" color="white" fontSize="xl" mb={8} textAlign="center">
          Find a poll using {"\n"} 
          it's unique code
        </Heading>
        
        <Input mb={2} placeholder="What is the code of your poll?" autoCapitalize="characters" onChangeText={setCode} />
        
        <Button title="SEARCH POLL" onPress={handleJoinPoll} />
      </VStack>
    </VStack>
  )
}