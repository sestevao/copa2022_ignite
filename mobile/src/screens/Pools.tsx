import { Octicons } from '@expo/vector-icons';
import { Icon, VStack } from "native-base";

import { Button } from "../components/Button";
import { Header } from "../components/Header";

export function Pools() {
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="My Pools" />

      <VStack mt={6} mx={5} borderBottomWidth={1} borderBottomColor="gray.600">
        <Button leftIcon={<Icon as={Octicons} name="search" color="black" size="md" />} title="SEARCH POOL BY CODE" />
      </VStack>


    </VStack>
  )
}