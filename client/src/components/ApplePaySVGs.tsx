// Apple Pay Style Premium SVG Icons - High Quality, Vector Based

export const ApplePayFaceIDSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM6 8a2 2 0 114 0 2 2 0 01-4 0zM8 14c-3.86 0-7 2.69-7 6v2h14v-2c0-3.31-3.14-6-7-6z"/>
    <path d="M16 4a4 4 0 100 8 4 4 0 000-8zM14 8a2 2 0 114 0 2 2 0 01-4 0zM16 14c-1.4 0-2.7.4-3.8 1H23v-2c0-3.31-3.14-6-7-6z"/>
  </svg>
);

export const ApplePayCreditCardSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="6" width="20" height="12" rx="3" fill="none"/>
    <path d="M2 10h20" strokeLinecap="round"/>
    <rect x="6" y="14" width="4" height="1" rx="0.5" fill="currentColor"/>
    <circle cx="18" cy="14" r="1" fill="currentColor"/>
  </svg>
);

export const ApplePayNFCSVG = ({ className = "w-6 h-6", animated = false }: { className?: string, animated?: boolean }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <g className={animated ? "animate-pulse" : ""}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c3.87 0 7 3.13 7 7s-3.13 7-7 7-7-3.13-7-7 3.13-7 7-7z" opacity="0.3"/>
      <circle cx="12" cy="12" r="3" opacity="0.6"/>
      <circle cx="12" cy="12" r="1"/>
    </g>
  </svg>
);

export const ApplePayTapSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="9"/>
  </svg>
);

export const ApplePayTransitSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 16c0 .88.39 1.67 1 2.22V20a1 1 0 001 1h1a1 1 0 001-1v-1h8v1a1 1 0 001 1h1a1 1 0 001-1v-1.78c.61-.55 1-1.34 1-2.22V6a2 2 0 00-2-2H6a2 2 0 00-2 2v10zM7.5 17a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm9 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM6 6h12v8H6V6z"/>
  </svg>
);

export const ApplePayMerchantSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 6h18l-2 7H5l-2-7zM3 6L2.25 3H1" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="9" cy="20" r="1"/>
    <circle cx="20" cy="20" r="1"/>
  </svg>
);

export const ApplePaySecuritySVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 7c1.1 0 2 .9 2 2v4h-4v-4c0-1.1.9-2 2-2zm0-1c-1.66 0-3 1.34-3 3v1h6V10c0-1.66-1.34-3-3-3z"/>
  </svg>
);

export const ApplePayQRCodeSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM19 19h2v2h-2zM13 13h2v2h-2zM15 15h2v2h-2zM13 17h2v2h-2zM15 19h2v2h-2zM17 17h2v2h-2zM17 13h2v2h-2zM19 15h2v2h-2z"/>
  </svg>
);

export const ApplePayPhoneSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <img 
    src="/src/assets/phone-animated.gif" 
    alt="Phone"
    className={className}
    style={{ objectFit: 'contain' }}
  />
);

export const ApplePayWalletSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 12V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2v-5zM3 10h18M7 15h.01M17 9h-3"/>
  </svg>
);

export const ApplePayLocationSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
);

export const ApplePayTimeSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12,6 12,12 16,14"/>
  </svg>
);

export const ApplePaySuccessSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

export const ApplePaySendMoneySVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <line x1="7" y1="17" x2="17" y2="7"/>
    <polyline points="7,7 17,7 17,17"/>
  </svg>
);

export const ApplePayContactlessSVG = ({ className = "w-6 h-6", animated = false }: { className?: string, animated?: boolean }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <g className={animated ? "animate-bounce" : ""}>
      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" opacity="0.2"/>
      <path d="M7 10.5c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5m0-2c-3.87 0-7 3.13-7 7s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7z" opacity="0.4"/>
      <circle cx="7" cy="15.5" r="3"/>
    </g>
  </svg>
);

export const ApplePayCardStackSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect x="4" y="8" width="16" height="10" rx="2" fill="currentColor" opacity="0.6"/>
    <rect x="3" y="6" width="16" height="10" rx="2" fill="currentColor" opacity="0.8"/>
    <rect x="2" y="4" width="16" height="10" rx="2" fill="currentColor"/>
    <line x1="2" y1="8" x2="18" y2="8" stroke="white" strokeWidth="1"/>
  </svg>
);

export const ApplePayBiometricSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M9.3 10.775c0 .86-.71 1.57-1.57 1.57s-1.57-.71-1.57-1.57.71-1.57 1.57-1.57 1.57.7 1.57 1.57zM12 17.5c-1.09 0-2.07-.46-2.75-1.17-.68-.71-1.08-1.67-1.12-2.68h1.5c.04.64.25 1.24.63 1.72.37.48.88.77 1.44.77.56 0 1.07-.29 1.44-.77.38-.48.59-1.08.63-1.72h1.5c-.04 1.01-.44 1.97-1.12 2.68-.68.71-1.66 1.17-2.75 1.17zm5.27-6.725c0 .86-.71 1.57-1.57 1.57s-1.57-.71-1.57-1.57.71-1.57 1.57-1.57 1.57.7 1.57 1.57zM12 4C7.58 4 4 7.58 4 12s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z"/>
  </svg>
);