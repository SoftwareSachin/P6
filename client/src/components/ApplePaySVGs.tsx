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

export const ApplePayWalletSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ApplePaySendMoneySVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 1v22m5-18h-5a4 4 0 100 8h0a4 4 0 010 8h-5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ApplePayPhoneSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="12" y1="18" x2="12" y2="18" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ApplePayLocationSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="10" r="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ApplePayTimeSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="12,6 12,12 16,14" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ApplePaySuccessSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="22,4 12,14.01 9,11.01" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Premium Transaction Icons
export const ApplePayEntertainmentSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-2z"/>
    <circle cx="12" cy="12" r="2" fill="rgba(255,255,255,0.3)"/>
    <circle cx="6" cy="12" r="1.5" fill="rgba(255,255,255,0.2)"/>
    <circle cx="18" cy="12" r="1.5" fill="rgba(255,255,255,0.2)"/>
  </svg>
);

export const ApplePayPersonSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    <circle cx="12" cy="8" r="1.5" fill="rgba(255,255,255,0.3)"/>
  </svg>
);

export const ApplePayShoppingSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 4V2c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v2h5v2h-2v13c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V6H2V4h5zM9 2v2h6V2H9zm9 4H6v13h12V6z"/>
    <rect x="8" y="8" width="2" height="6" rx="1" fill="rgba(255,255,255,0.3)"/>
    <rect x="14" y="8" width="2" height="6" rx="1" fill="rgba(255,255,255,0.3)"/>
  </svg>
);

export const ApplePayTelecomSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
    <circle cx="16" cy="8" r="2" fill="rgba(255,255,255,0.3)"/>
    <circle cx="12" cy="4" r="1" fill="rgba(255,255,255,0.2)"/>
    <circle cx="20" cy="4" r="1" fill="rgba(255,255,255,0.2)"/>
  </svg>
);

export const ApplePayBankSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7v3h20V7l-10-5zM4 12v4h2v-4H4zm4 0v4h2v-4H8zm4 0v4h2v-4h-2zm4 0v4h2v-4h-2zm4 0v4h2v-4h-2zM2 18h20v2H2v-2z"/>
    <rect x="11" y="3" width="2" height="1" rx="0.5" fill="rgba(255,255,255,0.4)"/>
  </svg>
);

// Premium Bank Type Icons
export const ApplePayDigitalBankSVG = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 1L21.5 6.5v11L12 23l-9.5-5.5v-11L12 1zm0 2.18L4.5 7.5v9l7.5 4.32 7.5-4.32v-9L12 3.18z"/>
    <path d="M12 6l5 3v6l-5 3-5-3V9l5-3z" fill="rgba(59, 130, 246, 0.6)"/>
    <circle cx="12" cy="12" r="1.5" fill="white"/>
  </svg>
);

export const ApplePayPrivateBankSVG = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    <path d="M12 6l2 4 4 .5-3 3 .75 4.5L12 16l-3.75 2-L9 14l-3-3 4-.5 2-4z" fill="rgba(147, 51, 234, 0.6)"/>
  </svg>
);

export const ApplePayGovtBankSVG = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7v3h20V7l-10-5zM4 12v4h2v-4H4zm4 0v4h2v-4H8zm4 0v4h2v-4h-2zm4 0v4h2v-4h-2zm4 0v4h2v-4h-2zM2 18h20v2H2v-2z"/>
    <rect x="10" y="3" width="4" height="2" rx="1" fill="rgba(34, 197, 94, 0.6)"/>
    <rect x="11" y="4" width="2" height="1" fill="white"/>
  </svg>
);

// Premium Quick Action Icons
export const ApplePayStoreSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.36 9l.6 3H5.04l.6-3h12.72M20 4H4v2h16V4zm-2 4H6l-.6 3H4l1.38-6.9C5.54 9.46 6.22 9 7 9h10c.78 0 1.46.46 1.62 1.1L20 17h-1.4L18 14H6v5h12v-5z"/>
    <circle cx="9" cy="20" r="1"/>
    <circle cx="15" cy="20" r="1"/>
    <rect x="7" y="11" width="10" height="1" rx="0.5" fill="rgba(255,255,255,0.3)"/>
  </svg>
);

