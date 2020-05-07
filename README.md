# Spring

## Internal admin dashboard for managing customers and products

## Setup

1. `yarn start`
2. Install Apollo DevTools. They help.

## Overview

We are using

- `react-admin` as the scaffolding
- Devias Kit for the layout, components, and structure
- `MaterialUI` for components
- `styled-components` as css-in-jss processor of choice
- `Apollo` as the data provider to interface with Monsoon, our backend API, and
- `Redux` as the data store.

## State

Isn't state the best?

## State Gotchas

Most views use components provided by `react-admin` to make use of the `dataProvider` directly. This works well for straightforward tables where we need to fetch a list of resources, paginate, filter, etc.

Custom queries are executed using `react-admin`'s `useQueryWithStore`, which fetches the resource and stores it in the admin part of the `Redux` store.

Mutations, on the other hand, are executed with `Apollo`, which means state will not be optimistically updated without some extra work. A component that executes a mutation and needs to reflect newly updated data will have an `adminKey` passed in as a prop, and will dispatch an action used by `react-admin` to update it with the new data. Alternatves are a hard reload or forcing a refetch. Both result in extraneous requests going to the server. The expectation is that components will not do this, and will optimistically update instead.
