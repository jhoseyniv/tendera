import 'express';

declare module 'express' {
  export interface Request {
    user?: {
      sub: string;
      email: string;
      tenant_id: string;
      workspace_id?: string;
      roles?: string[];
    };
  }
}