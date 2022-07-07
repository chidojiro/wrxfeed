import { useLocation } from 'react-router-dom';

export function useLegacyQuery(): URLSearchParams {
  return new URLSearchParams(useLocation().search);
}
