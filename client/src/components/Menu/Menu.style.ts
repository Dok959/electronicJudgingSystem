import { styled } from '@mui/material/styles';
import { Button, Link, Typography } from '@mui/material';

export const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  outline: 'none',
  fontSize: 16,
  background: 'none',
  transition: 'none',
  fontFamily: 'Times New Roman',
  fontWeight: 500,
  border: 'none',
  minWidth: 'auto',
  padding: 0,
  '&:hover': {
    background: 'none',
    border: 'none',
    boxShadow: 'none',
  },
  '&:active': {
    background: 'none',
    border: 'none',
    boxShadow: 'none',
  },
  '&:focus': {
    background: 'none',
    border: 'none',
    boxShadow: 'none',
  },
});

export const NavLink = styled(Link)`
  font-family: 'Nunito';
  color: ${(props) => props.theme.palette.secondary.main};
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 15px;

  /* ${(props) => props.theme.breakpoints.down('md')} {
    max-width: 100%;
    margin-top: 50px;
    flex: 1 0 50%;
  } */
`;

export const LecturesElementTitle = styled(Typography)`
  margin-bottom: 35px;
`;

// export const SpeakerInfo = styled.div`
//   position: relative;
//   display: flex;
//   align-items: flex-start;
//   justify-content: space-between;
//   margin-bottom: 20px;

//   &:last-child {
//     margin-bottom: 0;
//   }

//   img {
//     width: 100px;
//     height: 100px;
//   }

//   div {
//     width: calc(100% - 110px);
//     padding-left: 10px;
//     display: flex;
//     flex-direction: column;

//     span {
//       display: block;
//     }
//   }
// `;
