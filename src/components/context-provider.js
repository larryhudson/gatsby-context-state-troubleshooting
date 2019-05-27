import React, { useState, useContext, useEffect } from "react"
import PropTypes from "prop-types"

export const MyContext = React.createContext()

/**
 * Manages the shopping cart, which is persisted in local storage.
 * The cart and related methods are shared through context.
 */
const MyProvider = ({ children }) => {
  const products = ["product1", "product2", "product3"]

  /** Load cart from local storage. Initialize if not present or incorrect.
   *  This is the main context value - the 'count' value is derived from this.
   */
  const [contents, setContents] = useState(() => {
    let localCart = false
    try {
      localCart = JSON.parse(localStorage.getItem("exampleCart"))
    } catch (err) {
      console.error(err.message)
    }
    if (!localCart || !Array.isArray(localCart)) return []
    return localCart
  })

  // every time contents changes, update localStorage.
  // this isn't working. it seems that it isn't re-rendering when setContents is called.
  useEffect(() => {
    try {
      localStorage.setItem("exampleCart", JSON.stringify(contents))
    } catch (err) {
      console.error(err)
    }
  }, [contents])

  /** The number of items in the cart */
  const count = contents.reduce((sum, [_, quantity]) => sum + quantity, 0)

  /** Sets quantity of item with `id` */
  function set(id, quantity) {
    console.log("contents before update:", contents)

    // contents is array of [id, count], so we need to find by [0]
    const index = contents.findIndex(item => item[0] === id)
    setContents(state => {
      const newState = [...state]
      if (index !== -1) {
        newState[index] = [id, quantity]
      } else {
        newState.push([id, quantity])
      }
      return newState
    })

    console.log("contents after update:", contents)
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
