// one

// const Header = (props) => {
//   return (
//     <header>
//       {/* <h1>Tasks Tracker</h1> */}
//       <h1>{props.title}</h1>
//     </header>
//   );
// }

// Header.defaultProps = {
//   title: "Tasks Tracker"
// }

// export default Header

// two

// import PropTypes from "prop-types";
// import Button from "./Button";

// const Header = ({ title, onAdd, showAdd }) => {
//   // const onClick = ()=> {
//   //   console.log("Click");

//   // }
//   return (
//     <header className="header">
//       <h1>{title}</h1>
//       <Button
//         // color="green"
//         // text="Add"
//         color={showAdd ? "red" : "green"}
//         text={showAdd ? "Close" : "Add"}
//         // onClick={onClick}
//         onClick={onAdd}
//       />
//     </header>
//   );
// };

// // Header.defaultProps = {
// //   title: "Tasks Tracker",
// // };

// Header.propTypes = {
//   title: PropTypes.string.isRequired,
// };

// export default Header;

// final code :

import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Button from './Button'

const Header = ({ title = "Task Tracker", onAdd, showAdd }) => {
  const location = useLocation();

  return (
    <header className="header">
      <h1>{title}</h1>
      {location.pathname === "/" && (
        <Button
          color={showAdd ? "red" : "green"}
          text={showAdd ? "Close" : "Add"}
          onClick={onAdd}
        />
      )}
    </header>
  );
};

// Header.defaultProps = {
//   title: 'Task Tracker',
// }

Header.propTypes = {
  title: PropTypes.string.isRequired,
}

// CSS in JS
// const headingStyle = {
//   color: 'red',
//   backgroundColor: 'black',
// }

export default Header
