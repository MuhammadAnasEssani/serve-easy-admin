import {Layout} from 'antd'
import React from 'react'

const {Content} = Layout
export default function ProtectedLayout() {
  // const navigate = useNavigate()
  // const [loading, setLoading] = useState<boolean>(true);
  // const [authenticated, setAuthenticated] = useState<boolean>(true);
  // const init = async () => {
  //     try {
  //         setLoading(true);
  //         const user = await UserAuthService.verifyLogin()
  //         if (user.data.profile.roles.find((role:any)=>role.id === 2)) return UserAuthService.logout()
  //         // const isLogin = UserAuthService.getToken()
  //         if(!user){
  //             setAuthenticated(false)
  //         }
  //     } catch (exc) {
  //         console.error(exc);
  //     } finally {
  //         setLoading(false);
  //     }
  // }
  //
  // useLayoutEffect(() => {
  //     init();
  // }, []);

  return <>{/*{authenticated ? <Outlet/> : <Navigate to={'/'}></Navigate>}*/}</>
}
