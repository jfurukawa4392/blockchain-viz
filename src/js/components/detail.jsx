import React from 'react';

const Detail = (props) => {
  let { detail } = props;
  let description;

  if(detail.hash){
    //block
  } else {
    //node
  }
  
  return(
    <section
      className="detail-inner">
      { detail ? '<pre>' + JSON.stringify(detail) + '</pre>' : null }
    </section>
  );
};

export default Detail;
