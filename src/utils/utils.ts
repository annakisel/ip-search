import { IpRowData } from '../components/IpRow';

export const INITIAL_ROW: IpRowData = { id: 1, value: '', loading: false };

export function validateIp(ip: string): boolean {
  return /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip);
}
