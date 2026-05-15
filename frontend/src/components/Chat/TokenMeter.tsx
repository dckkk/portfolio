interface TokenMeterProps {
  tokensUsed: number
  tokenBudget?: number
}

export function TokenMeter({ tokensUsed, tokenBudget = 8000 }: TokenMeterProps) {
  const percentage = (tokensUsed / tokenBudget) * 100
  const isWarning = percentage > 80
  const isExceeded = percentage > 100

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-xs">
        <span className="text-slate-400 font-medium">Token Usage</span>
        <span className={`font-bold ${
          isExceeded
            ? 'text-red-400'
            : isWarning
            ? 'text-yellow-400'
            : 'text-blue-400'
        }`}>
          {tokensUsed} / {tokenBudget}
        </span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isExceeded
              ? 'bg-gradient-to-r from-red-600 to-red-500'
              : isWarning
              ? 'bg-gradient-to-r from-yellow-600 to-yellow-500'
              : 'bg-gradient-to-r from-blue-600 to-purple-600'
          }`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      {isWarning && !isExceeded && (
        <p className="text-xs text-yellow-400 font-medium">⚠️ High token usage approaching limit</p>
      )}
      {isExceeded && (
        <p className="text-xs text-red-400 font-medium">❌ Budget exceeded - refresh for new session</p>
      )}
    </div>
  )
}
