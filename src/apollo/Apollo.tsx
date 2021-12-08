import { InMemoryCache, IntrospectionFragmentMatcher } from "apollo-cache-inmemory"
import { ApolloClient } from "apollo-client"
import { ApolloLink, Observable } from "apollo-link"
import { setContext } from "apollo-link-context"
import { onError } from "apollo-link-error"
import { createUploadLink } from "apollo-upload-client"
import introspectionQueryResultData from "../fragmentTypes.json"

const URI = process.env.REACT_APP_MONSOON_ENDPOINT || "http://localhost:4000"

const link = createUploadLink({ uri: `${URI}/graphql` })

const authLink = setContext(async (_, { headers: oldHeaders }) => {
  const headers = { ...oldHeaders, application: "spring" }
  // get the authentication token from local storage if it exists
  try {
    // return the headers to the context so httpLink can read them
    const userSession = getUserSession()

    if (!userSession) {
      return { headers }
    }

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
            return forward(operation).subscribe(subscriber)
          })
          .catch(error => {
            // No refresh or client token available, we force user to login
            observer.error(error)
          })
      })
    }
  }
})

export const getUserSession = () => {
  try {
    return JSON.parse(localStorage.userSession)
  } catch (e) {
    console.error("Failed to parse session")
  }
}

const getNewToken = async () => {
  const session = getUserSession()

  const mutation = `
    mutation {
      refreshToken(refreshToken: "${session.refreshToken}")
    }
  `

  const response = await fetch(URI, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: mutation }),
  })

  const { data } = await response.json()
  const newToken = data.refreshToken

  const newUserSession = {
    ...session,
    token: newToken,
  }

  localStorage.setItem("userSession", JSON.stringify(newUserSession))
  return newUserSession
}

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
})

export const client = new ApolloClient({
  cache: new InMemoryCache({ fragmentMatcher }),
  link: ApolloLink.from([authLink, errorLink, link]),
  name: "spring",
})
