import styled from 'styled-components';
import { rem } from 'utils/style';
import {
    FileInputRedux,
    DatepickerRedux,
    TextareaRedux,
    ImageLoaderRedux
} from 'components/Form/ReduxForm';

export const StyledFileInput = styled(FileInputRedux)`
    flex-grow: 1;
`;

export const StyledDatepicker = styled(DatepickerRedux)`
    flex-shrink: 0;
    margin-right: ${rem(5)};
`;

export const StyledTextarea = styled(TextareaRedux)`
    padding: 10px;
`;

export const StyledImageLoader = styled(ImageLoaderRedux)`
    margin-right: ${rem(5)};
`;
