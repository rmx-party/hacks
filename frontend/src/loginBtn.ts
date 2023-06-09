import {magic} from './magic'

export async function setupLoginBtn(element: HTMLButtonElement, afterLogin, afterLogout) {
  console.log(`login setup`, magic.user)
  let loggedIn = await magic.user.isLoggedIn()
  let accounts = magic.accounts
  let button = element

  const logout = async () => {
    await magic.user.logout()
    loggedIn = false
    accounts = []
    renderLogin()
    afterLogout()
    console.log(`logout`, magic.user, magic.accounts)
  }
  const startLogin = async () => {
    accounts = await magic.wallet.connectWithUI()

    loggedIn = await magic.user.isLoggedIn()
    if (loggedIn) {
      afterLogin()
      renderLogout()
    } else {
      renderLogin()
    }
    console.log(`login`, magic.user, accounts)
  }

  const renderLogin = () => {
    console.log(`renderLogin`)
    button.removeEventListener('click', () => logout())
    button.innerHTML = `Log In`
    button.addEventListener('click', () => startLogin())
  }
  const renderLogout = () => {
    console.log(`renderLogout`)
    button.removeEventListener('click', () => startLogin())
    button.innerHTML = `Log Out`
    button.addEventListener('click', () => logout())
  }

  if (await magic.user.isLoggedIn()) {
    afterLogin()
    renderLogout()
  } else {
    renderLogin()
  }
  button.removeAttribute('disabled')
}
