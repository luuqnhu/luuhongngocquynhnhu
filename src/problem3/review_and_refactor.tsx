
/** interface WalletBalance {
    currency: string;
    amount: number;
}

// Issue: Avoids creating duplicate types, `WalletBalance` and `FormattedWalletBalance` have duplicate attributes
interface FormattedWalletBalance {
currency: string;
amount: number;
formatted: string;
}

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
const { children, ...rest } = props;
const balances = useWalletBalances();
const prices = usePrices();

// Issue: blockchain is typed as `any`, which removes type safety => add `blockchain` attribute to the interface
// Issue: Hardcoded priorities: switch-case is non-extensible; better use a priority record or map
const getPriority = (blockchain: any): number => {
    switch (blockchain) {
    case 'Osmosis':
        return 100;
    case 'Ethereum':
        return 50;
    case 'Arbitrum':
        return 30;
    case 'Zilliqa':
        return 20;
    case 'Neo':
        return 20;
    default:
        return -99;
    }
};

const sortedBalances = useMemo(() => {
    return balances
    .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        // Issue: lhsPriority is undefined, this logic is unclear/hard to understand
        // can rewrite more concise
        if (lhsPriority > -99) {
        if (balance.amount <= 0) {
            return true;
        }
        }
        return false;
    })
    // Issue: sorting logic is overly complex and could be simplified.
    .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        if (leftPriority > rightPriority) {
        return -1;
        } else if (rightPriority > leftPriority) {
        return 1;
        }
    });
}, [balances, prices]);

// Issue: array `sortedBalances` is being mapped multiple times, causing unnecessary iterations, redundant computation
const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
    ...balance,
    formatted: balance.amount.toFixed(), // `.toFixed()` outputs a string, but `formatted` type is not a string.
    };
});

// Issue: `formattedBalances` should be used here, but `sortedBalances` is reused, causing a type mismatch
// rows mapping expects FormattedWalletBalance but uses sortedBalances, which doesn’t contain formatted
const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    // Issue: accessing `prices[balance.currency]` directly without fallback for undefined values.
    const usdValue = prices[balance.currency] * balance.amount;
    return (
    <WalletRow
        className={classes.row}
        key={index} // Issue: using index as a key can cause rendering issues if the list changes.
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
    />
    );
});

return (
    <div {...rest}>
    {rows}
    </div>
);
};*/

/** REFACTOR VERSION */
interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string; // Add the missing `blockchain` field directly to WalletBalance
    formatted?: string; // Optional field for formatted amount
    usdValue?: number;  // Optional field for USD value
}

const WalletPage: React.FC<Props> = ({ ...rest }) => {
    const balances = useWalletBalances();
    const prices = usePrices();
  
    // handles blockchain priority more concise, scalable and readable
    const getPriority = (blockchain: string): number => {
      const priorities: Record<string, number> = {
        Osmosis: 100,
        Ethereum: 50,
        Arbitrum: 30,
        Zilliqa: 20,
        Neo: 20,
      };
      return priorities[blockchain] ?? -99;
    };
  
    // Optimized Filtering and Sorting
    // Combined filtering and sorting into a more efficient pipeline while ensuring readability
    const formattedBalances = useMemo(() => {
      return balances
        .filter(({ blockchain, amount }) => getPriority(blockchain) > -99 && amount > 0)
        .sort((a, b) => getPriority(b.blockchain) - getPriority(a.blockchain))
        .map((balance) => ({
          ...balance,
          // Merged the logic for formatting balances and computing USD values into a single iteration
          formatted: balance.amount.toFixed(2),
          // Added fallback for prices when a currency is missing (prices[balance.currency] || 0)
          usdValue: (prices[balance.currency] || 0) * balance.amount,
        }));
    }, [balances, prices]);
  
    return (
        /** Ensured all balances passed to WalletRow conform to the WalletBalance type */
      <div {...rest}>
        {formattedBalances.map(({ currency, amount, usdValue, formatted }) => (
          <WalletRow
            // Replaced index as a key with a unique property to avoid potential rendering issues
            key={currency}
            className="row"
            amount={amount}
            usdValue={usdValue}
            formattedAmount={formatted}
          />
        ))}
      </div>
    );
  };