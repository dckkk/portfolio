interface TokenMeterProps {
  tokensUsed: number
  tokenBudget?: number
}

export function TokenMeter({ tokensUsed, tokenBudget = 8000 }: TokenMeterProps) {
  const percentage = (tokensUsed / tokenBudget) * 100
  const isWarning = percentage > 80
  const isExceeded = percentage > 100

  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span>Token Usage</span>
        <span className="font-semibold">{tokensUsed} / {tokenBudget}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all ${
            isExceeded
              ? 'bg-red-600'
              : isWarning
              ? 'bg-yellow-600'
              : 'bg-blue-600'
          }`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      {isWarning && !isExceeded && (
        <p className="text-xs text-yellow-600 mt-1">Warning: High token usage</p>
      )}
      {isExceeded && (
        <p className="text-xs text-red-600 mt-1">Budget exceeded</p>
      )}
    </div>
  )
}
