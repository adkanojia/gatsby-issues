import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image";

// markup
const Menu = (props) => {
  console.log(props);
  const {
    data: {
      // restaurant,
      // restaurantMenu,
      items: {
        nodes: items
      },
      itemCategories: {
        nodes: itemCategories
      },
      placeholderImage,
    },
    location
  } = props;
  const {hash} = location;
  
  const filteredItems = hash !== ''
    ? items.filter((item) => item.itemCategories.nodes.map((category) => hash === `#${category.slug}`)
      .includes(true))
    : items;

  console.log(filteredItems);
  
  const getImageSrc = (item) => {
    if( item.featuredImage && item.featuredImage.node ){
      return item.featuredImage.node.localFile
    } 
    return placeholderImage;
  }

  return (
    <div>
      <ul>
      {itemCategories.map((cat) => {
        return <li  style={{display: "inline-block", marginRight: '20px'}} key={cat.id}><a href={`#${cat.slug}`}>{cat.name}</a></li>
      })}
      </ul>
      <ul style={{listStyleType: 'none', padding: 0}}>
      {filteredItems.map((item) => {
        return (
        <li style={{display: "inline-block", position: 'relative', width: '30%', marginRight: '3%'}} key={item.id}>
          <div>

          <GatsbyImage image={getImage(getImageSrc(item))} alt={item.title}></GatsbyImage>
          </div>
          {item.title}
          </li>
          )
      })}
      </ul>
    </div>
  )
}

export const query = graphql`
query MenuQuery {
  restaurant: wpRestaurant(id: {eq: "dGVybTozNg=="}) {
    id
    slug
  }
  restaurantMenu: wpRestaurantMenu(id: {eq: "dGVybTo0OTU="}) {
    id
    name
    slug
  }
  itemCategories: allWpItemCategory(filter: {language: {code: {eq: EN}}}) {
    nodes {
      id
      slug
      name
    }
  }
  items: allWpItem(
    filter: {
      restaurants: {nodes: {elemMatch: {id: {eq: "dGVybTozNg=="}}}},
      restaurantMenus: {nodes: {elemMatch: {id: {eq: "dGVybTo0OTU="}}}}
    }
  ) {
    nodes {
      id
      title
      itemDetails {
        shortDescription
      }
      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, aspectRatio: 1)
            }
          }
        }
      }
      itemCategories {
        nodes {
          id
          slug
          name
        }
      }
    }
    totalCount
  }
  placeholderImage: file(
    relativePath: { eq: "carta-item.jpeg" }
  ) {
    childImageSharp {
      gatsbyImageData(layout: FULL_WIDTH)
    }
  }
}
`;

export default Menu
