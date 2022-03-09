import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {

  let toys = props.toys
  return(
    <div id="toy-collection">
      {toys.map(toy => 
        <div key={toy.id}>
          <ToyCard toy={toy} deleteToy={props.deleteToy} addLikes={props.addLikes} />
        </div>
      )}
    </div>
  );

}

export default ToyContainer;