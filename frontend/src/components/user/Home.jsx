import React from 'react'
import Body from './Body'
import { useEffect, useState } from "react"
import { getMenu } from "../../api/api"
import Footer from './Footer'

function Home() {
  const [menu, setMenu] = useState([])

  useEffect(() => {
    getMenu().then(setMenu)
  }, [])

  return (
    <div>
      <Body />
      <Footer />

    </div>
  )
}

export default Home
