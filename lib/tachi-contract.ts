import { ethers, Contract, Signer, providers } from "ethers"

// ============================================================================
// TYPE DEFINITIONS - Matching Solidity Contract Structures
// ============================================================================

/**
 * Market data structure matching the Solidity Market struct
 */
export interface MarketData {
  questionHash: string
  closeTime: number
  betAmount: string // BigNumber as string
  yesPool: string // BigNumber as string
  noPool: string // BigNumber as string
  isClosed: boolean
  resolved: boolean
  outcome: boolean
  participantCount: number
}

/**
 * Bet data structure matching the Solidity Bet struct
 */
export interface BetData {
  hasBet: boolean
  prediction: boolean // true = YES, false = NO
  amount: string // BigNumber as string
  claimed: boolean
  won: boolean
}

/**
 * User statistics matching the Solidity UserStats struct
 */
export interface UserStats {
  totalBets: number
  wonBets: number
  lostBets: number
  totalWinnings: string // BigNumber as string
  netProfit: string // BigNumber as string
  totalAmountBet: string // BigNumber as string
  winRate: number // Calculated as (wonBets * 10000) / totalBets (in basis points)
}

/**
 * Market status information
 */
export interface MarketStatus {
  secondsRemaining: number
  isBettingOpen: boolean
  isBettingClosed: boolean
  isResolved: boolean
  currentTime: number
  closeTime: number
}

/**
 * Contract constants
 */
export const CONTRACT_CONSTANTS = {
  MIN_BET_AMOUNT: ethers.utils.parseEther("0.001"), // 0.001 ether
  MAX_BET_AMOUNT: ethers.utils.parseEther("100"), // 100 ether
  MAX_DURATION: 3600, // 1 hour in seconds
} as const

// ============================================================================
// CONTRACT ABI - All contract functions and events
// ============================================================================

/**
 * Contract ABI - This should be replaced with the actual compiled ABI
 * For now, we'll define the interface manually
 */
export const TACHI_FACTORY_ABI = [
  // Events
  "event MarketCreated(uint256 indexed marketId, bytes32 questionHash, string question, uint256 closeTime, uint256 durationSeconds, uint256 betAmount)",
  "event BetPlaced(uint256 indexed marketId, address indexed user, bool prediction, uint256 amount)",
  "event BettingClosed(uint256 indexed marketId)",
  "event MarketResolved(uint256 indexed marketId, bool outcome)",
  "event WinningsClaimed(uint256 indexed marketId, address indexed user, uint256 amount)",
  "event UserStatsUpdated(address indexed user, uint256 totalBets, uint256 wonBets, uint256 totalWinnings, uint256 netProfit)",
  "event PaymentFailed(address indexed user, uint256 amount)",

  // Write functions
  "function createMarket(string calldata question, uint256 durationSeconds, uint256 betAmount) external returns (uint256)",
  "function closeBetting(uint256 marketId) external",
  "function resolveMarket(uint256 marketId, bool outcome) external",
  "function addHouseFunds(uint256 marketId) external payable",
  "function placeBet(uint256 marketId, bool prediction) external payable",
  "function setOrganizer(address newOrganizer) external",

  // View functions
  "function getUserStats(address user) external view returns (uint256 totalBets, uint256 wonBets, uint256 lostBets, uint256 totalWinnings, uint256 netProfit, uint256 totalAmountBet, uint256 winRate)",
  "function getAllParticipants() external view returns (address[] memory)",
  "function getMarket(uint256 marketId) external view returns (bytes32 questionHash, uint256 closeTime, uint256 betAmount, uint256 yesPool, uint256 noPool, bool isClosed, bool resolved, bool outcome, uint256 participantCount)",
  "function getUserBet(uint256 marketId, address user) external view returns (bool hasBet, bool prediction, uint256 amount, bool claimed, bool won)",
  "function getMarketCount() external view returns (uint256)",
  "function getMarketStatus(uint256 marketId) external view returns (uint256 secondsRemaining, bool isBettingOpen, bool isBettingClosed, bool isResolved, uint256 currentTime, uint256 closeTime)",
  "function getCurrentTimestamp() external view returns (uint256)",
  "function getContractBalance() external view returns (uint256)",
  "function organizer() external view returns (address)",
  "function markets(uint256) external view returns (bytes32 questionHash, uint256 closeTime, uint256 betAmount, uint256 yesPool, uint256 noPool, bool isClosed, bool resolved, bool outcome)",
] as const

