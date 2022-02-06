import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function HashPageSkeleton() {
  return (
    <Stack spacing={1}>
      <Skeleton variant="text" />
      <Stack spacing={1}>
        {Array.from(Array(3)).map((_, i) =>
          <Skeleton key={i} variant="rectangular" width={210} height={118} />
        )}
      </Stack>
    </Stack>
  );
}
