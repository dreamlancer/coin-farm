import { CurrencyAmount, JSBI, Token, Trade } from '@pancakeswap-libs/sdk'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { CardBody, ArrowDownIcon, Button, IconButton, Text } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import { ArrowDown } from 'react-feather'
import { ThemeContext } from 'styled-components'
import { AutoColumn } from '../../exchange/src/components/Column'
import CurrencyInputPanel from '../../exchange/src/components/CurrencyInputPanel'
import AddressInputPanel from '../../exchange/src/components/AddressInputPanel'
import Card, { GreyCard } from '../../exchange/src/components/Card'
import ConfirmSwapModal from '../../exchange/src/components/swap/ConfirmSwapModal'
import CardNav from '../../exchange/src/components/CardNav'
import { AutoRow, RowBetween } from '../../exchange/src/components/Row'
import AdvancedSwapDetailsDropdown from '../../exchange/src/components/swap/AdvancedSwapDetailsDropdown'
import BetterTradeLink from '../../exchange/src/components/swap/BetterTradeLink'
import confirmPriceImpactWithoutFee from '../../exchange/src/components/swap/confirmPriceImpactWithoutFee'
import { ArrowWrapper, BottomGrouping, SwapCallbackError, Wrapper } from '../../exchange/src/components/swap/styleds'
import TradePrice from '../../exchange/src/components/swap/TradePrice'
import TokenWarningModal from '../../exchange/src/components/TokenWarningModal'
import SyrupWarningModal from '../../exchange/src/components/SyrupWarningModal'
import ProgressSteps from '../../exchange/src/components/ProgressSteps'
import { LinkStyledButton, TYPE } from '../../exchange/src/components/Shared'
import Loader from '../../exchange/src/components/Loader'
import PageHeader from '../../exchange/src/components/PageHeader'
import ConnectWalletButton from '../../exchange/src/components/ConnectWalletButton'
import { useActiveWeb3React } from '../../exchange/src/hooks'
import { useCurrency } from '../../exchange/src/hooks/Tokens'
import { ApprovalState, useApproveCallbackFromTrade } from '../../exchange/src/hooks/useApproveCallback'
import { useSwapCallback } from '../../exchange/src/hooks/useSwapCallback'
import useToggledVersion, { Version } from '../../exchange/src/hooks/useToggledVersion'
import useWrapCallback, { WrapType } from '../../exchange/src/hooks/useWrapCallback'
import { Field } from '../../exchange/src/state/swap/actions'
import {
  useDefaultsFromURLSearch,
  useDerivedSwapInfo,
  useSwapActionHandlers,
  useSwapState,
} from '../../exchange/src/state/swap/hooks'
import { useExpertModeManager, useUserDeadline, useUserSlippageTolerance } from '../../exchange/src/state/user/hooks'

import { BETTER_TRADE_LINK_THRESHOLD, INITIAL_ALLOWED_SLIPPAGE } from '../../exchange/src/constants'
import { isTradeBetter } from '../../exchange/src/data/V1'
import { maxAmountSpend } from '../../exchange/src/utils/maxAmountSpend'
import { computeTradePriceBreakdown, warningSeverity } from '../../exchange/src/utils/prices'
import { TranslateString } from '../../exchange/src/utils/translateTextHelpers'
import AppBody from '../../exchange/src/pages/AppBody'

const { main: Main } = TYPE