// ============================================================================
// CONTRACT WRAPPER CLASS
// ============================================================================

export class TachiContract {
  private contract: Contract
  private signer: Signer | null

  /**
   * Initialize the Tachi Contract
   * @param contractAddress - The deployed contract address
   * @param signerOrProvider - Signer for write operations, or Provider for read-only
   */
  constructor(contractAddress: string, signerOrProvider: Signer | providers.Provider) {
    this.contract = new ethers.Contract(contractAddress, TACHI_FACTORY_ABI, signerOrProvider)
    this.signer = signerOrProvider instanceof Signer ? signerOrProvider : null
  }

  /**
   * Get the contract instance (for advanced usage)
   */
  getContract(): Contract {
    return this.contract
  }

  // ============================================================================
  // ORGANIZER FUNCTIONS (Write - Requires Signer)
  // ============================================================================

  /**
   * Create a new betting market (Organizer only)
   * @param question - The betting question
   * @param durationSeconds - Duration in seconds (max 3600 = 1 hour)
   * @param betAmount - Bet amount in ether (must be between 0.001 and 100)
   * @returns Promise with transaction hash and market ID
   */
  async createMarket(
    question: string,
    durationSeconds: number,
    betAmount: string
  ): Promise<{ txHash: string; marketId: number }> {
    if (!this.signer) {
      throw new Error("Signer required for createMarket")
    }

    if (durationSeconds <= 0 || durationSeconds > CONTRACT_CONSTANTS.MAX_DURATION) {
      throw new Error(`Duration must be between 1 and ${CONTRACT_CONSTANTS.MAX_DURATION} seconds`)
    }

    const betAmountWei = ethers.utils.parseEther(betAmount)
    if (betAmountWei.lt(CONTRACT_CONSTANTS.MIN_BET_AMOUNT)) {
      throw new Error(`Bet amount too low. Minimum: ${ethers.utils.formatEther(CONTRACT_CONSTANTS.MIN_BET_AMOUNT)} ETH`)
    }
    if (betAmountWei.gt(CONTRACT_CONSTANTS.MAX_BET_AMOUNT)) {
      throw new Error(`Bet amount too high. Maximum: ${ethers.utils.formatEther(CONTRACT_CONSTANTS.MAX_BET_AMOUNT)} ETH`)
    }

    const tx = await this.contract.createMarket(question, durationSeconds, betAmountWei)
    const receipt = await tx.wait()

    // Extract market ID from event
    const event = receipt.events?.find((e: any) => e.event === "MarketCreated")
    const marketId = event?.args?.marketId?.toNumber() ?? receipt.events?.[0]?.args?.[0]?.toNumber()

    return {
      txHash: receipt.transactionHash,
      marketId: marketId ?? (await this.getMarketCount()) - 1,
    }
  }

  /**
   * Close betting for a market (Organizer only)
   * @param marketId - The market ID
   * @returns Promise with transaction hash
   */
  async closeBetting(marketId: number): Promise<string> {
    if (!this.signer) {
      throw new Error("Signer required for closeBetting")
    }

    const tx = await this.contract.closeBetting(marketId)
    const receipt = await tx.wait()
    return receipt.transactionHash
  }

  /**
   * Resolve a market with outcome (Organizer only)
   * This also distributes winnings automatically
   * @param marketId - The market ID
   * @param outcome - true for YES, false for NO
   * @returns Promise with transaction hash
   */
  async resolveMarket(marketId: number, outcome: boolean): Promise<string> {
    if (!this.signer) {
      throw new Error("Signer required for resolveMarket")
    }

    const tx = await this.contract.resolveMarket(marketId, outcome)
    const receipt = await tx.wait()
    return receipt.transactionHash
  }

