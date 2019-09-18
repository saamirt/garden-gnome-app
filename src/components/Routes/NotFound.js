import React from "react";
import {Button, Jumbotron} from "react-bootstrap";

//            TODO:Add lost gnome picture

export default (childProps) => (
    <div>
        <Jumbotron>
            <h1>Page Not Found</h1>
            <p>
                Ooops! Seems like you ended up in the wrong place. Maybe use the gnomes to find your way back!
            </p>
            <p>
                <Button 
                    variant="primary"
                    className={'RedirectLoginButton'}
                    size="lg"
                    onClick={()=>childProps.history.push("/login")}
                >
                    Go back to login
                </Button>
            </p>
            <p>
                <Button 
                    variant="success"
                    className={'RedirectHomeButton'}
                    size="lg"
                    onClick={()=>childProps.history.push("/home")}
                >
                    Go back home
                </Button>
            </p>
        </Jumbotron>
    </div>
  );