export const ApplePayElectricitySVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11 21h-1l1-7H7l4.5-11h1L11 10h4l-4 11z"/>
    <path d="M11 21h-1l1-7H7l4.5-11h1L11 10h4l-4 11z" fill="rgba(255, 193, 7, 0.3)"/>
  </svg>
);

export const ApplePayCoffeeSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.5 3H6c-1.1 0-2 .9-2 2v5.71c0 3.83 2.95 7.18 6.78 7.29 3.96.12 7.22-3.06 7.22-7v-1h.5c1.38 0 2.5-1.12 2.5-2.5S19.88 5 18.5 5H18V3z"/>
    <path d="M7 8c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1zm2 3c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1z" fill="rgba(255,255,255,0.3)"/>
  </svg>
);

export const ApplePayMobileSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 18H7V5h10v14z"/>
    <circle cx="12" cy="19" r="1"/>
    <rect x="8" y="6" width="8" height="1" rx="0.5" fill="rgba(255,255,255,0.3)"/>
    <rect x="8" y="8" width="6" height="1" rx="0.5" fill="rgba(255,255,255,0.2)"/>
  </svg>
);

export const ApplePayMoneySVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
  </svg>
);

export const ApplePayBillsSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h10c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
    <rect x="8" y="10" width="8" height="1" rx="0.5" fill="rgba(255,255,255,0.3)"/>
  </svg>
);

export const ApplePayRequestSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
  </svg>
);

export const ApplePayUPISVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    <circle cx="12" cy="8" r="2" fill="rgba(255,255,255,0.3)"/>
  </svg>
);

export const ApplePayCardsSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4V8h16v10z"/>
    <path d="M2 6h20v4H2z"/>
    <rect x="4" y="12" width="4" height="2" rx="1" fill="rgba(255,255,255,0.3)"/>
    <circle cx="18" cy="13" r="1.5" fill="rgba(255,255,255,0.4)"/>
  </svg>
);

export const ApplePayReportsSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
    <rect x="7" y="10" width="2" height="7" fill="rgba(59, 130, 246, 0.6)"/>
    <rect x="11" y="7" width="2" height="10" fill="rgba(16, 185, 129, 0.6)"/>
    <rect x="15" y="13" width="2" height="4" fill="rgba(245, 158, 11, 0.6)"/>
  </svg>
);

export const ApplePayOfflineSVG = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7L12 21l11.64-14zM3.53 10.95l8.47 10.16 8.47-10.16c-.47-.8-3.51-3.48-8.47-3.48s-8 2.68-8.47 3.48z"/>
    <circle cx="12" cy="12" r="3" fill="rgba(255, 159, 10, 0.6)"/>
    <circle cx="12" cy="12" r="1.5" fill="white"/>
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

