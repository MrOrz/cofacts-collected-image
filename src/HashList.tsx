import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';

import type { HashMap } from './scripts/genHash';

type Props = {
  hashMap: HashMap;
};

const PAGE_SIZE = 100;
const Formatter = new Intl.NumberFormat();

const HashList: React.FC<Props> = ({hashMap}) => {
  const [page, setPage] = useState(1);

  const hashEntries = useMemo(() => {
    return Object.entries(hashMap).sort(([, fns1], [, fns2]) => fns2.length - fns1.length)
  }, [hashMap]);

  const handlePageChange = (e: unknown, value: number) => {
    setPage(value);
  }

  const paginationElem =(
    <Pagination
      count={Math.ceil(hashEntries.length / PAGE_SIZE)}
      page={page}
      onChange={handlePageChange}
    />
  );

  return <Container>
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      my: 1
    }}>
      <span>{Formatter.format(hashEntries.length)} hashes</span>
      {paginationElem}
    </Box>
    <ul>
      {
        hashEntries
          .slice((page-1) * PAGE_SIZE, page * PAGE_SIZE)
          .map(([hash, fileNames]) => (
            <li key={hash}>
              <Link to={hash}>
                <code>{hash}</code> ({fileNames.length})
              </Link>
              <ul>
                {
                  fileNames.slice(0, 3).map(fn => (
                    <li key={fn}><img height="100" src={`/images/${fn}`} alt={fn} /></li>
                  ))
                }
              </ul>
            </li>
          ))
      }
    </ul>
    <Box sx={{
      display: 'flex',
      justifyContent: 'flex-end',
      my: 1,
    }}>
      {paginationElem}
    </Box>
  </Container>
}

export default HashList;