const BuySell = () => {
  const loadedUrlParams = useDefaultsFromURLSearch()

  // token warning stuff
  const [loadedInputCurrency, loadedOutputCurrency] = [
    useCurrency(loadedUrlParams?.inputCurrencyId),
    useCurrency(loadedUrlParams?.outputCurrencyId),
  ]
  const [dismissTokenWarning, setDismissTokenWarning] = useState<boolean>(false)
  const [isSyrup, setIsSyrup] = useState<boolean>(false)
  const [syrupTransactionType, setSyrupTransactionType] = useState<string>('')
  const urlLoadedTokens: Token[] = useMemo(
    () => [loadedInputCurrency, loadedOutputCurrency]?.filter((c): c is Token => c instanceof Token) ?? [],
    [loadedInputCurrency, loadedOutputCurrency],
  )
  const handleConfirmTokenWarning = useCallback(() => {
    setDismissTokenWarning(true)
  }, [])

  const handleConfirmSyrupWarning = useCallback(() => {
    setIsSyrup(false)
    setSyrupTransactionType('')
  }, [])

  const { account } = useActiveWeb3React()
  const theme = useContext(ThemeContext)

  const [isExpertMode] = useExpertModeManager()

  // get custom setting values for user
  const [deadline] = useUserDeadline()
  const [allowedSlippage] = useUserSlippageTolerance()

  // swap state
  const { independentField, typedValue, recipient } = useSwapState()
  const {
    v1Trade,
    v2Trade,
    currencyBalances,
    parsedAmount,
    currencies,
    inputError: swapInputError,
  } = useDerivedSwapInfo()
  const { wrapType, execute: onWrap, inputError: wrapInputError } = useWrapCallback(
    currencies[Field.INPUT],
    currencies[Field.OUTPUT],
    typedValue,
  )
  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE
  //   const { address: recipientAddress } = useENSAddress(recipient)
  const toggledVersion = useToggledVersion()
  const trade = showWrap
    ? undefined
    : {
        [Version.v1]: v1Trade,
        [Version.v2]: v2Trade,
      }[toggledVersion]

  const betterTradeLinkVersion: Version | undefined =
    toggledVersion === Version.v2 && isTradeBetter(v2Trade, v1Trade, BETTER_TRADE_LINK_THRESHOLD)
      ? Version.v1
      : toggledVersion === Version.v1 && isTradeBetter(v1Trade, v2Trade)
      ? Version.v2
      : undefined

  const parsedAmounts = showWrap
    ? {
        [Field.INPUT]: parsedAmount,
        [Field.OUTPUT]: parsedAmount,
      }
    : {
        [Field.INPUT]: independentField === Field.INPUT ? parsedAmount : trade?.inputAmount,
        [Field.OUTPUT]: independentField === Field.OUTPUT ? parsedAmount : trade?.outputAmount,
      }

  const { onSwitchTokens, onCurrencySelection, onUserInput, onChangeRecipient } = useSwapActionHandlers()
  const isValid = !swapInputError
  const dependentField: Field = independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT

  const handleTypeInput = useCallback(
    (value: string) => {
      onUserInput(Field.INPUT, value)
    },
    [onUserInput],
  )
  const handleTypeOutput = useCallback(
    (value: string) => {
      onUserInput(Field.OUTPUT, value)
    },
    [onUserInput],
  )

  // modal and loading
  const [{ showConfirm, tradeToConfirm, swapErrorMessage, attemptingTxn, txHash }, setSwapState] = useState<{
    showConfirm: boolean
    tradeToConfirm: Trade | undefined
    attemptingTxn: boolean
    swapErrorMessage: string | undefined
    txHash: string | undefined
  }>({
    showConfirm: false,
    tradeToConfirm: undefined,
    attemptingTxn: false,
    swapErrorMessage: undefined,
    txHash: undefined,
  })

  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: showWrap
      ? parsedAmounts[independentField]?.toExact() ?? ''
      : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  }

  const route = trade?.route
  const userHasSpecifiedInputOutput = Boolean(
    currencies[Field.INPUT] && currencies[Field.OUTPUT] && parsedAmounts[independentField]?.greaterThan(JSBI.BigInt(0)),
  )
  const noRoute = !route

  // check whether the user has approved the router on the input token
  const [approval, approveCallback] = useApproveCallbackFromTrade(trade, allowedSlippage)

  // check if user has gone through approval process, used to show two step buttons, reset on token change
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)

  // mark when a user has submitted an approval, reset onTokenSelection for input field
  useEffect(() => {
    if (approval === ApprovalState.PENDING) {
      setApprovalSubmitted(true)
    }
  }, [approval, approvalSubmitted])

  const maxAmountInput: CurrencyAmount | undefined = maxAmountSpend(currencyBalances[Field.INPUT])
  const atMaxAmountInput = Boolean(maxAmountInput && parsedAmounts[Field.INPUT]?.equalTo(maxAmountInput))

  // the callback to execute the swap
  const { callback: swapCallback, error: swapCallbackError } = useSwapCallback(
    trade,
    allowedSlippage,
    deadline,
    recipient,
  )

  const { priceImpactWithoutFee } = computeTradePriceBreakdown(trade)

  const handleSwap = useCallback(() => {
    if (priceImpactWithoutFee && !confirmPriceImpactWithoutFee(priceImpactWithoutFee)) {
      return
    }
    if (!swapCallback) {
      return
    }
    setSwapState((prevState) => ({ ...prevState, attemptingTxn: true, swapErrorMessage: undefined, txHash: undefined }))
    swapCallback()
      .then((hash) => {
        setSwapState((prevState) => ({
          ...prevState,
          attemptingTxn: false,
          swapErrorMessage: undefined,
          txHash: hash,
        }))
      })
      .catch((error) => {
        setSwapState((prevState) => ({
          ...prevState,
          attemptingTxn: false,
          swapErrorMessage: error.message,
          txHash: undefined,
        }))
      })
  }, [priceImpactWithoutFee, swapCallback, setSwapState])

  // errors
  const [showInverted, setShowInverted] = useState<boolean>(false)

  // warnings on slippage
  const priceImpactSeverity = warningSeverity(priceImpactWithoutFee)

  // show approve flow when: no error on inputs, not approved or pending, or approved in current session
  // never show if price impact is above threshold in non expert mode
  const showApproveFlow =
    !swapInputError &&
    (approval === ApprovalState.NOT_APPROVED ||
      approval === ApprovalState.PENDING ||
      (approvalSubmitted && approval === ApprovalState.APPROVED)) &&
    !(priceImpactSeverity > 3 && !isExpertMode)

  const handleConfirmDismiss = useCallback(() => {
    setSwapState((prevState) => ({ ...prevState, showConfirm: false }))

    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onUserInput(Field.INPUT, '')
    }
  }, [onUserInput, txHash, setSwapState])

  const handleAcceptChanges = useCallback(() => {
    setSwapState((prevState) => ({ ...prevState, tradeToConfirm: trade }))
  }, [trade])

  // This will check to see if the user has selected Syrup to either buy or sell.
  // If so, they will be alerted with a warning message.
  const checkForSyrup = useCallback(
    (selected: string, purchaseType: string) => {
      if (selected === 'syrup') {
        setIsSyrup(true)
        setSyrupTransactionType(purchaseType)
      }
    },
    [setIsSyrup, setSyrupTransactionType],
  )

  const handleInputSelect = useCallback(
    (inputCurrency) => {
      setApprovalSubmitted(false) // reset 2 step UI for approvals
      onCurrencySelection(Field.INPUT, inputCurrency)
      if (inputCurrency.symbol.toLowerCase() === 'syrup') {
        checkForSyrup(inputCurrency.symbol.toLowerCase(), 'Selling')
      }
    },
    [onCurrencySelection, setApprovalSubmitted, checkForSyrup],
  )

  const handleMaxInput = useCallback(() => {
    if (maxAmountInput) {
      onUserInput(Field.INPUT, maxAmountInput.toExact())
    }
  }, [maxAmountInput, onUserInput])

  const handleOutputSelect = useCallback(
    (outputCurrency) => {
      onCurrencySelection(Field.OUTPUT, outputCurrency)
      if (outputCurrency.symbol.toLowerCase() === 'syrup') {
        checkForSyrup(outputCurrency.symbol.toLowerCase(), 'Buying')
      }
    },
    [onCurrencySelection, checkForSyrup],
  )

  return (
    <CardBody>
      <AutoColumn gap="md">
        <CurrencyInputPanel
          label={
            independentField === Field.OUTPUT && !showWrap && trade ? 'From (estimated)' : TranslateString(76, 'From')
          }
          value={formattedAmounts[Field.INPUT]}
          showMaxButton={!atMaxAmountInput}
          currency={currencies[Field.INPUT]}
          onUserInput={handleTypeInput}
          onMax={handleMaxInput}
          onCurrencySelect={handleInputSelect}
          otherCurrency={currencies[Field.OUTPUT]}
          id="swap-currency-input"
        />
        <AutoColumn justify="space-between">
          <AutoRow justify={isExpertMode ? 'space-between' : 'center'} style={{ padding: '0 1rem' }}>
            <ArrowWrapper clickable>
              <IconButton
                variant="tertiary"
                onClick={() => {
                  setApprovalSubmitted(false) // reset 2 step UI for approvals
                  onSwitchTokens()
                }}
                style={{ borderRadius: '50%' }}
                size="sm"
              >
                <ArrowDownIcon color="primary" width="24px" />
              </IconButton>
            </ArrowWrapper>
            {recipient === null && !showWrap && isExpertMode ? (
              <LinkStyledButton id="add-recipient-button" onClick={() => onChangeRecipient('')}>
                + Add a send (optional)
              </LinkStyledButton>
            ) : null}
          </AutoRow>
        </AutoColumn>
        <CurrencyInputPanel
          value={formattedAmounts[Field.OUTPUT]}
          onUserInput={handleTypeOutput}
          label={independentField === Field.INPUT && !showWrap && trade ? 'To (estimated)' : TranslateString(80, 'To')}
          showMaxButton={false}
          currency={currencies[Field.OUTPUT]}
          onCurrencySelect={handleOutputSelect}
          otherCurrency={currencies[Field.INPUT]}
          id="swap-currency-output"
        />

        {recipient !== null && !showWrap ? (
          <>
            <AutoRow justify="space-between" style={{ padding: '0 1rem' }}>
              <ArrowWrapper clickable={false}>
                <ArrowDown size="16" color={theme.colors.textSubtle} />
              </ArrowWrapper>
              <LinkStyledButton id="remove-recipient-button" onClick={() => onChangeRecipient(null)}>
                - Remove send
              </LinkStyledButton>
            </AutoRow>
            <AddressInputPanel id="recipient" value={recipient} onChange={onChangeRecipient} />
          </>
        ) : null}

        {showWrap ? null : (
          <Card padding=".25rem .75rem 0 .75rem" borderRadius="20px">
            <AutoColumn gap="4px">
              {Boolean(trade) && (
                <RowBetween align="center">
                  <Text fontSize="14px">Price</Text>
                  <TradePrice
                    price={trade?.executionPrice}
                    showInverted={showInverted}
                    setShowInverted={setShowInverted}
                  />
                </RowBetween>
              )}
              {allowedSlippage !== INITIAL_ALLOWED_SLIPPAGE && (
                <RowBetween align="center">
                  <Text fontSize="14px">Slippage Tolerance</Text>
                  <Text fontSize="14px">{allowedSlippage / 100}%</Text>
                </RowBetween>
              )}
            </AutoColumn>
          </Card>
        )}
      </AutoColumn>
      <BottomGrouping>
        {!account ? (
          <ConnectWalletButton fullWidth />
        ) : showWrap ? (
          <Button disabled={Boolean(wrapInputError)} onClick={onWrap} fullWidth>
            {wrapInputError ?? (wrapType === WrapType.WRAP ? 'Wrap' : wrapType === WrapType.UNWRAP ? 'Unwrap' : null)}
          </Button>
        ) : noRoute && userHasSpecifiedInputOutput ? (
          <GreyCard style={{ textAlign: 'center' }}>
            <Main mb="4px">Insufficient liquidity for this trade.</Main>
          </GreyCard>
        ) : showApproveFlow ? (
          <RowBetween>
            <Button
              onClick={approveCallback}
              disabled={approval !== ApprovalState.NOT_APPROVED || approvalSubmitted}
              style={{ width: '48%' }}
              variant={approval === ApprovalState.APPROVED ? 'success' : 'primary'}
            >
              {approval === ApprovalState.PENDING ? (
                <AutoRow gap="6px" justify="center">
                  Approving <Loader stroke="white" />
                </AutoRow>
              ) : approvalSubmitted && approval === ApprovalState.APPROVED ? (
                'Approved'
              ) : (
                `Approve ${currencies[Field.INPUT]?.symbol}`
              )}
            </Button>
            <Button
              onClick={() => {
                if (isExpertMode) {
                  handleSwap()
                } else {
                  setSwapState({
                    tradeToConfirm: trade,
                    attemptingTxn: false,
                    swapErrorMessage: undefined,
                    showConfirm: true,
                    txHash: undefined,
                  })
                }
              }}
              style={{ width: '48%' }}
              id="swap-button"
              disabled={!isValid || approval !== ApprovalState.APPROVED || (priceImpactSeverity > 3 && !isExpertMode)}
              variant={isValid && priceImpactSeverity > 2 ? 'danger' : 'primary'}
            >
              {priceImpactSeverity > 3 && !isExpertMode
                ? `Price Impact High`
                : `Swap${priceImpactSeverity > 2 ? ' Anyway' : ''}`}
            </Button>
          </RowBetween>
        ) : (
          <Button
            onClick={() => {
              if (isExpertMode) {
                handleSwap()
              } else {
                setSwapState({
                  tradeToConfirm: trade,
                  attemptingTxn: false,
                  swapErrorMessage: undefined,
                  showConfirm: true,
                  txHash: undefined,
                })
              }
            }}
            id="swap-button"
            disabled={!isValid || (priceImpactSeverity > 3 && !isExpertMode) || !!swapCallbackError}
            variant={isValid && priceImpactSeverity > 2 && !swapCallbackError ? 'danger' : 'primary'}
            fullWidth
          >
            {swapInputError ||
              (priceImpactSeverity > 3 && !isExpertMode
                ? `Price Impact Too High`
                : `Swap${priceImpactSeverity > 2 ? ' Anyway' : ''}`)}
          </Button>
        )}
        {showApproveFlow && <ProgressSteps steps={[approval === ApprovalState.APPROVED]} />}
        {isExpertMode && swapErrorMessage ? <SwapCallbackError error={swapErrorMessage} /> : null}
        {betterTradeLinkVersion && <BetterTradeLink version={betterTradeLinkVersion} />}
      </BottomGrouping>
    </CardBody>
  )
}

export default BuySell