// Ultra-Premium OPPB Logo
export const OPPBPremiumLogoSVG = ({ className = "w-11 h-11", animated = false }: { className?: string, animated?: boolean }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none">
    <defs>
      <radialGradient id="primaryGradient" cx="0.3" cy="0.3" r="0.8">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="1"/>
        <stop offset="15%" stopColor="#8b5cf6" stopOpacity="0.9"/>
        <stop offset="35%" stopColor="#3b82f6" stopOpacity="0.85"/>
        <stop offset="55%" stopColor="#06b6d4" stopOpacity="0.8"/>
        <stop offset="75%" stopColor="#8b5cf6" stopOpacity="0.75"/>
        <stop offset="90%" stopColor="#1e40af" stopOpacity="0.7"/>
        <stop offset="100%" stopColor="#0f172a" stopOpacity="0.6"/>
      </radialGradient>

      <filter id="premiumEffects" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" result="blur"/>
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#8b5cf6" floodOpacity="0.3"/>
        <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#ffffff" floodOpacity="0.4"/>
        <feDropShadow dx="0" dy="-1" stdDeviation="2" floodColor="#3b82f6" floodOpacity="0.2"/>
        <feColorMatrix values="1.2 0 0 0 0  0 1.1 0 0 0  0 0 1.3 0 0  0 0 0 1 0"/>
      </filter>
    </defs>

    {/* Main Diamond Structure */}
    <g filter="url(#premiumEffects)" className={animated ? "animate-spin" : ""} style={{ transformOrigin: "50px 50px", animationDuration: "20s" }}>
      <path d="M50 10 L30 30 L50 50 L70 30 Z" fill="url(#primaryGradient)" stroke="#ffffff" strokeWidth="0.5" opacity="0.9"/>
      <path d="M50 50 L30 70 L50 90 L70 70 Z" fill="url(#primaryGradient)" stroke="#ffffff" strokeWidth="0.5" opacity="0.85"/>
      <path d="M30 30 L10 50 L30 70 L50 50 Z" fill="url(#primaryGradient)" stroke="#ffffff" strokeWidth="0.5" opacity="0.8"/>
      <path d="M70 30 L50 50 L70 70 L90 50 Z" fill="url(#primaryGradient)" stroke="#ffffff" strokeWidth="0.5" opacity="0.8"/>
    </g>

    {/* Orbital Rings */}
    <g className={animated ? "animate-spin" : ""} style={{ transformOrigin: "50px 50px", animationDuration: "15s", animationDirection: "reverse" }}>
      <circle cx="50" cy="50" r="35" fill="none" stroke="url(#primaryGradient)" strokeWidth="1" opacity="0.6"/>
      <circle cx="50" cy="50" r="25" fill="none" stroke="url(#primaryGradient)" strokeWidth="0.8" opacity="0.5"/>
    </g>

    {/* Central Core */}
    <circle cx="50" cy="50" r="8" fill="#ffffff" opacity="0.9" filter="url(#premiumEffects)"/>
    <circle cx="50" cy="50" r="5" fill="url(#primaryGradient)" opacity="1"/>
    <circle cx="50" cy="50" r="2" fill="#ffffff" opacity="1"/>

    {/* Corner Accents */}
    <circle cx="15" cy="15" r="2" fill="#8b5cf6" opacity="0.6"/>
    <circle cx="85" cy="15" r="2" fill="#3b82f6" opacity="0.6"/>
    <circle cx="15" cy="85" r="2" fill="#06b6d4" opacity="0.6"/>
    <circle cx="85" cy="85" r="2" fill="#8b5cf6" opacity="0.6"/>
  </svg>
);

export const FaceIDIconSVG = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="faceIdGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#1E40AF', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="16" height="16" rx="4" fill="url(#faceIdGradient)" />
    <circle cx="9" cy="10" r="1.5" fill="white" />
    <circle cx="15" cy="10" r="1.5" fill="white" />
    <path d="M8 14c1 1.5 3 1.5 4 0s3 1.5 4 0" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const ShieldSecuritySVG = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#10B981', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#047857', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path d="M12 2l8 3v6c0 6-8 10-8 10S4 17 4 11V5l8-3z" fill="url(#shieldGradient)" />
    <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const CheckmarkSuccessSVG = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="successGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#10B981', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#047857', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="10" fill="url(#successGradient)" />
    <path d="M8 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const PrivacyLockSVG = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="lockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#1E40AF', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <rect x="5" y="11" width="14" height="10" rx="2" fill="url(#lockGradient)" />
    <path d="M12 3C10.5 3 9 4.5 9 6v5h6V6c0-1.5-1.5-3-3-3z" stroke="currentColor" strokeWidth="2" fill="none" />
    <circle cx="12" cy="16" r="1" fill="white" />
  </svg>
);