  /**
   * Add house funds to a market (Organizer only)
   * Funds are split 50/50 between YES and NO pools
   * @param marketId - The market ID
   * @param amount - Amount in ether (will be converted to wei)
   * @returns Promise with transaction hash
   */
  async addHouseFunds(marketId: number, amount: string): Promise<string> {
    if (!this.signer) {
      throw new Error("Signer required for addHouseFunds")
    }

    const amountWei = ethers.utils.parseEther(amount)
    const tx = await this.contract.addHouseFunds(marketId, { value: amountWei })
    const receipt = await tx.wait()
    return receipt.transactionHash
  }

  /**
   * Set a new organizer (Current organizer only)
   * @param newOrganizer - Address of the new organizer
   * @returns Promise with transaction hash
   */
  async setOrganizer(newOrganizer: string): Promise<string> {
    if (!this.signer) {
      throw new Error("Signer required for setOrganizer")
    }

    const tx = await this.contract.setOrganizer(newOrganizer)
    const receipt = await tx.wait()
    return receipt.transactionHash
  }

  // ============================================================================
  // USER FUNCTIONS (Write - Requires Signer)
  // ============================================================================

  /**
   * Place a bet on a market
   * @param marketId - The market ID
   * @param prediction - true for YES, false for NO
   * @returns Promise with transaction hash
   */
  async placeBet(marketId: number, prediction: boolean): Promise<string> {
    if (!this.signer) {
      throw new Error("Signer required for placeBet")
    }

    // First get the market to know the bet amount
    const market = await this.getMarket(marketId)
    const betAmount = ethers.BigNumber.from(market.betAmount)

    const tx = await this.contract.placeBet(marketId, prediction, { value: betAmount })
    const receipt = await tx.wait()
    return receipt.transactionHash
  }

  // ============================================================================
  // VIEW FUNCTIONS (Read-only)
  // ============================================================================

  /**
   * Get market data by ID
   * @param marketId - The market ID
   * @returns Market data
   */
  async getMarket(marketId: number): Promise<MarketData> {
    const result = await this.contract.getMarket(marketId)
    return {
      questionHash: result.questionHash,
      closeTime: result.closeTime.toNumber(),
      betAmount: result.betAmount.toString(),
      yesPool: result.yesPool.toString(),
      noPool: result.noPool.toString(),
      isClosed: result.isClosed,
      resolved: result.resolved,
      outcome: result.outcome,
      participantCount: result.participantCount.toNumber(),
    }
  }

  /**
   * Get user's bet for a specific market
   * @param marketId - The market ID
   * @param userAddress - User's wallet address
   * @returns Bet data
   */
  async getUserBet(marketId: number, userAddress?: string): Promise<BetData> {
    const address = userAddress || (this.signer ? await this.signer.getAddress() : undefined)
    if (!address) {
      throw new Error("User address required")
    }

    const result = await this.contract.getUserBet(marketId, address)
    return {
      hasBet: result.hasBet,
      prediction: result.prediction,
      amount: result.amount.toString(),
      claimed: result.claimed,
      won: result.won,
    }
  }

  /**
   * Get user statistics
   * @param userAddress - User's wallet address (optional, defaults to signer)
   * @returns User stats
   */
  async getUserStats(userAddress?: string): Promise<UserStats> {
    const address = userAddress || (this.signer ? await this.signer.getAddress() : undefined)
    if (!address) {
      throw new Error("User address required")
    }

    const result = await this.contract.getUserStats(address)
    return {
      totalBets: result.totalBets.toNumber(),
      wonBets: result.wonBets.toNumber(),
      lostBets: result.lostBets.toNumber(),
      totalWinnings: result.totalWinnings.toString(),
      netProfit: result.netProfit.toString(),
      totalAmountBet: result.totalAmountBet.toString(),
      winRate: result.winRate.toNumber(), // In basis points (divide by 100 for percentage)
    }
  }

  /**
   * Get market status and time information
   * @param marketId - The market ID
   * @returns Market status
   */
  async getMarketStatus(marketId: number): Promise<MarketStatus> {
    const result = await this.contract.getMarketStatus(marketId)
    return {
      secondsRemaining: result.secondsRemaining.toNumber(),
      isBettingOpen: result.isBettingOpen,
      isBettingClosed: result.isBettingClosed,
      isResolved: result.isResolved,
      currentTime: result.currentTime.toNumber(),
      closeTime: result.closeTime.toNumber(),
    }
  }

