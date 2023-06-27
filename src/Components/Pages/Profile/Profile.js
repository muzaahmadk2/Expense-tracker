import React, { useContext,useEffect, useRef, useState } from "react";
import { Link,redirect } from "react-router-dom";
import "./Profile.css";
import { Form, Button, Row, Col,Spinner } from "react-bootstrap";
import AuthContext from "../../Store/Auth-Context";

const Profile = () => {
  const authCtx = useContext(AuthContext);
  const [isLoading,setIsLoading] = useState(false);
  const fullNameRef = useRef("");
  const photoUrlRef = useRef("");

  const cancelHandler = () => {
    <redirect to="/" />
  }

  const getData = () => {
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyB9ZONkhe98ETh530TgqVIj63rXXVIWPDs";
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        idToken: authCtx.token,
      }),
      header: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = data.error.message;
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        data.users.forEach((element) => {
          console.log(data.users);
          fullNameRef.current.value = element.displayName
            ? element.displayName
            : "";
          photoUrlRef.current.value = element.photoUrl ? element.photoUrl : "";
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  }
  useEffect(() => {
    getData();
  },[]);

  const updateUserHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const fullName = fullNameRef.current.value;
    const photoUrl = photoUrlRef.current.value;
    if (fullName.length < 4 || photoUrl.length < 4) {
      alert("please enter all fields");
      return;
    }
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB9ZONkhe98ETh530TgqVIj63rXXVIWPDs";
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        idToken: authCtx.token,
        displayName: fullName,
        photoUrl: photoUrl,
        returnSecureToken: true,
      }),
      header: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = data.error.message;
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        alert("Profile Updated!!!");
        fullNameRef.current.value = "";
        photoUrlRef.current.value = "";
        
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <>
      <div className="bor">
        <span className="quote">Winners Never Quit, Quitters Never Win</span>
        <span className="complete">
          Your profile is <b>64%</b> completed.A complete profile has <br />
          higher chances of landing a job
        </span>
      </div>
      <div className="contain">
        <div className="contact"><h5>Contact Details</h5><span><Link to="/"><Button
                variant="outline-danger"
                type="submit"
                onClick={cancelHandler}
              >
                Cancel
              </Button></Link> </span></div>
        <form>
            <Row className="mb-3">
                <Col>
                <label>Full Name</label>
                <input type="text"  placeholder="FullName" ref={fullNameRef} required></input></Col>
                <Col><label>Photo Url</label>
                <input type="text" placeholder="Photo Url" ref={photoUrlRef} required></input></Col>
            </Row>
            {!isLoading ? <Button
                variant="danger"
                type="submit"
                onClick={updateUserHandler}
              >
                Update
              </Button> : <Spinner variant="danger" animation="border"/> }
        </form>
      </div>
    </>
  );
};

export default Profile;
