import { useState, useEffect } from 'react'
import axios from 'axios'


export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get(baseUrl)
        setResources(response.data)
      } catch (error) {
        console.error('Failed to fetch resources:', error)
      }
    }
    fetchResources()
  }, [baseUrl])


  const create = async (resource) => {
    try {
      const response = await axios.post(baseUrl, resource)
      setResources((prevResources) => prevResources.concat(response.data))
    } catch (error) {
      console.error('Failed to create resource:', error)
    }
  }

  return [resources, { create }]
}


export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    input : {
      type,
      value,
      onChange,
    },
    reset
  }
}