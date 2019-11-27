import Edit from '../src/components/Campgrounds/Edit/Edit';

const Display = ({ id }) => {
  return <Edit id={id} />;
};

Display.getInitialProps = async ({ query }) => {
  return { id: query.id };
};

export default Display;
