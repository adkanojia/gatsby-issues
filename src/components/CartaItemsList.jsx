import React from 'react';
import PropTypes from 'prop-types';
// import EmptyContent from '../misc/EmptyContent';
import CartaItem from './CartaItem';
import * as styles from './CartaItemsList.module.scss';

function CartaItemsList(props) {
  const { items } = props;

  // const renderEmptyContent = () => (
  //   <EmptyContent>
  //     <h2 className="text-center">No items found.</h2>
  //   </EmptyContent>
  // );
  const renderContent = () => (
    items.length ? (
      <div className={styles.cartaItemsListContainer}>
        <div className={styles.cartaItemsListRow}>
          {items.map((item) => <CartaItem key={item.id} item={item} />)}
        </div>
      </div>
    ) : null);

  return (renderContent());
}
CartaItemsList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      itemCategories: PropTypes.shape({
        nodes: PropTypes.arrayOf(
          PropTypes.shape({
            slug: PropTypes.string.isRequired,
          }).isRequired,
        ).isRequired,
      }).isRequired,
    }),
  ).isRequired,

};
export default CartaItemsList;
