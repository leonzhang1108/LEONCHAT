import React from 'react'
const Loading = ({ isLoading, error }) => {
  let res = null
  isLoading && (res = <div>Page is loading...</div>)
  error && (res = <div>Sorry, there was a problem loading the page.</div>)
  return res
}

export default Loading