import { useRoute } from "@react-navigation/native";
import { HStack, useToast, VStack } from "native-base";
import { useEffect, useState } from "react";
import { Share } from "react-native";
import { EmptyMyPollList } from "../components/EmptyMyPollList";
import { Guesses } from "../components/Guesses";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { Option } from "../components/Option";
import { PollCardProps } from "../components/PollCard";
import { PollHeader } from "../components/PollHeader";
import { api } from "../services/api";

interface RouteParams {
  id: string;
}

export function Details() {
  const [optionSelected, setOptionSelected] = useState<'guesses' | 'ranking'>('guesses')
  const [isLoading, setIsLoading] = useState(false)
  const [pollDetails, setPollDetails] = useState<PollCardProps>({} as PollCardProps)

  const route = useRoute()
  const toast = useToast()

  const {id} = route.params as RouteParams

  async function fetchPollDetails() {
    try{
      setIsLoading(true)

      const response = await api.get(`/polls/${id}`)
      setPollDetails(response.data.poll)
    } catch(err) {
      console.log(err)

      toast.show({
        title: 'Unable to load poll details',
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleCodeShare() {
    await Share.share({
      message: pollDetails.code
    })
  }

  useEffect(() => {
    fetchPollDetails();
  }, [id])

  if(isLoading){
    return <Loading />
  }
  
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header 
        title={pollDetails.title}
        showBackButton
        showShareButton
        onShare={handleCodeShare}
      />

      {pollDetails._count?.participants > 0 ? 
        <VStack px={5} flex={1}>
          <PollHeader data={pollDetails} />

          <HStack bgColor="gray.800" p={1} rounded="sm" mb={8}>
            <Option 
              title="Your guesses"
              isSelected={optionSelected === 'guesses'}
              onPress={() => setOptionSelected('guesses')}
            />

            <Option 
              title="Group Ranking"
              isSelected={optionSelected === 'ranking'}
              onPress={() => setOptionSelected('ranking')}
            />
          </HStack>

          <Guesses pollId={pollDetails.id} code={pollDetails.code} />
        </VStack>
        : 
        <EmptyMyPollList code={pollDetails.code} />
      }
       
    </VStack>
  )
}