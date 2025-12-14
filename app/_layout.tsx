import { Slot, Stack } from "expo-router";
import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { SafeAreaView } from "react-native-safe-area-context";
import {

  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
export default function RootLayout() {
  const queryClient = new QueryClient()
  return  (
    <ClerkProvider tokenCache={tokenCache}>
 
      <QueryClientProvider client={queryClient}>
        

   
        <Slot />
     </QueryClientProvider>
    </ClerkProvider>
  )
}
