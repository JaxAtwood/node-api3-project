// import React from 'react';
// import axios from "axios";

// function FetchUsers() {

//     const [users, setUsers] = React.useState([]);
  
//     React.useEffect(() => {
  
//       axios
//           .get("http://localhost:5000/api/users")
//           .then(res => {
//               console.log(res.data);
//               setUsers(res.data.results);
//           });
//     }, []);
  
//     if (!users) {
//       return (<div>Loading Information</div>)
//     }

//   return (
//     <div>
//     {users.map(user => {
//       return (
//         <div>
//             <h3>User: {user.name}</h3>
//         </div>
//       );
//     })}
//   </div>
//   );
// }

// export default FetchUsers;
