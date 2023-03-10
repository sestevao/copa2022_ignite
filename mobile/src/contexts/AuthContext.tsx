import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { createContext, ReactNode, useEffect, useState } from "react";

WebBrowser.maybeCompleteAuthSession();

interface UserProps {
  name: string;
  avatarUrl: string;
}

export interface AuthContextDataProps {
  user: UserProps;
  isUserLoading: boolean;
  signIn: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps)
  const [isUserLoading, setIsUserLoading] = useState(false)

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: `273369300458-hbrbqj7ci1ql3hvrtrsmvn401la7pi5l.apps.googleusercontent.com`,
    redirectUri: AuthSession.makeRedirectUri({useProxy: true}),
    scopes: ['profile', 'email']
  })

  async function signIn() {
    // console.log(`Let's login`)
    try {
      setIsUserLoading(true);
      await promptAsync();

    } catch(err) {
      console.log(err)
      throw err
      
    } finally {
      setIsUserLoading(false)
    }
  }

  async function signInWithGoogle(access_token: string){
    console.log('AUTHENTICATION TOKEN ===> ', access_token)
  }

  useEffect(() => {
    if(response?.type === 'success' && response.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken)
    }
  },[response]);
  
  return (
    <AuthContext.Provider value={{
        signIn,
        isUserLoading,
        user,
      }}>
      {children}
    </AuthContext.Provider>
  )
}
