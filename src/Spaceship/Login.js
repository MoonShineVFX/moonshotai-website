import React ,{useState,useContext,useEffect }from "react";
import { Navigate } from "react-router-dom";
import {auth} from '../firebaseConfig/fireauth'
import {  signInWithEmailAndPassword , onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "./Auth";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
function Login() {
  const [user , setUser] = useState({})
  onAuthStateChanged(auth , (currentUser)=>{
    setUser(currentUser)
  })

  const handleLogin =  async event =>{
    event.preventDefault()
    const [ email , password] = event.target.elements
    console.log( email.value , password.value)
    try {
      await signInWithEmailAndPassword(auth, email.value , password.value)
      .then((userCredential) => {
        console.log(userCredential.user)
      })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect( ()=>{
    document.body.style.backgroundColor = `#000`;
  },[])
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Navigate to="/spaceship" />;
  }

  return (
    <div className="login  w-2/5 mx-auto p-4 rounded-md mt-10 ">


      <form className="login__container" onSubmit={handleLogin}>
        <Card className="w-96">

          <CardBody className="flex flex-col gap-4">
            <Input label="Email" size="lg"  type="email" />
            <Input label="Password" size="lg" type="password" />

          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth  type="submit">
              登入
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              如果您並非網站管理者，請勿嘗試登入以免觸法。
            
            </Typography>
          </CardFooter>
        </Card>


      </form>
    </div>
  );
}
export default Login;