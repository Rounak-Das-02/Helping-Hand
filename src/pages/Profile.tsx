// import Header from '../components/Header';
// import ProfileBanner from '../components/ProfileBanner';
// import ProfilePost from '../components/ProfilePost';

// import { ProfileContainer } from '../styles/profile';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Profile() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  // console.log(currentUser.uid)
  return (
    <>
      {currentUser ? (
        <>
          Logged In As : <br></br>
          {currentUser.displayName}
        </>
      ) : (
        // <ProfileContainer>
        //   <Header />
        //   <ProfileBanner />
        //   <ProfilePost />
        // </ProfileContainer>
        <>
          <a href="/signin">You are not Logged in, click here to log in</a>
          {navigate("/signin")}
        </>
      )}
    </>
  );
}

export default Profile;
