import { Fontisto } from '@expo/vector-icons';
import { Center, Icon, Text } from "native-base";

import Logo from "../assets/logo.svg";

import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";

export function SignIn() {
  const { signIn, user } = useAuth()

  // console.log("USER DETAILS: ", user)

  return (
    <Center flex={1} bgColor="gray.900" p={7}>
      <Logo width={212} height={40} />

      <Button
        title="log in with google"
        leftIcon={<Icon as={Fontisto} name="google" color="white" size="md" />}
        type="SECONDARY"
        isLoading={true}
        mt={12}
        onPress={signIn}
      />

      <Text color="white" textAlign="center" mt={4}>
        We do not use any information other {"\n"} than your email to create
        your account.
      </Text>
    </Center>
  )
}