  /**
   * Get total number of markets
   * @returns Market count
   */
  async getMarketCount(): Promise<number> {
    const count = await this.contract.getMarketCount()
    return count.toNumber()
  }

  /**
   * Get all participant addresses
   * @returns Array of participant addresses
   */
  async getAllParticipants(): Promise<string[]> {
    return await this.contract.getAllParticipants()
  }

  /**
   * Get current blockchain timestamp
   * @returns Current timestamp in seconds
   */
  async getCurrentTimestamp(): Promise<number> {
    const timestamp = await this.contract.getCurrentTimestamp()
    return timestamp.toNumber()
  }

  /**
   * Get contract balance
   * @returns Contract balance in wei (as string)
   */
  async getContractBalance(): Promise<string> {
    const balance = await this.contract.getContractBalance()
    return balance.toString()
  }

  /**
   * Get organizer address
   * @returns Organizer address
   */
  async getOrganizer(): Promise<string> {
    return await this.contract.organizer()
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Format wei amount to ether string
 */
export function formatEther(wei: string | ethers.BigNumber): string {
  return ethers.utils.formatEther(wei)
}

/**
 * Parse ether string to wei
 */
export function parseEther(ether: string): ethers.BigNumber {
  return ethers.utils.parseEther(ether)
}

/**
 * Calculate win rate percentage from basis points
 */
export function calculateWinRate(winRateBasisPoints: number): number {
  return winRateBasisPoints / 100
}

/**
 * Calculate odds from pool sizes
 */
export function calculateOdds(yesPool: string, noPool: string, totalPool: string): { yesOdds: number; noOdds: number } {
  const yesPoolBN = ethers.BigNumber.from(yesPool)
  const noPoolBN = ethers.BigNumber.from(noPool)
  const totalPoolBN = ethers.BigNumber.from(totalPool)

  if (yesPoolBN.isZero() || noPoolBN.isZero() || totalPoolBN.isZero()) {
    return { yesOdds: 1.0, noOdds: 1.0 }
  }

  // Odds = totalPool / poolForChoice
  const yesOdds = parseFloat(formatEther(totalPoolBN)) / parseFloat(formatEther(yesPoolBN))
  const noOdds = parseFloat(formatEther(totalPoolBN)) / parseFloat(formatEther(noPoolBN))

  return {
    yesOdds: Math.round(yesOdds * 100) / 100, // Round to 2 decimals
    noOdds: Math.round(noOdds * 100) / 100,
  }
}

/**
 * Format time remaining as human-readable string
 */
export function formatTimeRemaining(seconds: number): string {
  if (seconds <= 0) return "Closed"

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`
  } else {
    return `${secs}s`
  }
}

/**
 * Check if betting is open for a market
 */
export function isBettingOpen(market: MarketData, currentTime: number): boolean {
  return !market.isClosed && currentTime < market.closeTime && !market.resolved
}

/**
 * Get contract instance from provider/signer
 * @param contractAddress - Contract address
 * @param signerOrProvider - Signer or Provider
 */
export function getTachiContract(
  contractAddress: string,
  signerOrProvider: Signer | providers.Provider
): TachiContract {
  return new TachiContract(contractAddress, signerOrProvider)
}

/**
 * Get contract instance from window.ethereum (browser)
 * @param contractAddress - Contract address
 */
export async function getTachiContractFromBrowser(contractAddress: string): Promise<TachiContract> {
  if (typeof window === "undefined" || !(window as any).ethereum) {
    throw new Error("window.ethereum not found. Please install MetaMask or another Web3 wallet.")
  }

  const provider = new ethers.providers.Web3Provider((window as any).ethereum)
  const signer = provider.getSigner()
  return new TachiContract(contractAddress, signer)
}

/**
 * Get contract instance read-only (no signer needed)
 * @param contractAddress - Contract address
 * @param rpcUrl - RPC endpoint URL
 */
export function getTachiContractReadOnly(contractAddress: string, rpcUrl: string): TachiContract {
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl)
  return new TachiContract(contractAddress, provider)
}

