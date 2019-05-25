import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Shop from "../components/shop"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Welcome to the shop</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Shop />
  </Layout>
)

export default IndexPage
