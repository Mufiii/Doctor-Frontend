import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import { Button } from "@material-tailwind/react";

const AdminHomePage = () => {
  const [block, setBlock] = useState([]);
  const { authTokens } = useContext(AuthContext);
  const { id } = useParams();

  const BlockUserHandler = async (action) => {

    const response = await fetch(`http://127.0.0.1:8000/userprofile/${parseInt(id)}/`, {
      method: action == undefined ? 'GET' : 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authTokens.access}`
      },
      body: action != undefined ? JSON.stringify({ is_active: action }) : undefined
    });

    const data = await response.json();
    
    if (response.status === 200) {
      action == undefined ? setBlock(data) : setBlock(prevView => ({ ...prevView, is_active: action }));

    } else {
      action != undefined ? alert(data.msg) : null;
    }
  }

  useEffect(() => {
    BlockUserHandler();
  }, []);

  return (
    <div className='admin-panel'>
      <div className="user-card one">
        <i className="fa-solid fa-user"></i>
        <h4 className="card-title mt-5">Username : {block.username}</h4> {/* Use user data here */}
        <p className="card-text">Email Address : {block.email}</p> {/* Use user data here */}
        <div className="btn-holder mt-4">
          {block.is_active ? (
            <Button color="red" className="btn btn-outline-primary" type="submit" name='blocked' onClick={() => BlockUserHandler(false)} >block</Button>
          ) : (
            <Button color="blue" className="btn btn-outline-primary" type="submit" name='blocked' onClick={() => BlockUserHandler(true)} >unblock</Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminHomePage;
