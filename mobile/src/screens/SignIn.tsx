import { Fontisto } from '@expo/vector-icons';
import { Center, Icon, Text } from "native-base";

import Logo from "../assets/logo.svg";

import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";

export function SignIn() {
  const { signIn, isUserLoading } = useAuth()

  return (
    <Center flex={1} bgColor="gray.900" p={7}>
      <Logo width={212} height={40} />

      <Button
        mt={12}
        type="SECONDARY"
        title="LOG IN WITH GOOGLE"
        leftIcon={<Icon as={Fontisto} name="google" color="white" size="md" />}
        isLoading={isUserLoading}
        onPress={signIn}
        _loading={{
          _spinner: {color:'white'}
        }}
      />

      <Text color="white" textAlign="center" mt={4}>
        We do not use any information other {"\n"} 
        than your email to create your account.
      </Text>
    </Center>
  )
}
