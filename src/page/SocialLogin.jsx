import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const SocialLogin = () => {

    const { signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleGoogleSignIn = () =>{
        signInWithGoogle()
        .then(result =>{
            setUser(result)
            navigate('/')
        })
        .catch(error =>{
            setError({...error, login: err.code})
        })
    }

    return (
        <div>
            <button onClick={handleGoogleSignIn} className="btn btn-outline glass bg-black text-white w-full"><span className="text-xl"><FcGoogle /></span> Continue with Google</button>
        </div>
    );
};

export default SocialLogin;