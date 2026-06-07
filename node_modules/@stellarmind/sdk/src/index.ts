/**
 * @stellarmind/sdk
 *
 * The official TypeScript SDK for StellarMind — AI Agent Registry &
 * Autonomous Payment Gateway on Stellar.
 *
 * @example
 * ```ts
 * import { StellarMind, USDC_ISSUER } from '@stellarmind/sdk'
 *
 * const mind = new StellarMind({ network: 'testnet' })
 *
 * // Register an agent
 * await mind.registry.register({ ... }, keypair)
 *
 * // Create a spending policy
 * const policyId = await mind.policy.create({
 *   agent: agentAddress,
 *   dailyLimit: '10.00',
 *   maxPerTx: '0.50',
 *   asset: 'USDC',
 *   issuer: USDC_ISSUER.testnet,
 * }, ownerKeypair)
 *
 * // Agent pays autonomously
 * await mind.policy.executePayment({ policyId, recipient, amount: '0.01', memo: '...' }, agentKeypair)
 * ```
 */

import { resolveConfig } from './stellar';
import { RegistryClient } from './registry';
import { PolicyClient } from './policy';
import type { StellarMindConfig } from './types';

export class StellarMind {
  public readonly registry: RegistryClient;
  public readonly policy: PolicyClient;

  constructor(config: StellarMindConfig) {
    const resolved = resolveConfig(config);
    this.registry = new RegistryClient(resolved);
    this.policy = new PolicyClient(resolved);
  }
}

// Named exports for convenience
export { RegistryClient } from './registry';
export { PolicyClient } from './policy';
export { USDC_ISSUER, toStroops, fromStroops, formatReputation } from './stellar';
export type {
  Agent,
  RegisterAgentParams,
  FindAgentsParams,
  SpendingPolicy,
  CreatePolicyParams,
  ExecutePaymentParams,
  PaymentRecord,
  StellarMindConfig,
  Network,
  StellarMindEvent,
} from './types';
export { StellarMindError, ErrorCodes } from './types';
