import { useState, useEffect, useCallback } from 'react';
import { useWallet } from 'use-wallet';
import { MetaMaskButton, Loader } from 'rimble-ui';
import { ethers } from 'ethers';

import GauchoVault from './abis/GauchoVault.json';
import ERC20 from './abis/ERC20.json';

import sushidai from './assets/sushi-dai.png';

import * as S from './components/styles';
import GlobalStyle from './components/GlobalStyle';

function App() {
  const { account, connect, ethereum } = useWallet();

  const [contract, setContract] = useState();
  const [daiEthBalance, setDaiEthBalance] = useState();
  const [tokenBalance, setTokenBalance] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleDeposit = useCallback(async () => {
    try {
      setIsLoading(true);

      const tx = await contract.deposit(ethers.utils.parseEther(daiEthBalance.toString()));
      await tx.wait();
      
      const tokenBalanceLoaded = await contract.balanceOf(account);

      setTokenBalance(ethers.utils.formatEther(tokenBalanceLoaded).toNumber());
    } catch(err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [contract, daiEthBalance, account]);

  const handleWithdraw= useCallback(async () => {
    try {
      setIsLoading(true);

      const tx = await contract.withdraw(ethers.utils.parseEther(daiEthBalance.toString()));
      await tx.wait();

      const tokenBalanceLoaded = await contract.balanceOf(account);

      setTokenBalance(ethers.utils.formatEther(tokenBalanceLoaded).toNumber());
    } catch(err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [contract, daiEthBalance, account]);

  useEffect(() => {
    const loadEthereum = async () => {
      try {
        const web3Provider = new ethers.providers.Web3Provider(ethereum);
        const signer = web3Provider.getSigner(account);
        const gauchoContract = new ethers.Contract(
          '0xeBb5c6aef0958CBc4677944b23dDFdEaD0FD9CE3',
          GauchoVault.abi,
          signer
          );      
        const daiEthContract = new ethers.Contract(
          '0xC3D03e4F041Fd4cD388c549Ee2A29a9E5075882f',
          ERC20.abi,
          signer    
          );
        
        const tokenBalanceLoaded = await contract.balanceOf(account);
        const daiEthBalanceLoaded = await daiEthContract.balanceOf(account);

        setContract(gauchoContract);
        setTokenBalance(ethers.utils.formatEther(tokenBalanceLoaded).toNumber());
        setDaiEthBalance(ethers.utils.formatEther(daiEthBalanceLoaded).toNumber());
      } catch (err) {
        console.log(err);
      }
    };

    if (ethereum) {
      loadEthereum();
    }
  }, [ethereum, account, contract]);

  return (
    <>
      <S.Container>
        <S.Heading>
          <S.Logo href="#">Gaucho Finance 🚜</S.Logo>
          {!account ? (
            <MetaMaskButton.Outline onClick={() => connect('injected')}>
              Connect with Metamask
            </MetaMaskButton.Outline>
          ) : <S.Address>Connected {account}</S.Address>}
        </S.Heading>
        <S.Cards>
          <S.Card>
            <S.Label>Liquidity Tokens Invested</S.Label>            
            <S.BalanceArea>
          <S.Value>{!account ? 'Connect your wallet' : !isLoading ? tokenBalance : <Loader size="40px" />}</S.Value>
              <img src={sushidai} alt="Sushi Dai logo"/>
            </S.BalanceArea>            
          </S.Card>
          <S.Section>          
            <S.Button onClick={handleDeposit}>Deposit ETH-DAI SLP</S.Button>
            <S.Button onClick={handleWithdraw}>Withdraw ETH-DAI SLP</S.Button>             
          </S.Section>
        </S.Cards>
      </S.Container>
      <GlobalStyle />
    </>
    );
}

export default App;
