export const OfflinePaymentFlowSVG = ({ className = "w-80 h-64", animated = true }: { className?: string, animated?: boolean }) => (
  <svg
    className={className}
    viewBox="0 0 320 256"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      {/* Gradients */}
      <linearGradient id="storeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF6B9D" />
        <stop offset="100%" stopColor="#FF8E8E" />
      </linearGradient>
      
      <linearGradient id="personGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4F46E5" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
      
      <linearGradient id="bankGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF6B6B" />
        <stop offset="100%" stopColor="#FF8E53" />
      </linearGradient>
      
      <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#C084FC" />
        <stop offset="100%" stopColor="#A855F7" />
      </linearGradient>

      <linearGradient id="bluetoothGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>

      {/* Animations */}
      {animated && (
        <>
          <animate id="bluetoothPulse" attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
          <animate id="dotFlow" attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" />
          <animate id="arrowMove" attributeName="transform" values="translate(0,0);translate(3,0);translate(0,0)" dur="2s" repeatCount="indefinite" />
          <animate id="syncRotate" attributeName="transform" values="rotate(0);rotate(360)" dur="3s" repeatCount="indefinite" />
        </>
      )}
    </defs>

    {/* Store Building */}
    <g transform="translate(20, 40)">
      {/* Store Base */}
      <rect x="0" y="20" width="60" height="50" rx="4" fill="url(#storeGradient)" stroke="#FF6B9D" strokeWidth="2" />
      
      {/* Store Roof */}
      <path d="M-5 20 L30 5 L65 20 Z" fill="#FF8E8E" stroke="#FF6B9D" strokeWidth="2" />
      
      {/* Awning */}
      <path d="M0 20 Q10 15 20 20 Q30 15 40 20 Q50 15 60 20" fill="none" stroke="#FF6B9D" strokeWidth="3" strokeLinecap="round" />
      
      {/* Store Sign */}
      <rect x="15" y="35" width="30" height="20" rx="2" fill="#FFF" stroke="#FFD700" strokeWidth="2" />
      <text x="30" y="47" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#FF6B9D">Store</text>
    </g>

    {/* Bluetooth Icon */}
    <g transform="translate(140, 65)">
      <circle cx="0" cy="0" r="12" fill="url(#bluetoothGradient)" opacity={animated ? "0.8" : "1"}>
        {animated && <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />}
      </circle>
      {/* Bluetooth Symbol */}
      <path d="M-4 -6 L4 0 L-4 6 M4 0 L4 -6 M4 0 L4 6" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>

    {/* Bluetooth Label */}
    <text x="140" y="50" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#3B82F6">Bluetooth</text>

    {/* Connection Dots */}
    <g>
      {/* Left dots */}
      {[100, 108, 116, 124].map((x, i) => (
        <circle key={`left-${i}`} cx={x} cy="77" r="2" fill="#3B82F6">
          {animated && (
            <animate attributeName="opacity" values="0;1;0" dur="1.5s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
          )}
        </circle>
      ))}
      
      {/* Right dots */}
      {[156, 164, 172, 180].map((x, i) => (
        <circle key={`right-${i}`} cx={x} cy="77" r="2" fill="#3B82F6">
          {animated && (
            <animate attributeName="opacity" values="0;1;0" dur="1.5s" begin={`${i * 0.3 + 0.8}s`} repeatCount="indefinite" />
          )}
        </circle>
      ))}
    </g>

    {/* Person Icon */}
    <g transform="translate(160, 110)">
      {/* Head */}
      <circle cx="0" cy="-8" r="8" fill="#FFB347" stroke="#FF8E53" strokeWidth="2" />
      
      {/* Body */}
      <rect x="-12" y="0" width="24" height="20" rx="8" fill="url(#personGradient)" />
      
      {/* Check mark */}
      <circle cx="-20" cy="5" r="8" fill="#10B981" />
      <path d="M-24 5 L-20 9 L-16 1" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      
      {/* Paid label */}
      <text x="-20" y="25" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#10B981">Paid</text>
      <text x="0" y="25" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#10B981">Paid</text>
    </g>

    {/* Cloud Sync */}
    <g transform="translate(240, 30)">
      <path d="M-15 0 Q-15 -10 -5 -10 Q0 -15 10 -10 Q20 -10 20 0 Q15 5 5 5 L-10 5 Q-15 5 -15 0 Z" 
            fill="url(#cloudGradient)" />
      <text x="2" y="2" textAnchor="middle" fontSize="8" fontWeight="bold" fill="white">Sync</text>
      {animated && (
        <animateTransform attributeName="transform" type="rotate" values="0 2 -2;5 2 -2;0 2 -2" dur="3s" repeatCount="indefinite" />
      )}
    </g>

    {/* Later Label */}
    <text x="250" y="55" textAnchor="middle" fontSize="10" fill="#10B981">(later)</text>

    {/* Banks */}
    <g transform="translate(220, 85)">
      {/* Bank A */}
      <rect x="0" y="0" width="25" height="20" rx="2" fill="url(#bankGradient)" />
      <text x="12.5" y="12" textAnchor="middle" fontSize="7" fontWeight="bold" fill="white">Bank A</text>
      
      {/* Bank B */}
      <rect x="30" y="0" width="25" height="20" rx="2" fill="url(#bankGradient)" />
      <text x="42.5" y="12" textAnchor="middle" fontSize="7" fontWeight="bold" fill="white">Bank B</text>
    </g>

    {/* Sync Arrows */}
    <g transform="translate(250, 65)">
      {/* Down arrows */}
      <path d="M-5 5 L0 10 L5 5" stroke="#10B981" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {animated && (
          <animateTransform attributeName="transform" type="translate" values="0,0;0,3;0,0" dur="1.5s" repeatCount="indefinite" />
        )}
      </path>
      <path d="M10 5 L15 10 L20 5" stroke="#10B981" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {animated && (
          <animateTransform attributeName="transform" type="translate" values="0,0;0,3;0,0" dur="1.5s" begin="0.5s" repeatCount="indefinite" />
        )}
      </path>
    </g>

    {/* Connection Lines */}
    <path d="M80 77 Q110 77 128 77" stroke="#3B82F6" strokeWidth="2" fill="none" strokeDasharray="4,4" opacity="0.6" />
    <path d="M152 77 Q170 77 190 90" stroke="#3B82F6" strokeWidth="2" fill="none" strokeDasharray="4,4" opacity="0.6" />
  </svg>
);