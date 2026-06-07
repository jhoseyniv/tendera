export function getJwtPayload() {

  const token =
    localStorage.getItem(
      'access_token',
    );

  if (!token) {
    return null;
  }

  const payload =
    token.split('.')[1];

  return JSON.parse(
    atob(payload),
  );
}