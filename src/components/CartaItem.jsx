import React from 'react';
import PropTypes from 'prop-types';

// import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import * as styles from './CartaItem.module.scss';

function CartaItem(props) {
  // const data = useStaticQuery(graphql`
  //   query {
  //     placeholderImage: file(
  //       relativePath: { eq: "placeholders/carta-item.jpeg" }
  //     ) {
  //       childImageSharp {
  //         gatsbyImageData(aspectRatio: 1, layout: CONSTRAINED)
  //       }
  //     }
  //   }
  // `);

  const { item } = props;

  const {
    featuredImage,
  } = item;

  const renderItemImage = () => {
    if (!featuredImage) return null;

    const {
      node: {
        localFile: itemImage, altText,
      },
    } = featuredImage;
    // Image or placehoder
    // || {
    //   node: {
    //     localFile: data.placeholderImage, altText: item.title,
    //   },
    // };
    return (
      <div className={styles.cartaItemThumbnailWrap}>
        <GatsbyImage
          image={getImage(itemImage)}
          alt={altText}
        />
      </div>
    );
  };

  return (
    <div className={styles.cartaItem}>
      {renderItemImage()}
      <h2 className={styles.cartaItemTitle}>{item.title}</h2>
      <div
        className={styles.cartaItemDescription}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: item.itemDetails.shortDescription }}
      />
    </div>
  );
}

CartaItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    itemDetails: PropTypes.shape({
      shortDescription: PropTypes.string,
    }).isRequired,
    featuredImage: PropTypes.shape({
      node: PropTypes.shape({
        altText: PropTypes.string.isRequired,
        localFile: PropTypes.shape({}).isRequired,
      }),
    }),
  }).isRequired,

};
export default CartaItem;
