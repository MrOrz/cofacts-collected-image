import { styled } from '@mui/system';
import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';
import { Entries } from './HashEntries';

export const FunctionBar = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px 0',
});

export default function HashListPageSkeleton() {
  return (
    <Container maxWidth={false}>
      <FunctionBar>
        <Skeleton variant="text" sx={{width: '10em'}} />
        <Skeleton variant="text" sx={{width: '15em'}} />
      </FunctionBar>
      <Entries>
        {Array.from(Array(3)).map((_, i) => <div>
          <Skeleton variant="text" sx={{width: '8em'}} />
          <Skeleton key={i} variant="rectangular" width={300} height={200} />
        </div>
        )}
      </Entries>
    </Container>
  );
}
