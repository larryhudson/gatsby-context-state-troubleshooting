import React, { useState, useContext, useEffect } from "react"
import PropTypes from "prop-types"

export const MyContext = React.createContext()

/**
 * Manages the shopping cart, which is persisted in local storage.
 * The cart and related methods are shared through context.
 */
const MyProvider = ({ children }) => {
  const products = ["product1", "product2", "product3"]

  /** Load cart from local storage. Initialize if not present or incorrect. */
  const [contents, setContents] = useState(() => {
    let localCart = false
    try {
      localCart = JSON.parse(localStorage.getItem("example-cart"))
    } catch (err) {
      console.error(err.message)
    }
    if (!localCart || !Array.isArray(localCart)) return []
    return localCart
  })

  // every time contents changes, update localStorage
  useEffect(() => {
    try {
      localStorage.setItem("example-cart", JSON.stringify(contents))
    } catch (err) {
      console.error(err)
    }
  }, [contents])

  /** The number of items in the cart */
  let count = contents.reduce((sum, [_, quantity]) => sum + quantity, 0)

  /** Sets quantity of item with `id` */
  function set(id, quantity) {
    const index = contents.findIndex(item => item[0] === id)
    setContents(state => {
      if (index !== -1) {
        state[index] = [id, quantity]
      } else {
        state.push([id, quantity])
      }
      return state
    })
  }

  /** Increments item with `id` by `quantity`, which defaults to 0 */
  function add(id, quantity = 1) {
    const currentCount = () => {
      // contents is array of [id, count], so we need to find by [0] then get [1]
      try {
        return contents.find(item => item[0] === id)[1]
      } catch {
        return false
      }
    }
    set(id, (currentCount() || 0) + quantity)
  }

  /** Removes item with `id` */
  function remove(id) {
    setContents(state => {
      return state.filter(item => item[0] !== id)
    })
  }

  const ctx = {
    contents,
    count,
    add,
    set,
    remove,
    products,
  }

  return <MyContext.Provider value={{ ...ctx }}>{children}</MyContext.Provider>
}

MyProvider.propTypes = {
  children: PropTypes.any.isRequired,
}

export default MyProvider
