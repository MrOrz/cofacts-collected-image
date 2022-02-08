import { styled } from '@mui/system';
import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export const FunctionBar = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px 0',
});

export default function HashPageSkeleton() {
  return (
    <Container>
      <FunctionBar>
        <Skeleton variant="text" sx={{width: '10em'}} />
        <Skeleton variant="text" sx={{width: '15em'}} />
      </FunctionBar>
      <Stack spacing={1}>
        <Skeleton variant="text" />
        <Stack spacing={1}>
          {Array.from(Array(3)).map((_, i) =>
            <Skeleton key={i} variant="rectangular" width={210} height={118} />
          )}
        </Stack>
      </Stack>
    </Container>
  );
}
