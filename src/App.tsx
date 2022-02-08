import Container from '@mui/material/Container';
import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { BITS } from './util';

const App: React.FC = () => {
  return (
    <Container>
      <Stack sx={{my: 2}}>
        {
          BITS.map(bit => <Link key={bit} to={`/${bit}`}>Hash length = {bit}</Link>)
        }
      </Stack>
    </Container>
  );
}

export default App;
