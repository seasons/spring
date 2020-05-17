import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloClient } from "apollo-client"
import { ApolloLink } from "apollo-link"
import { setContext } from "apollo-link-context"
import { onError } from "apollo-link-error"
import { HttpLink } from "apollo-link-http"
import { createUploadLink } from "apollo-upload-client"

const URI = "http://localhost:4000"
// const URI = "https://monsoon-staging.seasons.nyc"

const link = new HttpLink({ uri: URI })

const uploadLink = createUploadLink({ uri: URI })

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
    console.error(e, "no access token present!")
    return {
      headers,
    }
  }
})

const errorLink = onError(err => {
  console.error(err)
  // TODO: we need to implement token refreshing here
  // see https://github.com/seasons/harvest/blob/master/src/Apollo/index.ts#L47-L76
  const { networkError } = err
  if (networkError) {
    localStorage.removeItem("userSession")
    if (window.location.pathname !== "/login") {
      window.location.href = "/login"
    }
  }
})

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([authLink, errorLink, uploadLink, link]),
})
