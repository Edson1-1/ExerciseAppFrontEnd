
import Unauthorized from '../UnauthorizedComponent/Unauthorized'

function RoleBasedRouting({
  component: Component, role, ...rest
}) {

  const grantPermission = (role) => {
    const checkRole = localStorage.getItem('role')
    let auth = false
    role.forEach(rol => {
      if (checkRole === rol) {
        auth = true
      }
    })

    return auth

  }

  return (
    <>
      { grantPermission(role) && (
        <Component {...rest} />

      )}
      {
        !grantPermission(role) && (
          <Unauthorized />
          //  Unauthorized is skippable
        )
      }
    </>
  );
}

export default RoleBasedRouting