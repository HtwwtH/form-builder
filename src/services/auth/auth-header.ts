
export default function authHeader(): any {
  const storedUser = localStorage.getItem('user');
  const user = JSON.parse(storedUser ? storedUser : "");

  if (user && user.access_token) {
    return { Authorization: 'bearer ' + user.access_token };
  } else {
    console.log('authHeader fail')
    return {};
  }
}