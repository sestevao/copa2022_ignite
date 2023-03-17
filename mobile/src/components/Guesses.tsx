import { FlatList, useToast } from 'native-base';
import { useEffect, useState } from 'react';

import { api } from '../services/api';
import { EmptyMyPollList } from './EmptyMyPollList';

import { Game, GameProps } from './Game';
import { Loading } from './Loading';

interface Props {
  pollId: string;
  code: string;
}

export function Guesses({ pollId, code }: Props) {
  const [isLoading, setIsLoading] = useState(true)
  const [games, setGames] = useState<GameProps[]>([])
  const [firstTeamPoints, setFirstTeamPoints] = useState('') 
  const [secondTeamPoints, setSecondTeamPoints] = useState('') 

  const toast = useToast()

  async function fetchGames() {
    try{
      setIsLoading(true)

      const response = await api.get(`/polls/${pollId}/games`)
      setGames(response.data.games)
    } catch(err){
      toast.show({
        title: 'Unable list the games!',
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleGuessConfirm(gameId: string) {
    try{
      // setIsLoading(true)
      if(!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
        return toast.show({
          title: 'Tell the score to guess!',
          placement: 'top',
          bgColor: 'red.500'
        })
      }

      await api.post(`/polls/${pollId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints),
      })

      toast.show({
          title: 'Guess submit successfully!',
          placement: 'top',
          bgColor: 'green.500'
        })

    } catch(err) {
      console.log(err)

      toast.show({
        title: 'Unable to submit guess!',
        placement: 'top',
        bgColor: 'red'
      })
    } 
  }

  useEffect(() => {
    fetchGames()
  }, [])

  if(isLoading) {
    return <Loading />
  }

  return (
    <>
      <FlatList 
// ``````_contentContainerStyle={{pb: 10}}
      data={games}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Game 
          data={item}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
          onGuessConfirm={() => handleGuessConfirm(item.id)}
        />
      )}
      ListEmptyComponent={() => <EmptyMyPollList code={code} />}
    />
    </>
  );
}
