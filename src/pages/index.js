import * as React from "react"
import { graphql } from "gatsby"

// markup
const IndexPage = (props) => {
  console.log(props);
  return (
    <div>Home Page</div>
  )
}

export const query = graphql`
query MyQuery {
  allWpRestaurant {
    nodes {
      id
      name
    }
    totalCount
  }
  allWpRestaurantMenu {
    nodes {
      id
      name
    }
    totalCount
  }
  allWpItem {
    totalCount
    nodes {
      id
      title
    }
  }
  itemCategories: allWpItemCategory {
    nodes {
      id
      slug
      name
    }
    totalCount
  }
}
`;

export default IndexPage
