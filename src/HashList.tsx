import React, { useMemo, useState } from 'react';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';

import HashEntries from './HashEntries';
import { FunctionBar } from './HashListPageSkeleton';

import type { HashMap } from './scripts/genHash';

type Props = {
  hashMap: HashMap;
};

const PAGE_SIZE = 100;
const Formatter = new Intl.NumberFormat();

const HashList: React.FC<Props> = ({hashMap}) => {
  const [page, setPage] = useState(1);

  const hashEntries = useMemo(() =>
    Object.entries(hashMap)
      .sort(([, fns1], [, fns2]) => fns2.length - fns1.length)
      .map(([hash, fileNames]) => ({hash, fileNames, url: hash})),
    [hashMap]
  );

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
    <FunctionBar>
      <span>{Formatter.format(hashEntries.length)} hashes</span>
      {paginationElem}
    </FunctionBar>
    <HashEntries entries={
      hashEntries
        .slice((page-1) * PAGE_SIZE, page * PAGE_SIZE)
    } />
    <FunctionBar>
      <span />
      {paginationElem}
    </FunctionBar>
  </Container>
}

export default HashList;
