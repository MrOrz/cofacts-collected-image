import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { BITS } from './util';

const App: React.FC = () => {
  return (
    <Stack>
      {
        BITS.map(bit => <Link key={bit} to={`/${bit}/hashes`}>Hash length = {bit}</Link>)
      }
    </Stack>
  );
}

export default App;
