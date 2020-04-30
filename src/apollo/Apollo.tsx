import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloClient } from "apollo-client"
import { ApolloLink } from "apollo-link"
import { setContext } from "apollo-link-context"
import { onError } from "apollo-link-error"
import { HttpLink } from "apollo-link-http"

const link = new HttpLink({
  uri: "http://localhost:4000",
  // uri: "https://monsoon-staging.seasons.nyc",
})

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  try {
    // return the headers to the context so httpLink can read them
    const userSession = JSON.parse(localStorage.userSession)
    const { token } = userSession
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    }
  } catch (e) {
    console.error("no access token present!")
    return {
      headers,
    }
  }
})

const errorLink = onError(err => {
  console.error(err)
  //   if (networkError) {
  //     console.log("networkError", networkError)
  //     localStorage.removeItem("userSession")
  //     window.location.href = "/login"
  //     // User access token has expired
  //     // if (networkError. === 401) {
  //     // }
  //   }
})

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([authLink, errorLink, link]),
})
