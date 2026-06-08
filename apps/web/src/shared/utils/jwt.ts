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

export function getTenantId() {

  const payload =
    getJwtPayload();

  return payload?.tenant_id;
}

export function getUserId() {

  const payload =
    getJwtPayload();

  return payload?.sub;
}