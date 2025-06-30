export const SecureConnectionSVG = ({ className = "w-full h-32", animated = true }: { className?: string, animated?: boolean }) => (
  <svg
    className={className}
    viewBox="0 0 320 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ overflow: "visible" }}
  >
    <defs>
      {/* Premium Gradients */}
      <linearGradient id="bhimGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF6B35" />
        <stop offset="50%" stopColor="#F7931E" />
        <stop offset="100%" stopColor="#FFD23F" />
      </linearGradient>
      
      <linearGradient id="oppbGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="50%" stopColor="#A855F7" />
        <stop offset="100%" stopColor="#C084FC" />
      </linearGradient>

      <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>

      <linearGradient id="connectionGlow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgba(16, 185, 129, 0)" />
        <stop offset="30%" stopColor="rgba(16, 185, 129, 0.8)" />
        <stop offset="70%" stopColor="rgba(16, 185, 129, 0.8)" />
        <stop offset="100%" stopColor="rgba(16, 185, 129, 0)" />
      </linearGradient>

      {/* Premium Effects */}
      <filter id="premiumGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>

      <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="rgba(0,0,0,0.1)"/>
      </filter>

      <radialGradient id="securityRing" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(16, 185, 129, 0)" />
        <stop offset="80%" stopColor="rgba(16, 185, 129, 0.1)" />
        <stop offset="100%" stopColor="rgba(16, 185, 129, 0.3)" />
      </radialGradient>

      {/* Cube Gradients */}
      <linearGradient id="cubeTopGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B7CF6" stopOpacity="1"/>
        <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.9"/>
        <stop offset="100%" stopColor="#6366F1" stopOpacity="0.8"/>
      </linearGradient>
      
      <linearGradient id="cubeLeftGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366F1" stopOpacity="0.8"/>
        <stop offset="50%" stopColor="#4F46E5" stopOpacity="0.7"/>
        <stop offset="100%" stopColor="#3730A3" stopOpacity="0.6"/>
      </linearGradient>
      
      <linearGradient id="cubeRightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.7"/>
        <stop offset="50%" stopColor="#3730A3" stopOpacity="0.6"/>
        <stop offset="100%" stopColor="#1E1B4B" stopOpacity="0.5"/>
      </linearGradient>

      {/* Bank Building Gradients */}
      <linearGradient id="bankBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F8FAFC" stopOpacity="1"/>
        <stop offset="50%" stopColor="#E2E8F0" stopOpacity="0.95"/>
        <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0.9"/>
      </linearGradient>
      
      <linearGradient id="bankRoofGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E2E8F0" stopOpacity="1"/>
        <stop offset="50%" stopColor="#CBD5E1" stopOpacity="0.95"/>
        <stop offset="100%" stopColor="#94A3B8" stopOpacity="0.9"/>
      </linearGradient>

      <linearGradient id="bankColumnsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.9"/>
        <stop offset="50%" stopColor="#2563EB" stopOpacity="0.8"/>
        <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.7"/>
      </linearGradient>

      <linearGradient id="bankShadowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(71, 85, 105, 0.3)" stopOpacity="1"/>
        <stop offset="50%" stopColor="rgba(71, 85, 105, 0.2)" stopOpacity="0.8"/>
        <stop offset="100%" stopColor="rgba(71, 85, 105, 0.1)" stopOpacity="0.5"/>
      </linearGradient>

      {/* Payment Logo Gradients */}
      <linearGradient id="orangePaymentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF8C00" stopOpacity="1"/>
        <stop offset="35%" stopColor="#FF6B00" stopOpacity="0.95"/>
        <stop offset="75%" stopColor="#FF5722" stopOpacity="0.9"/>
        <stop offset="100%" stopColor="#E65100" stopOpacity="0.85"/>
      </linearGradient>

      <linearGradient id="greenPaymentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4CAF50" stopOpacity="1"/>
        <stop offset="35%" stopColor="#388E3C" stopOpacity="0.95"/>
        <stop offset="75%" stopColor="#2E7D32" stopOpacity="0.9"/>
        <stop offset="100%" stopColor="#1B5E20" stopOpacity="0.85"/>
      </linearGradient>
    </defs>



    {/* Authentic UPI Logo - Left */}
    <g transform="translate(50, 50)">
      {/* Animated Background Pulse */}
      {animated && (
        <circle cx="0" cy="0" r="25" fill="none" stroke="#098041" strokeWidth="1" opacity="0.3">
          <animate attributeName="r" values="20;30;20" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.1;0.4;0.1" dur="3s" repeatCount="indefinite" />
        </circle>
      )}

      {/* Authentic UPI Logo - Animated */}
      <g transform="scale(0.08) translate(-512, -233)">
        {/* Main UPI Text - Animated */}
        <path fill="#3d3d3c" d="M98.1 340.7h6.3l-5.9 24.5c-.9 3.6-.7 6.4.5 8.2 1.2 1.8 3.4 2.7 6.7 2.7 3.2 0 5.9-.9 8-2.7 2.1-1.8 3.5-4.6 4.4-8.2l5.9-24.5h6.4l-6 25.1c-1.3 5.4-3.6 9.5-7 12.2-3.3 2.7-7.7 4.1-13.1 4.1-5.4 0-9.1-1.3-11.1-4s-2.4-6.8-1.1-12.2l6-25.2zm31.4 40.3 10-41.9 19 24.6c.5.7 1 1.4 1.5 2.2.5.8 1 1.7 1.6 2.7l6.7-27.9h5.9l-10 41.8-19.4-25.1-1.5-2.1c-.5-.8-.9-1.5-1.2-2.4l-6.7 28h-5.9zm44.2 0 9.6-40.3h6.4l-9.6 40.3h-6.4zm15.5 0 9.6-40.3h21.9l-1.3 5.6h-15.5l-2.4 10H217l-1.4 5.6h-15.5l-3.5 14.5h15.5l-1.4 5.6h-21.9z">
          {animated && <animate attributeName="opacity" values="0.9;1;0.9" dur="4s" repeatCount="indefinite" />}
        </path>
        
        {/* UPI Brand Text - Animated */}
        <path fill="#70706e" d="M740.7 305.6h-43.9l61-220.3h43.9l-61 220.3zM717.9 92.2c-3-4.2-7.7-6.3-14.1-6.3H462.6l-11.9 43.2h219.4l-12.8 46.1H481.8v-.1h-43.9l-36.4 131.5h43.9l24.4-88.2h197.3c6.2 0 12-2.1 17.4-6.3 5.4-4.2 9-9.4 10.7-15.6l24.4-88.2c1.9-6.6 1.3-11.9-1.7-16.1zm-342 199.6c-2.4 8.7-10.4 14.8-19.4 14.8H130.2c-6.2 0-10.8-2.1-13.8-6.3-3-4.2-3.7-9.4-1.9-15.6l55.2-198.8h43.9l-49.3 177.6h175.6l49.3-177.6h43.9l-57.2 205.9z">
          {animated && <animate attributeName="opacity" values="0.8;1;0.8" dur="3.5s" repeatCount="indefinite" />}
        </path>
        
        {/* Green Triangle - Pulsing Animation */}
        <path fill="#098041" d="M877.5 85.7 933 196.1 816.3 306.5">
          {animated && (
            <>
              <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" repeatCount="indefinite" />
              <animateTransform
                attributeName="transform"
                type="scale"
                values="1;1.05;1"
                dur="2s"
                repeatCount="indefinite"
              />
            </>
          )}
        </path>
        
        {/* Orange Triangle - Counter Animation */}
        <path fill="#e97626" d="M838.5 85.7 894 196.1 777.2 306.5">
          {animated && (
            <>
              <animate attributeName="opacity" values="1;0.9;1" dur="2s" repeatCount="indefinite" />
              <animateTransform
                attributeName="transform"
                type="scale"
                values="1;1.03;1"
                dur="2.5s"
                repeatCount="indefinite"
              />
            </>
          )}
        </path>

        {/* Overall Logo Animation */}
        {animated && (
          <animateTransform
            attributeName="transform"
            type="scale"
            values="1;1.02;1"
            dur="5s"
            repeatCount="indefinite"
          />
        )}
      </g>
      
      {/* Animated UPI Text Label */}
      <text x="0" y="35" textAnchor="middle" fontSize="10" fontWeight="600" fill="#4A5568">
        UPI
        {animated && <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />}
      </text>

      {/* Flowing Data Points Around Logo */}
      {animated && (
        <g opacity="0.6">
          <circle cx="-20" cy="-15" r="1.5" fill="#098041">
            <animate attributeName="cx" values="-20;20;-20" dur="4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;0" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="20" cy="15" r="1.5" fill="#e97626">
            <animate attributeName="cx" values="20;-20;20" dur="5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;0" dur="5s" repeatCount="indefinite" />
          </circle>
          <circle cx="-15" cy="20" r="1" fill="#70706e">
            <animate attributeName="cy" values="20;-20;20" dur="3.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;0.8;0" dur="3.5s" repeatCount="indefinite" />
          </circle>
        </g>
      )}
    </g>

    {/* Secure Connection Line */}
    <g>
      <path d="M100 50 Q125 45 140 50" stroke="url(#connectionGlow)" strokeWidth="4" fill="none" opacity="0.9">
        {animated && (
          <animate attributeName="stroke-dasharray" values="0 60;30 30;60 0" dur="2s" repeatCount="indefinite" />
        )}
      </path>
      
      <path d="M180 50 Q205 45 225 50" stroke="url(#connectionGlow)" strokeWidth="4" fill="none" opacity="0.9">
        {animated && (
          <animate attributeName="stroke-dasharray" values="0 60;30 30;60 0" dur="2s" begin="0.5s" repeatCount="indefinite" />
        )}
      </path>
    </g>

    {/* Premium Bank Icon - Top Center - Much Larger and Higher */}
    <g transform="translate(160, 2)">
      {/* Premium 3D Bank */}
      <g transform="scale(0.85) translate(-50, -60)">
        {/* Animated Background Glow */}
        {animated && (
          <circle cx="50" cy="60" r="55" fill="none" stroke="url(#bankBodyGradient)" strokeWidth="0.8" opacity="0.2">
            <animate attributeName="r" values="50;60;50" dur="5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.1;0.3;0.1" dur="5s" repeatCount="indefinite" />
          </circle>
        )}

        {/* Main Building Foundation */}
        <rect x="5" y="55" width="90" height="35" rx="2" fill="url(#bankBodyGradient)" stroke="rgba(148, 163, 184, 0.4)" strokeWidth="0.5">
          {animated && <animateTransform attributeName="transform" type="scale" values="1;1.02;1" dur="6s" repeatCount="indefinite" />}
        </rect>
        
        {/* Building Steps */}
        <rect x="0" y="75" width="100" height="8" rx="1" fill="url(#bankShadowGradient)">
          {animated && <animate attributeName="opacity" values="0.6;0.8;0.6" dur="4s" repeatCount="indefinite" />}
        </rect>

        {/* Triangular Roof with Enhanced Animation */}
        <path
          d="M50 15 L85 40 L15 40 Z"
          fill="url(#bankRoofGradient)"
          stroke="rgba(148, 163, 184, 0.5)"
          strokeWidth="0.8"
        >
          {animated && (
            <>
              <animate attributeName="opacity" values="0.85;1;0.85" dur="4s" repeatCount="indefinite" />
              <animateTransform attributeName="transform" type="scale" values="1;1.03;1" dur="5s" repeatCount="indefinite" />
            </>
          )}
        </path>

        {/* Roof Highlight Animation */}
        <path
          d="M50 15 L75 30 L25 30 Z"
          fill="rgba(255, 255, 255, 0.4)"
          opacity="0.5"
        >
          {animated && <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3s" repeatCount="indefinite" />}
        </path>

        {/* Classical Columns with Individual Animations */}
        {[...Array(6)].map((_, i) => (
          <g key={i}>
            <rect
              x={18 + i * 11}
              y="40"
              width="6"
              height="35"
              fill="url(#bankColumnsGradient)"
              stroke="rgba(29, 78, 216, 0.3)"
              strokeWidth="0.3"
            >
              {animated && (
                <animate
                  attributeName="opacity"
                  values="0.8;1;0.8"
                  dur={`${3 + i * 0.3}s`}
                  begin={`${i * 0.2}s`}
                  repeatCount="indefinite"
                />
              )}
            </rect>
            <rect
              x={17 + i * 11}
              y="38"
              width="8"
              height="3"
              rx="1"
              fill="#F1F5F9"
            >
              {animated && (
                <animate
                  attributeName="opacity"
                  values="0.9;1;0.9"
                  dur={`${2.5 + i * 0.2}s`}
                  begin={`${i * 0.15}s`}
                  repeatCount="indefinite"
                />
              )}
            </rect>
          </g>
        ))}

        {/* Main Entrance with Animation */}
        <rect x="45" y="58" width="10" height="17" rx="1" fill="#1E40AF" opacity="0.8">
          {animated && <animate attributeName="opacity" values="0.7;0.9;0.7" dur="4s" repeatCount="indefinite" />}
        </rect>
        <circle cx="52" cy="66" r="0.8" fill="#F8FAFC" opacity="0.9">
          {animated && (
            <>
              <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
              <animate attributeName="r" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
            </>
          )}
        </circle>

        {/* Floating Elements Around Bank */}
        {animated && (
          <g>
            {[...Array(4)].map((_, i) => (
              <circle
                key={i}
                cx={25 + i * 17}
                cy={30 + (i % 2) * 8}
                r="1"
                fill="#3B82F6"
                opacity="0.6"
              >
                <animate
                  attributeName="opacity"
                  values="0;0.8;0"
                  dur={`${3 + i * 0.4}s`}
                  begin={`${i * 0.5}s`}
                  repeatCount="indefinite"
                />
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values={`0,0;0,-${5 + i * 2};0,0`}
                  dur={`${4 + i * 0.3}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
          </g>
        )}

        {/* Architectural Detail Lines */}
        <g stroke="rgba(148, 163, 184, 0.6)" strokeWidth="0.5" fill="none">
          <path d="M15 42 L85 42">
            {animated && <animate attributeName="opacity" values="0.4;0.7;0.4" dur="3s" repeatCount="indefinite" />}
          </path>
          <path d="M15 73 L85 73">
            {animated && <animate attributeName="opacity" values="0.4;0.7;0.4" dur="3.5s" repeatCount="indefinite" />}
          </path>
        </g>
      </g>
      
      <text x="0" y="36" textAnchor="middle" fontSize="8" fontWeight="700" fill="#1F2937" filter="url(#premiumGlow)">
        Bank
        {animated && <animate attributeName="opacity" values="0.8;1;0.8" dur="4s" repeatCount="indefinite" />}
      </text>
    </g>

    {/* Extended Vertical Connection from Bank to Shield */}
    <g>
      <path d="M160 38 L160 42" stroke="url(#connectionGlow)" strokeWidth="2.5" fill="none" opacity="0.8">
        {animated && (
          <animate attributeName="stroke-dasharray" values="0 15;7 7;15 0" dur="2s" repeatCount="indefinite" />
        )}
      </path>
    </g>

    {/* Vertical Connection from Bank to Shield */}
    <g>
      <path d="M160 20 L160 28" stroke="url(#connectionGlow)" strokeWidth="2" fill="none" opacity="0.8">
        {animated && (
          <animate attributeName="stroke-dasharray" values="0 12;6 6;12 0" dur="1.5s" repeatCount="indefinite" />
        )}
      </path>
    </g>

    {/* Central Security Shield */}
    <g transform="translate(160, 50)">
      <circle cx="0" cy="0" r="20" fill="url(#shieldGradient)" filter="url(#premiumGlow)" opacity="0.95">
        {animated && <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" repeatCount="indefinite" />}
      </circle>
      
      {/* Shield Shape */}
      <path d="M0 -12 L-8 -6 L-8 4 Q-8 8 0 12 Q8 8 8 4 L8 -6 Z" fill="white" opacity="0.9" />
      
      {/* Lock Icon */}
      <rect x="-3" y="-2" width="6" height="6" rx="1" fill="#10B981" />
      <path d="M-2 -2 Q-2 -5 0 -5 Q2 -5 2 -2" stroke="#10B981" strokeWidth="1.5" fill="none" />
      
      {/* Security Particles */}
      {animated && (
        <g>
          {[...Array(6)].map((_, i) => (
            <circle
              key={i}
              cx={Math.cos(i * Math.PI / 3) * 15}
              cy={Math.sin(i * Math.PI / 3) * 15}
              r="1.5"
              fill="#10B981"
              opacity="0.7"
            >
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur="2s"
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>
      )}
      
      <text x="0" y="35" textAnchor="middle" fontSize="8" fontWeight="600" fill="#10B981">Secure Bridge</text>
    </g>

    {/* OPPB Icon - Right */}
    <g transform="translate(250, 50)">
      {/* Ultra-Premium Dynamic 3D Cube Logo */}
      <g transform="scale(0.8) translate(-50, -50)">
        {/* Outer Glow Ring */}
        {animated && (
          <circle cx="50" cy="42" r="45" fill="none" stroke="url(#cubeTopGradient)" strokeWidth="0.5" opacity="0.3">
            <animate attributeName="r" values="40;50;40" dur="4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.1;0.4;0.1" dur="4s" repeatCount="indefinite" />
          </circle>
        )}

        {/* Main Cube with Enhanced 3D */}
        <g>
          {animated && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 50 42;360 50 42"
              dur="20s"
              repeatCount="indefinite"
            />
          )}
          
          {/* Top Face - Enhanced */}
          <path
            d="M50 10 L85 25 L50 40 L15 25 Z"
            fill="url(#cubeTopGradient)"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="1.5"
            filter="url(#premiumGlow)"
          >
            {animated && (
              <>
                <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
                <animateTransform attributeName="transform" type="scale" values="1;1.05;1" dur="2s" repeatCount="indefinite" />
              </>
            )}
          </path>
          
          {/* Top Face Highlight */}
          <path
            d="M50 10 L85 25 L50 40 L15 25 Z"
            fill="rgba(255,255,255,0.4)"
            opacity="0.6"
          />
          
          {/* Left Face - Enhanced */}
          <path
            d="M15 25 L50 40 L50 75 L15 60 Z"
            fill="url(#cubeLeftGradient)"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1.2"
          >
            {animated && <animate attributeName="opacity" values="0.7;0.9;0.7" dur="3.5s" repeatCount="indefinite" />}
          </path>

          {/* Right Face - Enhanced */}
          <path
            d="M50 40 L85 25 L85 60 L50 75 Z"
            fill="url(#cubeRightGradient)"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1.2"
          >
            {animated && <animate attributeName="opacity" values="0.6;0.8;0.6" dur="4s" repeatCount="indefinite" />}
          </path>

          {/* Inner Cube - More Prominent */}
          <g transform="translate(8, 3)">
            <path
              d="M42 18 L62 26 L42 34 L22 26 Z"
              fill="#3B82F6"
              opacity="0.95"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="0.8"
            >
              {animated && (
                <>
                  <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
                  <animateTransform attributeName="transform" type="scale" values="0.9;1.1;0.9" dur="3s" repeatCount="indefinite" />
                </>
              )}
            </path>
            <path
              d="M22 26 L42 34 L42 54 L22 46 Z"
              fill="#2563EB"
              opacity="0.9"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="0.6"
            />
            <path
              d="M42 34 L62 26 L62 46 L42 54 Z"
              fill="#1D4ED8"
              opacity="0.85"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="0.6"
            />

            {/* Inner Core */}
            <circle cx="42" cy="30" r="4" fill="#60A5FA" opacity="0.8">
              {animated && (
                <>
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
                  <animate attributeName="r" values="3;5;3" dur="2.5s" repeatCount="indefinite" />
                </>
              )}
            </circle>
          </g>

          {/* Dynamic Edge Lines */}
          <g stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" fill="none">
            <path d="M50 10 L50 40">
              {animated && <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />}
            </path>
            <path d="M15 25 L50 40">
              {animated && <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.2s" repeatCount="indefinite" />}
            </path>
            <path d="M85 25 L50 40">
              {animated && <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.4s" repeatCount="indefinite" />}
            </path>
            <path d="M50 40 L50 75">
              {animated && <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.6s" repeatCount="indefinite" />}
            </path>
          </g>
        </g>

        {/* Enhanced Floating Particles */}
        {animated && (
          <g>
            {[...Array(8)].map((_, i) => (
              <g key={i}>
                <circle
                  cx={25 + (i * 8)}
                  cy={15 + (i % 3) * 12}
                  r="1.5"
                  fill="#8B7CF6"
                  opacity="0.7"
                >
                  <animate
                    attributeName="opacity"
                    values="0;1;0"
                    dur={`${2 + i * 0.2}s`}
                    begin={`${i * 0.3}s`}
                    repeatCount="indefinite"
                  />
                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    values={`0,0;${Math.cos(i) * 8},${-8 - i};0,0`}
                    dur={`${4 + i * 0.3}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="r"
                    values="1;2.5;1"
                    dur={`${3 + i * 0.2}s`}
                    repeatCount="indefinite"
                  />
                </circle>
                
                {/* Particle Trails */}
                <path
                  d={`M${25 + (i * 8)} ${15 + (i % 3) * 12} Q${25 + (i * 8) + 3} ${15 + (i % 3) * 12 - 4} ${25 + (i * 8)} ${15 + (i % 3) * 12 - 8}`}
                  stroke="#A855F7"
                  strokeWidth="0.8"
                  fill="none"
                  opacity="0.4"
                >
                  <animate
                    attributeName="opacity"
                    values="0;0.6;0"
                    dur={`${3 + i * 0.2}s`}
                    begin={`${i * 0.4}s`}
                    repeatCount="indefinite"
                  />
                </path>
              </g>
            ))}
          </g>
        )}

        {/* Orbital Rings */}
        {animated && (
          <g>
            <circle cx="50" cy="42" r="35" fill="none" stroke="url(#cubeTopGradient)" strokeWidth="0.8" opacity="0.2" strokeDasharray="4 8">
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="0 50 42;360 50 42"
                dur="15s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="50" cy="42" r="28" fill="none" stroke="url(#cubeLeftGradient)" strokeWidth="0.6" opacity="0.3" strokeDasharray="2 6">
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="360 50 42;0 50 42"
                dur="12s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        )}
      </g>
      
      {/* Enhanced App Label with Glow */}
      <text x="0" y="42" textAnchor="middle" fontSize="12" fontWeight="700" fill="#8B5CF6" filter="url(#premiumGlow)">
        OPPB
        {animated && <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />}
      </text>
    </g>

    {/* Connection Success Indicators */}
    <g>
      <circle cx="100" cy="25" r="6" fill="url(#shieldGradient)" opacity="0.9">
        {animated && <animate attributeName="opacity" values="0;1;1" dur="1s" begin="1s" fill="freeze" />}
      </circle>
      <path d="M97 25 L99 27 L103 22" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {animated && <animate attributeName="opacity" values="0;1;1" dur="1s" begin="1.2s" fill="freeze" />}
      </path>
      
      <circle cx="200" cy="25" r="6" fill="url(#shieldGradient)" opacity="0.9">
        {animated && <animate attributeName="opacity" values="0;1;1" dur="1s" begin="1.5s" fill="freeze" />}
      </circle>
      <path d="M197 25 L199 27 L203 22" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {animated && <animate attributeName="opacity" values="0;1;1" dur="1s" begin="1.7s" fill="freeze" />}
      </path>
    </g>

    {/* Floating Security Elements */}
    {animated && (
      <g opacity="0.6">
        <circle cx="120" cy="15" r="1" fill="#10B981">
          <animate attributeName="cy" values="15;10;15" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="180" cy="15" r="1" fill="#10B981">
          <animate attributeName="cy" values="15;10;15" dur="3s" begin="1s" repeatCount="indefinite" />
        </circle>
        <circle cx="130" cy="65" r="1" fill="#8B5CF6">
          <animate attributeName="cy" values="65;70;65" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="170" cy="65" r="1" fill="#8B5CF6">
          <animate attributeName="cy" values="65;70;65" dur="2.5s" begin="0.5s" repeatCount="indefinite" />
        </circle>
      </g>
    )}
  </svg>
);