import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Thumbnail = styled.div`
  padding: 0;
  img {
    width: 100%;
    padding-top: 10px;
  }
  .caption(padding: 9px;);
`;

interface IntProps {
  obj: {
    id: string;
    image: string;
    name: string;
  };
}

const Body = (props: IntProps) => {
  return (
    <div className="col-md-3 col-sm-6">
      <Thumbnail>
        <img alt="" src={props.obj.image} />
        <div>
          <h4>{props.obj.name}</h4>
        </div>

        <p>
          <Link
            href={`/campground?id=${props.obj.id}`}
            as={`/campground/${props.obj.id}`}
          >
            <a className="btn btn-primary">More info</a>
          </Link>
        </p>
      </Thumbnail>
    </div>
  );
};

export default Body;
