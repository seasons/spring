import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloClient } from "apollo-client"
import { ApolloLink, Observable } from "apollo-link"
import { setContext } from "apollo-link-context"
import { onError } from "apollo-link-error"
import { HttpLink } from "apollo-link-http"
import { Auth0Client } from "@auth0/auth0-spa-js"
import { createUploadLink } from "apollo-upload-client"

const auth0 = new Auth0Client({
  domain: process.env.AUTH0_DOMAIN!,
  client_id: process.env.AUTH0_CLIENT_ID!,
  redirect_uri: window.location.href,
  useRefreshTokens: true,
})

const URI = "http://localhost:4000"
// const URI = "https://monsoon-staging.seasons.nyc"

const link = new HttpLink({ uri: URI })

const uploadLink = createUploadLink({ uri: URI })

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  try {
    // return the headers to the context so httpLink can read them
    const userSession = getUserSession()
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

const errorLink = onError(({ networkError, operation, forward }) => {
  if (networkError) {
    console.log("networkError", networkError)

    const error = networkError as any

    // User access token has expired
    if (error.statusCode === 401) {
      // We assume we have both tokens needed to run the async request
      // Let's refresh token through async request
      return new Observable(observer => {
        getNewToken()
          .then(userSession => {
            operation.setContext(({ headers = {} }) => ({
              headers: {
                // Re-add old headers
                ...headers,
                // Switch out old access token for new one
                authorization: `Bearer ${userSession.token}` || null,
              },
            }))
          })
          .then(() => {
            const subscriber = {
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            }

            // Retry last failed request
            forward(operation).subscribe(subscriber)
          })
          .catch(error => {
            // No refresh or client token available, we force user to login
            observer.error(error)
          })
      })
    }
  }
})

const getUserSession = () => {
  return JSON.parse(localStorage.userSession)
}

const getNewToken = async () => {
  const session = await getUserSession()
  const newToken = await auth0.getTokenSilently()

  const newUserSession = {
    ...session,
    token: newToken.accessToken,
  }
  localStorage.setItem("userSession", newUserSession)
  return newUserSession
}

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([authLink, errorLink, uploadLink, link]),
})
