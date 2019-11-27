import { authInitialProps } from '../src/lib/auth';
import New from '../src/components/Campgrounds/NewCampground/NewCampground';

const NewCampgrounds = () => {
  return <New />;
};

NewCampgrounds.getInitialProps = authInitialProps(true, '/login');

export default NewCampgrounds;
