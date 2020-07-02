import React from "react";
import { connect } from "react-redux";

import "./collection.styles.scss";
import CollectionItem from "../../components/collection-item/collection-item.component";
import { selectCollection } from "../../redux/shop/shop.selector";

const CollectionPage = ({ collection }) => {
  const { title, items } = collection;
  return (
    <div className="collection-page">
      <div className="title">{title}</div>
      <div className="items">
        {items.map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

// const mapState = createStructuredSelector({
//   collection: selectCollection
// });

// drugi argument u mapState() su propsi iz same komponente ..ovdje koristim njezine match propse
const mapState = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state)
});

export default connect(mapState)(CollectionPage);
