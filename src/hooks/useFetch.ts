import axios from 'axios'

import React, { useState, useCallback, useEffect } from 'react'

type Error = string
type Loading = boolean

function useFetch<T>(
  url: string
): [
  T | undefined,
  Loading,
  Error,
  React.Dispatch<React.SetStateAction<string>>
] {
  const [datas, setDatas] = useState<T>()
  const [error, setError] = useState<Error>('')
  const [loading, setLoading] = useState<Loading>(false)

  const fetchURL = useCallback(async () => {
    setLoading(true)

    try {
      const response = await axios.get(url)

      setDatas(response.data)
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        const message = err.response.data.message
        setError(message)
      }
    } finally {
      setLoading(false)
    }
  }, [url])

  useEffect(() => {
    fetchURL()
  }, [])

  return [datas, loading, error, setError]
}

export default useFetch
