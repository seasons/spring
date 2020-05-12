import get from "lodash/get"
import buildOpenCrudProvider, { buildQuery } from "ra-data-opencrud"
import overridenQueries from "./queries"
import { client } from "./apollo"

// Override some queries with our own queries
const enhanceBuildQuery = buildQuery => introspectionResults => (fetchType, resourceName, params) => {
  const fragment = get(overridenQueries, `${resourceName}.${fetchType}`)

  return buildQuery(introspectionResults)(fetchType, resourceName, params, fragment)
}

export const buildProvider = async () => {
  return buildOpenCrudProvider({
    client,
    buildQuery: enhanceBuildQuery(buildQuery),
  } as any)
}
