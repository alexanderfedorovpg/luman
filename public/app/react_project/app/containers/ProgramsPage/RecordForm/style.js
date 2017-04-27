import styled from 'styled-components';
import { rem } from 'utils/style';
import { FileInput, Datepicker } from 'components/Form';

export const StyledFileInput = styled(FileInput)`
    flex-grow: 1;
`;

export const StyledDatepicker = styled(Datepicker)`
    flex-shrink: 0;
    margin-right: ${rem(5)};
`;
