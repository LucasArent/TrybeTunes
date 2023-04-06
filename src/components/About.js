import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class About extends Component {
  render() {
    const { artistName, tagId, collectionId } = this.props;
    return (
      <Link
        id="linkId"
        data-testid={ `link-to-album-${collectionId}` }
        to={ `/album/${collectionId}` }
      >
        <div>
          <p>{tagId}</p>
          <p>{artistName}</p>
        </div>
      </Link>
    );
  }
}
About.propTypes = {
  artistName: PropTypes.string.isRequired,
  tagId: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
};

export default About;
