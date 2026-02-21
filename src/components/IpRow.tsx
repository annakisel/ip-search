
import './IpRow.scss';

export interface IpRowData {
  id: number;
  value: string;
  loading: boolean;
  error?: string;
  country?: string;
  flagUrl?: string;
  time?: string;
}

interface IpRowProps {
  row: IpRowData;
  index: number;
  onChange: (id: number, value: string) => void;
  onBlur: (id: number) => void;
}

const IpRow: React.FC<IpRowProps> = ({ row, index, onChange, onBlur }) => (
  <div className="ip-row">
    <span className="idx">{index + 1}</span>
    <input
      type="text"
      value={row.value}
      onChange={e => onChange(row.id, e.target.value)}
      onBlur={() => onBlur(row.id)}
      disabled={row.loading}
      placeholder=""
    />
    {row.loading && <span className="loader" title="Searching..." />}
    {row.country && row.flagUrl && (
      <span className="country-info">
        <img src={row.flagUrl} alt={row.country} style={{ width: 24, marginLeft: 8 }} />
        {row.time && <span className="local-]time">{row.time}</span>}
      </span>
    )}
    {row.error && <span className="error">{row.error}</span>}
  </div>
);

export default IpRow;
