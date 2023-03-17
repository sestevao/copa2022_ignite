import { useCallback, useState } from 'react';
import { Octicons } from '@expo/vector-icons';
import { FlatList, Icon, useToast, VStack } from "native-base";
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Loading } from '../components/Loading';
import { EmptyPollList } from '../components/EmptyPollList';
import { PollCard, PollCardProps } from '../components/PollCard';

import { api } from '../services/api';

export function Polls() {
  const [isLoading, setIsLoading] = useState(true)
  const [polls, setPolls] = useState<PollCardProps[]>([])

  const {navigate} = useNavigation()

  const toast = useToast()

  async function fetchPolls() {
    try{
      setIsLoading(true)
      const response = await api.get('/polls')
      setPolls(response.data.polls)
    } catch(err){
      console.log(err)
      toast.show({
        title: 'Unable to load polls!',
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(useCallback(() => {
    fetchPolls()
  }, []))

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="MY POLLS" />

      <VStack mt={6} mx={5} borderBottomWidth={1} borderBottomColor="gray.600" pb={4} mb={4}>
        <Button 
          leftIcon={<Icon as={Octicons} name="search" color="black" size="md" />} 
          title="SEARCH POLL BY CODE"
          onPress={() => navigate('find')}
        />
      </VStack>

      {isLoading ? 
        <Loading /> 
        : 
        <FlatList
          px={5}        
          data={polls}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <PollCard
              data={item}
              onPress={() => navigate('details', { id: item.id})}
            />
          )}
          ListEmptyComponent={<EmptyPollList/>}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{pb: 10}}
        />
      }

    </VStack>
  )
}