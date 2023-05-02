import *  as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { PageContext } from '../context';

export default function BasicPagination(countPost) {
  const [pageContext, setPageContext] = React.useContext(PageContext);
  const [countPage, setCountPage] = React.useState(10)
    React.useEffect(() => {
        setCountPage(Math.ceil(countPost.countPost/12));
    }, [countPost] )
  return (
    <Stack spacing={2}>
      <Pagination page={pageContext} onChange={(_, num) => setPageContext(num)} count={countPage} shape='rounded' />
    </Stack>
  );
}