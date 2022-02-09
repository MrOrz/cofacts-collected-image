import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import { ImageWall } from './HashDetail';

export default function HashDetailSkeleton() {
  return (
    <Container>
        <h1>
          <Skeleton variant="text" width="10em" />
        </h1>
        <Box my={1}>
          <Skeleton variant="text" width="20em" />
        </Box>
        <ImageWall>
          {Array.from(Array(6)).map((_, i) =>
            <Skeleton key={i} variant="rectangular" width={160} height={160} />
          )}
        </ImageWall>
    </Container>
  );
}
