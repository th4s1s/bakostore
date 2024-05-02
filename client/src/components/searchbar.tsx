import type { FC } from 'react';
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';
import {
  Box,
  Container,
  InputAdornment,
  OutlinedInput,
  SvgIcon
} from '@mui/material';

export const SearchBar: FC = () => (

        <Container maxWidth="md">
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <OutlinedInput
              fullWidth
              placeholder="Search..."
              startAdornment={(
                <InputAdornment position="start">
                  <SvgIcon>
                    <SearchMdIcon />
                  </SvgIcon>
                </InputAdornment>
              )}
            />
          </Box>
        </Container>

);
