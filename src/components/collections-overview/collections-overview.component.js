import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./collections-overview.styles.scss";
import CollectionPreview from "../collection-preview/collection-preview.component";
import { selectCollectionForPreview } from "../../redux/shop/shop.selector";

const CollectionsOverview = ({ collections }) => {
  return (
    <div className="collections-overview">
      {collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </div>
  );
};

const mapState = createStructuredSelector({
  collections: selectCollectionForPreview
});

export default connect(mapState)(CollectionsOverview);
